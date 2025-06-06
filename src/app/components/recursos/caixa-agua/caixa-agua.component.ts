import { AfterViewInit, Component, computed, ElementRef, inject, Input, OnChanges, OnDestroy, OnInit, signal, Signal, SimpleChanges, ViewChild } from '@angular/core';
import { RecursosService } from '../../../services/Firebase/recursos.service';

@Component({
  selector: 'app-caixa-agua',
  standalone: true,
  imports: [],
  templateUrl: './caixa-agua.component.html',
  styleUrl: './caixa-agua.component.scss'
})
export class CaixaAguaComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() estadoAtual: any = 0;
  @Input() docId: any;
  @Input() valorMaximo: any;
  watchRecurso: any;
  recurso: any;

  percentageSignal = signal<number | null>(null);

  @ViewChild('wave1') wave1!: ElementRef<HTMLElement>;
  @ViewChild('wave2') wave2!: ElementRef<HTMLElement>;
  @ViewChild('wave3') wave3!: ElementRef<HTMLElement>;

  constructor(
    private recursosService: RecursosService
  ) { }

  ngOnInit(): void {
    this.watchRecurso = this.recursosService.WatchRecursoChanges(this.docId).subscribe((recurso) => {
      if (recurso) {
        this.recurso = recurso;

        this.updateWavesHeight();
      }
    })
  }

  ngAfterViewInit(): void {
    this.updateWavesHeight();
  }

  updateWavesHeight() {
    const max = this.recurso?.valorMaximo ?? this.valorMaximo;

    const rawPercentage = ((this.recurso?.estadoAtual ?? this.estadoAtual) / max) * 100;

    let roundedPercentage = parseFloat(rawPercentage.toFixed(2));

    if (roundedPercentage > 100) {
      roundedPercentage = 100;
    }

    const percentageValue = parseFloat((100 - roundedPercentage).toFixed(2));
    this.percentageSignal.set(percentageValue);

    this.wave1.nativeElement.style.top = (roundedPercentage + 10) + "%";
    this.wave2.nativeElement.style.top = (roundedPercentage + 5) + "%";
    this.wave3.nativeElement.style.top = (roundedPercentage) + "%";
  }

  ngOnDestroy(): void {
    this.watchRecurso.unsubscribe();
  }
}
