import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { DataService } from '../data.service';
import { Garden, Plant } from '../model/garden';
import { Seed } from '../model/seed';

@Component({
  selector: 'app-garden-view',
  templateUrl: './garden-view.component.html',
  styleUrls: ['./garden-view.component.css']
})
export class GardenViewComponent implements OnInit {
  allSeeds: Seed[];
  seedTypes = new Array;
  seedVarieties = new Array;
  typesLoading: boolean = false;

  plant = new Plant;
  seed = new Seed;

  showAddPlant: boolean = false;
  showAddType: boolean = false;
  showAddVariety: boolean = false;
  disableAddButton: boolean = true;

  @Input()
  garden: Garden;

  constructor(private dataService: DataService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getSeedTypes();
    this.plant.plant_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  getSeedTypes(callback?: Function) {
    this.typesLoading = true;
    this.dataService.getSeeds()
      .subscribe((response) => {
        this.allSeeds = response;
        this.allSeeds.forEach(element => {
          if (!this.seedTypes.includes(element.type)) {
            this.seedTypes.push(element.type)
          }
        })
        this.typesLoading = false;
        if (callback) {
          callback();
        }
      })
  }

  seedTypeChange() {
    this.getSeedVarieties();
    if (!this.seedVarieties.some(e => e == this.plant.seed.variety))
      this.plant.seed.variety = this.seedVarieties[0];
    this.seedVarietyChange();
  }

  seedVarietyChange() {
    let s = this.allSeeds.find(element =>
      element.type == this.plant.seed.type && element.variety == this.plant.seed.variety);
    this.plant.seed.maturity_days = s.maturity_days;
    this.plantDateChange();
  }

  strToDate(dateStr: string) {
    const [year, month, day] = dateStr.split("-");
    return new Date(+year, +month - 1, +day)
  }

  addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  plantDateChange() {
    /*
    this.plant.plant_date = this.strToDate(this.plantDate);
    if (this.plant.seed.maturity_days) {
      this.plant.harvest_date = this.addDays(this.plant.plant_date, this.plant.seed.maturity_days);
      this.harvestDate = this.datePipe.transform(this.plant.harvest_date, 'yyyy-MM-dd');
    }
    else this.harvestDate = ''
*/
    console.log(this.plant.plant_date)
    let tempDate = this.strToDate(this.plant.plant_date);
    console.log(tempDate)
    tempDate = this.addDays(tempDate, this.plant.seed.maturity_days);
    console.log(tempDate)
    this.plant.harvest_date = this.datePipe.transform(tempDate, 'yyyy-MM-dd');
    console.log(this.plant.plant_date);
    this.validateAddPlant();
  }

  validateAddPlant() {
    if (this.plant.seed.type && this.plant.seed.variety && this.plant.plant_date && this.plant.harvest_date) {
      this.disableAddButton = false;
    }
    else {
      this.disableAddButton = true;
    }
  }

  addPlant() {
    this.garden.plants.push(this.plant)
    this.plant = new Plant
    this.plant.plant_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.dataService.updateGarden(this.garden)
      .subscribe(data => {
        console.log(data);
        this.showAddPlant = false;
      })
  }

  getSeedVarieties() {
    this.seedVarieties = [];
    this.allSeeds.forEach(element => {
      if (element.type == this.plant.seed.type && !this.seedVarieties.includes(element.variety)) {
        this.seedVarieties.push(element.variety)
      }
    })
  }

  addSeed() {
    this.plant.seed.type = this.seed.type;
    this.plant.seed.variety = this.seed.variety;
    this.plant.seed.maturity_days = this.seed.maturity_days;

    this.dataService.setSeed(this.seed)
      .subscribe(data => {
        console.log(data);
        this.showAddType = false;
        this.getSeedTypes(() => this.seedTypeChange());
      })
  }

}
