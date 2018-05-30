import { Component, OnInit, OnDestroy, HostBinding } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";

import { fadeInAnimation } from "../_animations/index";

import { Subscription, timer } from "rxjs";

@Component({
  selector: "app-testpage",
  templateUrl: "./testpage.component.html",
  styleUrls: ["./testpage.component.css"],
  animations: [fadeInAnimation]
})
export class TestpageComponent implements OnInit, OnDestroy {
  @HostBinding("@fadeInAnimation") fadeInAnimation = "";

  private subscription: Subscription;

  constructor(private router: Router, public dataService: DataService) {}

  public showCorrectAnimation = false;
  public showIncorrectAnimation = false;

  ngOnInit() {
    // If the user has inadvertently found their way here, redirect back to test setup
    if (!this.dataService.testState.isTestStarted) {
      this.router.navigateByUrl("/setup");
    }

    const testTimer = timer(0, 10);
    this.subscription = testTimer.subscribe(t => {
      this.dataService.testState.elapsedMilliSeconds = t * 10;
      // console.log(t * 10);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  btnClick = function(entry) {
    // this.dataService.testState.acceptInput(entry);
    if (entry === "del") {
      this.dataService.testState.answerBuffer = this.dataService.testState.answerBuffer.substring(
        0,
        this.dataService.testState.answerBuffer.length - 1
      );
    } else if (entry === "enter") {
      // Ignore null entry
      if (this.dataService.testState.answerBuffer.length > 0) {
        // Process answer
        const answerIsCorrect = this.dataService.verifyAnswer();

        // Show respective animation
        this.showCorrectAnimation = answerIsCorrect;
        this.showIncorrectAnimation = !answerIsCorrect;

        setTimeout(() => {
          this.showCorrectAnimation = false;
          this.showIncorrectAnimation = false;
        }, 500);

        // Change navigation if test complete
        if (this.dataService.testState.isTestComplete) {
          this.router.navigateByUrl("/result");
        }
      }
    } else {
      // Add entry to buffer if it won't be exceeding 3
      if (this.dataService.testState.answerBuffer.length < 3) {
        this.dataService.testState.answerBuffer =
          this.dataService.testState.answerBuffer + entry;
      }
    }
  };
}
