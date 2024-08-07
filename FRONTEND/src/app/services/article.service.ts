import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  // Helper function to create headers with JWT token
  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include JWT token
    });
  }

  getAdminPublishedArticles() {
    return this.httpClient.get(this.url + "/article/admin/publishedArticles", {
      headers: this.getAuthHeaders()
    });
  }

  adminDeleteArticle(id: any) {
    return this.httpClient.delete(this.url + "/article/admin/deleteArticle/" + id, {
      headers: this.getAuthHeaders()
    });
  }

  addNewArticle(data: any) {
    return this.httpClient.post(this.url + "/article/addNewArticle", data, {
      headers: this.getAuthHeaders()
    });
  }

  updateArticle(data: any) {
    return this.httpClient.post(this.url + "/article/updateArticle", data, {
      headers: this.getAuthHeaders()
    });
  }

  getMyArticles() {
    return this.httpClient.get(this.url + "/article/myArticles", {
      headers: this.getAuthHeaders()
    });
  }

  deleteArticle(id: any) {
    return this.httpClient.delete(this.url + "/article/deleteArticle/" + id, {
      headers: this.getAuthHeaders()
    });
  }

  getPublicPublishedArticles() {
    return this.httpClient.get(this.url + "/article/publicPublishedArticles");
  }

}