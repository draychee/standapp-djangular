import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-standup',
  template: `
<div style="text-align:center">
  <h1>{{ title }}!</h1>
<h2>List of Stand Ups:</h2>
</div>

<section class="section">
<div class="container">
<div class="columns is-multiline">

<div class="column is-4" *ngFor="let standup of standups">
    <div class="card">
      <div class="card-content">
        <div (click)="standupClicked(standup)">
    {{ standup.date }}
        </div>
      </div>
    </div>
</div>

</div>
</div>
</section>
<hr>
Date <input [(ngModel)]="selectedStandup.date"><br/>
<button *ngIf="selectedStandup.id" (click)="updateStandup()">UPDATE</button>
<button (click)="createStandup()">CREATE</button>
<button *ngIf="selectedStandup.id" (click)="deleteStandup()">DELETE</button>


`,
  styles: [],
})


export class StandupComponent {
  title: 'Stand Ups';
  standups;
  selectedStandup = {date: ''};

  constructor(private api: ApiService) {
    this.getStandups();
  }
  getStandups = () => {
    this.api.getAllStandups().subscribe(
      data => {
        this.standups = data;
      },
      error => {
        console.log(error);
      }
    );
  };

  standupClicked = (standup) => {
    console.log(standup.id);
    this.api.getOneStandup(standup.id).subscribe(
      data => {
        console.log(data);
        this.selectedStandup = data;
      },
      error => {
        console.log(error);
      }
    );
  };

  updateStandup() {
    this.api.updateStandup(this.selectedStandup).subscribe(
      data => {
        this.getStandups();
      },
      error => {
        console.log(error);
      }
    );
  }

  createStandup() {
    this.api.createStandup(this.selectedStandup).subscribe(
      data => {
        this.getStandups();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteStandup() {
    if(confirm('Are you sure to delete this Stand Up?')) {
      this.api.deleteStandup(this.selectedStandup).subscribe(
        data => {
          this.getStandups();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}