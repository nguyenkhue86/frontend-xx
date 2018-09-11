import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuModule} from "./menu/menu.module";
import {MenuComponent} from "./menu/menu.component";
import {DataComponent} from "./data/data.component";
import {DataModule} from "./data/data.module";
import {MatButtonModule, MatIconModule, MatListModule, MatMenuModule} from "@angular/material";
import {MainComponent} from "./main.component";

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    DataModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [ MenuComponent, DataComponent,MainComponent ]
})
export class MainModule { }
