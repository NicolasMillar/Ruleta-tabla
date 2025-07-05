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
  winnerName = '';

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

    for (const value of values) {
      if (result >= pAccumulated && result < pAccumulated + value.probability) {
        drawn = value;
        break;
      }
      pAccumulated += value.probability;
    }

    if (!drawn) {
      console.log('No se ha ganado nada');
      return;
    }

    const sectorMid = pAccumulated + (drawn.probability / 2);

    const endRotation = this.calculateGrade(100 - sectorMid) + (10 * 360);

    this.spinAnimation(endRotation);
    this.winnerName = drawn.name;

    setTimeout(() => {
      const modal = document.getElementById('winModal') as HTMLDialogElement | null;
      modal?.showModal();
    }, 5000);
  }

  spinAnimation(endRotation: number) {
    const roulette = document.getElementById('roulette');
    if (!roulette) return;

    const currentRotation = parseFloat(this.giro) % 360;

    const rotationDiff = (endRotation - currentRotation + 360) % 360;
    const totalRotation = currentRotation + 360 * 10 + rotationDiff;

    this.giro = `${totalRotation}deg`;

    roulette.style.transition = 'transform 5s cubic-bezier(0.165, 0.84, 0.44, 1)';
    roulette.style.transform = `rotate(${endRotation}deg)`;

    setTimeout(() => {
      roulette.style.transition = 'none';
      const finalRotation = totalRotation % 360;
      this.giro = `${finalRotation}deg`;
      roulette.style.transform = `rotate(${finalRotation}deg)`;
    }, 5000);
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
      elementContainer.classList.add('w-100', 'h-100', 'absolute');
      elementContainer.style.transform = `rotate(${this.calculateGrade(pAccumulated)}deg)`;
      elementContainer.style.clipPath = this.getPosition(value.probability);
      elementContainer.classList.add(colors[index % colors.length]);

      const midAngle = pAccumulated + value.probability / 2;
      const angleDeg = this.calculateGrade(midAngle);

      const label = document.createElement('div');
      label.style.position = 'absolute';
      label.style.left = '50%';
      label.style.top = '0';
      label.style.height = '50%';
      label.style.display = 'flex';
      label.style.justifyContent = 'center';
      label.style.alignItems = 'center';
      label.style.transform = `translateX(-50%) rotate(${angleDeg}deg)`;

      const text = document.createElement('span');
      text.textContent = value.name;
      text.style.transform = `rotate(${-angleDeg}deg)`;
      text.style.fontSize = '0.75rem';
      text.style.color = '#000';
      text.style.pointerEvents = 'none';

      label.appendChild(text);
      elementContainer.appendChild(label);
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
