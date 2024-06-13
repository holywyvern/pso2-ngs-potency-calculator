import { useEquipment } from "../contexts/EquipmentContext";
import { CLASSES } from "../data/classes";

export function HpAddOn({ index }: { index: number }) {
  const equipment = useEquipment();
  return (
    <>
      <div>HP Up ({CLASSES[index].name.slice(0, 2).toUpperCase()}) Level</div>
      <input
        type="number"
        min={0}
        max={20}
        step={1}
        value={equipment._hp[0][index]}
        onChange={(e) => {
          const hp = [...equipment._hp[0]];
          hp[index] = Math.floor(e.target.valueAsNumber);
          equipment.hpAddOn(hp);
        }}
      />
    </>
  );
}
