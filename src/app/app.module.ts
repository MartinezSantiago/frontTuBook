import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ListBooksComponent } from './components/list-books/list-books.component';
import { ItemBookComponent } from './components/item-book/item-book.component';
import { HttpClientModule } from '@angular/common/http';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { ContextService } from './context.service';
import { ListLoansComponent } from './components/list-loans/list-loans.component';
import { ItemLoansComponent } from './components/item-loans/item-loans.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ListBooksComponent,
    ItemBookComponent,
    MyBooksComponent,
    NotificationComponent,
    LoginComponent,
    RegisterComponent,
    ListLoansComponent,
    ItemLoansComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ContextService],
  bootstrap: [AppComponent]
})
export class AppModule { }
