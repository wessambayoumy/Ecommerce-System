import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class InputComponent {
  @Input() control!: any;
  @Input() nameInput: string = '';
  @Input() typeInput: string = '';
  @Input() idInput: string = '';
  @Input() placeholderInput: string = '';
  @Input() label: string = '';
  @Input() element: string = 'input';

  showPassword: boolean = false;
}
