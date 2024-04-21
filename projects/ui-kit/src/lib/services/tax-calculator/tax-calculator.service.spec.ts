import { TestBed } from '@angular/core/testing';
import {
  COUNTRIES,
  Country,
  TaxCalculatorService,
} from './tax-calculator.service';

describe(`TaxCalculatorService`, () => {
  let service: TaxCalculatorService;
  let testCountries: Country;
  beforeEach(() => {
    testCountries = { ua: { name: 'Ukraine', vat: 20 } };
    TestBed.configureTestingModule({
      providers: [{ provide: COUNTRIES, useValue: testCountries }],
    });
    service = TestBed.inject(TaxCalculatorService);
  });

  it('should return 0 if isB2B flag is true', () => {
    const result = service.calculateVAT(100, 'ua', true);
    expect(result).toBe(0);
  });

  it('should properly calculate VAT for a given amount', () => {
    const result = service.calculateVAT(100, 'ua');
    expect(result).toBe(20);
  });

  describe(`TaxCalculatorService: Error Handling`, () => {
    it('should throw error if country isn´t supported', () => {
      expect(() => service.calculateVAT(100, 'ru')).toThrowError(
        /isn't supported/
      );
    });
    it('should throw error if price is negative number', () => {
      expect(() => service.calculateVAT(-100, 'ua')).toThrowError(
        /negative number/
      );
    });
  });
});
