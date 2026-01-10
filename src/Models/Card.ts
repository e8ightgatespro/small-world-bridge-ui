import { Attribute } from "./Enums/Attribute";
import { Race } from "./Enums/Race";

export class Card {
    name: string;
    race: Race;
    attribute: Attribute;
    level: number;
    atk: number;
    def: number;

    constructor(name: string, race: Race, attribute: Attribute, level: number, atk: number, def: number) {
        this.name = name;
        this.race = race;
        this.attribute = attribute;
        this.level = level;
        this.atk = atk;
        this.def = def;
    }
}