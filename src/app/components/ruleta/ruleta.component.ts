import { Component, AfterViewInit, HostBinding } from '@angular/core';
import { colors, values } from './assets/var.container';

@Component({
  selector: 'app-ruleta',
  standalone: true,
  imports: [],
  templateUrl: './ruleta.component.html',
  styleUrl: './ruleta.component.css'
})

export class RuletaComponent implements AfterViewInit {

  @HostBinding('style.--giro-ruleta') giro = '0deg';

  ngAfterViewInit(): void {
    this.adjustRoulette();
  }

  adjustRoulette() {
    const roulette = document.getElementById('roulette');
    const rouletteContainer = document.createElement('div');
    rouletteContainer.id = 'container';
    roulette?.appendChild(rouletteContainer);

    this.generateRoulette(rouletteContainer);
    this.generateLimit(rouletteContainer);
  }

  spin() {
    const result = Math.random() * 100;
    let drawn: { name: string; probability: number } | undefined;
    let pAccumulated = 0;
    const roulette = document.getElementById('roulette');
    if (!roulette) return;
    roulette.classList.toggle('spin', true);

    values.forEach((value) => {
      if (result >= pAccumulated && result < value.probability + pAccumulated) {
        console.log(`Encontrado valor: ${value.name}`);
        drawn = {
          name: value.name,
          probability: value.probability + pAccumulated
        };
      }
      pAccumulated += value.probability;
    });

    if (!drawn) {
      console.log('No se ha ganado nada');
      return;
    }

    console.log(drawn);
    const endRotation = ((drawn.probability * 360 / 100) - 1) + 360 * 10;

    this.spinAnimation(endRotation);
  }

  spinAnimation(endRotation: number) {
    const roulette = document.getElementById('roulette');
    if (!roulette) return;

    const startRotation = parseFloat(this.giro) || 0;

    roulette.animate([
      { transform: `rotate(${startRotation}deg)` },
      { transform: `rotate(${endRotation}deg)` }
    ], {
      duration: 5000,
      easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      fill: 'forwards'
    });

    this.giro = `${endRotation}deg`;
  }





  getPosition(probability: number): string {
    const probabilityInRadians = (probability / 100) * 2 * Math.PI;
    const y3 = (0.5 - (0.5 / Math.tan(probabilityInRadians))) * 100;
    return `polygon(50% 0, 100% 0, 100% ${y3}%, 50% 50%)`;
  }

  calculateGrade(probability: number): number {
    return probability * 360 / 100;
  }

  generateRoulette(rouletteContainer: HTMLDivElement) {
    let pAccumulated = 0;
    values.forEach((value, index) => {
      const elementContainer = document.createElement('div');
      const colorClass = colors[index % colors.length];

      elementContainer.classList.add('w-100', 'h-100', 'absolute');
      elementContainer.style.transform = `rotate(${this.calculateGrade(pAccumulated)}deg)`
      elementContainer.style.clipPath = this.getPosition(value.probability);
      elementContainer.classList.add(colorClass);
      rouletteContainer.appendChild(elementContainer);
      pAccumulated += value.probability;
    });
  }

  generateLimit(rouletteContainer: HTMLDivElement) {
    let pAccumulated = 0;
    values.forEach((_, index) => {
      const separator = document.createElement('div');
      separator.classList.add('absolute', 'bg-black');
      separator.style.width = '2px';
      separator.style.height = '50%';
      separator.style.top = '0';
      separator.style.left = '50%';
      separator.style.transformOrigin = 'bottom';
      separator.style.transform = `rotate(${this.calculateGrade(pAccumulated)}deg)`;

      rouletteContainer.appendChild(separator);
      pAccumulated += values[index].probability;
    });
  }
}
