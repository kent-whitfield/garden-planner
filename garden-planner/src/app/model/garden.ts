import { Seed } from "./seed";

export class Garden {
  user: string;
  name: string;
  plants = new Array<Plant>();
}

export class Plant {
  seed = new Seed;
  plant_date: string;
  harvest_date: string;
}
