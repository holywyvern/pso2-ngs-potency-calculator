import { useEquipment } from "../contexts/EquipmentContext";
import { Window } from "../design/Window";
import { displayNumber, numberFormatter } from "../utils/formatters";
import { ClassSelect } from "./ClassSelect";


export function PlayerStats() {
  const equipment = useEquipment();
  return (
    <Window className="align-between stats-window">
      <Window.Header>Player Stats</Window.Header>
      <Window.Body>
        <ClassSelect />
        <div className="info">
          <div className="system">HP</div>
          <div>{equipment.hp}</div>
          <div className="system">Attack</div>
          <div>{equipment.attack}</div>
          <div className="system">PP</div>
          <div>{equipment.pp}</div>
          <div className="system">Defense</div>
          <div>{equipment.defense}</div>
          <div className="system">Damage Adj.</div>
          <div>{displayNumber(equipment.floor)}%</div>
          <div>~</div>
          <div>100%</div>
          <div className="system">Damage Resist</div>
          <div>{displayNumber(equipment.dmgRes)}%</div>
        </div>
        <div className="stats">
          <div className="system">Weapon Up</div>
          <div className="flex align-between">
            <div className="pair">
              <img src="melee.png" />
              <div className="number">
                {numberFormatter.format(
                  displayNumber((equipment.melee - 1) * 100)
                )}
                %
              </div>
            </div>
            <div className="pair">
              <img src="ranged.png" />
              <div className="number">
                {numberFormatter.format(
                  displayNumber((equipment.ranged - 1) * 100)
                )}
                %
              </div>
            </div>
            <div className="pair">
              <img src="technique.png" />
              <div className="number">
                {numberFormatter.format(
                  displayNumber((equipment.technique - 1) * 100)
                )}
                %
              </div>
            </div>
          </div>
        </div>
      </Window.Body>
    </Window>
  );
}
