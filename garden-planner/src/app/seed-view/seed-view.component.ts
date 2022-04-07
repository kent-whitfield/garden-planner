import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from '../services/data.service';
import { Seed } from '../model/seed';

@Component({
  selector: 'app-seed-view',
  templateUrl: './seed-view.component.html',
  styleUrls: ['./seed-view.component.css']
})
export class SeedViewComponent implements OnInit {
  editMode: boolean = false;

  @Input()
  seed: Seed;
  @Input()
  allSeeds: Seed[];

  @Output()
  refreshSeeds = new EventEmitter<any>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log(this.allSeeds)
  }

  editSeed() {
    this.dataService.updateSeed(this.seed)
      .subscribe(data => {
        console.log(data);
        this.editMode = false;
      })
  }

  removeSeed() {
    if (confirm("Delete " + this.seed.variety + " " + this.seed.type + " from collection?")) {
      this.dataService.deleteSeed(this.seed)
        .subscribe(data => {
          console.log(data);
          this.refreshSeeds.emit();
        })
    }
  }

}
