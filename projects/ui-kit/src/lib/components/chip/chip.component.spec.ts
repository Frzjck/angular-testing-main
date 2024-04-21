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
  });

  it('should emit removed event when remove icon is clicked', () => {
    let expectedValue: any;
    const fixture = TestBed.createComponent(ChipComponent);
    fixture.componentRef.setInput('removable', true);
    fixture.componentInstance.removed.subscribe(
      (chip) => (expectedValue = chip)
    );
    fixture.detectChanges();

    const removeButton = fixture.debugElement.query(
      By.css('[data-testingId="removeIcon"]')
    );

    removeButton.triggerEventHandler('click');

    expect(expectedValue).toBe(fixture.componentInstance);
  });

  it('should emit event if remove icon is clicked (Test Host Strategy)', () => {
    const { fixture, chipDebugEl } = setup();
    fixture.componentInstance.removable = true;
    fixture.detectChanges();
    const removeIconEl = chipDebugEl.query(
      By.css('[data-testingId="removeIcon"]')
    );
    removeIconEl.triggerEventHandler('click');

    expect(fixture.componentInstance.removedItem).toBe(
      chipDebugEl.componentInstance
    );
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [ChipComponent],
    template: `
      <df-chip (removed)="removedItem = $event" [removable]="removable">
        Angular Chip
      </df-chip>
    `,
  })
  class ChipTestHostComponent {
    removedItem!: ChipComponent<unknown>;
    removable = false;
  }

  let fixture = TestBed.createComponent(ChipTestHostComponent);
  let chipDebugEl = fixture.debugElement.query(By.directive(ChipComponent));
  fixture.detectChanges();

  return { fixture, chipDebugEl };
}
