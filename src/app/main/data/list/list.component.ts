import { Component, OnInit, Inject } from '@angular/core';
import {Data} from '../../../model/data.model';
import {DataService} from '../data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  limg: Data[];
  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.getData();
  }

  getData() {
    this.dataService.getAll().subscribe(data => this.limg = data);
  }

  openDeleteDialog(item :Data): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data : item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
  }
  openDialog(item: Data): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: item
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

  file: any;
  flag: Boolean = false;
  nameCtrl = new FormControl();
  desCtrl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public snackBar: MatSnackBar,
    private dataService: DataService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick() {
    try {
      if (this.flag) {
        this.dataService.edit(this.data.id,this.file,this.nameCtrl.value == null ? this.data.name : this.nameCtrl.value,this.desCtrl.value == null ? this.data.description :this.desCtrl.value);
      } else {
        console.log(this.data.id,this.data.img,this.nameCtrl.value,this.desCtrl.value);
        this.dataService.edit(this.data.id,this.data.img,this.nameCtrl.value == null ? this.data.name : this.nameCtrl.value,this.desCtrl.value == null ? this.data.description :this.desCtrl.value);
      }
      this.openSnackBar('Successful');
      this.dialogRef.close();
      window.location.reload();
    } catch (e) {
      console.log(e);
      this.openSnackBar('Failed');
    }

  }

  upload(e) {
    this.file = e;
    this.flag =true;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 3000,
      verticalPosition : 'top',
      horizontalPosition : 'right'
    });
  }

}

@Component({
  selector: 'app-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Data,
              public snackBar: MatSnackBar,
              private dataService: DataService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onDeleteClick() {
    try {
      console.log(this.data.id);
      this.dataService.delete(this.data.id);
      this.openSnackBar('Successful');
      this.dialogRef.close();
      window.location.reload();
    } catch (e) {
      console.log(e);
      this.openSnackBar('Failed');
      this.dialogRef.close();
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 3000,
      verticalPosition : 'top',
      horizontalPosition : 'right'
    });
  }

}
