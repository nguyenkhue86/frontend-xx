import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_BASE} from '../../model/api_base';
import {Observable} from 'rxjs';
import {Data} from '../../model/data.model';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import {finalize} from "rxjs/operators";
import {d} from "@angular/core/src/render3";

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

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;


  constructor(private http: HttpClient,
              private afStorage: AngularFireStorage) { }
  getAll(): Observable<Data[]> {
    return this.http.get<Data[]>(url_base);
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
  url: string;
   upload(file, name, desc) {

    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(file.target.files[0]);

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          console.log(name,url,desc);
          this.http.post(url_base,{"name":name,"img":url,"description":desc},httpOptions).subscribe(data=>console.log(data));
        });
      })
    ).subscribe();
    // return this.ref.getDownloadURL();
  }

}
