import { Component, Input, provide  }       from 'angular2/core';
import { NgControl, ControlValueAccessor}   from 'angular2/common';

import { LocalisationService }              from '../localisation.service';
import { NumberFormatterProperties }        from '../localisation.model';

@Component({
    selector: 'my-number',
    template: `    
    <input (blur)='onblur()' type="text" class="form-control" [(ngModel)] = '_displayNumber'  (ngModelChange)='change($event)'  />    
  `,
})

export class NumberComponent implements ControlValueAccessor {
    @Input() minFrac: number;
    @Input() maxFrac: number;
    @Input() minSig: number;
    @Input() maxSig: number;

    private _displayNumber: string = '';
    private _number: number;

    private onChange = (_: number) => { };
    private onTouched = () => { };

    constructor(private _localisationService: LocalisationService, private _ngControl: NgControl) {
        if (this._ngControl)
            this._ngControl.valueAccessor = this;
    }

    public change(newValue) {
        try {
            let result = this.toValue(newValue);            
            this._number = result;
            this.onChange(result);
        }
        catch (err) {
            return null
        }
    }

    public  writeValue(value?: number) {
        if (value != null && value != undefined) {
            this._number = value;
            console.log('on write value');
            this._displayNumber = this.toDisplay(value);
        }
    }

    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    private toDisplay = (value: number): string => {
        let formatter: NumberFormatterProperties = {};
        let hasProperty = false;
        if (this.minSig != null && this.minSig != undefined) { formatter.minimumSignificantDigits = this.minSig; hasProperty = true; }
        if (this.maxSig != null && this.maxSig != undefined) { formatter.maximumSignificantDigits = this.maxSig; hasProperty = true; }
        if (this.minFrac != null && this.minFrac != undefined) { formatter.minimumFractionDigits = this.minFrac; hasProperty = true; }
        if (this.maxFrac != null && this.maxFrac != undefined) { formatter.maximumFractionDigits = this.maxFrac; hasProperty = true; }

        if (hasProperty) {
            return this._localisationService.formatNumber(value, null, formatter);
        } else {
            return this._localisationService.formatNumber(value);
        }
    }

    private toValue = (stringValue: string): number => {
        return this._localisationService.parseNumber(stringValue);
    }

    private onblur() {
        this._displayNumber = this.toDisplay(this._number);
    }
}