import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { InputGenericComponent } from './shared/input-generic/input-generic.component';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { FormsModule } from '@angular/forms';
import { InputHeaderComponent } from './components/input-header/input-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    InputGenericComponent,
    InputCheckboxComponent,
    InputHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
