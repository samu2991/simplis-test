import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component {
  constructor(
    private router: Router,
    private clientService: ClientService
  ) {}

  onPrevious() {
    this.router.navigate(['/funnel/step2']);
  }

  async selectPlan(planType: string) {
    // Sauvegarder le plan sélectionné
    this.clientService.updateClientData({ selectedPlan: planType });
    await this.clientService.saveClientData();

    // Ici, vous pouvez ajouter la logique pour contacter un commercial
    // ou rediriger vers une page de confirmation
    alert('Merci d\'avoir choisi le plan ' + planType + '. Un conseiller vous contactera prochainement.');
  }
}
