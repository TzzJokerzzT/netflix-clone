import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formRegister: FormGroup;

  /**
   * Implementar formularios reactivos para formularios complejos con validaciones.
   */
  constructor(private userService: UserService, private router: Router) {
    this.formRegister = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  /**
   * La función `onSubmit` registra de forma asyncrona a un usuario usando `userService` y navega al
   * página de inicio de sesión tras un registro exitoso.
   * Se hizo cambio de then a async y await para mejorar la legibilidad
   */
  async onSubmit() {
    try {
      this.userService.register(this.formRegister.value).then((response) => {
        console.log(response);
        this.router.navigate(['/login']);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
