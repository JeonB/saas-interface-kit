"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  API_DEV_SIMULATION_COOKIE,
  type ApiDevSimulation,
  serializeApiDevSimulation,
} from "../../lib/api-dev-simulation";

export async function setApiDevSimulationAction(simulation: ApiDevSimulation): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(API_DEV_SIMULATION_COOKIE, serializeApiDevSimulation(simulation), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });
  // Simulation now affects every console data accessor, so refresh the whole console subtree.
  revalidatePath("/console", "layout");
}
