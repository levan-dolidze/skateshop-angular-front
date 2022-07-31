import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SharedService } from './servises/shared.service';
import { LoaderService } from './loader.service';


@Injectable()
export class MessagesInterceptor implements HttpInterceptor {

  constructor(public loader:LoaderService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.isLoading.next(true);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error)
      }),
      finalize(()=>{
        this.loader.isLoading.next(false)
      }
    )
    )
    
  };
};
