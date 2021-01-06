import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogueService} from "../services/catalogue.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public currentProduct: Product;
  public url: string;

  constructor(private route:Router, private activatedRoute:ActivatedRoute, private  catService:CatalogueService) { }

  ngOnInit() {
    this.url=atob(this.activatedRoute.snapshot.params.id);
    this.catService.getResource(this.url)
      .subscribe(data=>{
        this.currentProduct=data;
      },err=>{
        console.log(err);
      })
  }

  onUpdateProduct(value: any) {
    this.catService.updateResource(this.url,value)
      .subscribe(data=>{
        alert("mise à jour effectuée avec succés");
        this.route.navigateByUrl("/produits");
      },err=>{
        console.log(err);
      })
  }
}
