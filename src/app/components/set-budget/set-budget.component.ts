import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-set-budget',
  templateUrl: './set-budget.component.html',
  styleUrls: ['./set-budget.component.scss'],
})
export class SetBudgetComponent implements OnInit {
  currentBudget: number = 0; // Stocker le budget actuel
  totalExpenses: number = 0; // Total des dépenses
  budget: number = 0; // Nouveau budget à définir
  isExceeded: boolean = false; // Indiquer si le budget est dépassé
  message: string = ''; // Message de confirmation ou d'erreur

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    // Charger le budget actuel
    this.expenseService.getBudget().subscribe((budget) => {
      this.currentBudget = budget || 0;
    });

    // Charger le total des dépenses
    this.expenseService.getTotalExpenses().subscribe((total) => {
      this.totalExpenses = total;
      this.checkBudgetExceeded();
    });
  }

  // Définir un nouveau budget
  setBudget(): void {
    if (this.budget <= 0) {
      this.message = 'Veuillez entrer un budget valide.';
      return;
    }

    this.expenseService.setBudget(this.budget);
    this.currentBudget = this.budget;
    this.checkBudgetExceeded();
    this.message = 'Budget défini avec succès.';
  }

  // Vérifier si le budget est dépassé
  private checkBudgetExceeded(): void {
    this.isExceeded = this.totalExpenses > this.currentBudget;
  }
}
