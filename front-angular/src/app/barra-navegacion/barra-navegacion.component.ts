import { Component } from '@angular/core';
import { AuthService } from '../login/auth/auth.service';

@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [],
  templateUrl: './barra-navegacion.component.html',
  styleUrl: './barra-navegacion.component.css',
})
export class BarraNavegacionComponent {
  isDropdownOpen = {
    librosDropdown: false,
    sociosDropdown: false,
    prestamosDropdown: false,
    usuariosDropdown:false
  };

  toggleDropdown(dropdown: 'librosDropdown' | 'sociosDropdown' | 'prestamosDropdown'|'usuariosDropdown') {
    this.isDropdownOpen[dropdown] = !this.isDropdownOpen[dropdown];
  }
  constructor(private authService: AuthService) { }

  onLogout(): void {
    this.authService.logout(); // Llamar al método logout del servicio
  }
}
