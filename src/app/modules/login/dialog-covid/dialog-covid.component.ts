import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-covid',
  templateUrl: './dialog-covid.component.html',
  styleUrls: ['./dialog-covid.component.css']
})
export class DialogCovidComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DialogCovidComponent>
  ) {}

  ngOnInit(): void {}

  close() {
    this.matDialogRef.close();
  }

}
