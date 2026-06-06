import { applyMockApiSimulation, mockApiJson } from "../../../../../lib/mock-api";
import { isCategory, isSeverity, queryMockNotifications } from "../../../../../lib/notifications-mock";

export async function GET(request: Request) {
  const simulated = await applyMockApiSimulation(request.headers);
  if (simulated) {
    return simulated;
  }
  const search = new URL(request.url).searchParams;
  const categoryRaw = search.get("category");
  const severityRaw = search.get("severity");
  return mockApiJson(
    queryMockNotifications({
      category: categoryRaw && isCategory(categoryRaw) ? categoryRaw : undefined,
      severity: severityRaw && isSeverity(severityRaw) ? severityRaw : undefined,
    }),
  );
}
