import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let debugEl: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    debugEl = fixture.debugElement;
    el = debugEl.nativeElement;
    fixture.detectChanges();
  });

  it('should have "solid" appearance by default', () => {
    expect(el.classList).toContain('solid-button');
  });

  it('should apply proper CSS classes when appearance changes', () => {
    debugEl.componentInstance.appearance = 'stroked';
    fixture.detectChanges();
    expect(el.classList).toContain('stroked-button');
  });

  it("should show loader icon in 'loading' state", () => {
    debugEl.componentInstance.loading = true;
    fixture.detectChanges();
    let loader = el.querySelector('.loader');
    expect(loader).not.toBeNull();

    debugEl.componentInstance.loading = false;
    fixture.detectChanges();
    loader = el.querySelector('.loader');
    expect(loader).toBeNull();
  });
});
