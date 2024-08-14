import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticleDetailsComponent } from 'src/app/article-details/article-details.component';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  responseMessage: any;
  articles: any[] = [];
  searchText: string = ' ';
  categories: any[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private articleService: ArticleService,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService) {
    this.tableData();
    this.fetchCategories();
  }

  ngOnInit(): void {
    //if token exists on localstorage
    if (localStorage.getItem('token') != null) {
      this.userService.checkToken().subscribe((response: any) => {
        this.router.navigate(['/articleHub/dashboard'])
      }, (error: any) => {
        console.log(error);
      }
      )
    }
  }

  tableData() {
    this.articleService.getPublicPublishedArticles().subscribe((response: any) => {
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

  filteredItem(): any[] {
    return this.articles.filter((item: { categoryId: number; categoryName: string; title: string }) =>
      (!this.selectedCategoryId || item.categoryId === this.selectedCategoryId) && // Filter by selected category
      (item.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }


  handleViewAction(article: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: article
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ArticleDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(updatedArticle => {
      if (updatedArticle) {
        this.updateArticleInList(updatedArticle);
      }
    });
  }

  updateArticleInList(updatedArticle: any): void {
    const index = this.articles.findIndex(a => a.id === updatedArticle.id);
    if (index !== -1) {
      this.articles[index] = updatedArticle;
    }
  }
  fetchCategories() {
    this.categoryService.getAllCategory().subscribe((res: any) => {
      this.categories = res;
    }, (error: any) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      //snackbar
    })
  }

  filterByCategory(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
  }

  getAvatarColor(email: string): string {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 60%, 80%)`;
    return color;
  }
}

