// OpenAI plugin directory domain verification for the /mcp tools server.
// The portal checks that this URL returns exactly the token, as plain text.
const TOKEN = "mpEKsz6fMg3kd1ro4ZguucbkZHWjZhxpUYib4RCM_kE";

export function GET() {
  return new Response(TOKEN, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
