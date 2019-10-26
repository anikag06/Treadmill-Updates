import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  phqClicked = false;
  gadClicked = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit() {
  }

  onPhqNineClicked() {
    this.phqClicked = true;
    this.router.navigate(['phq'], {relativeTo: this.route} );
  }
  onGadSevenClicked() {
    this.gadClicked = true;
    this.router.navigate(['gad'], {relativeTo: this.route} );
  }
}
