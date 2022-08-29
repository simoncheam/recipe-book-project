import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        //console.log(this.isLoginMode)
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.isLoginMode) {
            //. login logic
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
            //  console.log(form.value);
        }
        authObs.subscribe(
            (resData) => {
                console.log(resData);
                this.isLoading = false;
            },
            (errorMessage) => {
                console.log(errorMessage);
                this.error = errorMessage;

                // this.error = 'An error occurred';
                this.isLoading = false;
            }
        );

        form.reset();
    }
}
