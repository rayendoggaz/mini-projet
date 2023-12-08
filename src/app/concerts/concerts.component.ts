import { Component } from '@angular/core';
import { Concert } from '../model/concert.model';
import { concertService } from '../services/concert.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.css']
})
export class concertsComponent {
  concerts?: Concert[];

  constructor(private concertService: concertService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.chargerconcert();
  }
  
  chargerconcert() {
    this.concertService.listeconcert().subscribe(cons => {
      console.log('Concerts from API:', cons);
      this.concerts = cons;
  
      this.concerts.forEach(concert => {
        console.log('Concert before rendering:', concert);
        console.log('Genre property exists:', 'genre' in concert);
        console.log('Nomgenre property exists:', 'nomgenre' in concert.genre);
      });
    });
  }
  
  

  supprimerconcert(c: Concert) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.concertService.supprimerconcert(c.idConcert).subscribe(() => {
        console.log("concert supprimé");
        this.chargerconcert();
      });
  }
}
