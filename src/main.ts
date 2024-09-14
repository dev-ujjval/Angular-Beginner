import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from "@angular/router";
import routConfig from "./app/routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routConfig)
  ]
})
  .catch(err => console.error(err));
