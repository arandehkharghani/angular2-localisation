import { Component, AfterViewInit, OnInit, Input, Output, provide, EventEmitter }   from 'angular2/core';
import { ControlValueAccessor, NgControl }                                          from 'angular2/common';

import { LocalisationService }              from '../localisation.service';
import { NumberComponent }                  from '../number/number.component';

const CURRENCY_NAME_AUD = 'AUD';

@Component({
    selector: 'my-currency',
    templateUrl: 'app/shared/localisation/currency/currency.component.html',
    directives: [NumberComponent]
})

export class CurrencyComponent implements ControlValueAccessor {
    @Input() currencyName: string = CURRENCY_NAME_AUD;
    @Input() minFrac: number = 2;
    @Input() maxFrac: number = 2;
    @Input() minSig: number;
    @Input() maxSig: number;
    
    private _currency: number;
    private _currencyNames: string[] = ['AUD', 'USD'];

    private onChange = (_: number) => { };
    private onTouched = () => { };

    constructor(private _ngControl: NgControl) {
        if (this._ngControl) {
            this._ngControl.valueAccessor = this;
        }
    }

    public writeValue(value?: number) {
        if (value != null && value != undefined) {
            this._currency = value;
        }
    }

    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    private onCurrencyNameChange(currencyname: string) {
        this.currencyName = currencyname;
    }

    private onCurrencyChange(value: number) {
        this.onChange(value);
    }
}