import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse
} from "@angular/common/http";
import { LoaderService } from "./loader.service";
import { finalize } from 'rxjs/operators';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private _loaderService: LoaderService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        this._loaderService.ShowLoader();

        return next.handle(request).pipe(
              finalize(() => this._loaderService.HideLoader()),
        );
    }
  }
  