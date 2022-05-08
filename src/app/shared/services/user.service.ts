import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  colName = 'Users';

  constructor(
    private angFirStore: AngularFirestore
  ) { }

  create (user: User) {
    return this.angFirStore.collection<User>(this.colName).doc(user.id).set(user);
  }

  read(id: string) {
    return this.angFirStore.collection<User>(this.colName).doc(id).valueChanges();
  }

  update() {

  }

  delete(){

  }
}
