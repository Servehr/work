import { Component } from '@angular/core';
import PaystackPop from '@paystack/inline-js';
import { BotinComponent } from '../../../components/controls/botin/botin.component';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [BotinComponent],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {

  style: any = {
    'background-color' : '#be9d18',
    'color': 'black',
    'padding': '20px'
  }
  
  ChangeOnButtonHoverIn()
  {
     this.style = {
       'background-color' : '#776005',
       'color': 'white',
       'padding': '20px'     
     }
  }

  ChangeOnButtonHoverOut()
  {
     this.style = {
       'background-color' : '#be9d18',
       'color': 'black',
       'padding': '20px'   
     } 
  }

  makePayment() 
  {
    const popup = new PaystackPop();
    popup.newTransaction({
      key: environment.PUBLIC_KEY, // Replace with your public key
      email: 'customer@email.com',
      amount: 500000, // Amount in kobo ($5000 * 100$)
      currency: 'NGN',
      reference: '' + Math.floor(Math.random() * 1000000000 + 1), // Unique reference
      onSuccess: (transaction: any) => {
         console.log(transaction)
        alert('Payment successful: ' + transaction.reference);
      },
      onCancel: () => {
        alert('Transaction was cancelled');
      },
    });
  }

  onSuccess(response: any) {
    console.log('Payment successful', response);
  }
  onClose() {
    console.log('Payment closed');
  }
  onInit() {
    console.log('Payment initialized');
  }


}
