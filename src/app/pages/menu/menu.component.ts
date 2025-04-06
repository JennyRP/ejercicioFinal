import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [CommonModule, RouterLink] // Agrega CommonModule a los imports
})
export class MenuComponent {
  estaLogueado$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.estaLogueado$ = this.authService.user$.pipe(
      map(user => !!user)
    );
  }

  salir() {
    this.authService.logout().subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (error) => console.error('Error al cerrar sesión:', error)
    });
  }

  estaLogueado(valor: boolean | null): boolean {
    return !!valor;
  }
}