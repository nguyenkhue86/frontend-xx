import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "./menu.component";
import {MatButtonModule, MatIconModule, MatMenuModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [ MenuComponent ]
})
export class MenuModule { }
