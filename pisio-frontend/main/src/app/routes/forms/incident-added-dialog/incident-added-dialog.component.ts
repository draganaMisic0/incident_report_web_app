import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Route, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';


@Component({
  selector: 'app-incident-added-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './incident-added-dialog.component.html',
  styleUrl: './incident-added-dialog.component.scss'
})
export class IncidentAddedDialogComponent {

  constructor(private router: Router){}


  navigateToPage() {
    this.router.navigate(['/dashboard']); // Replace 'target-route' with the actual route you want to navigate to
  }
}
