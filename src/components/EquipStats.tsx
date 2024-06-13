import { useEquipment } from "../contexts/EquipmentContext";
import { displayNumber, numberFormatter } from "../utils/formatters";

export function EquipStats({ index }: { index: number }) {
  const { equipment } = useEquipment();
  const item = equipment[index];
  return (
    <div className="stats">
      {item.armor ? (
        <>
          <div className="system">Defense</div>
          <div>{item.equip?.defense || 0}</div>
        </>
      ) : null}
      <div className="system">Extra HP / PP</div>
      <div className="flex">
        HP<div className="number">{numberFormatter.format(item.hp)}</div>
        PP<div className="number">{numberFormatter.format(item.pp)}</div>
      </div>
      <div className="system">Weapon Up</div>
      <div className="flex">
        <div className="pair">
          <img src="melee.png" />
          <div className="number">
            {numberFormatter.format(displayNumber((item.melee - 1) * 100))}%
          </div>
        </div>
        <div className="pair">
          <img src="ranged.png" />
          <div className="number">
            {numberFormatter.format(displayNumber((item.ranged - 1) * 100))}%
          </div>
        </div>
        <div className="pair">
          <img src="technique.png" />
          <div className="number">
            {numberFormatter.format(displayNumber((item.technique - 1) * 100))}%
          </div>
        </div>
      </div>
      <div className="system">Ailment Resist.</div>
      <div></div>
    </div>
  );
}