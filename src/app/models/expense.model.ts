export interface Expense {
    id: string;       // Identifiant unique de la dépense
    title: string;    // Titre de la dépense
    category: string; // Catégorie (e.g., Food, Transport)
    amount: number;   // Montant de la dépense
    date: string;     // Date de la dépense (format YYYY-MM-DD)
  }
  