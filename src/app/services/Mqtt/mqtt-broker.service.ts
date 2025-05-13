import { Injectable } from '@angular/core';
import { MqttService } from 'ngx-mqtt';

@Injectable({
  providedIn: 'root'
})
export class MqttBrokerService {

  constructor(
    private mqttService: MqttService
  ) { }

  PublishToTopic(topic: any, payload: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.mqttService.publish(topic, payload).subscribe({
        next: () => resolve(),
        error: (err) => reject(err),
      });
    });
  }
  
  SubscribeToTopic(topic: any) {
    return this.mqttService.observe(topic);
  }
}
