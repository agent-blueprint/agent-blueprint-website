// Agent Blueprint assist check, version 1. Read-only: it never inserts, updates or deletes.
// Run it in Scripts - Background. Copy the line that starts with ASSIST_CHECK into the page.
// It reads run counts, tool counts, agent names and assist totals. It reads no ticket content,
// no prompts and no user names. Nothing is sent anywhere.
(function () {
  var DAYS = 30, MAX_RUNS = 50000;
  var since = gs.daysAgoStart(DAYS);
  var out = { v: 1, days: DAYS, agents: [], assists: null, trialAssists: null, capped: false };

  function exists(table) {
    return new GlideRecord(table).isValid();
  }

  if (exists('sn_aia_execution_plan') && exists('sn_aia_tools_execution')) {
    var calls = {};
    var ga = new GlideAggregate('sn_aia_tools_execution');
    ga.addQuery('sys_created_on', '>=', since);
    ga.addAggregate('COUNT');
    ga.groupBy('execution_plan_id');
    ga.query();
    while (ga.next()) {
      calls[ga.getValue('execution_plan_id')] = parseInt(ga.getAggregate('COUNT'), 10);
    }

    var names = {}, groups = {}, seen = 0;
    var plan = new GlideRecord('sn_aia_execution_plan');
    plan.addQuery('sys_created_on', '>=', since);
    plan.addQuery('run_type', 'NOT IN', 'testing,evaluation');
    plan.addNullQuery('test_version');
    plan.setLimit(MAX_RUNS);
    plan.query();
    while (plan.next()) {
      seen++;
      var field = plan.getValue('usecase') ? 'usecase' : plan.getValue('team') ? 'team' : 'agent';
      var id = plan.getValue(field) || 'unknown';
      if (!names[id]) names[id] = plan.getDisplayValue(field) || 'Unnamed';
      if (!groups[id]) groups[id] = [];
      groups[id].push(calls[plan.getUniqueValue()] || 0);
    }
    out.capped = seen >= MAX_RUNS;

    for (var key in groups) {
      var counts = groups[key].sort(function (a, b) { return a - b; });
      out.agents.push({
        name: String(names[key]),
        runs: counts.length,
        toolCalls: counts[Math.floor(counts.length / 2)]
      });
    }
    out.agents.sort(function (a, b) { return b.runs - a.runs; });
  }

  if (exists('sys_gen_ai_usage_log')) {
    var log = new GlideAggregate('sys_gen_ai_usage_log');
    log.addQuery('sys_created_on', '>=', since);
    log.addAggregate('SUM', 'assists');
    log.addAggregate('SUM', 'trial_assists');
    log.setGroup(false);
    log.query();
    if (log.next()) {
      out.assists = parseInt(log.getAggregate('SUM', 'assists'), 10) || 0;
      out.trialAssists = parseInt(log.getAggregate('SUM', 'trial_assists'), 10) || 0;
    }
  }

  gs.print('ASSIST_CHECK ' + JSON.stringify(out));
})();
