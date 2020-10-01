import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';

@Component({
  selector: 'app-self-care',
  templateUrl: './self-care.component.html',
  styleUrls: ['./self-care.component.scss'],
})
export class SelfCareComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SelfCareComponent>,
    private router: Router,
    private goToService: NavbarGoToService,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {}

  goToDashboard() {
    this.closeDialog();
    this.router.navigate(['/']);
  }

  closeDialog() {
    this.dialogRef.close();
    this.goToService.clickFlow.emit();
  }
}
