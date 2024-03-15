import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Observable, map, switchMap } from 'rxjs';
import { WebStorageService } from './services/webstorage.service';
import { IPost, IPostAPI } from './models/post.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'pwa-angular-project';
  posts$: Observable<IPost[]> = this.webStorage.posts$;

  constructor(
    public swUpdate: SwUpdate,
    private http: HttpClient,
    private webStorage: WebStorageService
  ) {}

  ngOnInit(): void {
    this.registerListeners();
    this.getPosts();
  }

  private getPosts(): void {
    this.http
      .get<IPostAPI>(
        'https://pwa-practice-74b10-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      .pipe(
        map((postObject) => this.getPostList(postObject)),
        switchMap((posts) => this.webStorage.setPoststoCache(posts))
      )
      .subscribe({ error: () => this.getPostsFromCache() });
  }

  private registerListeners(): void {
    console.log(this.swUpdate.isEnabled);
  }

  private getPostsFromCache(): void {
    this.webStorage.getPostsFromCache().subscribe();
  }

  private getPostList(postObject: IPostAPI): IPost[] {
    const tempArr: IPost[] = [];

    Object.keys(postObject).forEach((key) => tempArr.push(postObject[key]));

    return tempArr;
  }
}
