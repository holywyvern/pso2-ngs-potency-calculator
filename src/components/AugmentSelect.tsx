import Select from "react-select";

import { useEquipment } from "../contexts/EquipmentContext";
import { AUGMENTS } from "../data/augments";

const AUGMENT_OPTIONS = [
  { label: "(Empty)", value: -1 },
  ...AUGMENTS.map((i, value) => ({
    label: i.name,
    value,
  })),
];

export function AugmentSelect({
  equip,
  index,
  disabled,
}: {
  equip: number;
  index: number;
  disabled: boolean;
}) {
  const { equipment } = useEquipment();
  const item = equipment[equip];
  const id = item.augmentIds[index] + 1;
  return (
    <Select
      className="select"
      classNamePrefix="ngs-select"
      isDisabled={disabled}
      options={AUGMENT_OPTIONS}
      value={AUGMENT_OPTIONS[id]}
      onChange={(i) => {
        const ids = [...item.augmentIds];
        ids[index] = i?.value || 0;
        item.augmentIds = ids;
      }}
    />
  );
}