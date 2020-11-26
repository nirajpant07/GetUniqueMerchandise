export class Subcategory{
    SubcategoryID :number;
    CategoryID : number;
    CategoryName:string
    SubcategoryName : string;
    Description : string;
    Image : File;
    constructor ()
    {
        this.SubcategoryID=0;
        this.CategoryID =0;
        this.CategoryName="";
        this.SubcategoryName="";
        this.Description="";
        this.Image=null;
    }
}