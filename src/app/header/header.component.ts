import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // isLogged = false;
  private userSubscription!: Subscription;

  constructor(public authentificationService: AuthentificationService) {}
  ngOnInit(): void {
    //this.authentificationService.currentUser$.subscribe((user) => {
    //this.isLogged = !!user;
    // });
  }
  logOut() {
    this.authentificationService.logout();
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
