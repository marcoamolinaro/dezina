import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ProductProvider } from "../../providers/product/product"
import { ProductDetailPage } from '../product-detail/product-detail';
import { FilterModalPage } from "../filter-modal/filter-modal";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allProducts = [];
  private femaleSelected = true;
  private maleSelected = true;

  constructor(private modalController: ModalController, private productProvider: ProductProvider, public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.productProvider.getProducts()
      .subscribe((response) => {
        this.allProducts = response;
      });
  }

  goToProductDetailPage(product: any) {
    this.navCtrl.push(ProductDetailPage, {
      productDetails: product
    });
  }

  openFilterModal() {
    let filterStateFromMainPage = {
      femaleSelected: this.femaleSelected,
      maleSelected: this.maleSelected
    };
    let openFilterModal = this.modalController.create(FilterModalPage, filterStateFromMainPage);
    openFilterModal.onDidDismiss((filterState)=>{
      this.femaleSelected = filterState.femaleSelected;
      this.maleSelected = filterState.maleSelected;
      this.productProvider.getProducts()
        .subscribe((allProducts) => {
          let products = allProducts;

          if (filterState.femaleSelected && filterState.maleSelected) {
            this.allProducts = products;
            return;

          } else if (!filterState.femaleSelected && !filterState.maleSelected) {
            this.allProducts = [];
            return;

          } else if (filterState.femaleSelected && !filterState.maleSelected) {
            this.allProducts = products.filter((product) => {
              return product.gender !== "male";
            });

          } else {
            this.allProducts = products.filter((product) => {
              return product.gender !== "female";
            });
          }
        });
    });
    openFilterModal.present();
  }



}
