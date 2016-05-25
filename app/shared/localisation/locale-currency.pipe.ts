import { Pipe, PipeTransform }                      from 'angular2/core';

import { LocalisationService }                      from './localisation.service';
import { NumberFormatterProperties }                from './localisation.model';

@Pipe({
    name: 'localeCurrency'
})

export class LocaleCurrencyPipe implements PipeTransform {
    constructor(private _localisationService: LocalisationService) {

    }

    /**
     *  currencyName: AUD 
     * style: 'name' (Australian Dollar), 'code' (AUD), null ($)
     */
    public transform(value: any, currencyName: string, style: string) {
        let formatter: NumberFormatterProperties = {};
        formatter.minimumFractionDigits = 2;
        formatter.maximumFractionDigits = 2;
        if (style) formatter.style = style;
        return this._localisationService.formatCurrency(value, null, currencyName, formatter);
    }
}