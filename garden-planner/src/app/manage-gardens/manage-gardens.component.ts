import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Seed } from '../model/seed';
import { Garden, Plant } from '../model/garden';

@Component({
  selector: 'app-manage-gardens',
  templateUrl: './manage-gardens.component.html',
  styleUrls: ['./manage-gardens.component.css']
})
export class ManageGardensComponent implements OnInit {
  allSeeds: Seed[];
  garden = new Garden;
  plant = new Plant;
  showAddGarden: boolean = false;
  showPanel: boolean = false;
  seedsLoading: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getSeeds();
    this.garden.user = "kentw@test.ca";
   }


  getSeeds() {
    this.seedsLoading = true;
    this.dataService.getSeeds()
      .subscribe((response) => {
        this.allSeeds = response;
        this.seedsLoading = false;
      })
  }

  addGarden() {
    this.dataService.setGarden(this.garden)
      .subscribe(data => {
        console.log(data);
        // this.refreshGardens()
        this.showAddGarden = false;
      })
  }
}
