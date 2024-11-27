import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Evento } from '../../app/interfaces/interfaces';
import { ServiciogestioneventosService } from '../../servicios/serviciogestioneventos.service';
import {EditarEventoRequest, CrearEventoRequest, EliminarEventoRequest } from '../../swagger/gestioneventos/models';
import { CommonModule } from '@angular/common';
import { CarruselComponent } from '../../carrusel/carrusel.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalgeneralComponent } from '../modalgeneral/modalgeneral.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-inscribirevento',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,CarruselComponent, MatDialogModule,MatButtonModule   ],
  templateUrl: './inscribirevento.component.html',
  styleUrl: './inscribirevento.component.css'
})
export class InscribireventoComponent {

  eventoId: number | null = null;
  eventoForm: FormGroup;
  esinsertar =true;
  idevento:number = 0;
  constructor(private fb: FormBuilder, private gestionEventosService: ServiciogestioneventosService,public dialog: MatDialog,private router: Router,  private route: ActivatedRoute ) {
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



 async cargarEvento(id: any): Promise<void> {
  try {
    this.esinsertar = false;
    this.idevento = id;
    const evento = await this.gestionEventosService.ObtenerGestionEventosPorId(id);
    this.eventoForm.patchValue({
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      fechaHora: evento.fechaHora,
      ubicacion: evento.ubicacion,
      capacidadMaxima: evento.capacidadMaxima,
      idUsuario: evento.idUsuario
    });

    this.eventoForm.get('nombre')?.disable();
    this.eventoForm.get('descripcion')?.disable();
    this.eventoForm.get('idUsuario')?.disable();

  } catch (error) {
    console.error('Error al cargar el evento:', error);
  }
}


ngOnInit(): void {
  // Subscribimos a los queryParams para obtener los valores enviados
  this.route.queryParams.subscribe(queryParams => {
    const idEvento = queryParams['idEvento'];
    const idUsuario = queryParams['idUsuario'];
    const proceso = queryParams['proceso'];

    this.idevento = idEvento;

    console.log(`ID Evento: ${idEvento}, ID Usuario: ${idUsuario}, Proceso: ${proceso}`);


    if (proceso === "EDITAR") {
      this.cargarEvento(idEvento);
    }
  });
}




  async onSubmit() {

    if (this.eventoForm.invalid) {

      this.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los errores
      alert("Validar campos");
      return;
    }

    const nuevoEvento: CrearEventoRequest = this.prepareEventoObject();


    let crearevento:CrearEventoRequest=nuevoEvento;
    if(this.esinsertar){
     let  respuestainsertar = await this.gestionEventosService.InsertarEvento(crearevento);

     this.dialog.open(ModalgeneralComponent, {
      width: '400px', // Tamaño del modal
      data:{ mensaje: '¡Guardado exitosamente!', modal:1 }
    });
    }else{

      let valores = {
        capacidadMaxima:crearevento.capacidadMaxima,
        fechaHora:crearevento.fechaHora,
        idEvento:this.idevento,
        idUsuario:crearevento.idUsuario,
        ubicacion:crearevento.ubicacion
      };

     let actualizar = await this.gestionEventosService.EditarEvento(valores);


     this.dialog.open(ModalgeneralComponent, {
      width: '400px', // Tamaño del modal
      data:{ mensaje: 'Editado exitosamente!', modal:1 }
    });
    }

    this.eventoForm.reset();
    this.router.navigate(['/listar']);

  }


  private markAllAsTouched(): void {
    Object.keys(this.eventoForm.controls).forEach(field => {
      const control = this.eventoForm.get(field);
      control?.markAsTouched();
    });
  }


  private prepareEventoObject(): CrearEventoRequest {
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
