import { cookies } from "next/headers";
import {
  API_DEV_SIMULATION_COOKIE,
  type ApiDevSimulation,
  parseApiDevSimulation,
} from "./api-dev-simulation";

export async function readApiDevSimulation(): Promise<ApiDevSimulation> {
  const cookieStore = await cookies();
  return parseApiDevSimulation(cookieStore.get(API_DEV_SIMULATION_COOKIE)?.value);
}
