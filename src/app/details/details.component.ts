import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { HousingService } from '../housing.service';
import { HomeLocation } from "../housing-location";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="HomeLocation?.photo" >
      <section class="listing-description">
        <h2 class="listing-heading">{{HomeLocation?.name}}</h2>
        <p class="listing-location">{{HomeLocation?.address}}, {{HomeLocation?.city}}</p>
      </section>
      <section class="listing-features">
        <ul>
          <li>Balkon: {{HomeLocation?.balcony}}</li>
          <li>Gesamtmiete: {{HomeLocation?.price}} €</li>
          <li>Fläche: {{HomeLocation?.size}} m²</li>
        </ul>
      </section>
      <section class="listing-apply">
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">Vorname</label>
          <input id="first-name" type="text" formControlName="firstName">
          <label for="last-name">Náchname</label>
          <input id="last-name" type="text" formControlName="lastName">
          <label for="email">E-mail</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary">Direktanfrage</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  HomeLocation: HomeLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const HomeLocationid = Number(this.route.snapshot.params["id"]);
    this.housingService.getHomeLocationById(HomeLocationid).then((HomeLocation: HomeLocation | undefined) => {
      this.HomeLocation = HomeLocation;
    })
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    )
  }
}
