import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css']
})
export class CaptureComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public innerWidth: any;
  checkSize: Boolean;


  constructor(private _formBuilder: FormBuilder,
              public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 769) {
      this.checkSize = false;
    } else {
      this.checkSize =true;
    }

    this.firstFormGroup = this._formBuilder.group({
        firstCtrl : ['',Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['',Validators.required]
    });
  }

  uploadImage() {
    this.openSnackBar('Your image uploaded');

  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 2000,
      verticalPosition : 'top',
      horizontalPosition : 'right'
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }





}
