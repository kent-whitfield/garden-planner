import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Seed } from '../model/seed';

@Component({
  selector: 'app-add-seed',
  templateUrl: './add-seed.component.html',
  styleUrls: ['./add-seed.component.css']
})
export class AddSeedComponent implements OnInit {
  allSeeds: Seed[];
  seed = new Seed;
  loading: boolean = false;
  errMsg: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void { }

  getSeeds() {
    this.loading = true;
    this.errMsg = "";
    this.dataService.getSeeds()
      .subscribe((response) => {
        console.log("response received");
        this.allSeeds = response;
        this.loading = false;
      })
  }

  addSeed() {
    this.dataService.setSeed(this.seed)
      .subscribe(data => {
        console.log(data);
        this.getSeeds();
      })
  }
}
