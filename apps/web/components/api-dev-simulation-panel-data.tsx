import { readApiDevSimulation } from "../lib/api-dev-simulation-server";
import { ApiDevSimulationPanel } from "./api-dev-simulation-panel";

export async function ApiDevSimulationPanelData() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }
  const initial = await readApiDevSimulation();
  return <ApiDevSimulationPanel initial={initial} />;
}
