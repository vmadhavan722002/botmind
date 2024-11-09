import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usdToInr',
  standalone: true
})
export class UsdToInrPipe implements PipeTransform {
  transform(value: number): number {
    const conversionRate = 83; // Current USD to INR rate
    return value * conversionRate;
  }
}