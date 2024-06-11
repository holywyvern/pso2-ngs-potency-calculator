export class Class {
  name: string;
  attack: number;
  defense: number;
  hp: number;
  pp: number;

  constructor({
    name,
    attack,
    defense,
    hp,
  }: Partial<Class> & { name: string }) {
    this.name = name;
    this.attack = attack || 0;
    this.defense = defense || 0;
    this.hp = hp || 0;
    this.pp = 150;
  }
}

export const CLASSES: Class[] = [
  { name: "Hunter", attack: 1934, defense: 986, hp: 693 },
  { name: "Fighter", attack: 1938, defense: 983, hp: 651 },
  { name: "Ranger", attack: 1932, defense: 982, hp: 554 },
  { name: "Gunner", attack: 1935, defense: 979, hp: 575 },
  { name: "Force", attack: 1937, defense: 978, hp: 544 },
  { name: "Techter", attack: 1930, defense: 985, hp: 595 },
  { name: "Braver", attack: 1936, defense: 984, hp: 631 },
  { name: "Bouncer", attack: 1937, defense: 981, hp: 641 },
  { name: "Waker", attack: 1935, defense: 984, hp: 585 },
  { name: "Slayer", attack: 1939, defense: 978, hp: 513 },
].map((i) => new Class(i));
