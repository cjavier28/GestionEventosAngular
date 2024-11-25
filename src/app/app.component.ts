import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListargestioneventosComponent } from './componentes/listargestioneventos/listargestioneventos.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[RouterOutlet,ListargestioneventosComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GestionEventosAngular';
}
