import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarruselComponent } from '../../carrusel/carrusel.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private http: HttpClient, // Importamos HttpClient para manejar las solicitudes
    private router: Router // Router para redirigir después del login
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.authForm = this.fb.group(
      {
        usuario: ['', [Validators.required, Validators.minLength(3)]],
        email: [
          '',
          this.isRegisterMode ? [Validators.required, Validators.email] : [],
        ],
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

  login(): void {
    const { usuario, clave } = this.authForm.value;

    this.http.post<{ token: string }>('http://tu-api-url.com/api/auth/login', { usuario, clave })
      .subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token); // Guardar el token
          console.log('Token recibido:', response.token);
          this.router.navigate(['/dashboard']); // Redirigir al usuario
        },
        error: (error) => {
          console.error('Error en el login:', error);
          this.errorMessage = 'Usuario o clave incorrectos.';
        }
      });
  }

  register(): void {
    const { usuario, email, clave } = this.authForm.value;

    this.http.post('http://tu-api-url.com/api/auth/register', { usuario, email, clave })
      .subscribe({
        next: () => {
          console.log('Registro exitoso.');
          this.isRegisterMode = false; // Cambiar al modo de inicio de sesión
          this.errorMessage = 'Usuario registrado correctamente. Inicia sesión.';
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          this.errorMessage = 'No se pudo completar el registro.';
        }
      });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('clave')?.value;
    const confirmPassword = form.get('confirmarClave')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
