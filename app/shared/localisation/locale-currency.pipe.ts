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
    public transform(value: any, currencyName: string, style: string, minFrac: number = 2
        , maxFrac: number = 2, minSig: number = null, maxSig: number = null) {
        let formatter: NumberFormatterProperties = {};

        formatter.minimumFractionDigits = minFrac;
        formatter.maximumFractionDigits = maxFrac;
        if (minSig != null) formatter.minimumSignificantDigits = minSig;
        if (maxSig != null) formatter.maximumSignificantDigits = maxSig;
        if (style) formatter.style = style;
        return this._localisationService.formatCurrency(value, null, currencyName, formatter);
    }
}