import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css'],
})
export class DialogConfirmationComponent implements OnInit {
  constructor(
    public matDialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}

  cancel(): void {
    this.matDialogRef.close(false);
  }

  confirm(): void {
    this.matDialogRef.close(true);
  }

  ngOnInit() {}
}
