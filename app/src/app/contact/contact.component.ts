import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  formSubmitted = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]]
    });
  }

  // Vérifie si un champ est invalide
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && (field.invalid && (field.touched || this.formSubmitted)));
  }

  // Obtient le message d'erreur pour un champ
  getErrorMessage(fieldName: string): string {
    const control = this.contactForm.get(fieldName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return `Le champ ${fieldName} est obligatoire`;
      }
      if (control.errors['email']) {
        return 'Format d\'email invalide';
      }
      if (control.errors['minlength']) {
        return `Le ${fieldName} doit contenir au moins ${control.errors['minlength'].requiredLength} caractères`;
      }
      if (control.errors['pattern']) {
        return 'Format de téléphone invalide';
      }
    }
    return '';
  }

  async onSubmit() {
    this.formSubmitted = true;
    
    // Marquer tous les champs comme touchés pour déclencher l'affichage des erreurs
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });

    if (this.contactForm.valid) {
      this.isSubmitting = true;
      try {
        // Mettre à jour les données du client
        await this.clientService.updateClientData(this.contactForm.value);
        await this.clientService.saveClientData();
         
        
        // Naviguer vers l'étape 1
        await this.router.navigate(['/funnel/step1']);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
        // Ici vous pouvez ajouter une gestion d'erreur plus sophistiquée si nécessaire
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
