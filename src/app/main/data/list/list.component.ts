import { Component, OnInit } from '@angular/core';
import {Data} from '../../../model/data.model';
import {DataService} from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  limg: Data[];
  constructor(private dataService: DataService) {
    dataService.getAll().subscribe(data => this.limg = data);
  }

  ngOnInit() {
  }

}
