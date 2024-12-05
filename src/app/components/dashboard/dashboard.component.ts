import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this.user = await this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']); // Redirige si aucun utilisateur connecté
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      console.log('Déconnexion réussie');
      this.router.navigate(['/login']); // Redirection vers la page login
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  }
}
