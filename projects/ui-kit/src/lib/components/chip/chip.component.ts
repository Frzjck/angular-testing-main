import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { HasTabIndexDirective } from '../../directives/has-tab-index/has-tab-index.directive';

@Component({
  selector: 'df-chip',
  standalone: true,
  imports: [NgIf],
  template: `
    <span data-testingId="chip-text" class="chip-text">
      <ng-content></ng-content>
    </span>
    <i
      data-testingId="removeIcon"
      (click)="onClick()"
      *ngIf="removable"
      class="chip-remove-icon"
    ></i>
  `,
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: HasTabIndexDirective,
      inputs: ['tabIndex', 'pauseFocusing'],
    },
  ],
})
export class ChipComponent<T> {
  @Input()
  removable = false;

  @Input()
  value: T | null = null;

  @Output()
  removed = new EventEmitter<ChipComponent<T>>();

  onClick() {
    if (this.removable) {
      this.removed.emit(this);
    }
  }
}
