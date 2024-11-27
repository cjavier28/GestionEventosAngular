import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { GestionEventosEve, InformacionEvento, InscribirEventoRequest } from '../../swagger/gestioneventos/models';
import { ServiciogestioneventosService } from '../../servicios/serviciogestioneventos.service';
import { Router, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';  // Usar CommonModule
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CarruselComponent } from "../../carrusel/carrusel.component";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-listargestioneventos',
  standalone: true,  // Define que este es un componente standalone
  imports: [
    MatSortModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    CommonModule,  // Usar CommonModule en lugar de BrowserModule
    MatCheckboxModule,
    MatPaginatorModule,
    CarruselComponent,
    MatSnackBarModule,
    MatIconModule

  ],
  templateUrl: './listargestioneventos.component.html',
  styleUrls: ['./listargestioneventos.component.css']
})
export class ListargestioneventosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('barCanvas', { static: true }) barCanvas!: ElementRef<HTMLCanvasElement>;

  eventos: MatTableDataSource<GestionEventosEve> = new MatTableDataSource();
  displayedColumns:   string[] = ['idEvento', 'nombre', 'descripcion', 'estado', 'totalusuarios','capacidadmaxima', 'ubicacion', 'fechaCreacion','acciones','inscripcion',"detalle"];
  eventosData: GestionEventosEve[] = [];
  cantidadregistro: number = 0;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20]; // Opciones de tamaño de página
  idusuario:number=2;
  eventosgraficos: any[] = [];
  chart: any;  // Variable para almacenar la instancia del gráfico

  constructor(
    private gestionEventosService: ServiciogestioneventosService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadEvents(); // Cargar eventos en el inicio
  }

  ngAfterViewInit(): void {
    this.eventos.sort = this.sort;
    this.eventos.paginator = this.paginator;
  }

  renderChart(eventos: any[]): void {
    const labels = eventos.map((evento) => evento.nombreEvento);
    const data = eventos.map((evento) => evento.totalUsuarios);

    // Si el gráfico ya existe, lo destruimos antes de crear uno nuevo
    if (this.chart) {
      this.chart.destroy();
    }

    // Crear un nuevo gráfico de tipo 'pie'
    this.chart = new Chart(this.barCanvas.nativeElement, {
      type: 'pie', // Cambiar a 'pie' para gráfico de pastel
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total Usuarios',
            data: data,
            backgroundColor: [
              'rgba(66, 165, 245, 0.8)',
              'rgba(102, 187, 106, 0.8)',
              'rgba(255, 202, 40, 0.8)',
              'rgba(156, 39, 176, 0.8)', // Puedes agregar más colores si tienes más categorías
              'rgba(233, 30, 99, 0.8)',
            ],
            borderColor: [
              'rgba(66, 165, 245, 1)',
              'rgba(102, 187, 106, 1)',
              'rgba(255, 202, 40, 1)',
              'rgba(156, 39, 176, 1)',
              'rgba(233, 30, 99, 1)',
            ],
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          datalabels: {
            anchor: 'center',
            align: 'center',
            color: '#fff',
            font: {
              size: 14,
              weight: 'bold',
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  }


  // Método para cargar eventos
  async loadEvents(): Promise<void> {
    try {
      this.eventosData = await this.gestionEventosService.ObtenerInformacionEvento(this.idusuario);
      this.eventos.data = this.eventosData;
      this.eventosgraficos =this.eventosData ;
      this.renderChart(this.eventosgraficos);
      this.cantidadregistro = this.eventosData.length;
      this.cdr.detectChanges();  // Asegura que Angular detecte los cambios correctamente
    } catch (error) {
      console.error('Error al cargar los eventos:', error);
      this.mostrarNotificacion('Error al cargar los eventos', 'Cerrar');
    }
  }

  // Método para mostrar notificaciones
  mostrarNotificacion(mensaje: string, accion: string = 'Cerrar') {
    this.snackBar.open(mensaje, accion, {
      duration: 6000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  // Método para actualizar eventos desde el servicio
  refreshEvents() {
    this.loadEvents();  // Recarga los eventos
  }

  // Método para manejar cambios en la paginación
  onPaginateChange(event: any) {
    console.log('Página actual:', event.pageIndex);
    console.log('Tamaño de la página:', event.pageSize);
  }

  // Método para editar un evento
  editarEvento(evento: GestionEventosEve): void {
    this.router.navigate(['/inscribir'], {
      queryParams: {
        idEvento: evento.idEvento,
        idUsuario: evento.idUsuario,
        proceso: "EDITAR"
      }
    });
  }
  actualizarGrafico(): void {
    // Actualizar los datos del gráfico con la nueva información
    const labels = this.eventosgraficos.map((evento:any) => evento.nombreEvento);
    const data = this.eventosgraficos.map((evento:any) => evento.totalUsuarios);

    // Actualiza los datos del gráfico
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = data;

    // Refresca el gráfico
    this.chart.update();
  }
  // Método para eliminar un evento
  async eliminarEvento(evento: InformacionEvento): Promise<void> {
    if (confirm(`¿Está seguro de que desea eliminar el evento "${evento.nombreEvento}"?`)) {
      try {
        await this.gestionEventosService.EliminarEventoPorId({ idEvento: evento.idEvento, idUsuario: evento.idUsuario });
        const index = this.eventosData.findIndex(e => e.idEvento === evento.idEvento);
        if (index >= 0) {
          this.eventosData.splice(index, 1);  // Elimina el evento localmente
          this.eventos.data = [...this.eventosData];  // Actualiza la tabla
        }
        this.mostrarNotificacion('Evento eliminado exitosamente');
        this.loadEvents();
        this.cdr.detectChanges();  // Fuerza la actualización de la vista

      } catch (error) {
        console.error('Error al eliminar evento:', error);
        this.mostrarNotificacion('Error al eliminar el evento', 'Cerrar');
      }
    }
  }

  // Método para inscribir
  async inscribir() {
    this.router.navigate(['/inscribir']);
  }


  async InscribirEventoUsuario(evento:InformacionEvento){

    let inscribirEventoRequest:InscribirEventoRequest={};

    inscribirEventoRequest.idEvento = evento.idEvento;
    inscribirEventoRequest.idUsuario=this.idusuario;


    let respuesta:number= await this.gestionEventosService.InscribirseEvento(inscribirEventoRequest);
    console.log(respuesta);
 if(respuesta>0){
      this.mostrarNotificacion("Ha quedado inscrito exitosamente!!")
    }else{
      this.mostrarNotificacion("Usted ya esta inscrito, es titular o se superaron el máximo de inscripciones");
    }
    await this.loadEvents();
  }

  // Método para actualizar el pageSize desde el dropdown
  onPageSizeChange(event: any): void {
    this.pageSize = event.target.value;  // Actualiza el tamaño de la página
  }
}
