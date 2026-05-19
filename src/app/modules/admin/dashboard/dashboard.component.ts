import { Component, Input, OnInit } from '@angular/core';
import { PulsateComponent } from '../../../components/pulsate/pulsate.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PulsateComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

   title: string = "Overview"
   users = ["first", "second", "third", "fourth", "fifth", "six", "seven", "eight"]

   @Input() summaries: { 'text': string, 'nos': number, updated: number | string }[] = [
      { 'text': 'Super Admin', 'nos': 1, updated: 2019 },
      { 'text': 'Categories', 'nos': 2, updated: 2014 },
      { 'text': 'Roles', 'nos': 25, updated: 2000 },
      { 'text': 'Users', 'nos': 5, updated: 1999 },
      { 'text': 'Pending Approval', 'nos': 148, updated: 2026 },
      { 'text': 'Branch(es)', 'nos': 4, updated: 2022 },
      { 'text': 'Department', 'nos': 3, updated: 2019 },
      { 'text': 'Technicians', 'nos': 59, updated: 2015 },
      { 'text': 'Vendors', 'nos': 148, updated: 2019 },
      { 'text': 'Partners', 'nos': 11, updated: 2019 },
      { 'text': 'Apprentice', 'nos': 34, updated: 2019 },
      { 'text': 'Student', 'nos': 549, updated: 2019 },
      { 'text': 'Notifications', 'nos': 1, updated: 2019 },
      { 'text': 'Blog', 'nos': 24, updated: 2025 },
      { 'text': 'Blog Comment', 'nos': 1034, updated: 2026 },
      { 'text': 'Plans', 'nos': 3, updated: 2026 }
   ]

   @Input() Action: boolean = false
   @Input() ViewAction: boolean = false
   @Input() TableType: string = ''
   
   constructor(){}

   ngOnInit(): void {
      // this.store.select(isAuthenticated).subscribe((data) => {
      //   console.log(data.auth.user)
      // })
      
   }

}
