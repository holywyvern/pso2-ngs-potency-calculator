export class Armor {
  name: string;
  hp: number;
  pp: number;
  damageRes: number;
  burn: number;
  freeze: number;
  shock: number;
  blind: number;
  panic: number;
  poison: number;
  stun: number;
  defense: number;
  melee: number;
  ranged: number;
  technique: number;
  rarity: number;

  constructor({
    name,
    hp,
    pp,
    damageRes,
    defense,
    melee,
    ranged,
    technique,
    rarity,
    burn,
    freeze,
    shock,
    blind,
    panic,
    poison,
    stun,
  }: Partial<Armor> & { name: string }) {
    this.name = name;
    this.hp = hp || 0;
    this.pp = pp || 0;
    this.damageRes = damageRes || 0;
    this.burn = burn || 0;
    this.freeze = freeze || 0;
    this.shock = shock || 0;
    this.blind = blind || 0;
    this.panic = panic || 0;
    this.poison = poison || 0;
    this.stun = stun || 0;
    this.defense = defense || 0;
    this.melee = melee || 0;
    this.ranged = ranged || 0;
    this.technique = technique || 0;
    this.rarity = rarity || 1;
  }
}

export const ARMORS: Armor[] = [
  {
    name: "Einea Armor",
    defense: 135,
    hp: 20,
    pp: 2,
    melee: 5.5,
    ranged: 5.5,
    technique: 5.5,
    ice: 20,
    rarity: 9,
  },
  {
    name: "Einea Armor: Vio",
    defense: 135,
    hp: 0,
    pp: 6,
    melee: 5.5,
    ranged: 5.5,
    technique: 5.5,
    ice: 20,
    rarity: 9,
  },
  {
    name: "Einea Armor: Vida",
    defense: 135,
    hp: 30,
    pp: 0,
    melee: 5.5,
    ranged: 5.5,
    technique: 5.5,
    ice: 20,
    rarity: 9,
  },
  {
    name: "Einea Armor: Arga",
    defense: 136,
    hp: 35,
    pp: 7,
    melee: 5.5,
    ranged: 5.5,
    technique: 0,
    ice: 20,
    rarity: 9,
    damageRes: 1,
  },
  {
    name: "Einea Armor: Belta",
    defense: 136,
    hp: 35,
    pp: 7,
    melee: 0,
    ranged: 5.5,
    technique: 5.5,
    ice: 20,
    rarity: 9,
    damageRes: 1,
  },
  {
    name: "Einea Armor: Sheza",
    defense: 136,
    hp: 35,
    pp: 7,
    melee: 5.5,
    ranged: 0,
    technique: 5.5,
    ice: 20,
    rarity: 9,
    damageRes: 1,
  },
].map((i) => new Armor(i));
