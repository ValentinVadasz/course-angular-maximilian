import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject();
  private postUrl: string = 'https://course-angular-by-maximilian-default-rtdb.europe-west1.firebasedatabase.app/posts.json';
  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http.post<{ name: string }>(this.postUrl, postData, {
      headers: new HttpHeaders({"Custom-Header": "hello"}),
      observe: 'response',
      responseType: "json"
    }).subscribe(response=>{
      console.log(response.body)
      console.log(response.headers)
    });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');

    return this.http.get<{ [key: string]: Post }>(this.postUrl,
      {
        params: searchParams,
      })
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        }),
        catchError(errorResponse => {
          return throwError(errorResponse);
        })
      )
  }

  deletePost() {
    return this.http.delete(this.postUrl, {
      observe: "events"
    }).pipe(
      tap(event => {
        if(event.type===HttpEventType.Sent){
          console.log(event.type);
        }
        if(event.type===HttpEventType.Response) {
          console.log(event.body);
        }
      })
    );
  }
}
