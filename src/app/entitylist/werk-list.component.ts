import {Component} from '@angular/core';
import {AbstractEntityList} from './abstractEntityList';
import {Werk} from '../entities/werk';
import {WerkService} from '../services/werk.service';
import {SearchfieldComponent} from '../search/searchfield.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-werk-list',
  standalone: true,
  imports: [
    SearchfieldComponent
  ],
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.css'
})
export class WerkListComponent extends AbstractEntityList<Werk> {
  constructor(service: WerkService, route: ActivatedRoute) {
    super(service, route);
  }
}
