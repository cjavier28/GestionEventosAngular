import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../servicios/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authService.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }

  logout() {
    this.authService.logout();
  }
}
