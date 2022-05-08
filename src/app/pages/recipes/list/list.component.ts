import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() recipesObjectInput?: Array<any>;
  @Output() imageObjectEmitter: EventEmitter<any> = new EventEmitter();
  chosenImage: any;

  constructor() {
  }

  ngOnChanges() {
    if (this.recipesObjectInput) {
      this.chosenImage = this.recipesObjectInput[0];
      this.reload();
    }
  }

  ngOnInit(): void {
  }

  reload() {
    this.imageObjectEmitter.emit(this.chosenImage);
  }

}
