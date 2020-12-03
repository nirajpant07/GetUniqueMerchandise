export class User {
    public FirstName: string;
    public MiddleName: string;
    public LastName: string;
    public Email: string;
    public Phone: string;
    public Password: string;
    public RoleID: number;

    constructor() {
        this.FirstName = "";
        this.MiddleName = "";
        this.LastName = "";
        this.Email = "";
        this.Phone = "";
        this.Password = "";
        this.RoleID = 2;
    }
}