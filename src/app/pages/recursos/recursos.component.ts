import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/Firebase/usuarios.service';
import { filter, first } from 'rxjs';
import { RecursosService } from '../../services/Firebase/recursos.service';
import { SubjectsService } from '../../services/Subjects/subjects.service';
import { TipoRecursoEnum } from '../../enums/TipoRecursoEnum';
import { AmbienteCardComponent } from '../components/ambientes/ambiente-card/ambiente-card.component';

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [
    AmbienteCardComponent
  ],
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecursosComponent implements OnInit, OnDestroy {
  tipoRecursoEnum: any = TipoRecursoEnum;
  recursoHeadSubject: any;
  codTipoRecurso: any;
  nomeRecurso: any;
  recursosGroups: any = [];

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private recursosService: RecursosService,
    private subjectsService: SubjectsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.codTipoRecurso = params.get('id') || '';

      this.recursosGroups = [];

      this.usuariosService.GetLoggedInUserData().pipe(
        filter(user => user != null),
        first()
      )
        .subscribe((user: any) => {
          if (user) {
            this.recursosService.GetRecursosByTipo(this.codTipoRecurso, user.idEmpresa)
              .then((docs: any[]) => {
                let orderedDocsByIdAmbiente = docs.sort((a, b) => {
                  if (a.idAmbiente < b.idAmbiente) return -1;
                  if (a.idAmbiente > b.idAmbiente) return 1;
                  return 0;
                });

                let lastIdAmbiente: any = null;
                let index: any = null;

                orderedDocsByIdAmbiente.forEach((doc) => {
                  if (doc.idAmbiente != lastIdAmbiente) {
                    index = index === null ? 0 : index++;

                    lastIdAmbiente = doc.idAmbiente;

                    let newRecursoArray = [];
                    newRecursoArray.push(doc);

                    this.recursosGroups.push(newRecursoArray);
                  }
                  else {
                    this.recursosGroups[index].push(doc);
                  }
                })
              });
          }
        })
    });

    this.recursoHeadSubject = this.subjectsService.GetPageHead()
      .subscribe((recursoHead: any) => {
        this.nomeRecurso = recursoHead?.nomeRecurso;
      })
  }

  ngOnDestroy(): void {
    this.recursoHeadSubject.unsubscribe();
  }
}
