import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-guitar-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteGuitarButtonComponent {

  @Input() pokemonID: string = "";
  onFavoriteCklic(): void{
    // add pokemon to the best
    alert("work " + this.pokemonID)
}
}