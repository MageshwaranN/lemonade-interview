import { Component, OnInit } from '@angular/core';

export interface Card {
  value: number;
  isFaceUp: boolean;
  isAiCard: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lemonade-interview';
  private cards: Card[] = [];
  public aiDeckOfCards: Card[] = [];
  public aiDrawCards: Card[] = [];
  public resultSetCards: Card[] = [];
  public userDeckOfCards: Card[] = [];
  public userDrawCards: Card[] = [];

  ngOnInit(): void {
    this.initialize();
  }

  private initialize(): void {
    for(let i = 1; i <= 20; i++) {
      this.cards.push({
        value: i,
        isFaceUp: false,
        isAiCard: true,
      });
    }
    this.cards.sort(() => Math.random() - 0.5);

    let temp = [this.aiDeckOfCards, this.userDeckOfCards];

    this.cards.forEach((v, i) => temp[i % 2].push(v));
    this.aiDrawCard();
  }

  private aiDrawCard(): void {
    this.aiDrawCards = this.aiDeckOfCards.splice(this.aiDeckOfCards.length - 2, 2);
    this.resultSetCards = this.aiDrawCards.splice(this.aiDrawCards.length - 1, 1)
  }

  public userDrawCard(drawnCard: Card): void {
    if(this.userDrawCards.length >= 3) return

    drawnCard.isFaceUp = true;
    drawnCard.isAiCard = false;
    this.userDrawCards.push(drawnCard);
    this.userDeckOfCards = this.userDeckOfCards.filter((item) => item.value !== drawnCard.value);
  }

  public showResult(selectedCard: Card): void {
    this.userDrawCards = this.userDrawCards.filter((item) => item.value !== selectedCard.value);
    selectedCard.isFaceUp = false;
    this.resultSetCards.push(selectedCard);
    this.resultSetCards.forEach((item) => item.isFaceUp = true);
    this.resultSetCards.sort((first, second) => second.value - first.value);

    setTimeout(() => {
      this.executeAfterShowingResult();
    }, 500);
  }

  private executeAfterShowingResult(): void {

    if(this.resultSetCards[0].isAiCard) {
      this.aiDeckOfCards = this.aiDeckOfCards.concat(this.resultSetCards, this.userDrawCards, this.aiDrawCards);
      this.aiDeckOfCards.forEach((item) => item.isAiCard = true);
      this.aiDrawCards.sort(() => Math.random() - 0.5);
    } else {
      this.userDeckOfCards = this.userDeckOfCards.concat(this.resultSetCards, this.userDrawCards, this.aiDrawCards);
      this.userDeckOfCards.forEach((item) => item.isAiCard = false);
      this.userDeckOfCards.sort(() => Math.random() - 0.5);
    }

    this.aiDeckOfCards.forEach((item) => item.isFaceUp = false);
    this.userDeckOfCards.forEach((item) => item.isFaceUp = false);

    if((this.aiDeckOfCards.length === 0) || (this.userDeckOfCards.length === 0)) {
      this.showAlert();
      this.cards = [];
      this.aiDeckOfCards = [];
      this.aiDrawCards = [];
      this.resultSetCards = [];
      this.userDeckOfCards = [];
      this.userDrawCards = [];

      this.initialize();
    } else {
      this.resultSetCards = [];
      this.userDrawCards = [];
      this.aiDrawCards = [];
      this.aiDrawCard()
    }
  }

  private showAlert(): void {
    if(this.aiDeckOfCards.length === 0) {
      alert('Yay! You Won.')
    } else {
      alert('Oops! You Lost.')
    }
  }
}
