import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { ViewExpensesComponent } from './components/view-expenses/view-expenses.component';
import { SetBudgetComponent } from './components/set-budget/set-budget.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AddExpenseComponent,
    ViewExpensesComponent,
    SetBudgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Fournir Firebase
    provideAuth(() => getAuth()), // Fournir Auth
    provideFirestore(() => getFirestore()), // Fournir Firestore
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
