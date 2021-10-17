import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JournalingService {

  constructor() { }

  reportError<T>(error,returnVal:T)
  {
      alert("Unkown Error Occured!");
      console.log(error);
      return returnVal;
  }
}
