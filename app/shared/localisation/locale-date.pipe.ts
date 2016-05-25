import { Injectable, Pipe, PipeTransform }              from 'angular2/core';

import { LocalisationService }                          from './localisation.service';
import { DateFormatterProperties }                      from './localisation.model';

@Pipe({
    name: 'localeDate',
    pure: true
})

@Injectable()
export class LocaleDatePipe implements PipeTransform {
    constructor(private _localisationService: LocalisationService) {

    }

    /**
     * pattern: 
     * 'short'              "11/1/10"
     * 'medium'          "Nov 1, 2010"
     * 'long'               "November 1, 2010"
     * 'full'                "Monday, November 1, 2010"
     */
    public transform(value: Date, pattern: string = 'short') {
        let formatter: DateFormatterProperties = { date: pattern };
        return this._localisationService.formatDate(value, null, formatter);
    }
}