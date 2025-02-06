import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FunnelService } from '../../services/funnel.service';
import { Router } from '@angular/router';
import { switchMap, catchError, finalize } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';

@Component({
  selector: 'app-step1',
  standalone: true,
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class Step1Component {
  step1Form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private funnelService: FunnelService
  ) {
    this.step1Form = this.fb.group({
      eligibleLegalForm: [null, Validators.required],
      businessLocation: [null, Validators.required],
      activity: ['', [Validators.required]],
      maxProjectedTurnover: ['', [Validators.required]]
    });
  }

     // Vérifie si un champ est invalide
    isFieldInvalid(fieldName: string): boolean {
      const field = this.step1Form.get(fieldName);
      return field ? (field.invalid && (field.touched || this.isSubmitting)) : false;
    }

     // Obtient le message d'erreur pour un champ
    getErrorMessage(fieldName: string): string {
      const control = this.step1Form.get(fieldName);
      if (control && control.errors) {
        if (control.errors['required']) {
          return `Le champ ${fieldName} est obligatoire`;
        }
      }
      return '';
    }


  onSubmit() {
    // Marquer tous les champs comme touchés pour déclencher l'affichage des erreurs
    Object.keys(this.step1Form.controls).forEach(key => {
      const control = this.step1Form.get(key);
      control?.markAsTouched();
    });

    if (this.step1Form.valid) {
      this.isSubmitting = true;
      
      this.funnelService.updateFunnelData(this.step1Form.value).pipe(
        switchMap(() => this.funnelService.findMatchingProducts()),
        switchMap(() => this.router.navigate(['/funnel/step2'])),
        catchError((error) => {
          console.error('Erreur lors de la soumission du formulaire:', error);
          return observableOf(null);
        }),
        finalize(() => {
          this.isSubmitting = false;
        })
      ).subscribe();
    }
  }


}
