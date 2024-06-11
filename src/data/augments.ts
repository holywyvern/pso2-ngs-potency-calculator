type Props = Partial<Augment> & { name: string };

export class Augment {
  name: string;
  bp: number;
  hp: number;
  pp: number;
  melee: number;
  ranged: number;
  technique: number;
  floor: number;
  dmgRes: number;
  burn: number;
  freeze: number;
  shock: number;
  blind: number;
  panic: number;
  poison: number;
  stun: number;

  constructor({
    name,
    bp,
    hp,
    pp,
    melee,
    ranged,
    technique,
    floor,
    dmgRes,
    burn,
    freeze,
    shock,
    blind,
    panic,
    poison,
    stun,
  }: Props) {
    this.name = name;
    this.bp = bp || 0;
    this.hp = hp || 0;
    this.pp = pp || 0;
    this.melee = melee || 0;
    this.ranged = ranged || 0;
    this.technique = technique || 0;
    this.floor = floor || 0;
    this.dmgRes = dmgRes || 0;
    this.burn = burn || 0;
    this.freeze = freeze || 0;
    this.shock = shock || 0;
    this.blind = blind || 0;
    this.panic = panic || 0;
    this.poison = poison || 0;
    this.stun = stun || 0;
  }
}

interface ExType {
  name: string;
  potency: number;
  floor: number;
}

interface ExMod {
  name: string;
  hp?: number;
  pp?: number;
  dmgRes?: number;
  downRes?: number;
}

const EX_TYPES: ExType[] = [
  { name: "Light Attack Protect", potency: 4.5, floor: 2 },
  { name: "Heavy Attack Protect", potency: 4.5, floor: 2 },
  { name: "Dazzle Camouflage", potency: 0, floor: 2 },
  { name: "Stealth Wall", potency: 4, floor: 2 },
  { name: "Risky Stance", potency: 4.5, floor: 2 },
  { name: "Patient Defense", potency: 4.5, floor: 2 },
  { name: "Endure Pain PB Boost", potency: 4.5, floor: 2 },
  { name: "Shortage PP Burn Up", potency: 4.5, floor: 2 },
  { name: "Hysterical Strength", potency: 4, floor: 2 },
  { name: "Gradual PP Gauge", potency: 4.5, floor: 2 },
  { name: "Fortune Sign", potency: 4.5, floor: 2 },
  { name: "Sign Shielding", potency: 4.5, floor: 2 },
  { name: "Enemy Field PP Gauge", potency: 4.5, floor: 2 },
  { name: "Enemy Down PP", potency: 4.5, floor: 2 },
  { name: "Tough Mind", potency: 4.5, floor: 2 },
  { name: "Fortitude", potency: 4.5, floor: 2 },
  { name: "Tri-Shield", potency: 4.5, floor: 2 },
  { name: "Tech Arms PP Suppress", potency: 4.5, floor: 2 },
  { name: "Just Frame Counter", potency: 4.5, floor: 2 },
  { name: "Gradual Pressing", potency: 4.5, floor: 2 },
  { name: "Lively HP Starlings", potency: 4, floor: 2 },
  { name: "Shortage HP Starling", potency: 4.5, floor: 2 },
];

const EX_MODS: ExMod[] = [
  { name: "H", hp: 25 },
  { name: "P", pp: 3 },
  { name: "X", hp: 15, pp: 2 },
  { name: "D", dmgRes: 1 },
  { name: "R", downRes: 5 },
];

interface AnaddiType {
  name: string;
  floor?: number;
  hp?: number;
  pp?: number;
  res?: number;
  dmgRes?: number;
}

const EXDI_TYPES = [
  { name: "Deft", floor: 3 },
  { name: "Gua", floor: 1.5, dmgRes: 2.5 },
  { name: "Sta", hp: 20, floor: 1.5 },
  { name: "Spi", pp: 6, floor: 1.5 },
  { name: "Staspi", hp: 10, pp: 1.5, floor: 1.5 },
  { name: "Ward", floor: 1.5, res: 20 },
] as AnaddiType[];

const ANADDI_TYPES = [
  { name: "Deft", floor: 4 },
  { name: "Gua", floor: 3, dmgRes: 2.5 },
  { name: "Sta", hp: 20, floor: 3 },
  { name: "Spi", pp: 6, floor: 3 },
  { name: "Staspi", hp: 10, pp: 3, floor: 3 },
  { name: "Ward", floor: 3, res: 20 },
] as AnaddiType[];

export const AUGMENTS: Augment[] = [
  ...EX_TYPES.reduce(
    (result, { name, potency, floor }) => [
      ...result,
      ...EX_MODS.map(({ hp, pp, dmgRes, downRes, ...mod }) => ({
        name: `EX ${name} ${mod.name}`,
        melee: potency,
        ranged: potency,
        technique: potency,
        hp,
        pp,
        floor,
        dmgRes,
        burn: downRes,
        freeze: downRes,
        shock: downRes,
        blind: downRes,
        panic: downRes,
        poison: downRes,
        stun: downRes,
      })),
    ],
    [] as Props[]
  ),
  ...ANADDI_TYPES.reduce(
    (result, { name, floor, hp, pp, res, dmgRes }) => [
      ...result,
      {
        name: `Anaddi ${name} Parfait`,
        melee: 5,
        ranged: 5,
        technique: 5,
        floor,
        hp,
        pp,
        burn: res,
        freeze: res,
        shock: res,
        panic: res,
        poison: res,
        stun: res,
        blind: res,
        dmgRes,
      },
      {
        name: `Anaddi ${name}melra`,
        melee: 5,
        ranged: 5,
        technique: 0,
        floor,
        hp,
        pp,
        burn: res,
        freeze: res,
        shock: res,
        panic: res,
        poison: res,
        stun: res,
        blind: res,
        dmgRes,
      },
      {
        name: `Anaddi ${name}meltech`,
        melee: 5,
        ranged: 0,
        technique: 5,
        floor,
        hp,
        pp,
        burn: res,
        freeze: res,
        shock: res,
        panic: res,
        poison: res,
        stun: res,
        blind: res,
        dmgRes,
      },
      {
        name: `Anaddi ${name}ratech`,
        melee: 0,
        ranged: 5,
        technique: 5,
        floor,
        hp,
        pp,
        burn: res,
        freeze: res,
        shock: res,
        panic: res,
        poison: res,
        stun: res,
        blind: res,
        dmgRes,
      },
    ],
    [] as Props[]
  ),

  ...EXDI_TYPES.reduce(
    (result, { name, floor, hp, pp, res, dmgRes }) => [
      ...result,
      {
        name: `Exdi ${name} Parfait`,
        melee: 4,
        ranged: 4,
        technique: 4,
        floor,
        hp,
        pp,
        burn: res,
        freeze: res,
        shock: res,
        panic: res,
        poison: res,
        stun: res,
        blind: res,
        dmgRes,
      },
      {
        name: `Exdi ${name}melra`,
        melee: 4,
        ranged: 4,
        technique: 0,
        floor,
        hp,
        pp,
        burn: res,
        freeze: res,
        shock: res,
        panic: res,
        poison: res,
        stun: res,
        blind: res,
        dmgRes,
      },
      {
        name: `Exdi ${name}meltech`,
        melee: 4,
        ranged: 0,
        technique: 4,
        floor,
        hp,
        pp,
        burn: res,
        freeze: res,
        shock: res,
        panic: res,
        poison: res,
        stun: res,
        blind: res,
        dmgRes,
      },
      {
        name: `Exdi ${name}ratech`,
        melee: 0,
        ranged: 4,
        technique: 4,
        floor,
        hp,
        pp,
        burn: res,
        freeze: res,
        shock: res,
        panic: res,
        poison: res,
        stun: res,
        blind: res,
        dmgRes,
      },
    ],
    [] as Props[]
  ),

  {
    name: "Grand Dread Keeper",
    melee: 2.5,
    ranged: 2.5,
    technique: 2.5,
    floor: 5,
    dmgRes: 1,
    hp: 15,
    pp: 3,
  },
  {
    name: "Grand Dread Keeper S",
    melee: 2.5,
    ranged: 2.5,
    technique: 2.5,
    floor: 5,
    dmgRes: 1,
    hp: 15,
    pp: 3,
  },
  {
    name: "Highael Domina",
    hp: 10,
    pp: 4,
    melee: 3,
    ranged: 3,
    technique: 3,
    floor: 2,
  },
  {
    name: "Highret Domina",
    hp: 30,
    melee: 3,
    ranged: 3,
    technique: 3,
    floor: 2.25,
  },
  {
    name: "Highkvar Domina",
    pp: 6,
    melee: 3,
    ranged: 3,
    technique: 3,
    floor: 2.5,
  },
  {
    name: "Highael Domina S",
    hp: 10,
    pp: 4,
    melee: 3,
    ranged: 3,
    technique: 3,
    floor: 2,
  },
  {
    name: "Highret Domina S",
    hp: 30,
    melee: 3,
    ranged: 3,
    technique: 3,
    floor: 2.25,
  },
  {
    name: "Highkvar Domina S",
    pp: 6,
    melee: 3,
    ranged: 3,
    technique: 3,
    floor: 2.5,
  },
  {
    name: "Gladia Soul",
    melee: 3.75,
    ranged: 3.75,
    technique: 3.75,
    hp: 20,
    pp: 6,
  },
  {
    name: "Gladia Soul S",
    melee: 3.75,
    ranged: 3.75,
    technique: 3.75,
    hp: 20,
    pp: 6,
  },
  { name: "Gigas Maste", melee: 3.5, ranged: 3.5, technique: 3.5, hp: 20 },
  { name: "Gigas Maste S", melee: 3.5, ranged: 3.5, technique: 3.5, hp: 20 },
  {
    name: "Glan Gigas Maste",
    melee: 4.75,
    ranged: 4.75,
    technique: 4.75,
    hp: 30,
  },
  {
    name: "Glan Gigas Maste S",
    melee: 4.75,
    ranged: 4.75,
    technique: 4.75,
    hp: 30,
  },
  { name: "Halphinale", melee: 4, ranged: 4, technique: 4, hp: 15, pp: 5 },
  { name: "Halphinale S", melee: 4, ranged: 4, technique: 4, hp: 15, pp: 5 },
  { name: "Lux Halphinale", melee: 5, ranged: 5, technique: 5, hp: 20, pp: 6 },
  {
    name: "Lux Halphinale S",
    melee: 5,
    ranged: 5,
    technique: 5,
    hp: 20,
    pp: 6,
  },
  {
    name: "Mastery LC",
    melee: 2.25,
    ranged: 2.25,
    technique: 2.25,
    floor: 2.5,
    dmgRes: 2.5,
  },
  {
    name: "Mastery LCS",
    melee: 2.25,
    ranged: 2.25,
    technique: 2.25,
    floor: 2.5,
    dmgRes: 2.5,
  },
  {
    name: "Grand Dread Keeper LC",
    melee: 2.25,
    ranged: 2.25,
    technique: 2.25,
    floor: 5,
    dmgRes: 1,
    hp: 15,
    pp: 3,
  },
  {
    name: "Grand Dread Keeper LCS",
    melee: 2.25,
    ranged: 2.25,
    technique: 2.25,
    floor: 5,
    dmgRes: 1,
    hp: 15,
    pp: 3,
  },
  {
    name: "Highael Domina LC",
    hp: 10,
    pp: 4,
    melee: 2.75,
    ranged: 2.75,
    technique: 2.75,
    floor: 2,
  },
  {
    name: "Highael Domina LCS",
    hp: 10,
    pp: 4,
    melee: 2.75,
    ranged: 2.75,
    technique: 2.75,
    floor: 2,
  },
  {
    name: "Highret Domina LC",
    hp: 30,
    melee: 2.75,
    ranged: 2.75,
    technique: 2.75,
    floor: 2.25,
  },
  {
    name: "Highret Domina LCS",
    melee: 2.75,
    ranged: 2.75,
    technique: 2.75,
    floor: 2.25,
  },
  {
    name: "Highkvar Domina LC",
    pp: 6,
    melee: 2.75,
    ranged: 2.75,
    technique: 2.75,
    floor: 2.5,
  },
  {
    name: "Highkvar Domina LCS",
    pp: 6,
    melee: 2.75,
    ranged: 2.75,
    technique: 2.75,
    floor: 2.5,
  },
  {
    name: "Gigas Maste LC",
    melee: 3.25,
    ranged: 3.25,
    technique: 3.25,
    hp: 20,
  },
  {
    name: "Gigas Maste LCS",
    melee: 3.25,
    ranged: 3.25,
    technique: 3.25,
    hp: 20,
  },
  {
    name: "Gladia Soul LC",
    melee: 3.5,
    ranged: 3.5,
    technique: 3.5,
    hp: 20,
    pp: 6,
  },
  {
    name: "Gladia Soul LCS",
    melee: 3.5,
    ranged: 3.5,
    technique: 3.5,
    hp: 20,
    pp: 6,
  },
  {
    name: "Halphinale LC",
    melee: 3.75,
    ranged: 3.75,
    technique: 3.75,
    hp: 15,
    pp: 5,
  },
  {
    name: "Halphinale LCS",
    melee: 3.75,
    ranged: 3.75,
    technique: 3.75,
    hp: 15,
    pp: 5,
  },
  { name: "Triplble", melee: 2, ranged: 2, technique: 2 },
  { name: "Triplble II", melee: 3, ranged: 3, technique: 3 },
  { name: "Sta Triplble", melee: 3, ranged: 3, technique: 3, hp: 15 },
  { name: "Spi Triplble", melee: 3, ranged: 3, technique: 3, pp: 5 },
  { name: "Gua Triplble", melee: 3, ranged: 3, technique: 3, dmgRes: 3 },
  {
    name: "Deft Triplble",
    melee: 2.5,
    ranged: 2.5,
    technique: 2.5,
    floor: 2.5,
  },

  { name: "Triplble S", melee: 2, ranged: 2, technique: 2 },
  { name: "Triplble II S", melee: 3, ranged: 3, technique: 3 },
  { name: "Sta Triplble S", melee: 3, ranged: 3, technique: 3, hp: 15 },
  { name: "Spi Triplble S", melee: 3, ranged: 3, technique: 3, pp: 5 },
  { name: "Gua Triplble S", melee: 3, ranged: 3, technique: 3, dmgRes: 3 },
  {
    name: "Deft Triplble S",
    melee: 2.5,
    ranged: 2.5,
    technique: 2.5,
    floor: 2.5,
  },

  { name: "Spiro Triyal", pp: -5, melee: 3.5, ranged: 3.5, technique: 3.5 },
  {
    name: "Wardro Triyal",
    melee: 3.5,
    ranged: 3.5,
    technique: 3.5,
    burn: -50,
    freeze: -50,
    panic: -50,
    poison: -50,
    blind: -50,
    stun: -50,
    shock: -50,
  },
  {
    name: "Guaro Triyal",
    dmgRes: -5,
    melee: 3.5,
    ranged: 3.5,
    technique: 3.5,
  },
  {
    name: "Mega Triyal",
    pp: 2,
    melee: 3.5,
    ranged: 3.5,
    technique: 3.5,
    dmgRes: 1,
  },
  {
    name: "Mega Triyal S",
    pp: 2,
    melee: 3.5,
    ranged: 3.5,
    technique: 3.5,
    dmgRes: 1,
  },
].map((i) => new Augment(i));
