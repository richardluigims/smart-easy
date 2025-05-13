import { Component, Input, OnInit } from '@angular/core';
import { MqttBrokerService } from '../../../../services/Mqtt/mqtt-broker.service';
import { CommonModule } from '@angular/common';
import { RecursosService } from '../../../../services/Firebase/recursos.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-lampada',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule
  ],
  templateUrl: './lampada.component.html',
  styleUrl: './lampada.component.scss'
})
export class LampadaComponent implements OnInit {
  @Input() docId: any;
  @Input() estadoAtual: any;

  estadoInterno: any;

  constructor(
    private mqttBroker: MqttBrokerService,
    private recursosService: RecursosService
  ) {}

  ngOnInit(): void {
    this.estadoInterno = this.estadoAtual;
  }
  
  toggleLampState() {
    let payload = "";

    if (this.estadoInterno == "1") {
      payload = "OFF";
      this.estadoInterno = "0";
    }
    else {
      payload = "ON";
      this.estadoInterno = "1";
    }

    this.mqttBroker.PublishToTopic("teste/lampada", payload)
      .then((response) => {
        this.recursosService.UpdateEstadoAtual(this.docId, this.estadoInterno)
          .then((response) => {

          })
      })
      .catch((error) => {
        console.log(error);
      })
  }
}
""