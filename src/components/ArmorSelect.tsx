import Select from "react-select";

import { useEquipment } from "../contexts/EquipmentContext";
import { ARMORS } from "../data/armors";

const ARMOR_OPTIONS = [
  { label: "(No Armor)", value: -1 },
  ...ARMORS.map((armor, value) => ({ label: armor.name, value })),
];

export function ArmorSelect({ index }: { index: number }) {
  const { equipment } = useEquipment();
  const item = equipment[index];
  return (
    <Select
      className="select"
      classNamePrefix="ngs-select"
      options={ARMOR_OPTIONS}
      value={ARMOR_OPTIONS[item.equipId + 1]}
      onChange={(i) => {
        item.equipId = i?.value || 0;
      }}
    />
  );
}