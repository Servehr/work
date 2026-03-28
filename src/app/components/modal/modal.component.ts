// modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmAction = new EventEmitter<void>();

  close() {
    this.isOpen = false;
    this.closeModal.emit();
  }

  confirm() {
    this.confirmAction.emit();
    this.close();
  }
}
