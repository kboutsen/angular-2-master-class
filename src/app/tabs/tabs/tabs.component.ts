import { Component, OnInit } from '@angular/core';
import { TabComponent } from '../tab/tab.component'

@Component({
  selector: 'trm-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnInit {
  private tabs: Array<TabComponent>;

  constructor() { }

  ngOnInit() {
    this.tabs = new Array<TabComponent>();
  }

  addTab(tab: TabComponent) {
    this.tabs.push(tab);

    if (this.tabs.length == 1) {
      tab.selected = true;
    }
  }

  select(tab: TabComponent) {
    this.tabs.forEach(tab => tab.selected = false);
    tab.selected = true;
  }

}
