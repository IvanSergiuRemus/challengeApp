import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { TokenInterceptor, ErrorInterceptor } from './services/token.interceptor';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { DashboardComponent } from './components/reusable/dashboard/dashboard.component'; 
import { ContactReducer } from './store/reducers/contact.reducer';
import { reducer } from './store/reducers/auth.reducers';
import { PhonePipe } from './components/contacts/phonePipe';
import { searchPipe } from './components/contacts/searchPipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    LogInComponent,
    ContactsComponent,
    FavouritesComponent,
    DashboardComponent,
    PhonePipe,
    searchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    StoreModule.forRoot({
      contact: ContactReducer,
      auth: reducer,
    }),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: '', component: LandingComponent },
      { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
      { path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '/' }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }