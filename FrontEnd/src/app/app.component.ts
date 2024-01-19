import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridTileComponent } from './grid-tile/grid-tile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GridTileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MyMeteo';
}
