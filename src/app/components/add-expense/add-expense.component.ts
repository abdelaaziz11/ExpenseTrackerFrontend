import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importer MatSnackBar
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent {
  title = '';
  category = '';
  amount: number | null = null;

  constructor(
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar 
  ) {}

  addExpense() {
    if (!this.title || !this.category || !this.amount) {
      this.showNotification('Veuillez remplir tous les champs.', 'error');
      return;
    }

    const newExpense: Expense = {
      id: '',
      title: this.title,
      category: this.category,
      amount: this.amount,
      date: new Date().toISOString(),
    };

    this.expenseService.addExpense(newExpense);
    this.showNotification('Dépense ajoutée avec succès !', 'success');
    this.title = '';
    this.category = '';
    this.amount = null;
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, 
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }
}
