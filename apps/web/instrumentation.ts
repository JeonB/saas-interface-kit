import { getProductionSessionSecretProblem } from "./lib/session-secret";

export function register() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const problem = getProductionSessionSecretProblem(process.env.SESSION_SECRET);
  if (problem) {
    throw new Error(
      `[web] ${problem}. Set SESSION_SECRET to a strong random value in production (e.g. \`openssl rand -base64 32\`).`,
    );
  }
}
