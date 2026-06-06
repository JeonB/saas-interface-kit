import { applyMockApiSimulation, MOCK_API_NO_STORE, mockApiJson } from "../../../../../../lib/mock-api";
import { MOCK_RUNS } from "../../../../../../lib/runs-mock";

export async function GET(
  request: Request,
  context: { params: Promise<{ runId: string }> },
) {
  const simulated = await applyMockApiSimulation(request.headers);
  if (simulated) {
    return simulated;
  }
  const { runId } = await context.params;
  const run = MOCK_RUNS.find((candidate) => candidate.id === runId);
  if (!run) {
    return Response.json(
      { error: `run not found: ${runId}` },
      { status: 404, headers: { "Cache-Control": MOCK_API_NO_STORE } },
    );
  }
  return mockApiJson(run, { cacheControl: MOCK_API_NO_STORE });
}
