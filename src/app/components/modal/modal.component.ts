// modal.component.ts
import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() isOpen = false;
  @Input() title = 'Modal Title'
  @Input() modalWidth: string = 'w-[750px]'
  closeModal = output<void>();
  confirmAction = output<void>();

  close() 
  {
    this.isOpen = false;
    this.closeModal.emit();
  }

  confirm() {
    this.confirmAction.emit();
    this.close();
  }
}
