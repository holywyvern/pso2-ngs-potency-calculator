import Select from "react-select";

import { useEquipment } from "../contexts/EquipmentContext";
import { WEAPONS } from "../data/weapon_series";

const WEAPON_OPTIONS = [
  { label: "(No Weapon)", value: -1 },
  ...WEAPONS.map((weapon, value) => ({ label: weapon.name, value })),
];

export function WeaponSelect({ index }: { index: number }) {
  const { equipment } = useEquipment();
  const item = equipment[index];
  return (
    <Select
      className="select"
      classNamePrefix="ngs-select"
      options={WEAPON_OPTIONS}
      value={WEAPON_OPTIONS[item.equipId + 1]}
      onChange={(i) => {
        item.equipId = i?.value || 0;
      }}
    />
  );
}