import { Component, OnInit } from '@angular/core';
import { concertService } from '../services/concert.service';
import { Concert } from '../model/concert.model';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styleUrls: ['./recherche-par-genre.component.css']
})
export class RechercheParGenreComponent implements OnInit {
  idgenre!: number;
  concerts!: Concert[];
  genres!: Genre[];

  constructor(private concertService: concertService) {}

  ngOnInit(): void {
    this.concertService.listegenres().
    subscribe(gen => {this.genres = gen;
    console.log(gen);
    });
    }
    
  

    onChange() {
      this.concertService.rechercherParGenre(this.idgenre).
      subscribe(con =>{this.concerts=con});
      }
}