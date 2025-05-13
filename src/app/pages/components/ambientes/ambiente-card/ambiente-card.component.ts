import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AmbientesService } from '../../../../services/Firebase/ambientes.service';
import { CaixaAguaComponent } from '../../recursos/caixa-agua/caixa-agua.component';
import { LampadaComponent } from '../../recursos/lampada/lampada.component';
import { TipoRecursoEnum } from '../../../../enums/TipoRecursoEnum';
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
export class AmbienteCardComponent implements OnInit, OnChanges {
  tipoRecursoEnum: any = TipoRecursoEnum;
  private ambientesService = inject(AmbientesService);

  @Input() recursosGroup: any;
  nomeAmbiente: any;
  ionIconName: any;

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
      let idAmbiente = this.recursosGroup[0]?.idAmbiente;

      this.ambientesService.GetAmbienteById(idAmbiente).then((doc: any) => {
        this.nomeAmbiente = doc.nomeAmbiente;
        this.ionIconName = doc.ionIconName;
      })
  }
}
