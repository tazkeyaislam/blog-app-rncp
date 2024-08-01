import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ArticlesComponent } from '../dialog/articles/articles.component';
import { ViewArticleComponent } from '../dialog/view-article/view-article.component';

@Component({
  selector: 'app-manage-article',
  templateUrl: './manage-article.component.html',
  styleUrls: ['./manage-article.component.scss']
})
export class ManageArticleComponent implements OnInit {

  displayedColumns: string[] = ['title', 'categoryName', 'status', 'publication_date', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.tableData()
  }

  tableData() {
    this.articleService.getAllArticle().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
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


  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addArticle() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };

    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ArticlesComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const res = dialogRef.componentInstance.onAddArticle.subscribe((response) => {
      this.tableData();
    })
  }

  viewArticle(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'View',
      data: values
    };

    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ViewArticleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }

  editArticle(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    };

    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ArticlesComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const res = dialogRef.componentInstance.onEditArticle.subscribe((response) => {
      this.tableData();
    })
  }

  onDelete(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + value.title + ' article'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const res = dialogRef.componentInstance.onEmitStatusChange.subscribe((response: any) => {
      this.deleteArticle(value.id);
      dialogRef.close();
    })
  }

  deleteArticle(id: any) {
    this.articleService.deleteArticle(id).subscribe((response: any) => {
      this.tableData();
      this.responseMessage = response.message;
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

}
