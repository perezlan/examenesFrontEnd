import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; //libreria par el ngModel
import { MatButtonModule } from '@angular/material/button'; //botones
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide = true;
  user: String = '';
  password: String = '';
  token: String = '';

  constructor(private snack: MatSnackBar, private loginService: LoginService) {}

  formSumbit() {
    if (this.user == '' || this.user == null) {
      this.snack.open('Usuario vacío!!', 'Aceptar', {
        duration: 3000,
      });
      return;
    } else if (this.password == '' || this.password == null) {
      this.snack.open('Contraseña requerida!!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    this.loginService.generateToken(this.user, this.password).subscribe(
      (resp: any) => {
        this.token = resp.token;
        console.log(this.token);
      },
      (error: any) => {
        console.log('usuario o contrasena incorrectos ' + error);
      }
    );
  }
}
