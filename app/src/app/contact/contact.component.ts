import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { finalize, switchMap } from 'rxjs/operators';

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
        return `Le champ est obligatoire`;
      }
      if (control.errors['email']) {
        return 'Format d\'email invalide';
      }
      if (control.errors['minlength']) {
        return `Le champ doit contenir au moins ${control.errors['minlength'].requiredLength} caractères`;
      }
      if (control.errors['pattern']) {
        return 'Format de téléphone invalide';
      }
    }
    return '';
  }

  onSubmit() {
    // Marquer tous les champs comme touchés pour déclencher l'affichage des erreurs
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });

    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Mettre à jour les données du client et sauvegarder
      this.clientService.updateClientData(this.contactForm.value);
      this.clientService.saveClientData().pipe(
        switchMap(() => this.router.navigate(['/funnel/step1'])),
        finalize(() => {
          this.isSubmitting = false;
        })
      ).subscribe({
        error: (error) => {
          console.error('Erreur lors de la soumission du formulaire:', error);
        }
      });
    }
  }
}
