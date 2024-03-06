import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pwa-angular-project';
  product: any;

  constructor(public swUpdate: SwUpdate, private http: HttpClient) {
    this.registerListeners();

    this.http.get('https://dummyjson.com/products/1').subscribe(res => {
      console.log(res);
      this.product = res;
    })
  }

  private registerListeners(): void {
    console.log(this.swUpdate.isEnabled);
  }
}
