import { applyMockApiSimulation, MOCK_API_NO_STORE, mockApiJson } from "../../../../lib/mock-api";

/** Mock backend health probe: `GET {NEXT_PUBLIC_API_URL}/health` when pointed at /api/mock. */
export async function GET(request: Request) {
  const simulated = await applyMockApiSimulation(request.headers);
  if (simulated) {
    return simulated;
  }
  return mockApiJson({ status: "ok" }, { cacheControl: MOCK_API_NO_STORE });
}
