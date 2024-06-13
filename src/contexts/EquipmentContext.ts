import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"
import { CLASSES } from "../data/classes";
import { round } from "../utils/math";
import { Weapon, WEAPONS } from "../data/weapon_series";
import { ARMORS } from "../data/armors";
import { AUGMENTS } from "../data/augments";
import { AUGMENT_SLOTS } from "../utils/config";

type State<T> = [T, Dispatch<SetStateAction<T>>];

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

export class Equipment {
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

export const EquipmentContext = createContext<Equipment | null>(null);

export function useEquipment() {
  return useContext(EquipmentContext)!;
}


export function useEquipmentState() {
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