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
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '310px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit-dialog.html',
  styleUrls:['edit-dialog.css']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) {
  }

  onNoClick(): void {
    this.dialogRef.close();


  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
