export class Category{
    CategoryID : number;
    CategoryName : string;
    Description : string;
    Image : File;
    constructor ()
    {
        this.CategoryID =0;
        this.CategoryName="";
        this.Description="";
        this.Image=null;
    }
}