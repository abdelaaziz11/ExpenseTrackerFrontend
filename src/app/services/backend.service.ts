import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Récupérer les dépenses depuis le backend .NET
  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/expenses`);
  }

  // Ajouter une dépense via le backend .NET
  addExpense(expense: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/expenses`, expense);
  }

  // Supprimer une dépense
  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/expenses/${id}`);
  }
}
