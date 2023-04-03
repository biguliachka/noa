import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import {ThaiService} from "../../shared/services/thai/thai.service";


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  public adminThai: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];
  public productForm!: FormGroup;
  public editStatus = false;
  public uploadPercent = 0;
  public isUploaded = false;
  public addStatus = false;

  public currentProductId!: string | number ;


  constructor(
     private fb: FormBuilder,
     private thaiService: ThaiService,
     private categoryService: CategoryService,
     private productService: ProductService,
     private imageService: ImageService
  ) { }

  ngOnInit(): void {
     this.initProductForm();
    this.loadCategories();
    this.loadProduct();
  }

  addPoductStatus(): void {
    this.addStatus = !this.addStatus;
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      path: [null, Validators.required],
      count: [1],
      culinasia:[null],

    });
  }
  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    })
    this.thaiService.getAllFirebase().subscribe(data => {
      this.adminThai = data as ICategoryResponse[];
      this.productForm.patchValue({
        category: this.adminThai[0].id
      })
    })
  }

  loadProduct(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.adminProducts = data as IProductResponse[];
    })
  }
  addProduct(): void {
    if (this.editStatus) {
      this.productService.updateFirebase(this.productForm.value, this.currentProductId as string).then(() => {
        this.loadCategories();
      })
    } else {
      this.productService.createFirebase(this.productForm.value).then(() => {
      })
    }
    this.editStatus = false;
    this.productForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }



  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      description: product.description,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
      path: product.path,
      culinasia: product.culinasia
    });


     this.addStatus = true;
     this.isUploaded = true;
     this.editStatus = true;
     this.currentProductId = product.id;
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.deleteFirebase(product.id as string).then(() => {
      this.loadProduct();

    })
  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }


  valueByControl(control: string): string {
  return this.productForm.get(control)?.value;
   }

}
