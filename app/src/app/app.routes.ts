import { Routes } from '@angular/router';
import { Step1Component } from './funnel/step1/step1.component';
import { Step2Component } from './funnel/step2/step2.component';
import { Step3Component } from './funnel/step3/step3.component';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'funnel/step1', component: Step1Component },
  { path: 'funnel/step2', component: Step2Component },
  { path: 'funnel/step3', component: Step3Component }
];
