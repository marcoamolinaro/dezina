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
    let openFilterModal = this.modalController.create(FilterModalPage);
    openFilterModal.present();
  }

}
