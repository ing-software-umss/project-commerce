import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  public isLogged: boolean = !false;// switch para ususario logeado y no legeados
  ngOnInit() {
  }

}
