import {Component, Inject, OnInit} from '@angular/core';
import {Data} from '../../../model/data.model';
import {DataService} from '../data.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormControl} from "@angular/forms";
import {ClipboardService} from "ngx-clipboard";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public limg: Data[] =[];
  sort: string = 'keyboard_arrow_up';
  toggle: boolean = false;
  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.getData();
  }

  getData() {
    this.dataService.getAll().subscribe(data => this.limg = data);
  }

  getFavorite() {
    this.dataService.getByFavorite().subscribe(data => this.limg = data);
  }



  addFavorite(item: Data) {
    if (item.favorite === true) {
      item.favorite = false;
      this.dataService.update(item);
      setTimeout(() => {
        if (this.toggle === true) {
          this.getFavorite();
        }
      },10);
    } else {
      item.favorite = true;
      this.dataService.update(item);
    }
  }

  showFavorite(e) {
    if (e.checked === true) {
      this.getFavorite();
      this.toggle = true;
    } else {
      this.getData();
      this.toggle = false;
    }
  }
  doSearch(e) {
    if (e.target.value === '') {
      if (this.toggle === true) {
        this.getFavorite();
      } else {
        this.getData();
      }
    } else {
      this.dataService.getByName(e.target.value).subscribe(data => {this.limg = data;});
    }
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

  openShareDialog(item: Data): void {
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: '600px',
      maxHeight: '100px',
      data: item
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
          this.dataService.edit(this.data.id,this.file,this.nameCtrl.value == null ? this.data.name : this.nameCtrl.value,this.desCtrl.value == null ? this.data.description :this.desCtrl.value,this.data.favorite);
      } else {
          this.dataService.edit(this.data.id,this.data.url,this.nameCtrl.value == null ? this.data.name : this.nameCtrl.value,this.desCtrl.value == null ? this.data.description :this.desCtrl.value,this.data.favorite);
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


@Component({
  selector: 'app-share-dialog',
  templateUrl: 'share-dialog.html',
  styleUrls: ['share-dialog.css']
})
export class ShareDialogComponent {

  url: string = this.data.url;


  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Data,
              public snackBar: MatSnackBar,
              private _clipboardService: ClipboardService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  copy() {
    try {
      this._clipboardService.copyFromContent(this.url);
      this.openSnackBar('Copy to your clipboard. Share it by pasting your url');
      this.dialogRef.close();
    }catch (e) {
      console.log(e);
    }

  }

  openSnackBar(message: string) {
    this.snackBar.open(message,'', {
      duration: 3000,
      verticalPosition : 'bottom',
      horizontalPosition : 'center'
    });
  }



}
