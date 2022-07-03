import { SquareClickEventProps } from '../interface';
import { Component, OnInit } from '@angular/core';
import { calculateWinner, checkDraw } from '../game-logic/logic';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  matrix: Array<Array<number>> = Array(3)
    .fill(0)
    .map(() => Array(3).fill(0));
  isXNext: boolean = false;

  winner: number = 0;

  winPosition: Array<SquareClickEventProps> = [];

  isDraw: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.matrix);
  }
  onSquareClick(props: SquareClickEventProps) {
    if (this.winner === 0) this.updateMatrix(props);
  }

  onResetClick() {
    this.matrix = Array(3)
      .fill(0)
      .map(() => Array(3).fill(0));
    this.winPosition = [];
    this.isDraw = false;
    this.winner = 0;
    this.isXNext = false;
  }

  updateMatrix(props: SquareClickEventProps) {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        if (i === props.row && j === props.col) {
          if (this.isXNext) this.matrix[i][j] = 2;
          else this.matrix[i][j] = 1;
        }
      }
    }
    if (checkDraw(this.matrix)) {
      this.isDraw = true;
      return;
    }
    const result = calculateWinner(this.matrix, props.row, props.col);
    if (result !== null) {
      this.winPosition = result.position;
      this.winner = result.player;
    }
    this.isXNext = !this.isXNext;
  }
}
