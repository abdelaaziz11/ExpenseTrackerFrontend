import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.scss'],
})
export class ViewExpensesComponent implements OnInit, AfterViewInit {
  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef;

  expenses: Expense[] = [];
  totalExpenses: number = 0;
  currentBudget: number = 0;
  isExceeded: boolean = false;
  chart: Chart | null = null;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
  // S'abonner aux dépenses pour recevoir les mises à jour en temps réel
  this.expenseService.getExpenses().subscribe((expenses) => {
    this.expenses = expenses;
    this.totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    this.updateChart(); // Met à jour le graphique
  });

  // Charger le budget
  this.expenseService.getBudget().subscribe((budget) => {
    this.currentBudget = budget;
    this.updateChart(); // Met à jour le graphique
  });
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  // Initialise le graphique
  private initializeChart(): void {
    this.chart = new Chart(this.doughnutChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Dépenses', 'Budget restant'],
        datasets: [
          {
            data: [this.totalExpenses, Math.max(this.currentBudget - this.totalExpenses, 0)],
            backgroundColor: ['#FF6384', '#36A2EB'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }

  // Met à jour les données du graphique
  private updateChart(): void {
    if (this.chart) {
      const budgetRemaining = Math.max(this.currentBudget - this.totalExpenses, 0);
      this.chart.data.datasets[0].data = [this.totalExpenses, budgetRemaining];
      this.chart.update();
    }

    this.isExceeded = this.totalExpenses > this.currentBudget;
  }

  // Recalcule le total des dépenses
  private calculateTotalExpenses(): void {
    this.totalExpenses = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }

  // Supprime une dépense
  deleteExpense(id: string): void {
    this.expenseService.deleteExpense(id); // Supprime la dépense via le service
    // Recharge les dépenses et met à jour les totaux après suppression
    this.expenseService.getExpenses().subscribe((expenses: Expense[]) => {
      this.expenses = expenses;
      this.calculateTotalExpenses();
      this.updateChart();
    });
  }
}
