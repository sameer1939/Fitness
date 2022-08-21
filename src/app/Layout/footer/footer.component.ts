import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'src/app/models/subscriber';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  obj = new Subscriber();
  constructor(private subservice:SubscriberService) { }

  ngOnInit(): void {
  }

  AddSubscribers(Email:any){
    if(Email.value==""){
      alert('please enter email');
      return;
    }
    this.obj.email=Email.value;
    this.subservice.addSubscribers(this.obj).subscribe((data)=>{
      alert("Success");
    },error=>{
      alert(error.error);
    })
    console.log(Email.value);
  }
}
