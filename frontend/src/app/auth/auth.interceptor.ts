import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      const cloned = req.clone({
        headers: req.headers.set("authToken", "Bearer " + authToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
