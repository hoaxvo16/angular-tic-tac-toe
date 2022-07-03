import { SquareClickEventProps } from '../interface';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
})
export class SquareComponent implements OnChanges {
  @Input() row: number = 0;
  @Input() col: number = 0;
  @Input() val: number = 0;
  @Input() isXNext: boolean = false;
  @Input() winner: number = 0;
  @Input() winPosition: Array<SquareClickEventProps> = [];
  @Output() clickEvent = new EventEmitter<SquareClickEventProps>();
  isWinPosition: boolean = false;
  constructor() {}

  ngOnInit(): void {
    console.log('square init');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['winPosition']) {
      const found = changes['winPosition'].currentValue.find(
        (item: SquareClickEventProps) =>
          item.row === this.row && item.col === this.col
      );
      if (found) {
        this.isWinPosition = true;
      }
    }
  }

  onUserClick() {
    if (this.val === 0) this.clickEvent.emit({ row: this.row, col: this.col });
  }
}
