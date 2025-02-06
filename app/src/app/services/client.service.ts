import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface ClientInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  isFranceOnly?: boolean;
  activity?: string;
  projectedTurnover?: boolean;
  isAutoEntrepreneur?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientData = new BehaviorSubject<ClientInfo>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
  });

  constructor(private http: HttpClient) {
  }


  // Mettre à jour les données du client
  updateClientData(data: Partial<ClientInfo>) {
    this.clientData.next({
      ...this.clientData.value,
      ...data
    });
  }

  getClientData(): ClientInfo {
    return this.clientData.value;
  }

  // Appel API pour sauvegarder les données client
  saveClientData(): Observable<any> {
    const currentData = this.getClientData();
    const apiUrl = `${environment.apiUrl}/api/customers`;

    return this.http.post<any[]>(apiUrl, currentData);
  }
}