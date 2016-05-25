import {Component, OnInit, Inject,OnChanges} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import { NumberComponent } from '../shared/localisation/number/number.component';
import { LocaleNumberPipe } from '../shared/localisation/locale-number.pipe';

import { AppSettings, APP_SETTINGS } from '../shared/app-settings';

@Component({
  templateUrl: 'app/number-tester/number-tester.html',
  directives: [ NumberComponent ],
  pipes:[ LocaleNumberPipe ]
})

export class NumberTesterComponent implements OnInit {
    private number:number = 2000;
        
    constructor(@Inject(APP_SETTINGS) private appSettings: AppSettings) {        
    }

    public ngOnInit() {
    }  
}