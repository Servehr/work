import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/anonymous/header/header.component';
import { FooterComponent } from '../../shared/anonymous/footer/footer.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { FastResponseFormComponent } from '../../modules/anonymous/home/fast-response-form/fast-response-form.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ModalComponent, FastResponseFormComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  
   modalWidth = signal<string>('w-[750px]')
   // openFastForm = signal<boolean>(false)
   openFastForm: boolean = false

   sendFastForm = () => 
   {
      // this.openFastForm.set(false)
      this.openFastForm = true
   }  

   closeForm = () => 
   {
      // this.openFastForm.set(false)
      this.openFastForm = false
   }

}
