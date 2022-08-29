import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCP0OvyyX2nj8SBZr0nEUk8ctG0JIeoO9Y',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            )
            .pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCP0OvyyX2nj8SBZr0nEUk8ctG0JIeoO9Y',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            )
            .pipe(catchError(this.handleError));
    }

    //! central error handler
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;

            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Invalid credentials';
                break;

            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid credentials';
                break
        }
        return throwError(errorMessage);
    }
}
