import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { InfosComponent } from './components/infos/infos.component';
import { AboutComponent } from './components/about/about.component';
import { FormComponent } from './components/form/form.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LinksComponent } from './components/links/links.component';
import { ShareLinksComponent } from './components/share-links/share-links.component';
import { ContactComponent } from './components/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { MainComponent } from './components/main/main.component';
import { DatePipe } from '@angular/common';
import { CookiesComponent } from './components/cookies/cookies.component';
import { CookiesSettingsComponent } from './components/cookies-settings/cookies-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    GalleryComponent,
    InfosComponent,
    AboutComponent,
    FormComponent,
    FooterComponent,
    AboutusComponent,
    RegistrationComponent,
    LinksComponent,
    ShareLinksComponent,
    ContactComponent,
    ImpressumComponent,
    MainComponent,
    CookiesComponent,
    CookiesSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [DatePipe,  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
