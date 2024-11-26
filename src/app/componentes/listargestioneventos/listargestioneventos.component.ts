import { Import } from './../../../../node_modules/@angular/cdk/schematics/update-tool/utils/imports.d';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GestionEventosEve } from '../../swagger/gestioneventos/models';
import { ServiciogestioneventosService } from '../../servicios/serviciogestioneventos.service';
import { Router, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CarruselComponent } from "../../carrusel/carrusel.component";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listargestioneventos',
  standalone:true,
  imports: [MatSortModule, RouterModule, FormsModule, MatTableModule, CommonModule, MatCheckboxModule, MatPaginatorModule, CarruselComponent, MatSnackBarModule],

  templateUrl: './listargestioneventos.component.html',
  styleUrls: ['./listargestioneventos.component.css']
})
export class ListargestioneventosComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  eventos: MatTableDataSource<GestionEventosEve> = new MatTableDataSource();
  displayedColumns: string[] = ['idEvento', 'nombre', 'descripcion', 'estado', 'fechaCreacion','acciones' ]; // Columnas visibles
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador
  eventosData:GestionEventosEve[]=[];
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20]; // Opciones de tamaño de página
  cantidadregistro:number= this.eventosData.length;
  constructor(private gestionEventosService: ServiciogestioneventosService,private router: Router, private snackBar: MatSnackBar,private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    try {
      this.eventosData = await this.gestionEventosService.ObtenerGestionEventos();
      this.eventos.data = this.eventosData;
      this.eventos.paginator = this.paginator; // Asocia el paginator al dataSource
      this.cantidadregistro= this.eventosData.length;
      this.eventos.sort = this.sort;  // Vincula MatSort a tu MatTableDataSource
    } catch (error) {
      console.error('Error al cargar los eventos', error);
    }
  }

  mostrarNotificacion(mensaje: string, accion: string = 'Cerrar') {
    this.snackBar.open(mensaje, accion, {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center', // Posición horizontal (start, center, end, left, right)
      verticalPosition: 'top', // Posición vertical (top, bottom)
    });
  }

  refreshEvents() {
    this.gestionEventosService.ObtenerGestionEventos().then(eventos => {
      this.eventosData = eventos;
      this.eventos.data = this.eventosData;
      this.eventos.paginator = this.paginator; // Asociamos el paginador
    }).catch(error => {
      console.error('Error al cargar los eventos', error);
    });
  }

  onPaginateChange(event: any) {
    // Manejo de la paginación, si es necesario
    console.log('Pagina actual:', event.pageIndex);
    console.log('Tamaño de la página:', event.pageSize);
  }

  editarEvento(evento: GestionEventosEve): void {
    // Navegamos a la página de inscribir y pasamos los parámetros a través de queryParams
    this.router.navigate(['/inscribir'], {
      queryParams: {
        idEvento: evento.idEvento,
        idUsuario: evento.idUsuario,
        proceso: "EDITAR"
      }
    });
  }

  async loadEvents(): Promise<void> {
    try {
      const eventos = await this.gestionEventosService.ObtenerGestionEventos();
      this.eventosData = eventos;
      this.eventos.data = this.eventosData; // Actualiza directamente el dataSource
      this.cantidadregistro = this.eventosData.length;
    } catch (error) {
      console.error('Error al cargar los eventos:', error);
      this.snackBar.open('Error al cargar los eventos', 'Cerrar', { duration: 3000 });
    }
  }
  eliminarEvento(evento: GestionEventosEve): void {
    if (confirm(`¿Está seguro de que desea eliminar el evento "${evento.nombre}"?`)) {
      this.gestionEventosService.EliminarEventoPorId({ idEvento: evento.idEvento, idUsuario: evento.idUsuario })
        .then(() => {
          const index = this.eventosData.findIndex(e => e.idEvento === evento.idEvento);
          if (index >= 0) {
            this.eventosData.splice(index, 1); // Elimina localmente
            this.eventos.data = [...this.eventosData]; // Actualiza el dataSource
          }
          this.mostrarNotificacion('Evento eliminado exitosamente');
          this.cdr.detectChanges(); // Fuerza la actualización de la vista
        })
        .catch(error => {
          console.error('Error al eliminar evento:', error);
          this.mostrarNotificacion('Error al eliminar el evento', 'Cerrar');
        });
    }
  }

  async inscribir(){
    this.router.navigate(['/inscribir']);
  }


  ngAfterViewInit(): void {
    if (this.eventos && this.paginator) {
      this.eventos.paginator = this.paginator; // Asegura que el paginador esté configurado
      console.log('Paginador asociado:', this.paginator);
    }
  }
 // Método para actualizar el pageSize desde el dropdown
 onPageSizeChange(event: any): void {
  this.pageSize = event.target.value;  // Actualiza el tamaño de la página cuando el usuario seleccione una opción
}

}

