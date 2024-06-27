import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewsResponse, Article, ArticlesByCategoryAndPage } from '../interfaces';
import { Observable,of } from 'rxjs';

import { map } from 'rxjs';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NewsService {


  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {

  }

  constructor(private http: HttpClient) {}

  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: { 
        apiKey: apiKey,
        country: 'us',
      }
    })
  }

  getTopHeadLines(): Observable<Article[]> {

    return this.getArticlesByCategory('business');

    // return this.executeQuery<NewsResponse>(
    //     `/top-headlines?country=us&category=business`)
    //   .pipe(
    //     // map(resp => resp.articles)
    //     map(({ articles }) => articles)
    //   );
  }

  getTopHeadlinesByCategory(category: string, loadMore:boolean=false): Observable<Article[]> {
    
    
    if(loadMore) {
      return this.getArticlesByCategory(category);
    }
    
    if(this.articlesByCategoryAndPage[category]){
 

      return of(this.articlesByCategoryAndPage[category].articles);
    }

    
    return this.getArticlesByCategory(category)

    
  }


  getArticlesByCategory(category: string): Observable<Article[]>{

    if(Object.keys(this.articlesByCategoryAndPage).includes(category)){
      //YA EXISTE
      // this.articlesByCategoryAndPage[category].page += 0;
    }else{
      //NO EXISTE

      this.articlesByCategoryAndPage[category] = {
        page:0,
        articles:[]
      };


    }


    const page = this.articlesByCategoryAndPage[category].page + 1;


    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`).pipe(
      map(({articles})=> {

        if(articles.length === 0) return this.articlesByCategoryAndPage[category].articles;

        this.articlesByCategoryAndPage[category] = {
          page:page,
          articles:[...this.articlesByCategoryAndPage[category].articles, ...articles]
        }

        return this.articlesByCategoryAndPage[category].articles;
      })
    );

  }

}
