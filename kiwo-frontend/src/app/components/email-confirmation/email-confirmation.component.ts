import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/DataService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-email-confirmation',
    templateUrl: './email-confirmation.component.html',
    styleUrls: ['./email-confirmation.component.scss'],
    standalone: false
})
export class EmailConfirmationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  production: any;
  serverUrl: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const token = this.route.snapshot.paramMap.get('token');
      console.log(token);
      if (token) {
        console.log(token);
        this.confirmEmail(token);
        this.router.navigate(['/']);
      }
    });
  }

  confirmEmail(token: string): void {
    this.http.get(`https://kiwo-uerkental.ch/api/confirm/${token}`).subscribe({
      next: (response) => {
        this.snackBar.open(
          'Deine E-Mail-Adresse wurde erfolgreich bestätigt, deine Anmeldung ist jetzt aktiv!',
          'Schließen',
          {
            duration: 10000,
          }
        );
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open(
          'Der Link ist ungültig oder abgelaufen.',
          'Schließen',
          {
            duration: 10000,
          }
        );
      },
    });
  }
}
