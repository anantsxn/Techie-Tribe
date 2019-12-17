import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { stock } from '../stock';
import { from, observable, Observable } from 'rxjs';
import * as CanvasJS from './canvasjs.min';
import regression from 'regression';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  httpClient:HttpClient;
  cname='';
  id='';
  error=false;
  st:stock;
  pricearray=[];
  finalarr=new Array();
  pricearray1=[];
  datearray=[];
  arr=[];
  test_data4=[];
  plotarray=[];
  prediction_year="";
    predicted_value;
    current_advice;
    order = 1;
  current_x=1;
  current_value		
  newdate=new Array();

  constructor(httpClient:HttpClient,private router: Router,) {
    this.httpClient=httpClient;
   }
   
   ngOnInit(){
    let name = localStorage.getItem('isLogged');
    if(name!='true'){
      this.router.navigate(['/login']);
    }
   }

   getAnalysis(){
    this.predicted_value =null;
   this.pricearray=[];
   this.pricearray=[];
  this.finalarr=[];
  this.pricearray1=[];
  this.datearray=[];
  this.arr=[];

 this.test_data4=[];
  this.plotarray=[];

     let ob1={
      'cname':this.cname 
     };
     let url = 'http://localhost:8081/Stock1/a/getAnalysis';
      let obs =  this.httpClient.post(url,ob1).subscribe((data)=>{
      
      if((data[0])!=null){
        this.router.navigate(['/dashboard']);
       // console.log(data);
        this.st=data;  
        //console.log(this.st)
        //console.log(this.starr);
  
         this.error=false;
      }
      else{
       
        this.router.navigate(['/dashboard']);
        this.error=true;
      }
      for (const price in this.st) {
        if (true) {
          const element1 = this.st[price];
          //console.log(element1.price);
          
          this.pricearray.push(element1.price);
          this.datearray.push(element1.date);
        }
      }
    
  var i;
  for( i=0;i<this.pricearray.length;i++){
    this.test_data4.push(i);
  }
  var j;
  for (  j=0; j<this.pricearray.length; j++ ) {		  
 //   this.plotarray.push({x:this.test_data4[j],y:this.pricearray[j] });
      this.newdate[j]=new Date(this.datearray[j]);
        this.plotarray.push({x:this.newdate[j],y:this.pricearray[j] });

}
  
  
 // console.log(this.plotarray)
      //code here....... 
      var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "dark2",
    title:{
      text: this.cname
    },
    axisY:{
      includeZero: true
    },
    data: [{        
      type: "line",
  
      dataPoints: this.plotarray,
      
     }//,{        
    // 	type: "line",
  
    // 	dataPoints: this.test_data3,
      
    // }
  
  ],
  });
  chart.render();
  
  
  
      // for(let i=0;i<this.pricearray.length;i++){
      //   console.log(this.pricearray[i])
      // }

      this.current_value=this.pricearray[this.pricearray.length-1];
      this.current_x= this.current_value;
      //console.log('current price' + this.current_value)
      for(let i=0;i<=this.datearray.length;i++){
        this.datearray.pop();
      }
      for(let i=0;i<=this.datearray.length;i++){
        this.plotarray.pop();
      }
      
    });


  
   }

  analyze()
   {


    const prediction_x=365*Number(this.prediction_year);
    for(let i=0;i<=this.pricearray.length;i++){
      this.pricearray1.push(Number(this.pricearray[i]));
    }
    
    
    for(let i=0;i<this.pricearray.length;i++){
       this.finalarr[i]=new Array(2);
      this.finalarr[i][0]=this.test_data4[i];
      this.finalarr[i][1]=this.pricearray1[i];
      //this.finalarr[i].push;
     // this.finalarr[i][0]=a[0];
     // this.finalarr[i][1]=a[1];
    }
   // for(let i=0;i<this.pricearray.length;i++){
   // console.log(this.finalarr);
    // }
    //for(let i=0;i<5;i++){
     // console.log(this.finalarr[i])
    //}
     // this.finalarr=[[0,1250],[1,1255],[2,1250],[3,1265],[4,1270],[5,1275],]

        const result= regression.polynomial(this.finalarr, { order: this.order});     
  //  console.log(result);                 //  *x^n + b*x^(n-1)+.....
   // console.log("The order");

   // console.log(result.predict(this.current_x+prediction_x));     // Predict from the equation result.equation gives array [3:result]
        
   console.log('price array');
   console.log(this.current_x);
console.log(prediction_x)
console.log(result.predict(this.current_x+prediction_x)[1])
        this.predicted_value = result.predict(this.current_x+prediction_x)[1];
    
    // Generate the data points from the equation result.equation
    if(this.predicted_value <this.current_value){
    this.current_advice='Sell';
    }else{
      this.current_advice='Buy';
    }
   }


   logout(){
     localStorage.setItem('isLogged','false');
    this.router.navigate(['/login']);
   }
}     