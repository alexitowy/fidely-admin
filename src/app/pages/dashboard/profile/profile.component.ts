import { Component, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FileUpload } from 'primeng/fileupload';
import { EventService } from '../../../core/services/event.service';
import { UtilsService } from '../../../core/services/utils.service';
import {
  CompanyProfile,
  Employee
} from '../../../models/interfaces/user.model';
import { FirebaseAuthenticationService } from '../../../services/firebase-authentication.service';

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
  profileData: CompanyProfile;
  currentUser: User;
  employeeData: Employee;
  editEmployee: boolean = false;

  images: string[] = Array(10).fill(null);
  @ViewChild('fileInputGallery') fileInputGallery: any;
  currentImageIndex: number = -1;
  isFormDirty: boolean = false;

  constructor(
    private readonly firebaseAuthService: FirebaseAuthenticationService,
    private readonly router: Router,
    private readonly eventService: EventService,
    private readonly fb: FormBuilder,
    private readonly utilsService: UtilsService,
    private readonly imageCompress: NgxImageCompressService
  ) {
    this.currentUser = this.firebaseAuthService.getAuth().currentUser;
    this.loadData();
    window.addEventListener('beforeunload', this.preventDefault.bind(this));
  }

  ngOnInit() {}

  async loadData() {
    const path = `users/${this.currentUser.uid}`;
    this.profileData = await this.firebaseAuthService.getDocument(path);
    const pathEmployee = `users/${this.currentUser.uid}/employee`;
    await this.firebaseAuthService
      .getCollection(pathEmployee)
      .then((res: any) => {
        if (res && res.length > 0) {
          this.employeeData = res[0];
        }
      })
      .finally(() => this.buildFormEmployee());
    this.buildFormProfile();
  }

  buildFormProfile() {
    this.profileForm = this.fb.group({
      companyName: [
        this.profileData ? this.profileData.companyName : '',
        Validators.required,
      ],
      description: [this.profileData ? this.profileData.description : ''],
      timeTables: this.fb.array(
        this.profileData
          ? this.buildTimeTables(this.profileData.timeTables)
          : []
      ),
      defaultAddress: [
        this.profileData ? this.profileData.defaultAddress : '',
        Validators.required,
      ],
      additionalAddresses: this.fb.array(
        this.profileData ? this.profileData.additionalAddresses : []
      ),
      phones: this.fb.array(this.profileData ? this.profileData.phones : []),
      logo: [this.profileData ? this.profileData.logo : null],
      banner: [this.profileData ? this.profileData.banner : null],
      galleryImages: [this.profileData.galleryImages ? this.profileData.galleryImages : Array(10).fill(null)]
    });

    this.profileForm.valueChanges.subscribe(() => {
      this.onFormChange();
    });
  }

  buildFormEmployee() {
    this.employeeForm = this.fb.group({
      employeeEmail: [
        this.employeeData ? this.employeeData.employeeEmail : '',
        [Validators.email, Validators.required],
      ],
      password: [
        this.employeeData ? this.employeeData.password : '',
        [Validators.required, Validators.minLength(8)],
      ],
    });
    if (this.employeeData) {
      this.editEmployee = true;
      this.employeeForm.controls['employeeEmail'].disable();
      this.employeeForm.controls['password'].disable();
    } else {
      this.editEmployee = false;
    }
  }

  buildTimeTables(timeTables: any[]): FormGroup[] {
    return timeTables.map((table) =>
      this.fb.group({
        day: [table.day || ''],
        hour: [table.hour || ''],
      })
    );
  }

  get timeTables(): FormArray {
    return this.profileForm.get('timeTables') as FormArray;
  }

  get additionalAddresses(): FormArray {
    return this.profileForm.get('additionalAddresses') as FormArray;
  }

  get phones(): FormArray {
    return this.profileForm.get('phones') as FormArray;
  }

  addHorario(): void {
    this.timeTables.push(
      this.fb.group({
        day: '',
        hour: '',
      })
    );
  }

  removeHorario(index: number): void {
    this.timeTables.removeAt(index);
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
    const file = event.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const image = e.target.result;

        if (file.type === 'image/png') {
          this.profileForm.patchValue({ [type]: image });
        } else {
          this.imageCompress
            .compressFile(image, -1, 75, 80)
            .then((compressedImage) => {
              this.profileForm.patchValue({ [type]: compressedImage });
            });
        }
      };

      reader.readAsDataURL(file);
    }
  }

  async saveProfile() {
    if (this.profileForm.valid) {
      this.showLoading = true;
      this.isFormDirty = false;
      try {
        const uid = this.currentUser.uid;
        const path = `users/${uid}`;
        let dataUser = { ...this.profileForm.value };

        //creo un array de promesas para la carga de las imagenes
        const uploadPromises: Promise<void>[] = [];
        if (
          this.profileForm.value.logo &&
          this.utilsService.isDataURL(this.profileForm.value.logo)
        ) {
          uploadPromises.push(this.uploadImage('logo'));
        }

        if (
          this.profileForm.value.banner &&
          this.utilsService.isDataURL(this.profileForm.value.banner)
        ) {
          uploadPromises.push(this.uploadImage('banner'));
        }

        if (
          this.profileForm.value.galleryImages.length > 0
        ) {
          this.profileForm.value.galleryImages.forEach((dataUrl: string, index: number) => {
            if (dataUrl && this.utilsService.isDataURL(dataUrl)) {
              uploadPromises.push(this.uploadImagesGallery(index, dataUrl));
            }
          });
        }

        await Promise.all(uploadPromises);

        dataUser.logo = this.profileForm.value.logo;
        dataUser.banner = this.profileForm.value.banner;

        await this.firebaseAuthService.updateDocument(path, dataUser);

        this.eventService.presentToastSuccess('Perfil actualizado con éxito.');
      } catch (err) {
        console.log(err);
        this.eventService.presentToastDanger(
          'Ha ocurrido un error, intentelo más tarde.'
        );
      } finally {
        this.showLoading = false;
      }
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  async uploadImage(type: string): Promise<void> {
    const dataUrl = this.profileForm.value[type];
    const imagePath = `${this.currentUser.uid}/${type}`;

    const imageUrl = await this.firebaseAuthService.uploadImage(
      imagePath,
      dataUrl
    );

    this.profileForm.patchValue({ [type]: imageUrl });
  }

  async uploadImagesGallery(index: number, dataUrl: string): Promise<void> {
    const imageName = `galleryImage${index}`;
    const imagePath = `${this.currentUser.uid}/gallery/${imageName}`;

    const imageUrl = await this.firebaseAuthService.uploadImage(
      imagePath,
      dataUrl
    );
    const galleryImages = this.profileForm.value.galleryImages || [];
    galleryImages[index] = imageUrl;

    this.profileForm.patchValue({ galleryImages });
  }

  handleEdit() {
    this.employeeForm.controls['employeeEmail'].enable();
    this.employeeForm.controls['password'].enable();
    this.editEmployee = false;
  }

  async saveEmployee() {
    if (this.employeeForm.valid) {
      this.showLoading = true;
      try {
        if (this.employeeData) {
          const path = `users/${this.currentUser.uid}/employee/${this.employeeData.id}`;
          let dataEmployee = { ...this.employeeForm.value };

          await this.firebaseAuthService.updateDocument(path, dataEmployee);
          this.employeeForm.controls['employeeEmail'].disable();
          this.employeeForm.controls['password'].disable();
          this.editEmployee = true;
          this.eventService.presentToastSuccess(
            'Empleado actualizado con éxito.'
          );
        } else {
          const path = `users/${this.currentUser.uid}/employee`;
          const dataUser = { ...this.employeeForm.value, role: 'EMPLOYEE' };
          await this.firebaseAuthService.addDocument(path, dataUser);
          this.eventService.presentToastSuccess('Empleado creado con éxito.');
        }
      } catch (err) {
        console.log(err);
        this.eventService.presentToastDanger(
          'Ha ocurrido un error, intentelo más tarde.'
        );
      } finally {
        this.showLoading = false;
      }
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  selectImage(index: number) {
    this.currentImageIndex = index;
    this.fileInputGallery.nativeElement.click();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileForm.value.galleryImages[this.currentImageIndex] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.profileForm.value.galleryImages[index] = null;
  }

  navigateToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.preventDefault.bind(this));
  }

  preventDefault(event: BeforeUnloadEvent) {
    if (this.isFormDirty) {
      const confirmationMessage = 'Tienes cambios no guardados. ¿Estás seguro de que quieres abandonar esta página?';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    }
    return undefined;
  }

  onFormChange() {
    this.isFormDirty = true;
  }

  canDeactivate(): boolean | Promise<boolean> {
    if (this.isFormDirty) {
      const confirmLeave = confirm('Tienes cambios no guardados. ¿Estás seguro de que quieres abandonar esta página?');
      if (confirmLeave) {
        this.isFormDirty = false;
      }
      return confirmLeave;
    }
    return true;
  }
}
