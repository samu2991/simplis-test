import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  step1Form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {
    this.step1Form = this.fb.group({
      isAutoEntrepreneur: [null, Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Charger les données existantes si disponibles
    const clientData = this.clientService.getClientData();
    if (clientData.isAutoEntrepreneur !== undefined) {
      this.step1Form.patchValue({
        isAutoEntrepreneur: clientData.isAutoEntrepreneur,
        dateNaissance: clientData.dateNaissance,
        adresse: clientData.adresse
      });
    }
  }

  async onSubmit() {
    this.submitted = true;
    
    // Marquer tous les champs comme touchés pour déclencher l'affichage des erreurs
    Object.keys(this.step1Form.controls).forEach(key => {
      const control = this.step1Form.get(key);
      control?.markAsTouched();
    });

    if (this.step1Form.valid) {
      // Mettre à jour les données du client
      this.clientService.updateClientData(this.step1Form.value);
      await this.clientService.saveClientData();
      
      // Naviguer vers l'étape suivante
      this.router.navigate(['/funnel/step2']);
    }
  }

  // Helper pour vérifier si un champ est invalide
  isFieldInvalid(fieldName: string): boolean {
    const field = this.step1Form.get(fieldName);
    return field ? (field.invalid && (field.touched || this.submitted)) : false;
  }
}
