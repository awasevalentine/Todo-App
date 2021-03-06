import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './pages/Auth/auth/auth.module';
import { TodoDataService } from './Models/Services/todo-data.service';
import { AuthService } from './Models/Services/auth.service';
import { LoggedInGuard } from './pages/Auth/auth/logged-in.guard';
import { AngularMaterialModule } from './Global-Modules/angular-material/angular-material.module';
import { ComponentsModule } from './pages/Components/components.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { APP_BASE_HREF } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    AuthModule,
    ComponentsModule,
    
    
  ],

  providers: [
    TodoDataService,
    AuthService,
    LoggedInGuard,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
