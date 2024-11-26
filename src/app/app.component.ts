import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListargestioneventosComponent } from './componentes/listargestioneventos/listargestioneventos.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { CarruselComponent } from "./carrusel/carrusel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListargestioneventosComponent, NavbarComponent, CarruselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GestionEventosAngular';
}
