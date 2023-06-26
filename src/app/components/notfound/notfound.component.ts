import { Component } from '@angular/core';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent {

  constructor(public local: LocalService){

  }

}
