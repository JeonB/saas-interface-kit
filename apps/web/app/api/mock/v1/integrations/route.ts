import { MOCK_INTEGRATIONS } from "../../../../../lib/integrations-mock";
import {
  applyMockApiSimulation,
  MOCK_API_SWR_CACHE_CONTROL,
  mockApiJson,
} from "../../../../../lib/mock-api";

export async function GET(request: Request) {
  const simulated = await applyMockApiSimulation(request.headers);
  if (simulated) {
    return simulated;
  }
  return mockApiJson(MOCK_INTEGRATIONS, { cacheControl: MOCK_API_SWR_CACHE_CONTROL });
}
