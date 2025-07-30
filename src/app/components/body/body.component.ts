import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RuletaComponent } from '../ruleta/ruleta.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [NgIf, RuletaComponent, TableComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  @Input() activeTab: 'ruleta' | 'tabla' = 'ruleta';

}
