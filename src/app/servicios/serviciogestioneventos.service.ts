
import { CrearEventoRequest } from './../swagger/gestioneventos/models/crear-evento-request';
import { Evento } from './../app/interfaces/interfaces';
import { EliminarEventoRequest, GestionEventosEve, InformacionEvento, InscribirEventoRequest, UsuarioConsulta, UsuarioGestionEventos } from '../swagger/gestioneventos/models';
import { ServicioGestionEventosService, UserService } from '../swagger/gestioneventos/services';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciogestioneventosService {

  constructor(private serviciogestion:ServicioGestionEventosService, private userService:UserService) {

  }


/**
 *
 * @returns
 */
  async ObtenerGestionEventos(){
    return new Promise<Array<GestionEventosEve>>(
      (resolve)=>{
        this.serviciogestion.rootUrl = environment.urlserviciogestioneventos;
        this.serviciogestion
         .apiServicioGestionEventosListarEventosGet()
         .subscribe({
          next:(success:Array<GestionEventosEve>)=>{
            resolve(success);
          },
          error:(e)=>{
            resolve(e.console.error);
          }
         })
      }
    )
  }

/**
 *
 * @returns
 */
async ObtenerInformacionEvento(idusuario:number){
  return new Promise<Array<InformacionEvento>>(
    (resolve)=>{
      this.serviciogestion.rootUrl = environment.urlserviciogestioneventos;
      this.serviciogestion
       .apiServicioGestionEventosObtenerPost({body:idusuario})
       .subscribe({
        next:(success:Array<InformacionEvento>)=>{
          resolve(success);
        },
        error:(e)=>{
          resolve(e.console.error);
        }
       })
    }
  )
}


/**
 * Método para obtener un evento por su ID.
 * @param idevento El ID del evento a buscar.
 * @returns Una promesa que resuelve el evento o un error.
 */
async ObtenerGestionEventosPorId(idevento: number): Promise<any> {
  return new Promise((resolve, reject) => {
    this.serviciogestion.rootUrl = environment.urlserviciogestioneventos;

    // Suponiendo que el servicio está esperando un parámetro de URL, la sintaxis correcta debería ser algo así
    this.serviciogestion.apiServicioGestionEventosIdGet({ id: idevento }).subscribe({
      next: (success) => {
        resolve(success);  // Resolver la promesa con la respuesta exitosa
      },
      error: (e) => {
        console.error(e);  // Muestra el error en la consola
        reject(e);  // Rechazar la promesa con el error
      }
    });
  });
}



/**
 * Método para eliminar un evento por su ID.
 * @param eliminarEventoRequest El objeto que contiene la información para eliminar el evento.
 * @returns Una promesa que resuelve el éxito o el error.
 */
async EliminarEventoPorId(eliminarEventoRequest: EliminarEventoRequest): Promise<any> {
  return new Promise((resolve, reject) => {
    this.serviciogestion.rootUrl = environment.urlserviciogestioneventos;

    // Llamar al servicio y pasar el objeto eliminarEventoRequest en el cuerpo de la solicitud (request body)
    this.serviciogestion.apiServicioGestionEventosEliminarDelete({
      body: eliminarEventoRequest // El cuerpo de la solicitud es el objeto eliminarEventoRequest
    }).subscribe({
      next: (success) => {
        resolve(success);  // Resolver la promesa con la respuesta exitosa
      },
      error: (e) => {
        console.error(e);  // Muestra el error en la consola
        reject(e);  // Rechazar la promesa con el error
      }
    });
  });
}




/**
 * Inscribe a usuario a un evento
 * @param inscribirEventoRequest
 * @returns
 */
async InscribirseEvento(inscribirEventoRequest: InscribirEventoRequest): Promise<number> {
  return new Promise((resolve, reject) => {
    this.serviciogestion.rootUrl = environment.urlserviciogestioneventos;

    this.serviciogestion.apiServicioGestionEventosInscribirPost({
      body: inscribirEventoRequest
    }).subscribe({
      next: (success:number) => {
        resolve(success);
      },
      error: (e) => {
        console.error(e);
        reject(e);
      }
    });
  });
}



/**
 * Inserta Evento
 * @param crearEventoRequest
 * @returns
 */
  async InsertarEvento (crearEventoRequest:CrearEventoRequest){
    return new Promise(
      (resolve)=>{
        this.serviciogestion.rootUrl = environment.urlserviciogestioneventos;
        this.serviciogestion
         .apiServicioGestionEventosCrearPost({body: crearEventoRequest})
         .subscribe({
          next:(success)=>{
            resolve(success);
          },
          error:(e)=>{
            resolve(e.console.error);
          }
         })
      }
    )
  }




/**
 * Crea evento
 * @param crearEventoRequest
 * @returns
 */
async EditarEvento (crearEventoRequest:CrearEventoRequest){
  return new Promise(
    (resolve)=>{
      this.serviciogestion.rootUrl = environment.urlserviciogestioneventos;
      this.serviciogestion
       .apiServicioGestionEventosEditarPut({body: crearEventoRequest})
       .subscribe({
        next:(success)=>{
          resolve(success);
        },
        error:(e)=>{
          resolve(e.console.error);
        }
       })
    }
  )
}

/**
 * Valida Token
 * @param crearEventoRequest
 * @returns
 */
async ValidarToken (token:string){
  return new Promise(
    (resolve)=>{
      this.userService.rootUrl = environment.urlserviciogestioneventos;
      this.userService
       .apiUserValidarTokenGet()
       .subscribe({
        next:(success:boolean)=>{
          resolve(success);
        },
        error:(e:any)=>{
          resolve(e.console.error);
        }
       })
    }
  )
}


/**
 *Registra  usuario
 * @param crearEventoRequest
 * @returns
 */
async RegistrarUsuario (usuarioGestionEventos:UsuarioGestionEventos){
  return new Promise(
    (resolve)=>{
      this.userService.rootUrl = environment.urlserviciogestioneventos;
      this.userService
       .apiUserRegistrarusuarioPost({body: usuarioGestionEventos})
       .subscribe({
        next:(success:number)=>{
          resolve(success);
        },
        error:(e)=>{
          resolve(e.console.error);
        }
       })
    }
  )
}


/**
 * Valida usuario
 * @param crearEventoRequest
 * @returns
 */
async ValidarUsuario (usuarioConsulta:UsuarioConsulta){
  return new Promise(
    (resolve)=>{
      this.userService.rootUrl = environment.urlserviciogestioneventos;
      this.userService
       .apiUserLoginUsuarioPost({body: usuarioConsulta})
       .subscribe({
        next:(success)=>{
          resolve(success);
        },
        error:(e)=>{
          resolve(e.console.error);
        }
       })
    }
  )
}


}
