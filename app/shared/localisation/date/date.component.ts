import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter, provide }     from 'angular2/core';
import { NgControl, ControlValueAccessor }                                            from 'angular2/common';

import { LocalisationService }              from '../localisation.service';
import { DateFormatterProperties }          from '../localisation.model';

@Component({
    selector: 'my-date',
    template: `
  <div class="input-group date">
    <input id='my_datepicker' type="text" class="form-control"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
  </div>
  `,
})

export class DateComponent implements AfterViewInit, ControlValueAccessor {
    @Input() pattern: string;
    /**
     * pattern: 
     * 'short'              "11/1/10"
     * 'medium'          "Nov 1, 2010"
     * 'long'               "November 1, 2010"
     * 'full'                "Monday, November 1, 2010"
     */

    private _date: Date;

    private onChange = (_: Date) => { };
    private onTouched = () => { };

    constructor(private _localisationService: LocalisationService, private _ngControl: NgControl) {
        if (this._ngControl) {
            this._ngControl.valueAccessor = this;
        }
    }

    public ngAfterViewInit() {
        let that = this;
        $('#my_datepicker').datepicker({
            autoclose: true,
            language: this._localisationService.getLocale()[0],
            format: {
                toDisplay: this.toDisplay,
                toValue: this.toValue
            }
        });

        $('#my_datepicker').datepicker("setDate", this._localisationService.formatDate(this._date));

        $('#my_datepicker').datepicker()
            .on('changeDate', function (e) {
                // this is raised only when user selects a new date from the date popup pane
                that.onChange(that._date);
            });
    }

    public writeValue(value?: Date) {
        if (value) {
            this._date = value;
        }
    }

    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    private toDisplay = (date: Date, format, langulage: string) => {
        this._date = date;
        let formatter: DateFormatterProperties = {};
        if (this.pattern) {
            formatter.date = this.pattern;
            return this._localisationService.formatDate(date, null, formatter);
        }
        else {
            return this._localisationService.formatDate(date);
        }
    }
    private toValue = (date: string, format, langulage: string) => {
        try {
            this._date = this._localisationService.parseDate(date);
            return this._date;
        }
        catch (err) {
            return null;
        }
    }
}