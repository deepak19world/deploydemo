import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private datastorageservice: DataStorageService, private authservice: AuthService) { }

  ngOnInit() {
   this.userSub = this.authservice.user.subscribe(user =>{
       this.isAuthenticated = !!user;
       console.log(!user);
       console.log(!!user);
   });
  }

  onSave(){
      this.datastorageservice.storeRecipes();
  }

  OnLogOut(){
    this.authservice.logout();
  }

  onFetch(){
    this.datastorageservice.fetchRecipes().subscribe();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  

}
