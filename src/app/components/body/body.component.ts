import { Component, Input } from '@angular/core';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  constructor(public auth: LocalService){}

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768 && this.auth.barra) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0 && this.auth.barra) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
}
