import { Avatar } from "@repo/ui/avatar";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { getSession } from "../lib/session";
import { logoutAction } from "../app/actions/auth";
import { ThemeToggle } from "./ThemeToggle";

export async function AppProductHeader() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  return (
    <div className="ui:flex ui:flex-wrap ui:items-center ui:justify-between ui:gap-3">
      <div className="ui:min-w-0">
        <p className="ui:text-sm ui:font-semibold ui:text-text-primary">{session.orgName}</p>
        <p className="ui:truncate ui:text-xs ui:text-text-muted">
          {session.name} · {session.email} · 역할 {session.role}
        </p>
      </div>
      <div className="ui:flex ui:items-center ui:gap-2">
        <ThemeToggle />
        <Badge variant="success">세션</Badge>
        <Avatar fallback={session.name.slice(0, 2).toUpperCase()} size="sm" />
        <form action={logoutAction}>
          <Button name="logout" type="submit" variant="default">
            로그아웃
          </Button>
        </form>
      </div>
    </div>
  );
}
