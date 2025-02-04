import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isHeaderCollapsed = false;
  private lastScrollPosition = 0;
  private readonly SCROLL_THRESHOLD = 50;

  @HostListener('window:scroll')
  onWindowScroll() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Si on scrolle vers le bas et qu'on a dépassé le seuil
    if (currentScrollPosition > this.lastScrollPosition && currentScrollPosition > this.SCROLL_THRESHOLD) {
      this.isHeaderCollapsed = true;
    }
    // Si on scrolle vers le haut
    else if (currentScrollPosition < this.lastScrollPosition) {
      this.isHeaderCollapsed = false;
    }
    
    this.lastScrollPosition = currentScrollPosition;
  }
}
