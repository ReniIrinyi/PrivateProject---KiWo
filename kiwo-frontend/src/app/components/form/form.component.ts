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
  appdata: any = [];
  labelsArray: any[] = [];
  daysArray: any[] = [];
  optionsArray: any[] = [];
  signaturePad: SignaturePad | undefined;
  serverStatus: boolean = false;
  showStatus: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      betreff: ['', Validators.required],
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      geburtsdatum: ['', Validators.required],
      klasse: ['', Validators.required],
      anschrift: ['', Validators.required],
      wohnort: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefon: ['', Validators.required],
      nachricht: ['', Validators.required],
      montag: [false],
      dienstag: [false],
      mittwoch: [false],
      donnerstag: [false],
      freitag: [false],
      fahrdienst: ['Ja', Validators.required],
      zvieri: ['Ja', Validators.required],
      fotoserlaubnis: ['Ja', Validators.required],
      verbindlich: [false, Validators.required],
      signatureImageFile: [''],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dataService.getDataObservable().subscribe((data) => {
      this.appdata = this.dataService.registration;

      this.daysArray = this.appdata.days[0]
        .split(',')
        .map((day: any) => day.toLowerCase());

      this.optionsArray = this.appdata.options[0]
        .split(',')
        .map((option: any) => option.toLowerCase());

      this.labelsArray = this.appdata.labels[0]
        .split(',')
        .map((label: any) => label.toLowerCase());

      // Add form controls based on labelsArray, daysArray, and optionsArray
      this.labelsArray.forEach((label) => {
        this.form.addControl(label, this.fb.control('', Validators.required));
      });
      this.daysArray.forEach((day) => {
        this.form.addControl(day, this.fb.control(false));
      });
      this.optionsArray.forEach((option) => {
        this.form.addControl(
          option,
          this.fb.control('ja', Validators.required)
        );
      });
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
      if (!signatureDataUrl.startsWith('data:image/png;base64,')) {
        console.error('Invalid signature data URL format');
        return;
      }
      this.form.get('signatureImageFile')?.setValue(signatureDataUrl);
    }
  }

  onSubmit() {
    this.updateSignatureInput();

    // if (this.form.valid)
    console.log(this.form.value.signatureImageFile);
    const signatureImage = this.dataURLtoFile(
      this.form.value.signatureImageFile,
      'signature.png'
    );
    const formData = new FormData();
    formData.append('betreff', this.form.value.betreff);
    formData.append('vorname', this.form.value.vorname);
    formData.append('nachname', this.form.value.nachname);
    formData.append('geburtsdatum', this.form.value.geburtsdatum);
    formData.append('klasse', this.form.value.klasse);
    formData.append('anschrift', this.form.value.anschrift);
    formData.append('wohnort', this.form.value.wohnort);
    formData.append('email', this.form.value.email);
    formData.append('telefon', this.form.value.telefon);
    formData.append('nachricht', this.form.value.nachricht);
    formData.append('fahrdienst', this.form.value.fahrdienst);
    formData.append('zvieri', this.form.value.zvieri);
    formData.append('fotoserlaubnis', this.form.value.fotoserlaubnis);
    formData.append('verbindlich', this.form.value.verbindlich);
    formData.append('signatureImageFile', signatureImage);
    for (const day of this.daysArray) {
      formData.append(day, this.form.value[day]);
    }

    // Send the formData to the server
    this.http.post('http://localhost:8080/api/submit', formData).subscribe(
      (response) => {
        this.serverStatus = true;
        this.showStatus = true;
        console.log('Form data submitted successfully:', response);
      },
      (error) => {
        this.serverStatus = false;
        this.showStatus = true;
        console.error('Error submitting form data:', error);
      }
    );
  }

  // Helper function to convert data URL to a File object
  dataURLtoFile(dataurl: string, filename: string): File {
    console.log('Data URL:', dataurl);

    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/^data:(.*?);/); // Update the regex here
    console.log('mimeMatch:', mimeMatch); // Add this line

    if (!mimeMatch) {
      throw new Error('Invalid data URL format');
    }
    const mime = mimeMatch[1];
    console.log('mime:', mime); // Add this line

    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
