export const MAX_COMPARE = 3;
export const MIN_COMPARE = 2;

/** Toggle an id in the compare list; never exceeds MAX_COMPARE. */
export function toggleCompare(list: string[], id: string): string[] {
  if (list.includes(id)) return list.filter((x) => x !== id);
  if (list.length >= MAX_COMPARE) return list;
  return [...list, id];
}

export const canCompare = (list: string[]) => list.length >= MIN_COMPARE;
