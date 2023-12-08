import { Component, OnInit } from '@angular/core';
import { Concert } from '../model/concert.model';
import { concertService } from '../services/concert.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent implements OnInit {
  concerts!: Concert[];
  nomConcert! : string;

  constructor(private concertService: concertService) {}

  ngOnInit(): void {
  }

  rechercherConcert() {
    this.concertService.rechercherParNom(this.nomConcert).subscribe(cons => {
      this.concerts = cons;
      console.log(cons);
    });
  }
}
