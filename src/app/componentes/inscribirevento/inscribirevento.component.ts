import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Evento } from '../../app/interfaces/interfaces';
import { ServiciogestioneventosService } from '../../servicios/serviciogestioneventos.service';
import { CrearEventoRequest } from '../../swagger/gestioneventos/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscribirevento',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './inscribirevento.component.html',
  styleUrl: './inscribirevento.component.css'
})
export class InscribireventoComponent {
  eventoForm: FormGroup;

  constructor(private fb: FormBuilder, private gestionEventosService: ServiciogestioneventosService) {
     // Inicializamos el formulario con validaciones
     this.eventoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      fechaHora: ['', Validators.required],
      ubicacion: ['', [Validators.required, Validators.maxLength(100)]],
      capacidadMaxima: ['', [Validators.required, Validators.min(1)]],
      idUsuario: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Método para enviar el formulario
  async onSubmit() {
    // Verificar si el formulario es inválido
    if (this.eventoForm.invalid) {
      // Si es inválido, no enviamos el formulario
      this.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los errores
      alert("Validar campos");
      return;
    }

    // Si el formulario es válido, creamos el objeto Evento
    const nuevoEvento: CrearEventoRequest = this.prepareEventoObject();

    // Llamamos al servicio para crear el evento
    let crearevento:CrearEventoRequest=nuevoEvento;
    await this.gestionEventosService.InsertarEvento(crearevento);
    alert("Evento Creado con exito");
    this.eventoForm.reset();

  }

  // Método para marcar todos los campos como tocados (para mostrar los errores)
  private markAllAsTouched(): void {
    Object.keys(this.eventoForm.controls).forEach(field => {
      const control = this.eventoForm.get(field);
      control?.markAsTouched();
    });
  }

  // Método para preparar el objeto Evento a partir de los valores del formulario
  private prepareEventoObject(): CrearEventoRequest {
    // Usamos el formulario para obtener los valores
    const evento: CrearEventoRequest = {
      nombre: this.eventoForm.get('nombre')?.value,
      descripcion: this.eventoForm.get('descripcion')?.value,
      fechaHora:this.eventoForm.get('fechaHora')?.value,
      ubicacion: this.eventoForm.get('ubicacion')?.value,
      capacidadMaxima: this.eventoForm.get('capacidadMaxima')?.value,
      idUsuario: this.eventoForm.get('idUsuario')?.value
    };

    return evento;
  }

  get nombre() { return this.eventoForm.get('nombre'); }
  get descripcion() { return this.eventoForm.get('descripcion'); }
  get fechaHora() { return this.eventoForm.get('fechaHora'); }
  get ubicacion() { return this.eventoForm.get('ubicacion'); }
  get capacidadMaxima() { return this.eventoForm.get('capacidadMaxima'); }
  get idUsuario() { return this.eventoForm.get('idUsuario'); }
}
