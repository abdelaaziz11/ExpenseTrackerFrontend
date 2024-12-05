import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    try {
      // Appelle le service d'inscription
      await this.authService.signUp(this.email, this.password);
      console.log('Inscription réussie');
      this.router.navigate(['/dashboard']); // Redirige vers le Dashboard
    } catch (error) {
      console.error('Erreur d\'inscription :', error);
      this.message = 'Erreur d\'inscription : ' + (error as any).message;
    }
  }
}
