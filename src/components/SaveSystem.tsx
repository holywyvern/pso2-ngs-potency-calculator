import { useEffect } from "react";
import { useEquipment } from "../contexts/EquipmentContext";

const params = new URLSearchParams(location.search);

export function SaveSystem() {
  const equipment = useEquipment();
  useEffect(() => {
    history.replaceState({}, "", `?equip=${equipment.saveString}`);
  }, [equipment.saveString]);
  useEffect(() => {
    const save = params.get("equip");
    if (save) {
      equipment.saveString = save;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return null;
}
