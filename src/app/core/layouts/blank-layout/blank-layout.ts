import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Navbar } from "../../../shared/components/navbar/navbar";

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './blank-layout.html',
  styleUrl: './blank-layout.css'
})
export class BlankLayout {

}
