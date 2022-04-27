import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../app.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card;

  constructor() {
    this.card = {
      value: 0,
      isFaceUp: false,
      isAiCard: true,
    };
  }

  ngOnInit(): void {
  }

}
