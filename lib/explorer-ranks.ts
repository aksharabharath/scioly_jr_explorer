/**
 * Display-only Explorer rank labels. Levels and XP thresholds stay in
 * lib/gamification.ts. This does not change award math.
 */

export function explorerRankLabel(level: number): string {
  if (level <= 2) {
    return "Field notebook";
  }
  if (level <= 4) {
    return "Site scout";
  }
  if (level <= 6) {
    return "Lab investigator";
  }
  if (level <= 8) {
    return "Expedition lead";
  }
  return "Senior explorer";
}
