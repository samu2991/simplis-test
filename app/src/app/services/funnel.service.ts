import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface FunnelData {
  activity: string;
  eligibleLegalForm: string;
  maxProjectedTurnover: string;
  businessLocation: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  insurer: string;
  businessLocation: string;
  maxProjectedTurnover: string;
}

@Injectable({
  providedIn: 'root'
})
export class FunnelService {
  private funnelData = new BehaviorSubject<FunnelData>({
    activity: '',
    eligibleLegalForm: '',
    maxProjectedTurnover: '',
    businessLocation: '',
  });

  constructor(private http: HttpClient) {
   }

  // Mettre à jour les données du funnel
  updateFunnelData(data: Partial<FunnelData>): Observable<FunnelData> {
    const updatedData = {
      ...this.funnelData.value,
      ...data
    };
    this.funnelData.next(updatedData);
    return of(updatedData);
  }

  // Obtenir la valeur actuelle des données
  getCurrentFunnelData(): FunnelData {
    return this.funnelData.value;
  }


  // Rechercher les produits correspondants aux critères
  findMatchingProducts(): Observable<Product[]> {
    const currentData = this.getCurrentFunnelData();
    const apiUrl = `${environment.apiUrl}/api/match-products`;

    return this.http.post<Product[]>(apiUrl, currentData);
  }
}
