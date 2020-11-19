import { Component, OnInit, Output ,EventEmitter, Input} from '@angular/core';
import {FormField} from '../../models/FormField';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() loginClick = new EventEmitter<FormField[]>();
  @Output() registrationClick = new EventEmitter();
  constructor() { }
  formFields:FormField[] = [
      {
        name:"Username",
        tagName:"input",
        value:"",
        type:"text"
      },
      {
        name:"Password",
        tagName:"input",
        value:"",
        type:"password"
      }
  ];
  ngOnInit(): void {
  }

  loginClicked(){
    this.loginClick.emit(this.formFields);
  }

  registerClicked(){
    this.registrationClick.emit();
  }
}
