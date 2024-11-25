import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginusuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loginusuario.component.html',
  styleUrl: './loginusuario.component.css'
})
export class LoginusuarioComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulario enviado:', this.loginForm.value);
      // Aquí puedes agregar la lógica para hacer el login, como un servicio de autenticación
    }
  }
}
