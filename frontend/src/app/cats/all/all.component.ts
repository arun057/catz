import { ChangeDetectionStrategy, Component, Injectable, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cat } from '../../auth/cat';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.less'],
  changeDetection: ChangeDetectionStrategy.Default
})


@Injectable({
  providedIn: 'root'
})

export class AllComponent implements OnInit {
  private _cats = new BehaviorSubject([]);

  public readonly cats = this._cats.asObservable();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.search({});
  }

  search(form) {
    this.apiService.getCats(form.value).subscribe((data: any) => {
      if (data === 'No cats found.') {
        this._cats.next([]);
      } else {
        console.log(data);
        this._cats.next(data);
        console.log(this.cats)
      }
    });
  }

}
