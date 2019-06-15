import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imgPath = '../assets/images/transport_01.jpg';
  constructor() { }

  ngOnInit() {
  }

}
