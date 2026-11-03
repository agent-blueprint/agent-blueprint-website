// Fill the draw-my-agent template with an agent's own inventory. The agent
// does the looking; this only draws.

const OPEN = '<script id="blueprint" type="application/json">';

export function renderAgentMap(template: string, blueprint: unknown): string {
  const start = template.indexOf(OPEN);
  const end = start === -1 ? -1 : template.indexOf("</script>", start);
  if (start === -1 || end === -1) throw new Error("drawing template has no blueprint data block");
  // Escape "<" so nothing in the data can close the script tag early.
  const json = JSON.stringify(blueprint, null, 2).replace(/</g, "\\u003c");
  return template.slice(0, start + OPEN.length) + "\n" + json + "\n" + template.slice(end);
}
