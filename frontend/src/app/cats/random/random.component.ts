import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.less']
})
export class RandomComponent implements OnInit {
  cat;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.random();
  }

  random() {
    this.apiService.getRandomCat().subscribe((data) => {
      console.log(data);
      this.cat = data;
    });
  }

}
