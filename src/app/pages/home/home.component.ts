import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SubjectsService } from '../../services/Subjects/subjects.service';
import { filter, first } from 'rxjs';
import { TipoRecursoEnum } from '../../enums/TipoRecursoEnum';
import { Router } from '@angular/router';
import { RecursosService } from '../../services/Firebase/recursos.service';
import { AmbientesService } from '../../services/Firebase/ambientes.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  tipoRecursoEnum: any = TipoRecursoEnum;
  ambienteList: any;
  recursoList: any;
  nomeUsuario: any;

  constructor(
    private subjectsService: SubjectsService,
    private router: Router,
    private recursosService: RecursosService,
    private ambientesService: AmbientesService
  ) { }

  ngOnInit(): void {
    this.subjectsService.getHomeData().pipe(
      filter(homeData => homeData != null),
      first()
    )
      .subscribe((homeData: any) => {
        if (homeData) {
          this.nomeUsuario = homeData.nomeUsuario.split(" ")[0];
          this.recursoList = homeData.recursoList;
          this.ambienteList = homeData.ambienteList;
        }
      })
  }

  toggleView(buttonId: any) {
    (document.querySelector("#button_" + buttonId) as HTMLButtonElement).click();
  }
}