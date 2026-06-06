import { applyMockApiSimulation, mockApiJson } from "../../../../../lib/mock-api";
import { MOCK_WORKFLOWS } from "../../../../../lib/workflows-mock";

export async function GET(request: Request) {
  const simulated = await applyMockApiSimulation(request.headers);
  if (simulated) {
    return simulated;
  }
  return mockApiJson(MOCK_WORKFLOWS);
}
