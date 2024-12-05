import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      await this.authService.signIn(this.email, this.password);
      this.message = 'Connexion réussie ! 🎉';
      // Redirection vers le Dashboard
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error(error);
      this.message = 'Erreur de connexion : ' + (error as any).message;
    }
  }
}
