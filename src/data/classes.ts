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
  { name: "Hunter", attack: 0, defense: 0, hp: 0 },
  { name: "Fighter", attack: 0, defense: 0, hp: 0 },
  { name: "Ranger", attack: 0, defense: 0, hp: 0 },
  { name: "Gunner", attack: 0, defense: 0, hp: 0 },
  { name: "Force", attack: 0, defense: 0, hp: 0 },
  { name: "Techter", attack: 0, defense: 0, hp: 0 },
  { name: "Braver", attack: 0, defense: 0, hp: 0 },
  { name: "Bouncer", attack: 0, defense: 0, hp: 0 },
  { name: "Waker", attack: 0, defense: 0, hp: 0 },
  { name: "Slayer", attack: 0, defense: 0, hp: 0 },
].map((i) => new Class(i));
