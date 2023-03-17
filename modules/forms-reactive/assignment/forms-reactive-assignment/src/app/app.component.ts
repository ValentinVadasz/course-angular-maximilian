import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  statuses= ['stable', 'critical', 'finished'];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required], [this.forbiddenProjectNameAsync]),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('stable'),
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  forbiddenProjectName(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'Test'){
      return {'isForbiddenName': true};
    } else {
      return null;
    }
  }

  forbiddenProjectNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject)=>{
      setTimeout(()=>{
        if(control.value === 'Test'){
          resolve({'isForbiddenName': true});
        } else {
          resolve(null);
        }
      },1500);
    });

    return promise;
  }
}
