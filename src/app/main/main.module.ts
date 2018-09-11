import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { DataComponent } from './data/data.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MenuComponent, DataComponent]
})
export class MainModule { }
