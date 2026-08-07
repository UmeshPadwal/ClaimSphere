import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css'
})
export class StatCardComponent {

  title = input('');

  value = input<number>(0);

  icon = input('');

  color = input('#2563eb');

  trend = input('+12%');

  subtitle = input('Compared to last month');
}