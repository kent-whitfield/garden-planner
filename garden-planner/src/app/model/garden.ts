import { Seed } from "./seed";

export class Garden {
  user: string;
  name: string;
  plants = new Array<Plant>();
}

export class Plant {
  type: Seed;
  plant_date: Date;
  harvest_date: Date;
}
