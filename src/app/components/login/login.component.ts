import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  /**
   * El constructor inicializa un FormGroup para iniciar sesión con campos de correo electrónico y contraseña, y navega a
   * la ruta de casa usando el enrutador Angular.
   */
  constructor(private userService: UserService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {}

  /**
   *Cambio de then a async y await para mejorar la legibilidad
   *En el enrutador se redirige a la ruta /home
   */
  async onSubmit() {
    try {
      const response = await this.userService.login(this.formLogin.value);
      console.log(response);
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *Cambio de then a async y await para mejorar la legibilidad
   *En el enrutador se redirige a la ruta /home
   */
  async onClick() {
    try {
      const response = await this.userService.loginWithGoogle();
      console.log(response);
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * La función `checkControl` comprueba si un control de formulario específico en un formulario de inicio de sesión tiene un error específico
   * y ha sido tocado.
   * El parámetro `controlName` en la función `checkControl` es una cadena
   * que representa el nombre de un control de formulario en el grupo de formulario `formLogin`.
   * errorName - El parámetro `errorName` en la función `checkControl` es una cadena
   * que representa el nombre del error que se está verificando para un control de formulario específico.
   */
  checkControl(controlName: string, errorName: string): boolean | undefined {
    return (
      this.formLogin.get(controlName)?.hasError(errorName) &&
      this.formLogin.get(controlName)?.touched
    );
  }
}
