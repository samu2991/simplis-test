import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ClientInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  activite?: string;
  isAutoEntrepreneur?: boolean;
  dateNaissance?: string;
  adresse?: string;
  chiffreAffaire?: string;
  selectedPlan?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientData = new BehaviorSubject<ClientInfo>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  });

  clientData$ = this.clientData.asObservable();

  updateClientData(data: Partial<ClientInfo>) {
    this.clientData.next({
      ...this.clientData.value,
      ...data
    });
  }

  getClientData(): ClientInfo {
    return this.clientData.value;
  }

  // Simuler un appel API pour sauvegarder les données
  saveClientData(): Promise<void> {
    return new Promise((resolve) => {
      console.log('Saving client data:', this.clientData.value);
      // Ici, vous implementerez l'appel réel à votre API
      setTimeout(resolve, 1000);
    });
  }
}
