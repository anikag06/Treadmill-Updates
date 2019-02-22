import { Component, OnInit, Input } from '@angular/core';
import { Module } from '../module.model';

@Component({
  selector: 'app-module-slide',
  templateUrl: './module-slide.component.html',
  styleUrls: ['./module-slide.component.scss']
})
export class ModuleSlideComponent implements OnInit {

  @Input('module') module!: Module;

  constructor() { }

  ngOnInit() {
  }

}
