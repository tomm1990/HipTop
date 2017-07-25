import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../app-shared/model/user.model';
import {Identification} from '../../app-shared/model/identification.model';
import { SignInService } from "../../app.signInService";


@Component({
  selector: 'app-user-connection-details',
  templateUrl: 'user-connection-details.component.html',
  styleUrls: ['user-connection-details.component.css']
})
export class UserConnectionDetailsComponent implements OnInit {

@Output() identification = new EventEmitter<Identification>();
@Output() changeToProgram = new EventEmitter<string>();
  user: User;

  constructor(private identificationService:SignInService) { }

  ngOnInit() {

  }

  onSignIn(form:NgForm){
    const val = form.value;

  console.log(val);
  if(val.confirmation===true){
    this.identificationService.createUser(val.userNameInput,val.emailInput,val.passwordInput).then((user: User)=>{
      this.user = user;
      console.log("this.user: " + this.user.email);
    });
  }

    this.changeToProgram.emit('program');

  //  const newIdentification =
  //  new Identification(val.email, val.userName, val.password);
  //  this.identification.emit(newIdentification);
    //console.log(this.user.id);

    //return this.user;
  }

}
