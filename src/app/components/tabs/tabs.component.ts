import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

  @Input() TabPages: string[] = []
  position: number = 0

  @Output() CurrentPage: EventEmitter<number> = new EventEmitter()

  activeTab(element: any) 
  {
     let siblings = element.parentNode.querySelectorAll("button");
     for (let item of siblings) {
       item.children[1].classList.add("hidden");
       item.classList.add("text-gray-600");
       item.classList.remove("text-indigo-700");
       item.children[0].children[1].innerHTML = "Inactive";
     }
     element.children[1].classList.remove("hidden");
     element.classList.remove("text-gray-600");
     element.classList.add("text-indigo-700");
     element.children[0].children[1].innerHTML = "Active";
  }

  setActive(active: number)
  {
     this.position = active
     this.CurrentPage.emit(active)
  }
}
