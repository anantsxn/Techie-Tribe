import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
  
})
export class RegistrationComponent {
  title = 'helloclient';
  uid='';
  cno='';
  email='';
  fname='';
  lname='';
  pass='';
  repass='';
  error={uid:'',cno:'',email:'',fname:'',lname:'',pass:'',repass:''};
  httpClient:HttpClient;

  constructor(httpClient:HttpClient,private router: Router,){
    this.httpClient=httpClient;
  }

  /*registrationForm(){
    let url = 'http://localhost:8081/Stock1/a/register';
    let obs =  this.httpClient.get(url,).subscribe((data)=>{
     let array =[data[0].fname,data[1].fname,data[2].fname]
      for(let i=0;i<3;i++){
        console.log(array[i]);
      }
    });
  }*/


  registrationForm(){
   
    let flag = true;
    var name=/^([A-Za-z])+$/;
    var email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z\.])+\.([A-Za-z]{2,4})$/;
    var num = /^([6-9]{1})+([0-9]{9})+$/;
    var pass = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?=.*[A-Z])(?=.*[a-z]).*$/;
    if(!name.test(this.fname) || this.fname==null){
      this.error.fname="* Only alphabets allowed";
      flag=false;
    }
    else{
      this.error.fname='';
    }
    if(!name.test(this.lname) || this.lname==null){
      this.error.lname="* Only alphabets allowed";
      flag=false;
    }
    else{
      this.error.lname='';
    }

    if(!email.test(this.email)){
      this.error.email="* Enter valid email";
      flag = false;
    }
    else{
      this.error.email='';
    }

    if(!num.test(this.cno)){
      this.error.cno="* Only numbers allowed and should be of 10 digits only";
      flag = false;
    }
    else{
      this.error.cno='';
    }

    if(!pass.test(this.pass)){
      this.error.pass="* At least one upper character, one lowercase character, one number and should be of length 8 or more";
      flag = false;
    }
    else{
      this.error.pass='';
    }

    if(!(this.pass === this.repass)){
      this.error.repass = "* Passwords didn't match";
      flag = false;
    }
    else{
      this.error.repass = '';
    }

    if(flag){
      let obj1={
        'uid':this.uid,
        'cno':this.cno,
        'email':this.email,
        'fname':this.fname,
        'lname':this.lname,
        'pass':this.pass,
        'repass':this.repass,
      };
      //let url = 'http://localhost:8080/Stock1/a/b?+this.fname';
      let url = 'http://localhost:8080/Stock1/a/register';
      let obs =  this.httpClient.post(url,obj1).subscribe((data)=>{
        console.log(data);
        if(true==(data)){
          this.router.navigate(['/login']);

        }
        else{
          this.router.navigate(['/registration']);

        }
      });
    }
  }
  cancel() {
    this.router.navigate(['/login']);
  }
  }
