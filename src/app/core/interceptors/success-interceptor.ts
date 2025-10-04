import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

export const successInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  return next(req).pipe(
    tap({
      next: (res: HttpEvent<any>) => {
        if (res instanceof HttpResponse) {
          if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
            const body: any = res.body as any;
            const message =
              res.body?.message || 'Operation completed successfully!';
            toastrService.success(message);
          }
        }
      },
    })
  );
};
