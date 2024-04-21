import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  it('should properly project content', () => {
    const { fixture, chipDebugEl } = setup();
    const chipTextEl = chipDebugEl.query(
      By.css('[data-testingId="chip-text"]')
    ).nativeElement;
    expect(chipTextEl.innerText).toBe('Angular Chip');
    debugger;
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [ChipComponent],
    template: ` <df-chip> Angular Chip </df-chip> `,
  })
  class ChipTestHostComponent {}

  let fixture = TestBed.createComponent(ChipTestHostComponent);
  let chipDebugEl = fixture.debugElement.query(By.directive(ChipComponent));
  fixture.detectChanges();

  return { fixture, chipDebugEl };
}
