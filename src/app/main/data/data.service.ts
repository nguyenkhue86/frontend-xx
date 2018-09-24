import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_BASE} from '../../model/api_base';
import {Data} from '../../model/data.model';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import {finalize} from "rxjs/operators";

import {Observable} from "rxjs";
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

  getById(id: any): Observable<Data> {
    return this.http.get<Data>(url_base+"/"+id);
  }


  getByName(name: string): Observable<Data[]>  {
    if (name !== '' && name.length !== 0) {
      let api = `${url_base}/search?name=${name}`;
      return this.http.get<Data[]>(api,httpOptions);
    }
    else {
      return this.http.get<Data[]>(url_base);
    }
  }

  delete(id: number) {
    this.http.delete(url_base+"/"+id,httpOptions).subscribe(data=> console.log(data));
  }
   upload(file, name, desc) {
       const id = Math.random().toString(36).substring(2);
       this.ref = this.afStorage.ref(id);
       this.task = this.ref.put(file.target.files[0]);
       this.task.snapshotChanges().pipe(
         finalize(() => {
           this.ref.getDownloadURL().subscribe(url => {
             this.http.post(url_base,{"name":name,"url":url,"description":desc},httpOptions).subscribe(data=>console.log(data));
           });
         })
       ).subscribe();

   }

   edit(id, file, name, desc) {
     if (typeof file === "string" ) {
       this.http.put(url_base+"/"+id,{"id":id,"name":name,"url":file,"description":desc},httpOptions).subscribe(data=>console.log(data));
     } else {
       const idr = Math.random().toString(36).substring(2);
       this.ref = this.afStorage.ref(idr);
       this.task = this.ref.put(file.target.files[0]);
       this.task.snapshotChanges().pipe(
         finalize(() => {
           this.ref.getDownloadURL().subscribe(url => {
             this.http.put(url_base+"/"+id,{"id":id,"name":name,"url":url,"description":desc},httpOptions).subscribe(data=>console.log(data));
           });
         })
       ).subscribe();

     }

   }






}
