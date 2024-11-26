import { Import } from './../../../../node_modules/@angular/cdk/schematics/update-tool/utils/imports.d';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GestionEventosEve } from '../../swagger/gestioneventos/models';
import { ServiciogestioneventosService } from '../../servicios/serviciogestioneventos.service';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CarruselComponent } from "../../carrusel/carrusel.component";


@Component({
  selector: 'app-listargestioneventos',
  standalone:true,
  imports: [RouterModule, MatTableModule, CommonModule, MatCheckboxModule, MatPaginatorModule, CarruselComponent],
  templateUrl: './listargestioneventos.component.html',
  styleUrls: ['./listargestioneventos.component.css']
})
export class ListargestioneventosComponent implements OnInit {
  eventos: MatTableDataSource<GestionEventosEve> = new MatTableDataSource();
  displayedColumns: string[] = ['idEvento', 'nombre', 'descripcion', 'estado', 'fechaCreacion','acciones' ]; // Columnas visibles
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador
  eventosData:GestionEventosEve[]=[];
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20]; // Opciones de tamaño de página
  cantidadregistro:number= this.eventosData.length;
  constructor(private gestionEventosService: ServiciogestioneventosService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.eventosData = await this.gestionEventosService.ObtenerGestionEventos();
      this.eventos.data = this.eventosData;
      this.eventos.paginator = this.paginator; // Asocia el paginator al dataSource
      this.cantidadregistro= this.eventosData.length;
    } catch (error) {
      console.error('Error al cargar los eventos', error);
    }
  }

  onPaginateChange(event: any) {
    console.log(event);
  }

  editarEvento(evento: GestionEventosEve): void {
    console.log('Editar evento:', evento);
    // Aquí puedes abrir un modal o redirigir a otra vista para editar
  }

  eliminarEvento(evento: GestionEventosEve): void {
    console.log('Eliminar evento:', evento);
    // Aquí puedes implementar la lógica de eliminación
  }
}
