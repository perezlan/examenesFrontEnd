import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { NewUser } from '../../interface/userNew';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatLabel,
    MatButtonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  hide = true;
  newUser: NewUser | undefined;

  //Campos
  user: String = '';
  password: String = '';
  name: String = '';
  lastName: String = '';
  email: String = '';
  phone: String = '';

  constructor(private userService: UserService, private snack: MatSnackBar) {}

  guardarUser() {
    if (
      !this.user ||
      !this.password ||
      !this.name ||
      !this.lastName ||
      !this.email ||
      !this.phone
    ) {
      // Si algún campo está vacío, no hace nada
      this.snack.open('Llenar todos los campos', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });

      return;
    }
    this.newUser = {
      username: this.user,
      password: this.password,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      phone: Number(this.phone),
      profile: 'default.png',
    };

    console.log(this.newUser);
    this.userService.registrarUser(this.newUser).subscribe(
      (res: any) => {
        Swal.fire(
          `Usuario ${this.user} creado correctamente`,
          'Registrado con exito en el sistema',
          'success'
        );
      },
      (error: any) => {
        Swal.fire(
          `Usuario ${this.user} ya existe`,
          'Intentalo con otro usuario',
          'warning'
        );
      }
    );
  }
}
