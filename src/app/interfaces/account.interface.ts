export interface ClientInfoDTO
{
    Name:string;
    Surname:string;
    IdenitityNumber:string;
    PhoneNumber :string
    Email :string
}


export interface ClientInfoCreateDTO extends ClientInfoDTO
{
    Password :string;
    ConfirmPassword :string;
}