import { Injectable, Inject }                                       from 'angular2/core';
import { Observable }                                               from 'rxjs/Rx';
import {Http, Headers, Response}                                    from 'angular2/http'

import { NumberFormatterProperties, DateFormatterProperties }       from './localisation.model';
import { AppSettings, APP_SETTINGS }                                from '../app-settings';

declare let Globalize;
declare let Cldr;

let defaultCurrencyName: string = 'AUD';

@Injectable()
export class LocalisationService {
    private _globalize: any;
    private _numberParser: any;
    private _dateParser: any;
    private _numberFormatter;
    private _dateFormatter;
    private _currencyFormatter;

    constructor(private _http: Http, @Inject(APP_SETTINGS) private _appSettings: AppSettings) {
    }

    public getLocale(): string {
        if ((<any>navigator).languages) {
            return (<any>navigator).languages[0];
        }
        return navigator.language;
    }
    
    private getLanguage(): string {
        return new Cldr(this.getLocale()).attributes.language;
    }

    public parseNumber = (stringValue: string): number => {
        let parsedValue = this._numberParser(stringValue);
        if (!parsedValue) {
            console.warn('wrong value:', stringValue);
            throw new Error('wrong value: ' + stringValue);
        }
        else {
            return parsedValue;
        }
    }

    public parseDate = (stringValue: string): Date => {
        let parsedValue = this._dateParser(stringValue);
        if (!parsedValue) {
            console.warn('wrong value:', stringValue);
            throw new Error('wrong value: ' + stringValue);
        }
        else {
            return parsedValue;
        }
    }

    public formatNumber = (value: number, locale: string = null, numberFormatter: NumberFormatterProperties = null): string => {
        if (locale) {
            Globalize.locale(locale);
            return Globalize.numberFormatter(numberFormatter)(value);
        }
        if (numberFormatter) {
            return Globalize.numberFormatter(numberFormatter)(value);
        }
        return this._numberFormatter(value);
    }

    public formatDate = (value: Date, locale: string = null, dateFormatter: DateFormatterProperties = null): string => {
        if (locale) {
            Globalize.locale(locale);
            return Globalize.dateFormatter(dateFormatter)(value);
        }
        if (dateFormatter) {
            return Globalize.dateFormatter(dateFormatter)(value);
        }
        return this._dateFormatter(value);
    }

    public formatCurrency = (value: number, locale: string = null, currencyName: string = null, numberFormatter: NumberFormatterProperties = null): string => {
        if (locale) {
            Globalize.locale(locale);
            if (!currencyName) currencyName = defaultCurrencyName;
            return Globalize.currencyFormatter(currencyName, numberFormatter)(value);
        }
        if (numberFormatter) {
            if (!currencyName) currencyName = defaultCurrencyName;
            return Globalize.currencyFormatter(currencyName, numberFormatter)(value);
        }
        return this._currencyFormatter(value);
    }

    /**
     * this loads all required locale json files for the user asyncronouisly and when done
     * initialises the Globalize related object for localisation service.
     */
    public init(): Observable<void> {
        let that = this;
        
        return Observable.create(observer => {
            that.loadJsonFiles().subscribe(res => {
                that._globalize = Globalize.locale(this.getLanguage());
                that._numberParser = Globalize.numberParser();
                that._dateParser = Globalize.dateParser();
                that._numberFormatter = Globalize.numberFormatter();
                that._dateFormatter = Globalize.dateFormatter();
                that._currencyFormatter = Globalize.currencyFormatter(defaultCurrencyName);
                observer.next();
                observer.complete();
            });
        });
    }

    private loadJsonFiles(): Observable<void> {
        let files: string[] = [];
        let language = this.getLanguage();

        files.push(this._appSettings.productLibFolder + "/cldr-data/supplemental/likelySubtags.json");
        files.push(this._appSettings.productLibFolder + "/cldr-data/main/" + language + "/numbers.json");
        files.push(this._appSettings.productLibFolder + "/cldr-data/supplemental/numberingSystems.json");
        files.push(this._appSettings.productLibFolder + "/cldr-data/supplemental/plurals.json");
        files.push(this._appSettings.productLibFolder + "/cldr-data/supplemental/ordinals.json");
        files.push(this._appSettings.productLibFolder + "/cldr-data/main/" + language + "/currencies.json");
        files.push(this._appSettings.productLibFolder + "/cldr-data/supplemental/currencyData.json");
        files.push(this._appSettings.productLibFolder + "/cldr-data/main/" + language + "/ca-gregorian.json");
        files.push(this._appSettings.productLibFolder + "/cldr-data/main/" + language + "/timeZoneNames.json");
        files.push(this._appSettings.productLibFolder + "/cldr-data/supplemental/timeData.json");
        files.push(this._appSettings.productLibFolder + "/cldr-data/supplemental/weekData.json");
        files.push(this._appSettings.productLibFolder + "/cldr-data/main/" + language + "/dateFields.json");
        files.push(this._appSettings.productLibFolder + "/cldr-data/main/" + language + "/units.json");

        let jsonCalls: Observable<void>[] = [];
        for (let file of files) {
            jsonCalls.push(this.loadJsonFile(file));
        }
        return Observable.forkJoin<void>(jsonCalls);
    }

    private loadJsonFile(filePath: string): Observable<void> {
        return this._http.get(filePath)
            .map(res => res.json())
            .do(res => Cldr.load(res));
    }
}
