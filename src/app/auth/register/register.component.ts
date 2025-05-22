import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importar módulos necesarios
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    password: '', // Cambiar 'contraseña' por 'password' para evitar problemas con 'ñ'
    rol: '',
    zona_servicio: '',
    disponibilidad: '',
    tarifa: ''
  };

  mensajeError = '';

  onSubmit() {
    // Validaciones básicas
    if (!this.formData.nombre || !this.formData.apellido || !this.formData.correo || 
        !this.formData.telefono || !this.formData.direccion || !this.formData.password || 
        !this.formData.rol) {
      this.mensajeError = 'Por favor, complete todos los campos obligatorios.';
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.correo)) {
      this.mensajeError = 'Por favor, ingrese un correo electrónico válido.';
      return;
    }

    // Validación específica para paseadores
    if (this.formData.rol === 'paseador') {
      if (!this.formData.zona_servicio || !this.formData.disponibilidad || !this.formData.tarifa) {
        this.mensajeError = 'Por favor, complete todos los campos requeridos para paseadores.';
        return;
      }
    }

    // Limpiar mensaje de error si todo está bien
    this.mensajeError = '';

    // Aquí iría la lógica para enviar los datos al backend
    console.log('Datos del formulario:', this.formData);
    
    // Ejemplo de llamada a un servicio (descomenta cuando tengas el servicio)
    // this.authService.register(this.formData).subscribe({
    //   next: (response) => {
    //     console.log('Usuario registrado exitosamente', response);
    //     // Redirigir al login o mostrar mensaje de éxito
    //   },
    //   error: (error) => {
    //     this.mensajeError = 'Error al registrar usuario. Intente nuevamente.';
    //     console.error('Error:', error);
    //   }
    // });
  }
}