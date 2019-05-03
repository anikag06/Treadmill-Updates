import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesListComponent } from './games-list.component';
import { GameItemComponent } from './game-item/game-item.component';
import { ModulesService } from '@/main/modules/modules.service';
import { LocalStorageService } from '@/shared/localstorage.service';
import { GamesService } from '@/main/shared/games.service';

describe('GamesListComponent', () => {
  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesListComponent, GameItemComponent ],
      providers: [
        ModulesService,
        LocalStorageService,
        GamesService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
