
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/constants/constants';
import { HttpAPIService } from 'src/app/core/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class ManageProductService {

  constructor(private httpApi: HttpAPIService, private constants: AppConstants) { }

  getProductList(pageNumber: any, pageSize: any){
    const url = this.constants.getProductList.replace('#PAGENUM',pageNumber).replace('#PAGESIZE',pageSize);
    return this.httpApi.get(url);
  }

  addProductToList(reqBody:any){
    const url = this.constants.addProduct;
    return this.httpApi.post(url,reqBody);
  }

  editProduct(id:any,reqBody:any){
    const url = this.constants.updateProduct.replace('#ID',id);
    return this.httpApi.put(url,reqBody);
  }

  deleteProduct(id:any){
    const url = this.constants.deleteProduct.replace('#ID',id);
    return this.httpApi.delete(url);
  }

  searchProduct(searchString:any){
    const url = this.constants.searchProduct.replace('#SEARCHSTRING',searchString);
    return this.httpApi.get(url);
  }
}
