import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { RecursosService } from '../../services/Firebase/recursos.service';
import { LampadaComponent } from '../components/recursos/lampada/lampada.component';
import { GasGaugeComponent } from '../components/recursos/gas-gauge/gas-gauge.component';
import { CaixaAguaComponent } from '../components/recursos/caixa-agua/caixa-agua.component';
import { AmbientesService } from '../../services/Firebase/ambientes.service';
import { TipoRecursoEnum } from '../../enums/TipoRecursoEnum';
import { ActivatedRoute } from '@angular/router';
import { SubjectsService } from '../../services/Subjects/subjects.service';

@Component({
  selector: 'app-ambientes',
  standalone: true,
  imports: [
    LampadaComponent,
    GasGaugeComponent,
    CaixaAguaComponent
  ],
  templateUrl: './ambientes.component.html',
  styleUrl: './ambientes.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmbientesComponent implements OnInit, OnDestroy {
  tipoRecursoEnum: any = TipoRecursoEnum;

  recursos: any;
  ambienteData: any;
  ambienteDataSubject: any;

  constructor(
    private ambienteService: AmbientesService,
    private route: ActivatedRoute,
    private recursosService: RecursosService,
    private subjectsService: SubjectsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let idAmbiente = params.get('id') || '';

      this.recursosService.GetRecursosByAmbiente(idAmbiente)
        .then((recursos) => {
          this.recursos = recursos;
        })
    })

    this.ambienteDataSubject = this.subjectsService.GetPageHead()
      .subscribe((ambienteData: any) => {
        this.ambienteData = ambienteData;
      })
  }

  ngOnDestroy(): void {
    this.ambienteService.SetCurrentAmbienteData(null);
    this.ambienteDataSubject.unsubscribe();
  }
}