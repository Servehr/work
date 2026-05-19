import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  private channel: BroadcastChannel | null = null;
  private messageSubject = new Subject<any>();
  public messages$: Observable<any> = this.messageSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) 
  {
    if (isPlatformBrowser(this.platformId) && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel('clear-session')

      this.channel.onmessage = (event) => {
        this.messageSubject.next(event.data);
      };
    }
  }

  publish(message: any): void {
    if (this.channel) {
      this.channel.postMessage(message); // Send message to other tabs
    } else {
      console.warn('BroadcastChannel not supported or not in a browser environment');
    }
  }

  close(): void {
    if (this.channel) {
      this.channel.close(); // Close the channel when needed
    }
  }
}
