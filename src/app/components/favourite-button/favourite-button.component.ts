import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { FavouriteService } from 'src/app/services/favourite.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css']
})
export class FavouriteButtonComponent implements OnInit{
  public loading: boolean = false
  public isFavourite: boolean = false
  @Input() pokemonId: number = 0; 

  

  constructor(
    private readonly favouriteservice: FavouriteService,
    private trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.isFavourite = this.trainerService.inFavourite(this.pokemonId)
    
  }

  onFavouriteClick(): void {
      this.loading = true
    this.favouriteservice.addToFavourite(this.pokemonId)
    .subscribe({
      next: (trainer: Trainer) => {
        this.loading = false;
        this.isFavourite = this.trainerService.inFavourite(this.pokemonId)
      },
      error:(error: HttpErrorResponse) =>{
        console.log("ERROR " , error.message)
      }
    })
  }
}
