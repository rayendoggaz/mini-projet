import { Component } from '@angular/core';
import { Concert } from '../model/concert.model';
import { concertService } from '../services/concert.service';
import { Genre } from '../model/genre.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-concert',
  templateUrl: './add-concert.component.html',
  styleUrls: ['./add-concert.component.css']
})

export class AddconcertComponent {
  newconcert = new Concert();

  genres! : Genre[];

  newIdgenre! : number;

  newgenre! : Genre;

  ngOnInit() {
    this.concertService.listegenres().subscribe(gen => {this.genres = gen;
    console.log(gen);
});
  }

  message!: string;

  constructor(private concertService: concertService , private router :Router,) { }

  addconcert() {
    this.newconcert.genre = this.genres.find(genre => genre.idGenre == this.newIdgenre)!;
    this.concertService.ajouterconcert(this.newconcert).subscribe(cons => {
    console.log(cons);
    this.router.navigate(['concerts']);
    });
    }
}
