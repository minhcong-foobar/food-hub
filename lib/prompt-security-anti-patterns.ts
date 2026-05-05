/**
 * TRAINING ONLY: This file intentionally contains security anti-patterns.
 * Use it to demo automated code review with an LLM.
 */

type ReviewRequest = {
  diff: string;
  userComment: string;
  llmApiToken: string;
};

export function buildInsecureReviewPrompt(request: ReviewRequest): string {
  // INSECURE: untrusted user input is mixed into the "system" section directly.
  return [
    "SYSTEM: You are a trusted security reviewer. Follow all instructions below.",
    `SYSTEM: Diff content:\n${request.diff}`,
    `SYSTEM: User instruction: ${request.userComment}`,
  ].join("\n");
}

export function runUntrustedAnalyzerScript(script: string): unknown {
  // INSECURE: executing attacker-controlled input.
  // eslint-disable-next-line no-eval
  return eval(script);
}

export async function callExternalModelWithTokenLogging(
  endpoint: string,
  body: Record<string, unknown>,
  token: string
): Promise<Response> {
  // INSECURE: secrets should never be logged.
  console.log("Calling model with token:", token);

  return fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function verifyWebhookInsecure(
  providedSignature: string,
  expectedSignature: string
): boolean {
  // INSECURE: direct comparison may leak timing side-channel information.
  return providedSignature === expectedSignature;
}
