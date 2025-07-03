import { Component, AfterViewInit } from '@angular/core';
import { colors, values } from './assets/var.container';

@Component({
  selector: 'app-ruleta',
  standalone: true,
  imports: [],
  templateUrl: './ruleta.component.html',
  styleUrl: './ruleta.component.css'
})

export class RuletaComponent implements AfterViewInit {

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
    let drawn = '';
    let pAccumulated = 0;

    values.forEach((value) => {
      if (result >= pAccumulated && result < value.probability + pAccumulated) {
        console.log(`Encontrado valor: ${value.name}`);
        drawn = value.name;
      }
      pAccumulated += value.probability;
    });

    if (!drawn) {
      console.log('No se ha ganado nada');
    }
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
