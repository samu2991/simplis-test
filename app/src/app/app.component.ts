import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contactForm: FormGroup;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      telephone: ['', [Validators.required, Validators.pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      activite: ['', [Validators.required]]
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
        if (fieldName === 'telephone') {
          return 'Format de téléphone invalide (format français requis)';
        }
      }
    }
    return '';
  }

  onSubmit() {
    this.formSubmitted = true;

    // Marquer tous les champs comme touchés
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });

    if (this.contactForm.valid) {
      // Validation supplémentaire des données
      const formData = this.contactForm.value;
      
      // Vérifier que le nom et prénom ne contiennent que des lettres
      const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
      if (!nameRegex.test(formData.nom) || !nameRegex.test(formData.prenom)) {
        alert('Le nom et le prénom ne doivent contenir que des lettres');
        return;
      }

      // Si toutes les validations passent, sauvegarder et rediriger
      this.clientService.updateClientData(formData);
      this.router.navigate(['/funnel/step1']);
    }
  }
}
