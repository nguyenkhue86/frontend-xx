import { Component, OnInit, Inject } from '@angular/core';
import {Data} from '../../../model/data.model';
import {DataService} from '../data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  limg: Data[];
  constructor(private dataService: DataService, public dialog: MatDialog) {
    dataService.getAll().subscribe(data => this.limg = data);
  }
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
  }

}

@Component({
  selector: 'app-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
