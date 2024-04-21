import { Component, HostBinding, Input } from '@angular/core';
import { CanDisableDirective } from '../../directives/can-disable/can-disable.directive';
import { HasTabIndexDirective } from '../../directives/has-tab-index/has-tab-index.directive';
import { toBooleanProperty } from '../../utils/type-coercion';

export const BUTTON_CLASSES = {
  solid: 'solid-button',
  stroked: 'stroked-button',
  dashed: 'dashed-button',
} as const;

export type ButtonAppearance = keyof typeof BUTTON_CLASSES;
export type ButtonClasses = (typeof BUTTON_CLASSES)[ButtonAppearance];

@Component({
  selector: 'button[dfButton],a[dfButton]',
  template: `
    <span class="button-label">
      <ng-content></ng-content>
    </span>
    <span *ngIf="loading" class="loader"></span>
  `,
  styleUrls: ['./button.component.scss'],
  hostDirectives: [
    {
      directive: CanDisableDirective,
      inputs: ['disabled'],
    },
    {
      directive: HasTabIndexDirective,
      inputs: ['tabIndex', 'pauseFocusing: disabled'],
    },
  ],
})
export class ButtonComponent {
  @Input()
  appearance: 'solid' | 'stroked' | 'dashed' = 'solid';

  @Input()
  set loading(value: any) {
    this.#loading = toBooleanProperty(value);
  }
  get loading(): boolean {
    return this.#loading;
  }
  #loading = false;

  @HostBinding('class')
  protected get buttonTypeHostClass() {
    return `${this.appearance}-button`;
  }
}
