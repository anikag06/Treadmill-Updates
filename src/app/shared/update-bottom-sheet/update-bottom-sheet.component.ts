import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-update-bottom-sheet',
  templateUrl: './update-bottom-sheet.component.html',
  styleUrls: ['./update-bottom-sheet.component.scss'],
})
export class UpdateBottomSheetComponent implements OnInit {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<UpdateBottomSheetComponent>,
  ) {}

  ngOnInit() {}

  onReloadClick() {
    this._bottomSheetRef.dismiss();
    document.location.reload();
  }
}
