import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class AppConstants{
  public readonly pageSize = 10;
  public readonly defaultPageNumber = 1;

  public getProductList : string ='products?_page=#PAGENUM&_limit=#PAGESIZE';
  public addProduct : string = 'products';
  public updateProduct : string = 'products/#ID';
  public deleteProduct : string = 'products/#ID';
  public searchProduct : string = 'products?q=#SEARCHSTRING'
}