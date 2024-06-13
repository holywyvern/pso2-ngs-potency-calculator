import { AUGMENTS } from "../data/augments";

import { AUGMENT_SLOTS } from "./config";

export function findAugments(names: string[]) {
  const augments = AUGMENTS.filter((i) => names.includes(i.name));
  const ids = augments.map((i) => AUGMENTS.indexOf(i));
  while (ids.length < AUGMENT_SLOTS) {
    ids.push(-1);
  }
  return ids;
}
