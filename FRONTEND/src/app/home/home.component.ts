import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';
import { ArticleDetailsComponent } from '../article-details/article-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  responseMessage: any;
  articles: any;
  searchText: string = ' ';

  constructor(
    private articleService: ArticleService,
    private dialog: MatDialog,
    private router: Router) {
    this.tableData();
  }

  tableData() {
    this.articleService.getAllPublishedArticle().subscribe((response: any) => {
      this.articles = response;
    }, (error: any) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      //snackbar
    }
    )
  }

  filteredItem(): any {
    return this.articles?.filter(
      (item: {
        categoryName: string; title: string;
      }) => item.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ArticleDetailsComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }

}
