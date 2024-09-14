import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLocationComponent } from "../housing-location/housing-location.component";
import { HomeLocation } from "../housing-location";
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Stadtteil" #filter>
        <button class="primary" type="button" (click)="filterHome(filter.value)">Eingrenzen</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let HomeLocation of filterLocationList" [HomeLocation]="HomeLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  HomeLocationList: HomeLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filterLocationList: HomeLocation[] = [];

  constructor() {
   this.housingService.getAllHomeLocations().then((HomeLocationList: HomeLocation[]) => {
    this.HomeLocationList = HomeLocationList;
    this.filterLocationList = this.HomeLocationList;
   });
  }

  filterHome(value: string) {
    console.log(value)
    if(!value) this.filterLocationList = this.HomeLocationList;

    this.filterLocationList = this.HomeLocationList.filter(
      HomeLocation => HomeLocation?.address.toLowerCase().includes(value.toLowerCase())
    )
  }
}
