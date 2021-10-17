import { ClientInfoCreateDTO } from "src/app/interfaces/account.interface";
import { FormField } from "src/app/models/FormField";

export  class Config{

 backEndModel:ClientInfoCreateDTO = {
        ConfirmPassword:"",
        Email:"",
        IdenitityNumber:"",
        Name:"",
        PhoneNumber:"",
        Surname:"",
        Password:""
    };

    formFields: FormField[] = [
        {name:"Name",tagName:"input",type:"text",value:"",required:true,dataIndex:"Name"},
        {name:"Surname",tagName:"input",type:"text",value:"",required:true,dataIndex:"Surname"},
        {name:"Id No",tagName:"input",type:"text",value:"",required:true,dataIndex:"IdenitityNumber"},
        {name:"Email",tagName:"input",type:"email",value:"",required:true,dataIndex:"Email"},
        {name:"Contact No",tagName:"input",type:"text",value:"",required:true,dataIndex:"PhoneNumber"},
        {name:"Password", tagName:"input",type:"password",value:"",required:true,dataIndex:"Password"},
        {name:"Confirm Password",tagName:"input",type:"password",value:"",required:true,dataIndex:"ConfirmPassword"}
      ];
}