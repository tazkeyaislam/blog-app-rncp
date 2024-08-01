import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { environment } from 'src/environments/environment';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addNewCategory and return the result', () => {
    const dummyData = { name: 'Java' };
    const dummyResponse = { success: true };

    service.addNewCategory(dummyData).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/category/addNewCategory`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyResponse);
  });

  it('should call updateCategory and return the result', () => {
    const dummyData = { id: 1, name: 'JS' };
    const dummyResponse = { success: true };

    service.updateCategory(dummyData).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/category/updateCategory`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyResponse);
  });

  it('should call getAllCategory and return the result', () => {
    const dummyResponse = [{ id: 1, name: 'C++' }];

    service.getAllCategory().subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/category/getAllCategory`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

});
