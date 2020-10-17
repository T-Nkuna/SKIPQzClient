import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JournalingService {

  constructor() { }

  reportError<T>(error,returnVal:T)
  {
      alert("Unkown Error Occured!");
      return returnVal;
  }
}
