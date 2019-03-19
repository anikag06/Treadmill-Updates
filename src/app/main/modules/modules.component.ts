import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../shared/main.animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
  animations: [ slideInAnimation ],
})
export class ModulesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getRouteData(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
