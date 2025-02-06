import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FunnelService, Product } from '../../services/funnel.service';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  products: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private funnelService: FunnelService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.funnelService.findMatchingProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Une erreur est survenue lors de la récupération des produits';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  selectProduct(product: Product) {
    // Vous pouvez stocker le produit sélectionné dans le service si nécessaire
    this.router.navigate(['/funnel/step3']);
  }
}
