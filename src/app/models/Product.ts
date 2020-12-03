import {Category} from '../models/Category'
import {Subcategory} from '../models/Subcategory'
import {ProductImage} from '../models/ProductImage'
import {Stock} from '../models/Stock'
export class Product{
    ProductID :number;
    SubcategoryID : number;
    SubcategoryName : string;
    CategoryID:number;
    CategoryName:string;
    Category : Category;
    Subcategory : Subcategory;
    ProductName : string;
    ProductDescription : string;
    UnitPrice : number;
    Color : string;
    DiscountPercentage : number;
    Images:FileList;
    ProductImages :ProductImage[];
    Stocks : Stock[];
    constructor ()
    {
        this.ProductID =0;
        this.SubcategoryID =0;
        this.SubcategoryName="";
        this.CategoryID=0;
        this.CategoryName="";
        this.ProductName ="";
        this.ProductDescription ="";
        this.UnitPrice =0;
        this.Color ="";
        this.DiscountPercentage =0;
        this.Category=null;
        this.Subcategory=null;
        this.ProductImages=[];
        this.Stocks=[];
        this.Images=null;
    }
}