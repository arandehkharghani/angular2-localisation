import { Pipe, PipeTransform }                      from 'angular2/core';

import { LocalisationService }                      from './localisation.service';
import { NumberFormatterProperties }                from './localisation.model';

@Pipe({
    name: 'localeNumber'
})

export class LocaleNumberPipe implements PipeTransform {
    constructor(private _localisationService: LocalisationService) {

    }

    public transform(value: any, minFrac: number, maxFrac: number, minSig: number, maxSig: number) {
        let formatter: NumberFormatterProperties = {};
        let hasProperty = false;
        if (minSig != null && minSig != undefined) { formatter.minimumSignificantDigits = minSig; hasProperty = true; }
        if (maxSig != null && maxSig != undefined) { formatter.maximumSignificantDigits = maxSig; hasProperty = true; }
        if (minFrac != null && minFrac != undefined) { formatter.minimumFractionDigits = minFrac; hasProperty = true; }
        if (maxFrac != null && maxFrac != undefined) { formatter.maximumFractionDigits = maxFrac; hasProperty = true; }

        if (hasProperty) {
            return this._localisationService.formatNumber(value, null, formatter);
        } else {
            return this._localisationService.formatNumber(value);
        }
    }
}