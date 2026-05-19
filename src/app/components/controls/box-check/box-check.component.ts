
import {Component, Input, Host } from '@angular/core';
import { CheckboxGroupComponent } from '../check/checkbox-group.compoent';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-box-check',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './box-check.component.html',
  styleUrl: './box-check.component.scss'
})
export class BoxCheckComponent {
    @Input() value: any;

    constructor(@Host() private checkboxGroup: CheckboxGroupComponent) {
    }

    toggleCheck() {
        this.checkboxGroup.addOrRemove(this.value);
    }

    isChecked() {
        return this.checkboxGroup.contains(this.value);
    }
}

