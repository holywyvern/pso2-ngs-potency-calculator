import { useEquipment } from "../contexts/EquipmentContext";
import { Button } from "../design/Button";
import { findAugments } from "../utils/augments";

const MAX_POTENCY_BUILD: string[] = [
  "Anaddi Deft Parfait",
  "Lux Halphinale",
  "Glan Gigas Maste",
  "Gran Gladia Soul",
  "Giga Triyal",
  "Guaro Triyal",
  "Wardro Triyal",
];

const FLOOR_BUILD: string[] = [
  "Anaddi Deft Parfait",
  "Lux Halphinale",
  "Glan Gigas Maste",
  "Gran Gladia Soul",
  "Giga Triyal",
  "Grand Dread Keeper II",
  "Highstira Domina",
];

const BUDGET_BUILD: string[] = [
  "Mega Triyal",
  "Wardro Triyal",
  "Halphinale LC",
  "Gigas Maste LC",
  "Gladia Soul LC",
  "Grand Dread Keeper LC",
  "Highkvar Domina LC",
];

export function ArmorMenu({ index }: { index: number }) {
  const { equipment } = useEquipment();
  const item = equipment[index];

  const setMaxPotency = () => {
    item.augmentIds = findAugments(MAX_POTENCY_BUILD);
  };
  const setFloor = () => {
    item.augmentIds = findAugments(FLOOR_BUILD);
  };
  const setBudget = () => {
    item.augmentIds = findAugments(BUDGET_BUILD);
  };

  return (
    <>
      <Button onClick={setMaxPotency}>
        Max Potency Build
      </Button>
      <Button onClick={setFloor}>
        Floor Build
      </Button>
      <Button onClick={setBudget}>
        Budget Build
      </Button>
    </>
  );
}