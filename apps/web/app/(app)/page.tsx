import { ApiStatusBanner } from "../../components/api-status-banner";
import { DashboardOverview } from "../../components/dashboard-overview";

export default function AppHomePage() {
  return (
    <>
      <ApiStatusBanner />
      <DashboardOverview />
    </>
  );
}
