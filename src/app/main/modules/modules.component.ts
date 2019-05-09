import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../shared/main.animations';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TREADWILL } from '@/app.constants';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
  animations: [ slideInAnimation ],
})
export class ModulesComponent implements OnInit {

  constructor(
    private titleService: Title,
  ) {
    this.titleService.setTitle('Modules | ' + TREADWILL);
  }

  ngOnInit() {
  }

  getRouteData(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
