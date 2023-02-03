import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorite-guitar-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteGuitarButtonComponent {
  @Input() pokemonID: number = 0;
  get loading(): boolean{
    return this.favoriteService.loading
  }
  constructor(
    private readonly favoriteService: FavoriteService
  ){}
  onFavoriteCklic(): void{
    // add pokemon to the best
    console.log("aass")
    this.favoriteService.addToFavorites(this.pokemonID)
    .subscribe({
      next: (response: any) => {
        console.log(response)
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR " , error.message)
      }
  
    })
}
}