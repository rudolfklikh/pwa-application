import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { BehaviorSubject, Observable, concatAll, concatMap, filter, map, take, tap, toArray } from 'rxjs';
import { IPost } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class WebStorageService {
  posts$$ = new BehaviorSubject<IPost[]>([]);


  constructor(private dbService: NgxIndexedDBService) {}


  get posts$(): Observable<IPost[]> {
    return this.posts$$.asObservable();
  }

  getPostsFromCache(): Observable<unknown[]> {
    return this.dbService
      .getAll('posts')
      .pipe(take(1), tap(posts =>  this.posts$$.next(posts as IPost[])))
  }

  setPoststoCache(posts: IPost[]): Observable<IPost[]> {
    return this.dbService.clear('posts').pipe(
      take(1),
      map((_) => posts),
      concatAll(),
      concatMap((post) => this.dbService.add('posts', post)),
      toArray(),
      tap(posts =>  this.posts$$.next(posts))
    );
  }
}