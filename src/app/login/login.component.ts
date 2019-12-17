import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  email='';
  pass='';
  error={email:'',password:''};
  httpClient:HttpClient;

  constructor(httpClient:HttpClient,private router: Router,){
    this.httpClient=httpClient;
  }

  login()
  {
    let obj1={
      'email':this.email,
      'pass':this.pass,
    };

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z_\-\.])+\.([A-Za-z]{2,3})$/;
    var flag = true;
    if(!reg.test(this.email)){
      this.error.email="* Please enter a valid email Id";
      flag = false;
    }
    else{
      this.error.email='';
    }
    if(this.pass.length<8){
      this.error.password="* password is min 8 characters";
      flag = false;
    }
    else{
      this.error.password='';
    }

    if(flag){

    let url = 'http://localhost:8080/Stock1/a/login';
      let obs =  this.httpClient.post(url,obj1).subscribe((data)=>{
        if(true==(data)){
          localStorage.setItem('isLogged','true');
          this.router.navigate(['/dashboard']);

        }
        else{
          this.router.navigate(['/login']);

        }
      });
    } 
  }

  register(){
    this.router.navigate(['/registration']);

  }

}
