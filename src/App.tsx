import {
  useState,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
} from "react";

import Select, { components } from "react-select";

import "./App.css";

import { Weapon, WEAPONS } from "./data/weapon_series";
import { ARMORS } from "./data/armors";
import { AUGMENTS } from "./data/augments";
import { CLASSES } from "./data/classes";

const { Option, SingleValue } = components;

type State<T> = [T, Dispatch<SetStateAction<T>>];

const AUGMENT_SLOTS = 7;
const ROUNDING = 10000;
const DISPLAYED_ROUNDING = 10;

function round(num: number) {
  return Math.floor(num * ROUNDING) / ROUNDING;
}

function showNumber(num: number) {
  return Math.floor(num * DISPLAYED_ROUNDING) / DISPLAYED_ROUNDING;
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

  get attack() {
    return this.equip?.attack || 0;
  }

  get defense() {
    return this.equip?.defense || 0;
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

  get floor() {
    return this.augments.reduce(
      (floor, a) => (floor * (100 + a.floor)) / 100,
      1
    );
  }

  get dmgRes() {
    if (!this.equip) return 0;

    const base = this.equip.dmgRes || 0;
    return this.augments.reduce(
      (i, a) => i + ((100 - i) * a.dmgRes) / 100,
      base
    );
  }

  get saveData() {
    return {
      item: this.equip?.name || "",
      augments: this.augments.map((i) => i.name),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set saveData(value: any) {
    if (!value) return;

    const list = this.weapon ? WEAPONS : ARMORS;
    this.equipId = list.findIndex((i) => i.name === value?.item);
    const augments =
      value.augments?.map((name: string) =>
        AUGMENTS.findIndex((i) => i.name === name)
      ) || [];
    while (augments.length < AUGMENT_SLOTS) {
      augments.push(-1);
    }
    this.augmentIds = augments;
  }
}

class Equipment {
  _classId: State<number>;
  weapon: Item;
  armor1: Item;
  armor2: Item;
  armor3: Item;
  _pp: State<number>;
  _hp: State<number[]>;

  constructor(equipment: {
    classId: State<number>;
    weaponId: State<number>;
    armor1Id: State<number>;
    armor2Id: State<number>;
    armor3Id: State<number>;
    weaponAugmentIds: State<number[]>;
    armor1AugmentIds: State<number[]>;
    armor2AugmentIds: State<number[]>;
    armor3AugmentIds: State<number[]>;
    hp: State<number[]>;
    pp: State<number>;
  }) {
    this._classId = equipment.classId;
    this.weapon = new Item(
      equipment.weaponId,
      equipment.weaponAugmentIds,
      true
    );
    this.armor1 = new Item(equipment.armor1Id, equipment.armor1AugmentIds);
    this.armor2 = new Item(equipment.armor2Id, equipment.armor2AugmentIds);
    this.armor3 = new Item(equipment.armor3Id, equipment.armor3AugmentIds);
    this._hp = equipment.hp;
    this._pp = equipment.pp;
  }

  get classId() {
    return this._classId[0];
  }

  set classId(value: number) {
    this._classId[1](value);
  }

  get floor() {
    if (!this.weapon.equip) return 0;

    return this.equipment.reduce(
      (floor, e) => floor * e.floor,
      (this.weapon.equip as Weapon).floor
    );
  }

  get dmgRes() {
    return this.equipment.reduce((i, a) => i + ((100 - i) * a.dmgRes) / 100, 0);
  }

  get class() {
    return CLASSES[this.classId];
  }

  get armors() {
    return [this.armor1, this.armor2, this.armor3];
  }

  get equipment() {
    return [this.weapon, ...this.armors];
  }

  get attack() {
    return this.class.attack + this.weapon.attack;
  }

  get defense() {
    return this.equipment.reduce((i, e) => i + e.defense, this.class.defense);
  }

  get hp() {
    return (
      this.equipment.reduce((i, e) => i + e.hp, this.class.hp) +
      this._hp[0].reduce((i, v) => i + v, 0)
    );
  }

  hpAddOn(value: number[]) {
    this._hp[1](value);
  }

  get pp() {
    return (
      this.equipment.reduce((i, e) => i + e.pp, this.class.pp) + this._pp[0]
    );
  }

  ppAddOn(value: number) {
    this._pp[1](value);
  }

  get melee() {
    return round(this.equipment.reduce((i, e) => i * e.melee, 1));
  }

  get ranged() {
    return round(this.equipment.reduce((i, e) => i * e.ranged, 1));
  }

  get technique() {
    return round(this.equipment.reduce((i, e) => i * e.technique, 1));
  }

  get saveString() {
    const data = {
      class: this.classId,
      weapon: this.weapon.saveData,
      armor1: this.armor1.saveData,
      armor2: this.armor2.saveData,
      armor3: this.armor3.saveData,
      pp: this._pp[0],
      hp: this._hp[0],
    };
    return encodeURIComponent(btoa(JSON.stringify(data)));
  }

  set saveString(value: string) {
    try {
      const data = JSON.parse(atob(decodeURIComponent(value)));
      this.classId = data.class || 0;
      this.weapon.saveData = data.weapon;
      this.armor1.saveData = data.armor1;
      this.armor2.saveData = data.armor2;
      this.armor3.saveData = data.armor3;
      this.ppAddOn(data.pp || 0);
      const hp = data.hp || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      while (hp.length < CLASSES.length) {
        hp.push(0);
      }
      this.hpAddOn(hp);
    } catch (error) {
      console.error(error);
    }
  }

  get saveURL() {
    return `${window.location.href.split("?")[0]}?save=${this.saveString}`;
  }
}

function useEquipmentState() {
  const classId = useState(0);
  const weaponId = useState(-1);
  const armor1Id = useState(-1);
  const armor2Id = useState(-1);
  const armor3Id = useState(-1);
  const weaponAugmentIds = useState(() => [-1, -1, -1, -1, -1, -1, -1]);
  const armor1AugmentIds = useState(() => [-1, -1, -1, -1, -1, -1, -1]);
  const armor2AugmentIds = useState(() => [-1, -1, -1, -1, -1, -1, -1]);
  const armor3AugmentIds = useState(() => [-1, -1, -1, -1, -1, -1, -1]);
  const pp = useState(0);
  const hp = useState(() => CLASSES.map(() => 0));
  return new Equipment({
    classId,
    weaponId,
    armor1Id,
    armor2Id,
    armor3Id,
    weaponAugmentIds,
    armor1AugmentIds,
    armor2AugmentIds,
    armor3AugmentIds,
    hp,
    pp,
  });
}

const EquipmentContext = createContext<Equipment | null>(null);

export function useEquipment() {
  return useContext(EquipmentContext)!;
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

const WEAPON_OPTIONS = [
  { label: "(No Weapon)", value: -1 },
  ...WEAPONS.map((weapon, value) => ({ label: weapon.name, value })),
];

function WeaponSelect({ index }: { index: number }) {
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

const AUGMENT_INDEXES = new Array(AUGMENT_SLOTS).fill(null).map((_, i) => i);

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
      className="select"
      classNamePrefix="ngs-select"
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
            {numberFormatter.format(showNumber((item.melee - 1) * 100))}%
          </div>
        </div>
        <div className="pair">
          <img src="ranged.png" />
          <div className="number">
            {numberFormatter.format(showNumber((item.ranged - 1) * 100))}%
          </div>
        </div>
        <div className="pair">
          <img src="technique.png" />
          <div className="number">
            {numberFormatter.format(showNumber((item.technique - 1) * 100))}%
          </div>
        </div>
      </div>
      <div className="system">Ailment Resist.</div>
      <div></div>
    </div>
  );
}

const TEXTS = ["Weapon", "Armor 1", "Armor 2", "Armor 3"];

function WeaponMenu({ index }: { index: number }) {
  return (
    <>
      <button disabled type="button" className="btn">
        Ex Combos...
      </button>
    </>
  );
}

const MAX_POTENCY_BUILD: string[] = [
  "Anaddi Deft Parfait",
  "Lux Halphinale",
  "Glan Gigas Maste",
  "Gladia Soul",
  "Mega Triyal",
  "Guaro Triyal",
  "Wardro Triyal"
]

const FLOOR_BUILD: string[] = [
  "Anaddi Deft Parfait",
  "Lux Halphinale",
  "Glan Gigas Maste",
  "Gladia Soul",
  "Mega Triyal",
  "Grand Dread Keeper",
  "Highkvar Domina"
]

const BUDGET_BUILD: string[] = [
  "Mega Triyal",
  "Wardro Triyal",
  "Halphinale LC",
  "Gigas Maste LC",
  "Gladia Soul LC",
  "Grand Dread Keeper LC",
  "Highkvar Domina LC"
]

function findAugments(names: string[]) {
  const augments = AUGMENTS.filter(i => names.includes(i.name));
  const ids = augments.map(i => AUGMENTS.indexOf(i));
  while (ids.length < AUGMENT_SLOTS) {
    ids.push(-1);
  }
  return ids;
}

function ArmorMenu({ index }: { index: number }) {
  const { equipment } = useEquipment()
  const item = equipment[index];

  const setMaxPotency = () => {
    item.augmentIds = findAugments(MAX_POTENCY_BUILD)
  }
  const setFloor = () => {
    item.augmentIds = findAugments(FLOOR_BUILD)
  }
  const setBudget = () => {
    item.augmentIds = findAugments(BUDGET_BUILD)
  }

  return (
    <>
      <button onClick={setMaxPotency} type="button" className="btn">
        Max Potency Build
      </button>
      <button onClick={setFloor} type="button" className="btn">
        Floor Build
      </button>
      <button onClick={setBudget} type="button" className="btn">
        Budget Build
      </button>
    </>
  );
}

function EquipWindow({ index }: { index: number }) {
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
    <form onSubmit={(e) => e.preventDefault()} className="window equip">
      <div className="header">{TEXTS[index]}</div>
      <div className="body">
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
      </div>
    </form>
  );
}

function PlayerStats() {
  const equipment = useEquipment();
  return (
    <div className="window align-between stats-window">
      <div className="header">Player Stats</div>
      <div className="body">
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
          <div>{showNumber(equipment.floor)}%</div>
          <div>~</div>
          <div>100%</div>
          <div className="system">Damage Resist</div>
          <div>{showNumber(equipment.dmgRes)}%</div>
        </div>
        <div className="stats">
          <div className="system">Weapon Up</div>
          <div className="flex align-between">
            <div className="pair">
              <img src="melee.png" />
              <div className="number">
                {numberFormatter.format(
                  showNumber((equipment.melee - 1) * 100)
                )}
                %
              </div>
            </div>
            <div className="pair">
              <img src="ranged.png" />
              <div className="number">
                {numberFormatter.format(
                  showNumber((equipment.ranged - 1) * 100)
                )}
                %
              </div>
            </div>
            <div className="pair">
              <img src="technique.png" />
              <div className="number">
                {numberFormatter.format(
                  showNumber((equipment.technique - 1) * 100)
                )}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const params = new URLSearchParams(location.search);

function SaveSystem() {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconOption = (props: any) => {
  return (
    <Option {...props}>
      <img src={props.data.icon} />
      {props.data.label}
    </Option>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconValue = (props: any) => {
  return (
    <SingleValue {...props}>
      <img src={props.data.icon} />
      {props.data.label}
    </SingleValue>
  );
};

const CLASS_OPTIONS = CLASSES.map(({ name }, value) => ({
  label: name,
  icon: `${name.toLocaleLowerCase()}.png`,
  value,
}));

function ClassSelect() {
  const equipment = useEquipment();
  return (
    <Select
      className="select"
      classNamePrefix="ngs-select"
      options={CLASS_OPTIONS}
      value={CLASS_OPTIONS[equipment.classId]}
      onChange={(value) => {
        equipment.classId = value?.value || 0;
      }}
      components={{ Option: IconOption, SingleValue: IconValue }}
    />
  );
}

function HpAddOn({ index }: { index: number }) {
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

function PpAddOn() {
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

function AddOnsWindow() {
  return (
    <div className="window">
      <div className="header">Add-On Setup</div>
      <div className="body add-ons">
        {CLASSES.map((_, index) => (
          <HpAddOn key={index} index={index} />
        ))}
        <div />
        <div />
        <PpAddOn />
      </div>
    </div>
  );
}

interface ClipboardState {
  augments: number[] | null;
  copyAugments(augments: number[]): void;
}

function useClipboardState() {
  const [augments, setAugments] = useState<number[] | null>(null);
  const copyAugments = (augments: number[]) => {
    setAugments(augments);
  };
  return { augments, copyAugments } satisfies ClipboardState;
}

const ClipboardContext = createContext<ClipboardState | null>(null);

function useClipboard() {
  return useContext(ClipboardContext)!;
}

function App() {
  const clipboard = useClipboardState();
  const equipment = useEquipmentState();

  return (
    <EquipmentContext.Provider value={equipment}>
      <ClipboardContext.Provider value={clipboard}>
        <div className="flex stats-window">
          <PlayerStats />
          <AddOnsWindow />
        </div>
        <SaveSystem />
        <div className="ui">
          <EquipWindow index={0} />
          <EquipWindow index={1} />
          <EquipWindow index={2} />
          <EquipWindow index={3} />
        </div>
        <footer>
          All information comes from the{" "}
          <a href="https://pso2ngs.wiki/wiki/Main_Page">PSO2 NGS Wiki</a>.
        </footer>
      </ClipboardContext.Provider>
    </EquipmentContext.Provider>
  );
}

export default App;
