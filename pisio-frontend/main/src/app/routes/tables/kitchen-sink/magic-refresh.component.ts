import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-magic-refresh',
  standalone: true,
  imports: [],
  templateUrl: './magic-refresh.component.html',
 
})
export class MagicRefreshComponent implements OnInit{

  constructor(private router: Router){}
  
  ngOnInit(): void {
    
      this.router.navigate(['/tables/pending-incidents']);
  }

}