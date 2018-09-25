import {Component, Inject, OnInit} from '@angular/core';
import {Data} from '../../../model/data.model';
import {DataService} from '../data.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public limg: Data[];
  check: boolean = false;
  sort: string = 'keyboard_arrow_up';
  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.getData();
  }

  getData() {
    this.dataService.getAll().subscribe(data => this.limg = data);
  }

  Reset(e) {
    if (e.target.value === '') {
      this.getData();
      this.check =false;
    } else {
      this.doSearch(e.target.value,false);
    }
  }


  doSearch(e,flag) {
    this.dataService.getByName(e).subscribe(data => {
      if (data.length === 0 && flag === true) {
        console.log(data);
        this.check = true;
      }
      else {
        this.limg = data;
      }
    });
  }

  sortName() {
    if (this.sort === 'keyboard_arrow_up') {
      this.sort = 'keyboard_arrow_down';
      this.limg.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      this.sort = 'keyboard_arrow_up';
      this.limg.sort((a, b) => a.name.localeCompare(b.name));
    }
  }



  openDeleteDialog(item :Data): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data : item
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data !== null) {
        let i = this.limg.findIndex(item => item.id === data.id);
        this.limg.splice(i,1);
        console.log('The dialog was closed');
      }
    });
  }
  ngOnInit() {
  }
  openDialog(item: Data): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: item
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data !== null) {
        this.getData();
      }
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
  loading: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public snackBar: MatSnackBar,
    private dataService: DataService) {

  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmitClick(){
    this.loading = true;
    try {
      if (this.flag) {
          this.dataService.edit(this.data.id,this.file,this.nameCtrl.value == null ? this.data.name : this.nameCtrl.value,this.desCtrl.value == null ? this.data.description :this.desCtrl.value);
      } else {
          this.dataService.edit(this.data.id,this.data.url,this.nameCtrl.value == null ? this.data.name : this.nameCtrl.value,this.desCtrl.value == null ? this.data.description :this.desCtrl.value);
      }
      setTimeout(() =>{
        this.loading = false;
        this.openSnackBar('Successful');
        this.dataService.getById(this.data.id).subscribe(data => {
          this.data = data;
          this.dialogRef.close(this.data);
        });
      },this.flag === true ? 2000 : 500);
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
    this.dialogRef.close(null);
  }
  onDeleteClick() {
    try {
      this.dataService.delete(this.data.id);
      this.openSnackBar('Successful');
      this.dataService.getById(this.data.id).subscribe(data => {
        this.data = data;
        this.dialogRef.close(this.data);
      });
    } catch (e) {
      console.log(e);
      this.openSnackBar('Failed');
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
