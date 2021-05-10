import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogPolicityComponent } from '../dialog-policity/dialog-policity.component';

@Component({
  selector: 'app-dialog-consent',
  templateUrl: './dialog-consent.component.html',
  styleUrls: ['./dialog-consent.component.css']
})
export class DialogConsentComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DialogPolicityComponent>
  ) {}

  ngOnInit(): void {}

  close() {
    this.matDialogRef.close();
  }
}
