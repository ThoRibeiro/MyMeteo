import { Component } from '@angular/core';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-grid-tile',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './grid-tile.component.html',
  styleUrl: './grid-tile.component.css',
})
export class GridTileComponent {
  constructor() {}

  ngOnInit() {}
}
