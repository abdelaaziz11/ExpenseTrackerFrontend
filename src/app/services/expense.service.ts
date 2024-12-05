import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:5057/api/expenses'; // URL du backend .NET
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  private budgetSubject = new BehaviorSubject<number>(0);

  private monthlyBudget: number = 0; // Stockage local du budget

  constructor(private http: HttpClient) {
    this.loadExpensesFromBackend();
    this.loadBudgetFromBackend();
  }

  // Charger les dépenses depuis le backend
  private loadExpensesFromBackend() {
    this.http.get<Expense[]>(this.apiUrl).subscribe((expenses) => {
      this.expensesSubject.next(expenses);
    });
  }

  // Charger le budget depuis le backend
  private loadBudgetFromBackend() {
    this.http.get<{ budget: number }>(`${this.apiUrl}/budget`).subscribe((response) => {
      this.monthlyBudget = response.budget || 0;
      this.budgetSubject.next(this.monthlyBudget);
    });
  }

  // Récupérer les dépenses
  getExpenses(): Observable<Expense[]> {
    return this.expensesSubject.asObservable();
  }

  addExpense(expense: Expense): void {
    this.http.post<Expense>(this.apiUrl, expense).subscribe((newExpense) => {
      // Récupère la liste actuelle des dépenses
      const currentExpenses = this.expensesSubject.value;
  
      // Ajoute la nouvelle dépense dans le BehaviorSubject
      this.expensesSubject.next([...currentExpenses, newExpense]);
    });
  }
  

  // Supprimer une dépense
  deleteExpense(id: string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      const updatedExpenses = this.expensesSubject.value.filter((exp) => exp.id !== id);
      this.expensesSubject.next(updatedExpenses);
    });
  }

  setBudget(budget: number): void {
    this.http.post(`${this.apiUrl}/budget`, { budget }).subscribe(
      () => {
        this.monthlyBudget = budget;
        this.budgetSubject.next(budget);
      },
      (error) => {
        console.error('Erreur lors de la définition du budget :', error);
      }
    );
  }

  // Récupérer le budget
  getBudget(): Observable<number> {
    return this.budgetSubject.asObservable();
  }

  // Vérifier si le budget est dépassé
  isBudgetExceeded(): Observable<{ isExceeded: boolean; totalExpenses: number; budget: number }> {
    return this.http.get<{ isExceeded: boolean; totalExpenses: number; budget: number }>(
      `${this.apiUrl}/is-budget-exceeded`
    );
  }

  // Récupérer le total des dépenses
  getTotalExpenses(): Observable<number> {
    return new Observable<number>((observer) => {
      this.getExpenses().subscribe((expenses) => {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        observer.next(total);
        observer.complete();
      });
    });
  }
}
