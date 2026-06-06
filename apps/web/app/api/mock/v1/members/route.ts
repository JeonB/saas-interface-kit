import { MOCK_MEMBERS } from "../../../../../lib/members-mock";
import { applyMockApiSimulation, mockApiJson } from "../../../../../lib/mock-api";

export async function GET(request: Request) {
  const simulated = await applyMockApiSimulation(request.headers);
  if (simulated) {
    return simulated;
  }
  return mockApiJson(MOCK_MEMBERS);
}
