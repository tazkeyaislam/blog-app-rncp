import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service'; // Import the AuthService

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {

  articleDetails: any;
  likeCount = 0;
  isLiked: boolean = false; // Flag to track if the article is liked by the user
  commentText = '';
  comments: any[] = [];
  commentCount = 0;
  isAuthenticated: boolean = false; // Flag to track user authentication

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialogRef: MatDialogRef<ArticleDetailsComponent>,
    private articleService: ArticleService,
    private authService: AuthService // Inject AuthService
  ) {
    this.articleDetails = this.dialogData.data;
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated(); // Set the flag based on authentication status
    this.initializeData();
  }

  initializeData(): void {
    this.likeCount = this.articleDetails.likeCount || 0;
    this.commentCount = this.articleDetails.commentCount || 0;
    this.checkIfLiked(); // Check if the article is already liked by the user
    this.loadComments();
  }

  loadComments(): void {
    this.articleService.getComments(this.articleDetails.id).subscribe(
      (comments: any[]) => {
        this.comments = comments;
        this.commentCount = comments.length; // Update the comment count
        this.articleDetails.commentCount = this.commentCount; // Update the article details
      },
      (error) => console.error('Error fetching comments:', error)
    );
  }

  submitComment(): void {
    if (!this.commentText.trim() || !this.articleDetails?.id) return;

    this.articleService.commentArticle(this.articleDetails.id, this.commentText).subscribe({
      next: (response) => {
        console.log('Comment added successfully!', response);
        this.commentText = ''; // Clear comment field after submission
        this.loadComments(); // Reload comments after adding a new one
      },
      error: (error) => console.error('Error posting comment:', error)
    });
  }
  getAvatarColor(email: string): string {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 60%, 80%)`;
    return color;
  }


  checkIfLiked(): void {
    if (this.isAuthenticated) {
      this.articleService.checkIfLiked(this.articleDetails.id).subscribe({
        next: (isLiked: boolean) => {
          this.isLiked = isLiked;
        },
        error: (error) => console.error('Error checking if article is liked:', error)
      });
    }
  }

  toggleLike(): void {
    if (this.isLiked) {
      this.unlikeArticle();
    } else {
      this.likeArticle();
    }
  }

  likeArticle(): void {
    this.articleService.likeArticle(this.articleDetails.id).subscribe({
      next: () => {
        this.isLiked = true;
        this.likeCount++;
        this.articleDetails.likeCount = this.likeCount;
      },
      error: (error) => console.error('Error liking article:', error)
    });
  }

  unlikeArticle(): void {
    this.articleService.unlikeArticle(this.articleDetails.id).subscribe({
      next: () => {
        this.isLiked = false;
        this.likeCount--;
        this.articleDetails.likeCount = this.likeCount; // Update the article details

      },
      error: (error) => console.error('Error unliking article:', error)
    });
  }

  closeDialog(): void {
    this.dialogRef.close(this.articleDetails); // Pass back the updated article data
  }



}

