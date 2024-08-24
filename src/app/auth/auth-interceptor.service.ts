import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, take, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private auth: AuthService,private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) =>{
                if(err.error && err.status == 400)
                    {
                        this.auth.logout()
                        this.router.navigate(['auth/signin'])
                    }
                return throwError(err);
            })
        )
    }
}