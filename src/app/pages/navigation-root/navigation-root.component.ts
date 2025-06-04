import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/Firebase/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UsuariosService } from '../../services/Firebase/usuarios.service';
import { AmbientesService } from '../../services/Firebase/ambientes.service';
import { RecursosService } from '../../services/Firebase/recursos.service';
import { EmpresasService } from '../../services/Firebase/empresas.service';
import { TipoRecursoEnum } from '../../enums/TipoRecursoEnum';
import { filter, first } from 'rxjs';
import { SubjectsService } from '../../services/Subjects/subjects.service';
import { IEmpresa } from '../../interfaces/empresa';

@Component({
  selector: 'app-navigation-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule
  ],
  templateUrl: './navigation-root.component.html',
  styleUrl: './navigation-root.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavigationRootComponent implements OnInit {
  tipoRecursoEnum = TipoRecursoEnum;

  ambienteList: any = [];
  recursoList: any = [];
  userEmail: any;
  nomeEmpresa: any;
  idEmpresa: any;

  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private ambientesService: AmbientesService,
    private recursosService: RecursosService,
    private router: Router,
    private empresasService: EmpresasService,
    private subjectsService: SubjectsService
  ) { }

  ngOnInit(): void {
    this.usuariosService.GetLoggedInUserData().pipe(
      filter(user => user != null),
      first()
    )
      .subscribe((user: any) => {
        if (user) {
          this.userEmail = user.email;
          this.idEmpresa = user.idEmpresa;

          Promise.all([
            this.empresasService.GetEmpresaById(user.idEmpresa),
            this.ambientesService.GetAmbientesByEmpresa(user.idEmpresa)
          ]).then(([empresaSnap, ambientes]) => {
            let empresaData = empresaSnap.data() as IEmpresa;

            this.nomeEmpresa = empresaData.nomeEmpresa;
            this.recursoList = empresaData.tipoRecursoList;

            if (ambientes != null) {
              this.ambienteList = ambientes;
            }

            let homeData = {
              nomeUsuario: user.nomeUsuario,
              ambienteList: this.ambienteList,
              idEmpresa: user.idEmpresa,
              recursoList: this.recursoList
            };

            this.subjectsService.setHomeData(homeData);
          });
        }
      })
  }

  toggleAmbienteView(idAmbiente: any, nomeAmbiente: any, ionIconName: any) {
    this.router.navigate(['/ambientes', idAmbiente]);

    let ambienteData = {
      nomeAmbiente: nomeAmbiente,
      ionIconName: ionIconName
    }

    // this.ambientesService.SetCurrentAmbienteData(ambienteData);
    this.subjectsService.SetPageHead(ambienteData);
  }

  toogleRecursosView(codTipoRecurso: string, nomeRecurso: any) {
    this.router.navigate(['/recursos', codTipoRecurso]);

    let recursoData = {
      nomeRecurso: nomeRecurso
    }

    this.subjectsService.SetPageHead(recursoData);
  }

  toggleButtonsActiveState(event: any) {
    let target = event.target;

    if (target.classList.contains('nav-button') && !target.classList.contains('active')) {
      document.querySelector(".active.nav-button")?.classList.remove('active');

      target.classList.add('active');
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
  }
}
