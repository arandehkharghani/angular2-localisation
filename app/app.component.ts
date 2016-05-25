import { ElementRef, provide } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { CurrencyTesterComponent } from './currency-tester/currency-tester.component';
import { NumberTesterComponent } from './number-tester/number-tester.component';
import { DateTesterComponent } from './date-tester/date-tester.component';

import { LocalisationService } from './shared/localisation/localisation.service';
import { APPSETTINGS, APP_SETTINGS } from './shared/app-settings';


@Component({
    selector: 'my-app',
    template: `
    <div *ngIf='_isReady'>
        <h1 class="title">Tab Component</h1>
    
        <nav>
        
        <a [routerLink]="['CurrencyTester']">Currency Tester</a>
        <a [routerLink]="['NumberTester']">Number Tester</a>
        <a [routerLink]="['DateTester']">Date Tester</a>
    
        </nav>
    
        <router-outlet></router-outlet>
    </div>
  `,
    providers: 
    [
        provide(APP_SETTINGS, { useValue: APPSETTINGS }),
        provide(LocalisationService, { useClass: LocalisationService }),        
    ]
    ,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/currency-tester', name: 'CurrencyTester', component: CurrencyTesterComponent },
    { path: '/number-tester', name: 'NumberTester', component: NumberTesterComponent },
    { path: '/date-tester', name: 'DateTester', component: DateTesterComponent }
])
export class AppComponent {
    private _isReady: boolean = false;
    
    constructor(private _localisationService: LocalisationService) {
        Observable.forkJoin(this._localisationService.init()).subscribe(res=> this._isReady = true);
    }
}
