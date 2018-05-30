import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ServiceWorkerModule } from "@angular/service-worker";
import { AppComponent } from "./app.component";
import { TestcontrolComponent } from "./testcontrol/testcontrol.component";
import { TestsetupComponent } from "./testsetup/testsetup.component";
import { TestpageComponent } from "./testpage/testpage.component";
import { ResultpageComponent } from "./resultpage/resultpage.component";

import { environment } from "../environments/environment";

import { MatToolbarModule, MatSnackBarModule, MatTable } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { MatRadioModule } from "@angular/material/radio";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule, Routes } from "@angular/router";

import { DataService } from "./data.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MinuteSecondsPipe } from "./minute-seconds.pipe";

// import { NgxLineChartModule } from "../../ngx-line-chart";

const appRoutes: Routes = [
  { path: "", component: TestsetupComponent },
  { path: "setup", component: TestsetupComponent },
  { path: "test", component: TestpageComponent },
  { path: "result", component: ResultpageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TestcontrolComponent,
    TestsetupComponent,
    TestpageComponent,
    MinuteSecondsPipe,
    ResultpageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatSnackBarModule,
    // NgxLineChartModule,
    MatIconModule,
    HttpClientModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    }),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
