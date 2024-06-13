import { useClipboard } from "../contexts/ClipboardContext";
import { useEquipment } from "../contexts/EquipmentContext";
import { Window } from "../design/Window";
import { AUGMENT_SLOTS } from "../utils/config";
import { ArmorMenu } from "./ArmorMenu";
import { ArmorSelect } from "./ArmorSelect";
import { AugmentSelect } from "./AugmentSelect";
import { EquipStats } from "./EquipStats";
import { WeaponMenu } from "./WeaponMenu";
import { WeaponSelect } from "./WeaponSelect";

const TEXTS = ["Weapon", "Armor 1", "Armor 2", "Armor 3"];

const AUGMENT_INDEXES = new Array(AUGMENT_SLOTS).fill(null).map((_, i) => i);

export function EquipWindow({ index }: { index: number }) {
  const { equipment } = useEquipment();
  const clipboard = useClipboard();
  const item = equipment[index];
  const pasteAugments = () => {
    if (!clipboard.augments) return;

    item.augmentIds = clipboard.augments;
  };
  const copyAugments = () => {
    clipboard.copyAugments(item.augmentIds);
  };
  return (
    <Window>
      <Window.Header>{TEXTS[index]}</Window.Header>
      <Window.Body>
        {item.weapon ? (
          <WeaponSelect index={index} />
        ) : (
          <ArmorSelect index={index} />
        )}
        <hr />
        <EquipStats index={index} />
        <hr />
        <div className="augments">
          {AUGMENT_INDEXES.map((i) => (
            <AugmentSelect
              key={i}
              equip={index}
              index={i}
              disabled={!item.equip}
            />
          ))}
        </div>
        <hr />
        <div className="flex end">
          {item.weapon ? (
            <WeaponMenu index={index} />
          ) : (
            <ArmorMenu index={index} />
          )}
          <div />
          <button className="btn" type="button" onClick={copyAugments}>
            Copy Augments
          </button>
          <button
            disabled={!clipboard.augments}
            onClick={pasteAugments}
            className="btn"
            type="button"
          >
            Paste Augments
          </button>
        </div>
      </Window.Body>
    </Window>
  );
}
