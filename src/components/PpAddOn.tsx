import { useEquipment } from "../contexts/EquipmentContext";

export function PpAddOn() {
  const equipment = useEquipment();
  return (
    <>
      <div>Pp Up (WA) Level</div>
      <input
        type="number"
        min={0}
        max={20}
        step={1}
        value={equipment._pp[0]}
        onChange={(e) => {
          equipment.ppAddOn(Math.floor(e.target.valueAsNumber));
        }}
      />
    </>
  );
}
