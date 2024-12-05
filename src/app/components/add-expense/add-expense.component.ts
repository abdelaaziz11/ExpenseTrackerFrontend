import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { v4 as uuidv4 } from 'uuid'; // Installe uuid : npm install uuid

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent {
  title = '';
  category = '';
  amount: number | null = null;

  constructor(private expenseService: ExpenseService) {}

  addExpense() {
    if (!this.title || !this.category || !this.amount) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
  
    const newExpense: Expense = {
      id: '',
      title: this.title,
      category: this.category,
      amount: this.amount,
      date: new Date().toISOString(),
    };
  
    this.expenseService.addExpense(newExpense); // Appelle le service sans `then`
    alert('Dépense ajoutée avec succès !');
    this.title = '';
    this.category = '';
    this.amount = null;
  }
  
}
