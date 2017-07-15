import {EventEmitter,Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {User} from "./app-shared/model/user.model";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SignInService{
  private user:User;// = new User('123','name','title','email','password',['like1'],['follow1'],'imgUrl',['comment1'],['preference1']);

    constructor(private http:Http){}

  createUser(name:string, email:string, password:string):Promise<User>{
    console.log(name + " " + email + " " + password);
      return this.http.post('https://hiptop.herokuapp.com/signUpUser',{name:name ,email:email,password:password} )
            .toPromise()
            .then(response => response.json() as User)
      .catch(err => err.json() as User);


  //  return this.user;
  }

}
