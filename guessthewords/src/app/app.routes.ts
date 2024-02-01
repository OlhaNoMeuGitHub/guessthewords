import { Routes } from '@angular/router';
import { ListwordsComponent } from './listwords/listwords.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'listwords', component: ListwordsComponent },
    { path: 'card/:categoria', component: CardComponent },
];
