import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLocation } from '../housing-location';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
   <section class="listing">
    <img class="listing-photo" [src]="HomeLocation.photo" alt="Exterior photo of {{HomeLocation.name}}">
    <h2 class="listing-heading">{{HomeLocation.name}}</h2>
    <p class="listing-location">{{HomeLocation.address}},{{HomeLocation.city}}</p>
    <a [routerLink]="['details',HomeLocation.id]">Exposé</a>
   </section>
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HomeLocationComponent {
  @Input() HomeLocation!: HomeLocation;
}
