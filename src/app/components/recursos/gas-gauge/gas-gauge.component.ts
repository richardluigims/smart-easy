import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RecursosService } from '../../../services/Firebase/recursos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gas-gauge',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './gas-gauge.component.html',
  styleUrl: './gas-gauge.component.scss'
})
export class GasGaugeComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() estadoAtual: number = 0;
  @Input() docId: string = '';
  @Input() valorMaximo: any;
  @Input() valorNotificacao: any;
  watchGasGauge: any;
  recurso: any;
  valorGrausGauge = 180;
  className = 'okay';

  valorMin = 0;

  @ViewChild('gaugeMask') gaugeMask!: ElementRef<HTMLElement>;

  constructor(
    private recursosService: RecursosService
  ) { }

  ngOnInit(): void {
    this.watchGasGauge = this.recursosService.WatchRecursoChanges(this.docId)
      .subscribe((recurso) => {
        if (recurso) {
          this.recurso = recurso;

          this.updateGauge();
        }
      })
  }

  ngAfterViewInit(): void {
    this.updateGauge();
  }

  updateGauge() {
    let max = this.recurso?.valorMaximo ?? this.valorMaximo;
    let estadoAtual = this.recurso?.estadoAtual ?? this.estadoAtual;

    let rawPercentage = ((estadoAtual) / max) * 100;
    let roundedPercentage = parseFloat(rawPercentage.toFixed(2));

    if (roundedPercentage != null) {
      let deg = ((roundedPercentage * this.valorGrausGauge) / 100).toFixed(2);
      deg = parseFloat(deg) > 180 ? "180" : deg;

      this.gaugeMask.nativeElement.style.transform = 'rotate(' + deg + 'deg)';
    }
  }

  ngOnDestroy(): void {
    this.watchGasGauge.unsubscribe();
  }
}