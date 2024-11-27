import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CarruselComponent } from '../../carrusel/carrusel.component';
import { CommonModule } from '@angular/common';
import { ServiciogestioneventosService } from '../../servicios/serviciogestioneventos.service';
import { UsuarioConsulta, UsuarioGestionEventos } from '../../swagger/gestioneventos/models';

@Component({
  selector: 'app-loginusuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CarruselComponent],
  templateUrl: './loginusuario.component.html',
  styleUrls: ['./loginusuario.component.css']
})
export class LoginusuarioComponent implements OnInit {
  authForm!: FormGroup;
  isRegisterMode = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private serviciogestion:ServiciogestioneventosService
  ) {}
 idusaurio:number=0;
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.authForm = this.fb.group(
      {
        usuario: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', this.isRegisterMode ? [Validators.required, Validators.email] : []],
        clave: ['', [Validators.required, Validators.minLength(6)]],
        confirmarClave: ['']
      },
      {
        validators: this.isRegisterMode ? this.passwordMatchValidator : null
      }
    );
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.submitted = false;
    this.errorMessage = '';
    this.initializeForm();
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.authForm.valid) {
      if (this.isRegisterMode) {
        this.register();
      } else {
        this.login();
      }
    }
  }

  async login() {
   let usuarioConsulta:UsuarioConsulta={};

   usuarioConsulta.claveUsuario = this.authForm.get('clave')?.value;
   usuarioConsulta.correo_Usuario = this.authForm.get('usuario')?.value;
  let valor= await this.serviciogestion.ValidarUsuario(usuarioConsulta);
    if(valor=="Usuario no registrado"){
      alert("Error usuario");
      window.location.reload();
    }else{

      alert("Bienvenido");
      localStorage.setItem("idusuario",valor!.toString())
      this.router.navigate(['/listar']);
    }

  }

 async register() {
    const { usuario, email, clave } = this.authForm.value;

   let usuarioGestionEventos:UsuarioGestionEventos ={};
   usuarioGestionEventos.claveUsuario = this.authForm.get('clave')?.value;
   usuarioGestionEventos.cnameUsuario="";
   usuarioGestionEventos.correo_Usuario=this.authForm.get('email')?.value;
   usuarioGestionEventos.nombre_Usuario=this.authForm.get('usuario')?.value;
   usuarioGestionEventos.estado =true;
   usuarioGestionEventos.usuarioCreacion =1;

      await this.serviciogestion.RegistrarUsuario(usuarioGestionEventos);
      window.location.reload();
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('clave')?.value;
    const confirmPassword = form.get('confirmarClave')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
