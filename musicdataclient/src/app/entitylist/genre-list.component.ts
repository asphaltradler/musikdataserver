import {Component} from '@angular/core';
import {SearchfieldComponent} from '../search/searchfield.component';
import {EntityListComponent} from './entity-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Genre} from '../entities/genre';
import {GenreService} from '../services/genre.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-genre-list',
  standalone: true,
  imports: [
    SearchfieldComponent,
    NgForOf,
  ],
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.css'
})
export class GenreListComponent extends EntityListComponent<Genre> {
  constructor(genreService: GenreService, route: ActivatedRoute, router: Router) {
    super(genreService, route, router);
  }

}
