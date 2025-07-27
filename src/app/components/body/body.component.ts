import { Component } from '@angular/core';
import { RuletaComponent } from '../ruleta/ruleta.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RuletaComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
