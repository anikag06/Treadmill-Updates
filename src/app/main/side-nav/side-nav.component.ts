import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    items1 = ['Dashboard', 'Modules', 'Games', 'Groups', 'Scores', 'Resources', 'Settings'];
    items2 = ['Need to talk', 'Logout'];

    links1 = ['dashboard', 'modules', 'games', '', '', '', ''];
    links2 = ['', ''];

    icons1 = ['dashboard.svg', 'modules.svg', 'games.svg', 'groups.svg', 'scores.svg', 'resources.svg', 'settings.svg'];
    icons2 = ['need to talk.svg', 'logout.svg']


  constructor(private breakpointObserver: BreakpointObserver) {}

}
