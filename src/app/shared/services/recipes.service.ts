import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/Image';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  colName = 'Recipes';

  constructor(
    private http: HttpClient,
    private AngFirestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  loadImageMeta(metaUrl: string): Observable<Array<Image>> {
    //return this.http.get(environment.hostUrl + '/assets/' + metaUrl) as Observable<Array<Image>>;
    return this.AngFirestore.collection<Image>(this.colName).valueChanges();
  }

  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
    //return this.http.get(environment.hostUrl + '/assets/' + imageUrl, {responseType: 'blob'});
  }
}
