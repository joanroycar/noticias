import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit { 

  @Input() article: Article;

  @Input() index: number;

  constructor() { }

  ngOnInit() {



  }
  openArticle(){
    
    Browser.open({url:this.article.url });

  }


  onClick(){
    
  }
}
