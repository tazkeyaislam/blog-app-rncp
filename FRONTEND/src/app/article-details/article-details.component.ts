import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent {

  articleDetails: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.articleDetails = this.dialogData.data;
  }
}
