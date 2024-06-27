import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces';
import { Browser } from '@capacitor/browser';
import { ActionSheetController } from '@ionic/angular';

import { Share } from '@capacitor/share';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  @Input() index: number;

  constructor(private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {}
  openArticle() {
    Browser.open({ url: this.article.url });
  }

  async onOpenMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => this.onShareArticle(),
        },
        {
          text: 'Favorito',
          icon: 'heart-outline',
          handler: () => this.onToggleFavorite(),
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
          cssClass: 'secondary',
        },
      ],
    });

    await actionSheet.present();
  }

  async onShareArticle() {
    // console.log('FAVORITE CLICKED');


    await Share.share({
      title: this.article.title,
      text: this.article.description,
      url: this.article.url,
      dialogTitle: this.article.title,
    });
  }

  onToggleFavorite() {}
}
