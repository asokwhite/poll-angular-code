/*
  * Auth interceptor automatically attach authentication information
    to requests.
*/

import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = {
            setHeaders: {
            }
        };
        if (req.url.indexOf('upload') < -1) {
            headers.setHeaders = {
                'Content-Type': 'application/json'
            }
        }
        const token = localStorage.getItem('token');
        (token) ? (headers.setHeaders as any)['x-access-token'] = `${token}`: '';
        let cloneReq = req.clone(headers);

        return next.handle(cloneReq);
    }
}
