import { Component, Input, OnInit } from '@angular/core';
import { KeyWord } from '../../assets/scripts/KeyWord';

@Component({
  selector: 'app-keywords-table',
  templateUrl: './keywords-table.component.html',
  styleUrls: ['./keywords-table.component.scss']
})
export class KeywordsTableComponent implements OnInit {

  @Input() tableData: KeyWord[];
  constructor() { }

  ngOnInit() {
  }

}
