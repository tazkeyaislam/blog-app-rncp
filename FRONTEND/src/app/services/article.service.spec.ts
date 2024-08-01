import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { environment } from 'src/environments/environment';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService]
    });
    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addNewArticle and return the result', () => {
    const dummyData = { title: 'Test Article' };
    const dummyResponse = { success: true };

    service.addNewArticle(dummyData).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/article/addNewArticle`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyResponse);
  });

  it('should call updateArticle and return the result', () => {
    const dummyData = { id: 1, title: 'Updated Article' };
    const dummyResponse = { success: true };

    service.updateArticle(dummyData).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/article/updateArticle`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyResponse);
  });

  it('should call getAllArticle and return the result', () => {
    const dummyResponse = [{ id: 1, title: 'Article 1' }];

    service.getAllArticle().subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/article/getAllArticle`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should call getAllPublishedArticle and return the result', () => {
    const dummyResponse = [{ id: 1, title: 'Published Article 1' }];

    service.getAllPublishedArticle().subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/article/getAllPublishedArticle`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should call deleteArticle and return the result', () => {
    const dummyId = 1;
    const dummyResponse = { success: true };

    service.deleteArticle(dummyId).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/article/deleteArticle/${dummyId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });
});
