import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";

import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed = true;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorage: DataStorageService, private authService: AuthService) {
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.currentUser.subscribe(user =>{
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
