import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Garden } from '../model/garden';

@Component({
  selector: 'app-manage-gardens',
  templateUrl: './manage-gardens.component.html',
  styleUrls: ['./manage-gardens.component.css']
})
export class ManageGardensComponent implements OnInit {

  allUserGardens: Garden[];
  gardensLoading: boolean= false;

  garden = new Garden;
  showAddGarden: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getGardens();
   }

  getGardens() {
    this.gardensLoading = true;
    this.dataService.getUserGardens()
      .subscribe((response) => {
        this.allUserGardens = response;
        this.gardensLoading = false;
      })
  }

  addGarden() {
    this.dataService.setGarden(this.garden)
      .subscribe(data => {
        console.log(data);
        this.getGardens();
        this.showAddGarden = false;
      })
  }
}
