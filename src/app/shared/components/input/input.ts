import {
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class InputComponent {
  control: InputSignal<any> = input('');
  nameInput: InputSignal<string> = input('');
  typeInput: InputSignal<string> = input('');
  idInput: InputSignal<string> = input('');
  placeholderInput: InputSignal<string> = input('');
  label: InputSignal<string> = input('');
  element: InputSignal<string> = input('input');

  showPassword: WritableSignal<boolean> = signal(false);
}
