import {Component, OnInit, Inject,OnChanges} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import { DateComponent } from '../shared/localisation/date/date.component';
import { LocaleDatePipe } from '../shared/localisation/locale-date.pipe';

import { AppSettings, APP_SETTINGS } from '../shared/app-settings';

@Component({
  templateUrl: 'app/date-tester/date-tester.html',
  directives: [ DateComponent ],
  pipes:[ LocaleDatePipe ]
})

export class DateTesterComponent implements OnInit {
    private date = new Date();
        
    constructor(@Inject(APP_SETTINGS) private appSettings: AppSettings) {        
    }

    public ngOnInit() {
    }  
}