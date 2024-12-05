import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { ViewExpensesComponent } from './components/view-expenses/view-expenses.component';
import { SetBudgetComponent } from './components/set-budget/set-budget.component';
import { AuthGuard } from './guards/auth.guard'; // Garde pour les pages sécurisées

const routes: Routes = [
  // Redirection par défaut vers le Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Composants publics
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Composants protégés (nécessitent une authentification)
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'view-expenses', pathMatch: 'full' }, // Page par défaut du Dashboard
      { path: 'add-expense', component: AddExpenseComponent },
      { path: 'view-expenses', component: ViewExpensesComponent },
      { path: 'set-budget', component: SetBudgetComponent },
    ],
  },

  // Redirection en cas de route inconnue
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
