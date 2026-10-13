import {
  applyMockApiSimulation,
  MOCK_API_SWR_CACHE_CONTROL,
  mockApiJson,
} from "../../../../../../lib/mock-api";
import { MOCK_USAGE_SUMMARY } from "../../../../../../lib/usage-mock";

export async function GET(request: Request) {
  const simulated = await applyMockApiSimulation(request.headers);
  if (simulated) {
    return simulated;
  }
  return mockApiJson(MOCK_USAGE_SUMMARY, { cacheControl: MOCK_API_SWR_CACHE_CONTROL });
}
