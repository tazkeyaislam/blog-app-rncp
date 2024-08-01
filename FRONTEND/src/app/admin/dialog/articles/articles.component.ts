import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  onAddArticle = new EventEmitter();
  onEditArticle = new EventEmitter();
  articleForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  categories: any;
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ArticlesComponent>,
    private articleService: ArticleService,
    private categoryService: CategoryService

  ) { }

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.articleForm.patchValue(this.dialogData.data);
    }
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe((response: any) => {
      this.categories = response;
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

  handleSubmit() {
    if (this.dialogAction == "Edit") {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    let formData = this.articleForm.value;
    let data = {
      title: formData.title,
      content: formData.content,
      categoryId: formData.categoryId,
      status: formData.status,

    }
    this.articleService.addNewArticle(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddArticle.emit();
      this.responseMessage = response.message;
    }, (error: any) => {
      this.dialogRef.close();
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

  edit() {
    let formData = this.articleForm.value;
    let data = {
      id: this.dialogData.data.id,
      title: formData.title,
      content: formData.content,
      categoryId: formData.categoryId,
      status: formData.status,

    }
    this.articleService.updateArticle(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditArticle.emit();
      this.responseMessage = response.message;
    }, (error: any) => {
      this.dialogRef.close();
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
