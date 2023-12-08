import { Component } from '@angular/core';
import { concertService } from '../services/concert.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Concert } from '../model/concert.model';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-concert',
  templateUrl: './update-concert.component.html',
  styleUrls: []
})
export class UpdateconcertComponent {

  currentconcert = new Concert();
  genres! : Genre[];
  updatedgenreId! : number;


  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private concertService: concertService) { }


    ngOnInit() {
      this.concertService.listegenres().subscribe(gen => {this.genres = gen;
      console.log(gen);
      });
      this.concertService.consulterconcert(this.activatedRoute.snapshot.params['id']).subscribe( cons =>{ this.currentconcert = cons;
      this.updatedgenreId = this.currentconcert.genre.idGenre;
      } ) ;
}

    updateConcert()
    { 
      this.currentconcert.genre = this.genres.find(gen => gen.idGenre == this.updatedgenreId)!;
      this.concertService.updateconcert(this.currentconcert).subscribe(cons => {
        this.router.navigate(['/concerts']); }
      );
    }
}
