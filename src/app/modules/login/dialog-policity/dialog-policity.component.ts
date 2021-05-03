import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-policity',
  templateUrl: './dialog-policity.component.html',
  styleUrls: ['./dialog-policity.component.css'],
})
export class DialogPolicityComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DialogPolicityComponent>
  ) {}

  ngOnInit(): void {}

  close() {
    this.matDialogRef.close();
  }
}
