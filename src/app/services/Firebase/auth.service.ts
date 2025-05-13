import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsuariosService } from './usuarios.service';
import { AmbientesService } from './ambientes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: Auth,
    private router: Router,
    private usuariosService: UsuariosService,
    private ambienteService: AmbientesService
  ) { }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    signOut(this.auth).then((result) => {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.usuariosService.SetLoggedInUserData(null);
      this.ambienteService.SetCurrentAmbienteData(null);
    });
  }

  isLoggedIn() {
    return this.auth.currentUser !== null;
  }
}