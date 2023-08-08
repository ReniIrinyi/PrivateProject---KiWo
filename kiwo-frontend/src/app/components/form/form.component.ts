import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SignaturePad from 'signature_pad';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/DataService';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  selectArray: any = ['ja', 'nein', ''];
  appdata: any = [];
  labels: any;
  days: any;
  options: any;
  labelsArray: any[] = [];
  daysArray: any[] = [];
  optionsArray: any[] = [];
  signaturePad: SignaturePad | undefined;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      anmeldung: ['', Validators.required],
      name: ['', Validators.required],
      vorname: ['', Validators.required],
      geburtsdatum: ['', Validators.required],
      klasse: ['', Validators.required],
      anschrift: ['', Validators.required],
      wohnort: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefon: ['', Validators.required],
      nachricht: ['', Validators.required],
      dienstag: [false],
      mittwoch: [false],
      donnerstag: [false],
      freitag: [false],
      fahrdienst: ['Ja', Validators.required],
      zvieriDienstag: ['Ja', Validators.required],
      fotosErlaubnis: ['Ja', Validators.required],
      verbindlich: [false, Validators.required],
      signature: [''],
    });
  }

  ngOnInit(): void {
    this.getData();
    this.labelsArray.forEach((label) => {
      this.form.addControl(label, this.fb.control('', Validators.required));
    });
  }

  getData() {
    this.dataService.getDataObservable().subscribe((data) => {
      this.appdata = this.dataService.registration;
      this.days = this.dataService.registration.days;
      this.daysArray = this.days[0].split(',');

      this.options = this.dataService.registration.options;
      this.optionsArray = this.options[0].split(',');

      this.labels = this.dataService.registration.labels;
      this.labelsArray = this.labels[0].split(',');
    });
  }

  ngAfterViewInit(): void {
    const canvas: HTMLCanvasElement | null = document.getElementById(
      'signatureCanvas'
    ) as HTMLCanvasElement;
    if (canvas) {
      this.signaturePad = new SignaturePad(canvas);
    }
  }

  clearSignature(): void {
    if (this.signaturePad) {
      this.signaturePad.clear();
      this.form.get('signature')?.setValue('');
    }
  }

  updateSignatureInput(): void {
    if (this.signaturePad) {
      const signatureDataUrl = this.signaturePad.toDataURL();
      this.form.get('signature')?.setValue(signatureDataUrl);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // Convert signature data URL to a file if needed
      const signatureFile = this.dataURLtoFile(
        this.form.value.signature,
        'signature.png'
      );

      const formData = new FormData();
      formData.append('anmeldung', this.form.value.anmeldung);
      formData.append('name', this.form.value.name);
      // ... (add other form values)

      // Append the signature file to the formData
      formData.append('signature', signatureFile);

      // Send the formData to the server
      this.http.post('your-server-endpoint', formData).subscribe(
        (response) => {
          // Handle response from the server
          console.log('Form data submitted successfully:', response);
        },
        (error) => {
          // Handle error if the request fails
          console.error('Error submitting form data:', error);
        }
      );
    }
  }
  // Helper function to convert data URL to a File object
  private dataURLtoFile(dataURL: string, fileName: string): File {
    const arr = dataURL.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);

    if (!mimeMatch || mimeMatch.length < 2) {
      throw new Error('Invalid data URL format');
    }

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], fileName, { type: mime });
  }
}
