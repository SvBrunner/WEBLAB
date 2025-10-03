// back.service.ts
import {Injectable} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BackService {
  private lastUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.lastUrl = this.currentUrl;
        this.currentUrl = e.urlAfterRedirects;
      });
  }

  backFallbackTo(path: string = '/'): void {
    if (this.lastUrl) this.router.navigateByUrl(this.lastUrl);
    else this.router.navigateByUrl(path);
  }
}
