// Toolbar for drawings opened at agentblueprint.ai/draw/v0.3/view.html.
// "Save this drawing" builds the same file an agent would have saved, in this browser.
// "Add my numbers" sends counts only (no tool, connection or agent names), and only after the person sees them and clicks Send.
(function () {
  var TEMPLATE = "/draw/v0.3/template.html";
  var OPEN = '<script id="blueprint" type="application/json">';
  var node = document.getElementById("blueprint");
  if (!node) return;
  var data;
  try { data = JSON.parse(node.textContent); } catch { return; }

  var css = document.createElement("style");
  css.textContent =
    ".vbar{max-width:1240px;margin:0 auto;padding:14px max(16px,env(safe-area-inset-right,0px)) 0 max(16px,env(safe-area-inset-left,0px));display:flex;flex-wrap:wrap;gap:10px;align-items:center;font:14px var(--body)}" +
    ".vbar button{padding:7px 14px;border:1px solid var(--ink-faint);border-radius:6px;background:var(--paper);color:var(--ink);font:600 14px var(--body);cursor:pointer}" +
    ".vbar .vmsg{color:var(--muted)}" +
    ".vshare{max-width:1240px;margin:10px auto 0;padding:0 max(16px,env(safe-area-inset-right,0px)) 0 max(16px,env(safe-area-inset-left,0px));font:14px/1.5 var(--body);color:var(--text)}" +
    ".vshare .box{border:1px dashed var(--ink-faint);border-radius:6px;padding:12px 14px;background:var(--paper)}" +
    ".vshare pre{margin:8px 0;max-height:240px;overflow:auto;font:12px/1.45 var(--mono);white-space:pre-wrap;word-break:break-word}" +
    ".vshare p{margin:0 0 8px;color:var(--muted)}";
  document.head.appendChild(css);

  var bar = document.createElement("div");
  bar.className = "vbar";
  var save = button("Save this drawing");
  var share = data.demo ? null : button("Add my numbers to the benchmark");
  var status = document.createElement("span");
  status.className = "vmsg";
  bar.appendChild(status);
  document.body.insertBefore(bar, document.body.firstChild);
  var panel = document.createElement("div");
  panel.className = "vshare";
  bar.after(panel);

  function button(label) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    bar.appendChild(b);
    return b;
  }

  save.addEventListener("click", function () {
    try { data = JSON.parse(node.textContent); } catch { /* keep the data from page load */ }
    fetch(TEMPLATE, { cache: "force-cache" }).then(function (r) { return r.text(); }).then(function (html) {
      var start = html.indexOf(OPEN), end = html.indexOf("</" + "script>", start);
      var block = JSON.stringify(data, null, 1).replace(/</g, "\\u003c");
      var file = html.slice(0, start + OPEN.length) + "\n" + block + "\n" + html.slice(end);
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([file], { type: "text/html" }));
      a.download = "my-agent-blueprint-" + (/^\d{4}-\d{2}-\d{2}$/.test(data.drawn) ? data.drawn : new Date().toISOString().slice(0, 10)) + ".html";
      document.body.appendChild(a);
      a.click();
      a.remove();
      status.textContent = "Saved. Open it later to set rules again or compare with a newer drawing.";
    }, function () { status.textContent = "It couldn't be saved. Try again in a moment."; });
  });

  if (!share) return;

  var ICONS = ["mail", "chat", "calendar", "code", "files", "terminal", "web", "doc", "data", "money", "plug"];
  var QS = ["commands", "messages", "delete", "money", "secrets"];
  var STATUS = ["yes", "none_found", "unsure"];
  function product() {
    var s = ((data.agent && data.agent.product) || "") + " " + ((data.agent && data.agent.name) || "");
    s = s.toLowerCase();
    if (s.indexOf("claude code") !== -1) return "claude-code";
    if (s.indexOf("codex") !== -1) return "codex";
    if (s.indexOf("cursor") !== -1) return "cursor";
    if (s.indexOf("copilot") !== -1) return "copilot";
    if (s.indexOf("gemini") !== -1) return "gemini";
    if (s.indexOf("chatgpt") !== -1) return "chatgpt";
    if (s.indexOf("claude") !== -1) return "claude-app";
    return "other";
  }
  function counts() {
    // "0.2" is the version of this counts format, which v0.3 drawings didn't change.
    var c = { version: "0.2", product: product(), connections: 0, tools: 0, reads: 0, changes: 0, unsure: 0, highRisk: 0,
      mustAsk: 0, noNeedToAsk: 0, askUnknown: 0, declared: 0, trims: 0, kinds: {}, checks: {} };
    (data.connections || []).forEach(function (x) {
      var r = (x.reads || []).length, ch = (x.changes || []).length;
      c.connections++; c.tools += r + ch; c.reads += r; c.changes += ch; c.unsure += (x.unsure || []).length;
      if (x.risk === "high") c.highRisk++;
      if (x.asks === true) c.mustAsk += ch; else if (x.asks === false) c.noNeedToAsk += ch; else c.askUnknown += ch;
      if (x.basis === "declared") c.declared += r + ch;
      var k = ICONS.indexOf(x.icon) !== -1 ? x.icon : "plug";
      c.kinds[k] = (c.kinds[k] || 0) + 1;
    });
    QS.forEach(function (q) {
      var st = data.checks && data.checks[q] && data.checks[q].status;
      c.checks[q] = STATUS.indexOf(st) !== -1 ? st : "unsure";
    });
    c.trims = Array.isArray(data.trim) ? data.trim.length : 0;
    return c;
  }

  share.addEventListener("click", function () {
    var payload = counts();
    panel.textContent = "";
    var box = document.createElement("div");
    box.className = "box";
    var p1 = document.createElement("p");
    p1.textContent = "Help us publish real numbers on what agents can do. Only the counts below are sent: no tool names, connection names, agent name, account details or evidence. We use them for an anonymous benchmark.";
    var pre = document.createElement("pre");
    pre.textContent = JSON.stringify(payload, null, 2);
    var send = document.createElement("button");
    send.type = "button";
    send.textContent = "Send these numbers";
    var cancel = document.createElement("button");
    cancel.type = "button";
    cancel.textContent = "Cancel";
    cancel.style.marginLeft = "8px";
    var out = document.createElement("p");
    out.style.marginTop = "8px";
    [send, cancel].forEach(function (b) { b.style.cssText += ";padding:7px 14px;border:1px solid var(--ink-faint);border-radius:6px;background:var(--paper);color:var(--ink);font:600 14px var(--body);cursor:pointer"; });
    box.append(p1, pre, send, cancel, out);
    panel.appendChild(box);
    cancel.addEventListener("click", function () { panel.textContent = ""; });
    send.addEventListener("click", function () {
      send.disabled = true;
      out.textContent = "Sending...";
      fetch("/api/benchmark", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        .then(function (r) {
          if (!r.ok) throw new Error();
          panel.textContent = "";
          share.remove();
          status.textContent = "Thanks. Your counts were sent.";
        })
        .catch(function () { send.disabled = false; out.textContent = "That didn't send. Nothing was saved. You can try again."; });
    });
  });
})();
