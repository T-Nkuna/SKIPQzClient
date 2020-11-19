export interface FormField{
    name:string;
    tagName:string;
    value:string;
    type:string;
    options?:{value:any;displayValue:string;}[];
    required?:boolean;

}