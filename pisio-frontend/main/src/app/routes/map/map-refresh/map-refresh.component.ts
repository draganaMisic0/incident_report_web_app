import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-map-refresh',
  standalone: true,
  imports: [],
  templateUrl: './map-refresh.component.html',
  styleUrl: './map-refresh.component.scss'
})
export class MapRefreshComponent implements OnInit{

    constructor(private router: Router){}
    
    ngOnInit(): void {
      this.router.navigate(["/map"]);
    }
}
