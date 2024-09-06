import { Component, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FirebaseAuthenticationService } from '../../../services/firebase-authentication.service';
import { EventService } from '../../../core/services/event.service';
import { Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { Company, CompanyProfile } from '../../../models/interfaces/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  @ViewChild('logoUploader') logoUploader: FileUpload;
  @ViewChild('bannerUploader') bannerUploader: FileUpload;
  showLoading: boolean = false;
  employeeForm: FormGroup;
  profileForm: FormGroup;
  logoPreview: string | ArrayBuffer | null = null;
  bannerPreview: string | ArrayBuffer | null = null;
  profileData: CompanyProfile;

  constructor(
    private firebaseAuthService: FirebaseAuthenticationService,
    private router: Router,
    private eventService: EventService,
    private fb: FormBuilder
  ) {
    this.loadData();
  }

  ngOnInit() {
    this.buildFormEmployee();
  }

  async loadData() {
    const user = this.firebaseAuthService.getAuth().currentUser;
    const path = `users/${user.uid}`;
    this.profileData = await this.firebaseAuthService.getDocument(path);
    this.buildFormProfile();
  }

  buildFormProfile() {
    console.log(this.profileData?.companyName);
    this.profileForm = this.fb.group({
      companyName: [
        this.profileData ? this.profileData.companyName : '',
        Validators.required,
      ],
      description: [
        this.profileData ? this.profileData.description : '',
        Validators.required,
      ],
      schedule: this.fb.array([this.fb.control('')]),
      defaultAddress: [
        this.profileData ? this.profileData.location : '',
        Validators.required,
      ],
      additionalAddresses: this.fb.array([]),
      phones: this.fb.array([]),
      logo: [
        this.profileData ? this.profileData.logo : null,
        Validators.required,
      ],
      banner: [
        this.profileData ? this.profileData.banner : null,
        Validators.required,
      ],
    });
  }

  buildFormEmployee() {
    this.employeeForm = this.fb.group({
      employeeEmail: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get schedule(): FormArray {
    return this.profileForm.get('schedule') as FormArray;
  }

  get additionalAddresses(): FormArray {
    return this.profileForm.get('additionalAddresses') as FormArray;
  }

  get phones(): FormArray {
    return this.profileForm.get('phones') as FormArray;
  }

  addHorario(): void {
    this.schedule.push(this.fb.control(''));
  }

  removeHorario(index: number): void {
    this.schedule.removeAt(index);
  }

  addAddress(): void {
    this.additionalAddresses.push(this.fb.control(''));
  }

  removeAddress(index: number): void {
    this.additionalAddresses.removeAt(index);
  }

  addPhone(): void {
    this.phones.push(this.fb.control(''));
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  onFileSelected(event: any, type: string): void {
    console.log(event);
    const file = event.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'logo') {
          this.logoPreview = reader.result;
          this.profileForm.patchValue({ logo: file });
          this.logoUploader.clear();
        } else if (type === 'banner') {
          this.bannerPreview = reader.result;
          this.profileForm.patchValue({ banner: file });
          this.bannerUploader.clear();
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async send() {
    if (this.employeeForm.valid) {
      this.showLoading = true;
      try {
        const uid = this.firebaseAuthService.getAuth().currentUser.uid;

        const path = `users/${uid}/employee`;
        const dataUser = { ...this.employeeForm.value, role: 'EMPLOYEE' };
        await this.firebaseAuthService.addDocument(path, dataUser);
        this.showLoading = false;
        this.eventService.presentToastSuccess('Empleado creado con éxito.');
      } catch (err) {
        console.log(err);
        this.showLoading = false;
        this.eventService.presentToastDanger(
          'Ha ocurrido un error, intentelo más tarde.'
        );
      }
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  goToForgotPage() {
    this.employeeForm.reset();
    this.router.navigateByUrl('auth/forgot-password');
  }

  navigateToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
