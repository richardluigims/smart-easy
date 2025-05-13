import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { AuthService } from './services/Firebase/auth.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { UsuariosService } from './services/Firebase/usuarios.service';
import { SnackBarService } from './services/snack-bar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'smart-easy';

  constructor(
    private authService: AuthService,
    private auth: Auth,
    private usuariosService: UsuariosService,
    private router: Router,
    private snackbar: SnackBarService
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const snap = await this.usuariosService.GetUsuario(user.uid);
        this.usuariosService.SetLoggedInUserData(
          {
            email: user.email,
            ...snap.data()
          });

        this.router.navigate(['/']);

        this.snackbar.open("Login realizado com sucesso!", 'success');
      }
    });
  }

  ngOnDestroy(): void {
      this.authService.logout();
  }
}
