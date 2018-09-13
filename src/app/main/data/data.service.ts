import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_BASE} from '../../model/api_base';
import {Observable} from 'rxjs';
import {Data} from '../../model/data.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const url_base = API_BASE;
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'api/data';

  constructor(private http: HttpClient) { }
  getAll(): Observable<Data[]> {
    return this.http.get<Data[]>(url_base + 'data.json');
  }

  create(data: Data) {
    return data;
  }
  update(data: Data) {
    return data;
  }
  delete(id: number) {
    return id;
  }

}
