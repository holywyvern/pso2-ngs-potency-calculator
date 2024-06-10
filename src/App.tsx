import {
  useState,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from "react";

import Select from "react-select";

import "./App.css";

import { WEAPONS } from "./data/weapon_series";
import { ARMORS } from "./data/armors";
import { AUGMENTS } from "./data/augments";

type State<T> = [T, Dispatch<SetStateAction<T>>];

const ROUNDING = 10000

function round(num: number) {
  return Math.floor(num * ROUNDING) / ROUNDING;
}

class Item {
  _equipId: State<number>;
  _augmentIds: State<number[]>;
  weapon: boolean;

  constructor(equip: State<number>, augments: State<number[]>, weapon = false) {
    this._equipId = equip;
    this._augmentIds = augments;
    this.weapon = weapon;
  }

  get armor() {
    return !this.weapon;
  }

  get equipId() {
    return this._equipId[0];
  }

  set equipId(value: number) {
    this._equipId[1](value);
  }

  get augmentIds() {
    return this._augmentIds[0];
  }

  set augmentIds(value: number[]) {
    this._augmentIds[1]([...value]);
  }

  get augments() {
    return this.augmentIds.map((i) => AUGMENTS[i]).filter(Boolean);
  }

  get equip() {
    return this.weapon ? WEAPONS[this.equipId] : ARMORS[this.equipId];
  }

  get hp() {
    return this.augments.reduce((i, a) => i + a.hp, this.equip?.hp || 0);
  }

  get pp() {
    return this.augments.reduce((i, a) => i + a.pp, this.equip?.pp || 0);
  }

  get melee() {
    if (!this.equip) return 1;

    return round(
      this.augments.reduce(
        (total, augment) => (total * (100 + augment.melee)) / 100,
        (100 + this.equip?.melee || 0) / 100
      )
    );
  }

  get ranged() {
    if (!this.equip) return 1;

    return round(
      this.augments.reduce(
        (total, augment) => (total * (100 + augment.ranged)) / 100,
        (100 + this.equip?.ranged || 0) / 100
      )
    );
  }

  get technique() {
    if (!this.equip) return 1;

    return round(
      this.augments.reduce(
        (total, augment) => (total * (100 + augment.technique)) / 100,
        (100 + this.equip?.technique || 0) / 100
      )
    );
  }
}

class Equipment {
  weapon: Item;
  armor1: Item;
  armor2: Item;
  armor3: Item;

  constructor(equipment: {
    weaponId: State<number>;
    armor1Id: State<number>;
    armor2Id: State<number>;
    armor3Id: State<number>;
    weaponAugmentIds: State<number[]>;
    armor1AugmentIds: State<number[]>;
    armor2AugmentIds: State<number[]>;
    armor3AugmentIds: State<number[]>;
  }) {
    this.weapon = new Item(
      equipment.weaponId,
      equipment.weaponAugmentIds,
      true
    );
    this.armor1 = new Item(equipment.armor1Id, equipment.armor1AugmentIds);
    this.armor2 = new Item(equipment.armor2Id, equipment.armor2AugmentIds);
    this.armor3 = new Item(equipment.armor3Id, equipment.armor3AugmentIds);
  }

  get armors() {
    return [this.armor1, this.armor2, this.armor3];
  }

  get equipment() {
    return [this.weapon, ...this.armors];
  }

  get melee() {
    return round(this.equipment.reduce((i, e) => i * e.melee, 1));
  }

  get ranged() {
    return round(this.equipment.reduce((i, e) => i * e.ranged, 1));
  }

  get technique() {
    return round(this.equipment.reduce((i, e) => i * e.ranged, 1));
  }
}

function useEquipmentState() {
  const weaponId = useState(-1);
  const armor1Id = useState(-1);
  const armor2Id = useState(-1);
  const armor3Id = useState(-1);
  const weaponAugmentIds = useState(() => [-1, -1, -1, -1, -1, -1, -1]);
  const armor1AugmentIds = useState(() => [-1, -1, -1, -1, -1, -1, -1]);
  const armor2AugmentIds = useState(() => [-1, -1, -1, -1, -1, -1, -1]);
  const armor3AugmentIds = useState(() => [-1, -1, -1, -1, -1, -1, -1]);
  return new Equipment({
    weaponId,
    armor1Id,
    armor2Id,
    armor3Id,
    weaponAugmentIds,
    armor1AugmentIds,
    armor2AugmentIds,
    armor3AugmentIds,
  });
}

const Context = createContext<Equipment | null>(null);

export function useEquipment() {
  return useContext(Context)!;
}

const ARMOR_OPTIONS = [
  { label: "(No Armor)", value: -1 },
  ...ARMORS.map((armor, value) => ({ label: armor.name, value })),
];

function ArmorSelect({ index }: { index: number }) {
  const { equipment } = useEquipment();
  const item = equipment[index];
  return (
    <Select
      options={ARMOR_OPTIONS}
      value={ARMOR_OPTIONS[item.equipId + 1]}
      onChange={(i) => {
        item.equipId = i?.value || 0;
      }}
    />
  );
}

const WEAPON_OPTIONS = [
  { label: "(No Weapon)", value: -1 },
  ...WEAPONS.map((weapon, value) => ({ label: weapon.name, value })),
];

function WeaponSelect({ index }: { index: number }) {
  const { equipment } = useEquipment();
  const item = equipment[index];
  return (
    <Select
      options={WEAPON_OPTIONS}
      value={WEAPON_OPTIONS[item.equipId + 1]}
      onChange={(i) => {
        item.equipId = i?.value || 0;
      }}
    />
  );
}

const AUGMENT_INDEXES = [0, 1, 2, 3, 4, 5, 6];

const AUGMENT_OPTIONS = [
  { label: "(Empty)", value: -1 },
  ...AUGMENTS.map((i, value) => ({
    label: i.name,
    value,
  })),
];

function AugmentSelect({
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

const numberFormatter = Intl.NumberFormat("en-US", {
  signDisplay: "always",
});

function EquipStats({ index }: { index: number }) {
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
            {numberFormatter.format((item.melee - 1) * 100)}%
          </div>
        </div>
        <div className="pair">
          <img src="ranged.png" />
          <div className="number">
            {numberFormatter.format((item.ranged - 1) * 100)}%
          </div>
        </div>
        <div className="pair">
          <img src="technique.png" />
          <div className="number">
            {numberFormatter.format((item.technique - 1) * 100)}%
          </div>
        </div>
      </div>
      <div className="system">Ailment Resist.</div>
      <div></div>
    </div>
  );
}

function EquipWindow({ index }: { index: number }) {
  const { equipment } = useEquipment();
  const item = equipment[index];
  return (
    <form onSubmit={(e) => e.preventDefault()} className="equip">
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
    </form>
  );
}

function PlayerStats() {
  const equipment = useEquipment();
  return (
    <div className="stats">
      <div className="system">Weapon Up</div>
      <div className="flex">
        <div className="pair">
          <img src="melee.png" />
          <div className="number">
            {numberFormatter.format((equipment.melee - 1) * 100)}%
          </div>
        </div>
        <div className="pair">
          <img src="ranged.png" />
          <div className="number">
            {numberFormatter.format((equipment.ranged - 1) * 100)}%
          </div>
        </div>
        <div className="pair">
          <img src="technique.png" />
          <div className="number">
            {numberFormatter.format((equipment.technique - 1) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const equipment = useEquipmentState();

  return (
    <Context.Provider value={equipment}>
      <PlayerStats />
      <div className="ui">
        <EquipWindow index={0} />
        <EquipWindow index={1} />
        <EquipWindow index={2} />
        <EquipWindow index={3} />
      </div>
    </Context.Provider>
  );
}

export default App;
