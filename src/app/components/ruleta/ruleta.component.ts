import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-ruleta',
  standalone: true,
  imports: [],
  templateUrl: './ruleta.component.html',
  styleUrl: './ruleta.component.css'
})

export class RuletaComponent implements AfterViewInit {
  readonly one = {
    name: 'Abandonico',
    probability: 17
  };

  readonly two = {
    name: 'Sticker',
    probability: 17
  };

  readonly three = {
    name: 'Millar',
    probability: 17
  };

  readonly four = {
    name: 'Gato pan',
    probability: 17
  };

  readonly five = {
    name: 'Osta',
    probability: 16
  };

  readonly six = {
    name: 'Rigo',
    probability: 16
  };

  readonly values = [this.one, this.two, this.three, this.four, this.five, this.six];

  ngAfterViewInit(): void {
    this.adjustRoulette();
  }

  adjustRoulette() {
    const roulette = document.getElementById('roulette');
    const rouletteContainer = document.createElement('div');
    const colors = [
      'bg-red-200',
      'bg-yellow-200',
      'bg-green-200',
      'bg-blue-200',
      'bg-purple-200',
      'bg-pink-200',
      'bg-indigo-200',
    ];


    rouletteContainer.id = 'container';
    let pAccumulated = 0;
    roulette?.appendChild(rouletteContainer);
    this.values.forEach((value, index) => {
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


  getPosition(probability: number): string {
    const probabilityInRadians = (probability / 100) * 2 * Math.PI;
    const y3 = (0.5 - (0.5 / Math.tan(probabilityInRadians))) * 100;
    console.log(y3);
    return `polygon(50% 0, 100% 0, 100% ${y3}%, 50% 50%)`;
  }

  calculateGrade(probability: number): number {
    return probability * 360 / 100;
  }
}
