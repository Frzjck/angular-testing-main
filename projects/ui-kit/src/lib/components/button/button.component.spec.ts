import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let debugEl: DebugElement;
  let el: HTMLElement;
  let component: ButtonComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    debugEl = fixture.debugElement;
    el = debugEl.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have "solid" appearance by default', () => {
    expect(el.classList).toContain('solid-button');
  });

  it('should apply proper CSS classes when appearance changes', () => {
    component.appearance = 'stroked';
    fixture.detectChanges();
    expect(el.classList).toContain('stroked-button');
  });

  it("should show loader icon in 'loading' state", () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    let loader = el.querySelector('.loader');
    expect(loader).not.toBeNull();

    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    loader = el.querySelector('.loader');
    expect(loader).toBeNull();
  });
  describe('Disabled state', () => {
    it('should apply disabled attribute to component host', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(el.classList).toContain('disabled');
      expect(el.getAttribute('disabled')).not.toBeNull();
      expect(el.getAttribute('tabindex')).toBe('-1');
    });
    it('should prevent default action when button is disabled and clicked', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const clickEvent = new PointerEvent('click', {
        cancelable: true,
      });
      debugEl.triggerEventHandler('click', clickEvent);
      expect(clickEvent.defaultPrevented).toBe(true);
    });
  });
  // describe('ButtonComponent (with TestHost)', () => {
  //   @Component({
  //     template: '<button dfButton>Test Button</button>',
  //   })
  //   class ButtonTestHost {}

  //   let fixture: ComponentFixture<ButtonTestHost>;
  //   let buttonDebugEl: DebugElement;
  //   let buttonEl: HTMLElement;
  //   let hostComponent: ButtonTestHost;
  //   beforeEach(() => {
  //     TestBed.configureTestingModule({
  //       declarations: [ButtonTestHost],
  //       imports: [ButtonModule],
  //     });
  //     fixture = TestBed.createComponent(ButtonTestHost);
  //     buttonDebugEl = fixture.debugElement.query(By.directive(ButtonComponent));
  //     buttonEl = buttonDebugEl.nativeElement;
  //     hostComponent = fixture.componentInstance;
  //     fixture.detectChanges();
  //   });
  //   it('', () => {});
  // });
});
