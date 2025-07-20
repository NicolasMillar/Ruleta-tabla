import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RuletaComponent } from './components/ruleta/ruleta.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RuletaComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ruleta';
}
