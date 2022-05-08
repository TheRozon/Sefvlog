import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comment } from '../models/Comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  colName: string = 'Comments';
  lastId: string = "";

  constructor(
    private AngFirestore: AngularFirestore
  ) { }

  create(comment: Comment) {
    comment.id = this.AngFirestore.createId();
    this.lastId = this.AngFirestore.createId();
    return this.AngFirestore.collection<Comment>(this.colName).doc(comment.id).set(comment);
  }

  read() {
    return this.AngFirestore.collection<Comment>(this.colName).valueChanges();
  }

  update(comment: Comment) {
    return this.AngFirestore.collection<Comment>(this.colName).doc(comment.id).set(comment);
  }

  delete(id: string) {
    return this.AngFirestore.collection<Comment>(this.colName).doc(id).delete();

  }
  recipeIdComments(recipeId: string) {
    return this.AngFirestore.collection<Comment>(this.colName, ref => ref.where('recipeId', '==', recipeId).orderBy('date')).valueChanges();
  }

  commentsNameOrder(recipeId: string) {
    return this.AngFirestore.collection<Comment>(this.colName, ref => ref.where('recipeId', '==', recipeId).orderBy('username')).valueChanges();
  }


}
