import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  step2Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {
    this.step2Form = this.fb.group({
      chiffreAffaire: ['', Validators.required]
    });
  }

  ngOnInit() {
    const clientData = this.clientService.getClientData();
    if (clientData.chiffreAffaire) {
      this.step2Form.patchValue({
        chiffreAffaire: clientData.chiffreAffaire
      });
    }
  }

  onPrevious() {
    this.router.navigate(['/funnel/step1']);
  }

  async onSubmit() {
    if (this.step2Form.valid) {
      this.clientService.updateClientData(this.step2Form.value);
      await this.clientService.saveClientData();
      this.router.navigate(['/funnel/step3']);
    }
  }
}
