import {
  CONSOLE_NAV_GROUP_ORDER,
  CONSOLE_NAV_ITEMS,
  type ConsoleNavGroup,
  type ConsoleNavItem,
} from "../components/console-nav-items";

export function normalizeSearchQuery(s: string): string {
  return s.trim().toLowerCase();
}

export function matchesNavQuery(item: ConsoleNavItem, query: string): boolean {
  if (!query) return true;
  const n = normalizeSearchQuery(query);
  const hay = normalizeSearchQuery(`${item.label} ${item.keywords}`);
  return hay.includes(n);
}

export function filterNavItemsBySearch(
  items: readonly ConsoleNavItem[],
  query: string,
): ConsoleNavItem[] {
  return items.filter((item) => matchesNavQuery(item, query));
}

export function groupNavItems(
  items: readonly ConsoleNavItem[],
  groupOrder: readonly ConsoleNavGroup[] = CONSOLE_NAV_GROUP_ORDER,
): Map<ConsoleNavGroup, ConsoleNavItem[]> {
  const map = new Map<ConsoleNavGroup, ConsoleNavItem[]>();
  for (const group of groupOrder) {
    map.set(group, []);
  }
  for (const item of items) {
    map.get(item.group)?.push(item);
  }
  return map;
}

export function filterNavItemsByGroup(
  query: string,
  items: readonly ConsoleNavItem[] = CONSOLE_NAV_ITEMS,
  groupOrder: readonly ConsoleNavGroup[] = CONSOLE_NAV_GROUP_ORDER,
): Map<ConsoleNavGroup, ConsoleNavItem[]> {
  const filtered = filterNavItemsBySearch(items, query);
  const map = new Map<ConsoleNavGroup, ConsoleNavItem[]>();
  for (const group of groupOrder) {
    map.set(group, []);
  }
  for (const item of filtered) {
    map.get(item.group)?.push(item);
  }
  return map;
}

export function countNavMatches(grouped: Map<ConsoleNavGroup, ConsoleNavItem[]>): number {
  return Array.from(grouped.values()).reduce((sum, items) => sum + items.length, 0);
}

export function buildShortcutMap(
  items: readonly ConsoleNavItem[],
): ReadonlyMap<string, ConsoleNavItem> {
  return new Map(
    items.flatMap((item) => (item.shortcutKey ? [[item.shortcutKey, item] as const] : [])),
  );
}

export function isPaletteToggleShortcut(e: Pick<KeyboardEvent, "key" | "metaKey" | "ctrlKey">): boolean {
  return (e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K");
}

export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}
