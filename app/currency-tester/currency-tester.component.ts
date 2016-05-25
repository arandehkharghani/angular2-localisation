import {Component, OnInit, Inject,OnChanges} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import { CurrencyComponent } from '../shared/localisation/currency/currency.component';
import { LocaleCurrencyPipe } from '../shared/localisation/locale-currency.pipe';

import { AppSettings, APP_SETTINGS } from '../shared/app-settings';

@Component({
  templateUrl: 'app/currency-tester/currency-tester.html',
  directives: [ CurrencyComponent ],
  pipes:[ LocaleCurrencyPipe ]
})

export class CurrencyTesterComponent implements OnInit {
    private money = 2000;
        
    constructor(@Inject(APP_SETTINGS) private appSettings: AppSettings) {        
    }

    public ngOnInit() {
    }  
}