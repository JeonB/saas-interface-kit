import { applyMockApiSimulation, MOCK_API_NO_STORE, mockApiJson } from "../../../../../lib/mock-api";
import { MOCK_RUNS, sortRunsByStartedAtDesc } from "../../../../../lib/runs-mock";

export async function GET(request: Request) {
  const simulated = await applyMockApiSimulation(request.headers);
  if (simulated) {
    return simulated;
  }
  return mockApiJson(sortRunsByStartedAtDesc(MOCK_RUNS), { cacheControl: MOCK_API_NO_STORE });
}
