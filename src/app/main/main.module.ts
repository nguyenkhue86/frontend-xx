import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuModule} from "./menu/menu.module";
import {MenuComponent} from "./menu/menu.component";
import {DataComponent} from "./data/data.component";
import {DataModule} from "./data/data.module";
import {MatButtonModule, MatMenuModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    DataModule,
    MatMenuModule,
    MatButtonModule
  ],
  declarations: [ MenuComponent, DataComponent ]
})
export class MainModule { }
