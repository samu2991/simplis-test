import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  clientData$ = this.clientData.asObservable();

  constructor(private http: HttpClient) {
    console.log('ClientService initialized');
  }

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
  async saveClientData(): Promise<any> {
    try {
      console.log("Envoi des données au serveur:", this.clientData.value);
      console.log("URL de l'API:", `${environment.apiUrl}/api/customers`);
      
      const response = await this.http.post(
        `${environment.apiUrl}/api/customers`,
        this.clientData.value
      ).toPromise();
      
      console.log('Client enregistré avec succès:', response);
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du client:', error);
      throw error;
    }
  }
}

