import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/models/pagination';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/models/product';
import { ManageProductService } from './manage-product.service';
import { AppConstants } from 'src/app/constants/constants';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  rows: any;
  page = new PaginationModel();
  product = new ProductModel();
  isAddProduct: boolean = false;
  isError: boolean = false;

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])

  });
  submitted: boolean = false;
  itemIdToBeUpdated!: number;
  isSearch: boolean = false;
  searchString: any = '';

  constructor(private manageProductService: ManageProductService, private constants: AppConstants,private toastr: ToastrService) {
    this.page.pageNumber = this.constants.defaultPageNumber;
    this.page.size = this.constants.pageSize;
  }

  ngOnInit(): void {
    this.getTotalRecordsCount()
    this.getProductList();

  }

  get productFormControl() {
    return this.productForm.controls;
  }
  getTotalRecordsCount() {
    this.manageProductService.getProductList('', '').subscribe((res: any) => {
      this.page.totalElements = res.length;
      console.log(this.page.totalElements, res.length)
    })
  }

  getProductList(searchOperation?: any) {
    if (searchOperation) {
      this.getSearchList();
    }
    else {
      this.manageProductService.getProductList(this.page.pageNumber, this.page.size).subscribe(res => {
        this.rows = res || [];
      })
    }

  }

  onAddModalOpen() {
    this.productForm.reset();
    this.isAddProduct = true;
  }
  onAddProduct() {
    this.isError = false;
    this.submitted = true;
    if (this.productForm.valid) {
      this.product = {
        name: this.productForm.controls.name.value,
        description: this.productForm.controls.description.value,
        price: this.productForm.controls.price.value
      }

      this.manageProductService.addProductToList(this.product).subscribe(res => {
        console.log(res);
        this.getTotalRecordsCount();
        this.getProductList();
        const ref = document.getElementById('cancel');
        ref?.click();
        this.toastr.success("Product Added Successfully");
    

      },
        err => {
          this.toastr.success("Something went wrong")
        });
    } else {
      this.isError = true;
    }
  }

  onProductEdit(item: any) {
    this.isAddProduct = false;
    this.productForm.reset();
    this.itemIdToBeUpdated = item.id;
    this.productForm.controls['name'].setValue(item.name);
    this.productForm.controls['description'].setValue(item.description);
    this.productForm.controls['price'].setValue(item.price);
  }

  onProductDelete(item: any) {
    this.product.id = item.id;
  }

  updateProductDetails() {
    this.submitted = true;
    console.log(this.product.id)
    if (this.productForm.valid) {
      this.product = {
        name: this.productForm.controls.name.value,
        description: this.productForm.controls.description.value,
        price: this.productForm.controls.price.value
      }
      this.manageProductService.editProduct(this.itemIdToBeUpdated, this.product).subscribe((res) => {
        const ref = document.getElementById('cancel');
        ref?.click();
        this.submitted =false;
        this.toastr.success('Product Details Edited Successfully');
        this.getProductList();
      }
      );
    }
  }

  deleteProductFromList() {
    this.manageProductService.deleteProduct(this.product.id).subscribe(
      res => {
        const ref = document.getElementById('cancel-delete');
        ref?.click();
        this.toastr.success("Product Deleted Successfully");
        this.getTotalRecordsCount();
        this.getProductList();

      }
    )
  }


  onSearch(searchString: any) {
    this.searchString = searchString
    if (searchString === "" || searchString === undefined || searchString === null) {
      this.isSearch = false;
    }
    else {
      this.isSearch = true;
    }
    this.getSearchList();

  }

  getSearchList() {
    this.manageProductService.searchProduct(this.searchString).subscribe((res: any) => {
      console.log(res);
      this.rows = res || [];
      this.page.totalElements = this.rows.length;

    })
  }

  setPage(pageData: any) {
    this.page.pageNumber = pageData.page;
    this.getProductList(this.isSearch);
  }

}
