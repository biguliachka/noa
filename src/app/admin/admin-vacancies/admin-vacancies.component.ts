import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IVacancieResponse} from 'src/app/shared/interfaces/vacancie/vacancie.interface'
import {VacancieService} from 'src/app/shared/services/vacancie/vacancie.service';
import {deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable} from '@angular/fire/storage';


@Component({
  selector: 'app-admin-vacancies',
  templateUrl: './admin-vacancies.component.html',
  styleUrls: ['./admin-vacancies.component.scss']
})

export class AdminVacanciesComponent implements OnInit {
  public adminVacancies: Array<IVacancieResponse> = [];
  public vacancieForm!: FormGroup;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  public currentVacancieId!: string | number;
  public addStatus = false;

  constructor(
    private fb: FormBuilder,
    private vacancieService: VacancieService,
    private storage: Storage
  ) {
  }

  ngOnInit(): void {
    this.initVacancieForm();
    this.loadVacancies();
  }

  addVacanciesStatus(): void {
    this.addStatus = !this.addStatus;
  }

  initVacancieForm(): void {
    let dd = new Date();
    let m: string = `${dd.getMonth() + 1}`
    let y: string = `${dd.getFullYear()}`
    if (m.length < 2) m = '0' + m;
    this.vacancieForm = this.fb.group({
      name: [null, Validators.required],
      date: [`${m}.${y}`, Validators.required],
      path: [null, Validators.required],
      tasks: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  //
  loadVacancies(): void {
    this.vacancieService.getAllFirebase().subscribe(data => {
      this.adminVacancies = data as IVacancieResponse[];
    })
  }

  addVacancie(): void {
    if (this.editStatus) {
      this.vacancieService.updateFirebase(this.vacancieForm.value, this.currentVacancieId as string).then(() => {
        this.loadVacancies();
      })
    } else {
      this.vacancieService.createFirebase(this.vacancieForm.value).then(() => {
      })
    }

    this.editStatus = false;
    this.vacancieForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editVacancie(vacancie: IVacancieResponse): void {
    this.vacancieForm.patchValue({
      name: vacancie.name,
      date: vacancie.date,
      path: vacancie.path,
      description: vacancie.description,
      tasks: vacancie.tasks,
      imagePath: vacancie.imagePath
    });
    this.editStatus = true;
    this.currentVacancieId = vacancie.id;
    this.isUploaded = true;
  }

  deleteVacancie(vacancie: IVacancieResponse): void {
    this.vacancieService.deleteFirebase(vacancie.id as string).then(() => {
      this.loadVacancies();

    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.vacancieForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.vacancieForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.vacancieForm.get(control)?.value;
  }

}
