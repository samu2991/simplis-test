import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FunnelData {
  activity: number;
  legalForm: string;
  projectedTurnover: number;
  isFranceOnly: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FunnelService {
  private funnelData = new BehaviorSubject<FunnelData>({
    activity: 0,
    legalForm: '',
    projectedTurnover: 0,
    isFranceOnly: true,
  });

  constructor() { }

  // Mettre à jour les données du funnel
  updateFunnelData(data: Partial<FunnelData>): void {
    this.funnelData.next({
      ...this.funnelData.value,
      ...data
    });
  }

  // Obtenir les données actuelles du funnel
  getFunnelData(): Observable<FunnelData> {
    return this.funnelData.asObservable();
  }

  // Obtenir la valeur actuelle des données sans Observable
  getCurrentFunnelData(): FunnelData {
    return this.funnelData.value;
  }

  // Réinitialiser les données du funnel
  resetFunnelData(): void {
    this.funnelData.next({
      activity: 0,
      legalForm: '',
      projectedTurnover: 0,
      isFranceOnly: true,
    });
  }

}
