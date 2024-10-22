export type Element = "fire" | "ice" | "lightning" | "wind" | "light" | "dark";

export class Weapon {
  name: string;
  attack: number;
  element?: Element;
  rarity: number;
  floor: number;

  constructor({
    name,
    attack,
    element,
    rarity,
    floor,
  }: Partial<Weapon> & { name: string }) {
    this.name = name;
    this.attack = attack || 0;
    this.element = element;
    this.rarity = rarity || 1;
    this.floor = floor || 50;
  }

  get melee() {
    return 0;
  }

  get dmgRes() {
    return 0;
  }

  get ranged() {
    return 0;
  }

  get technique() {
    return 0;
  }

  get hp() {
    return 0;
  }

  get pp() {
    return 0;
  }

  get defense() {
    return 0;
  }
}

export const WEAPON_TYPES = [
  "sword",
  "wire",
  "spear",
  "knuckles",
  "saber",
  "daggers",
  "rifle",
  "launcher",
  "guns",
  "rod",
  "talis",
  "wand",
  "katana",
  "bow",
  "boots",
  "blades",
  "harmonizer",
  "gunblade",
] as const;

export type WeaponType =
  | "sword"
  | "wire"
  | "spear"
  | "knuckles"
  | "saber"
  | "daggers"
  | "rifle"
  | "launcher"
  | "guns"
  | "rod"
  | "talis"
  | "wand"
  | "katana"
  | "bow"
  | "boots"
  | "blades"
  | "harmonizer"
  | "gunblade";

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

type Props = Partial<Omit<WeaponSeries, WeaponType>> & {
  name: string;
  only?: WeaponType[];
};

export class WeaponSeries {
  name: string;
  attack: number;
  sword: boolean;
  wire: boolean;
  spear: boolean;
  knuckles: boolean;
  saber: boolean;
  daggers: boolean;
  rifle: boolean;
  launcher: boolean;
  guns: boolean;
  rod: boolean;
  talis: boolean;
  wand: boolean;
  katana: boolean;
  bow: boolean;
  boots: boolean;
  blades: boolean;
  harmonizer: boolean;
  gunblade: boolean;
  element?: Element;
  rarity: number;
  floor: number;

  constructor({ name, attack, element, only, rarity, floor }: Props) {
    this.name = name;
    this.attack = attack || 0;
    this.sword = !only || only.includes("sword");
    this.wire = !only || only.includes("wire");
    this.spear = !only || only.includes("spear");
    this.knuckles = !only || only.includes("knuckles");
    this.saber = !only || only.includes("saber");
    this.daggers = !only || only.includes("daggers");
    this.rifle = !only || only.includes("rifle");
    this.launcher = !only || only.includes("launcher");
    this.guns = !only || only.includes("guns");
    this.rod = !only || only.includes("rod");
    this.talis = !only || only.includes("talis");
    this.wand = !only || only.includes("wand");
    this.katana = !only || only.includes("katana");
    this.bow = !only || only.includes("bow");
    this.boots = !only || only.includes("boots");
    this.blades = !only || only.includes("blades");
    this.harmonizer = !only || only.includes("harmonizer");
    this.gunblade = !only || only.includes("gunblade");
    this.element = element;
    this.rarity = rarity || 1;
    this.floor = floor || 50;
  }

  get weapons(): Weapon[] {
    return WEAPON_TYPES.map((type) => {
      if (this[type]) {
        const { name, ...data } = this;
        return new Weapon({
          name: `${name} ${type == "guns" ? "Machine Guns" : capitalize(type)}`,
          ...data,
        });
      }
      return null;
    }).filter(Boolean) as Weapon[];
  }
}

export const WEAPON_SERIES: WeaponSeries[] = (
  [
    { name: "Duo Selio", attack: 1197, rarity: 11 },
    { name: "Wingard", attack: 1176, rarity: 11 },
    { name: "Exelio", attack: 1154, rarity: 11 },
    { name: "Eredim", attack: 1153, rarity: 11 },
    {
      name: "Xover Laluz Re-L",
      attack: 1134,
      rarity: 10,
      only: ["sword", "daggers", "saber", "katana", "blades"],
    },
    {
      name: "Xover Mezano Re-M",
      attack: 1134,
      rarity: 10,
      only: ["wire", "bow", "talis", "wand"],
    },
    {
      name: "Xover Envas Re-V",
      attack: 1134,
      rarity: 10,
      only: ["spear", "knuckles", "rod", "boots", "harmonizer"],
    },
    {
      name: "Xover Phoenix Re-A",
      attack: 1134,
      rarity: 10,
      only: ["rifle", "launcher", "guns", "gunblade"],
    },
    { name: "Reyaar", attack: 1131, rarity: 10 },
    { name: "Flugelgard", attack: 1127, rarity: 10 },
  ] satisfies Props[]
).map((i) => new WeaponSeries(i));

export const WEAPONS = WEAPON_SERIES.reduce(
  (weapons, series) => [...weapons, ...series.weapons],
  [] as Weapon[]
);
