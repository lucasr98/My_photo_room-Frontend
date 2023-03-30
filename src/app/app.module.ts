import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { AccountComponent } from './account/account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SubmitComponent } from './submit/submit.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ModalSubmitComponent } from './modal-submit/modal-submit.component';
import { LoadingWindowComponent } from './loading-window/loading-window.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MenuDirective } from './directives/menu.directive';
import { AutosizeModule } from 'ngx-autosize';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoadingMessageComponent } from './loading-message/loading-message.component';
import { ModalSubmitPcComponent } from './modal-submit-pc/modal-submit-pc.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SigninComponent,
    AccountComponent,
    NotFoundComponent,
    SubmitComponent,
    GalleryComponent,
    ModalSubmitComponent,
    LoadingWindowComponent,
    MenuDirective,
    LoadingSpinnerComponent,
    LoadingMessageComponent,
    ModalSubmitPcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    AutosizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
