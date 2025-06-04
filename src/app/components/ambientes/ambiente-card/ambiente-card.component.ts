import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AmbientesService } from '../../../services/Firebase/ambientes.service';
import { CaixaAguaComponent } from '../../recursos/caixa-agua/caixa-agua.component';
import { LampadaComponent } from '../../recursos/lampada/lampada.component';
import { TipoRecursoEnum } from '../../../enums/TipoRecursoEnum';
import { GasGaugeComponent } from '../../recursos/gas-gauge/gas-gauge.component';

@Component({
  selector: 'app-ambiente-card',
  standalone: true,
  imports: [
    CaixaAguaComponent,
    LampadaComponent,
    GasGaugeComponent
  ],
  templateUrl: './ambiente-card.component.html',
  styleUrl: './ambiente-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AmbienteCardComponent {
  tipoRecursoEnum: any = TipoRecursoEnum;

  recursosGroup = input<any[]>([]);
  nomeAmbiente: any;
  ionIconName: any;

  constructor(
    private ambientesService: AmbientesService
  ) {
    effect(() => {
      const idAmbiente = this.recursosGroup()[0]?.idAmbiente;

      this.ambientesService.GetAmbienteById(idAmbiente).then((doc: any) => {
        this.nomeAmbiente = doc.nomeAmbiente;
        this.ionIconName = doc.ionIconName;
      })
    })
  }
}
