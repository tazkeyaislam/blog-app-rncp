import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockLoginRequest = { username: 'testuser', password: 'testpass' };
  const mockAddUserRequest = { username: 'newuser', password: 'newpass' };
  // const mockUpdateUserRequest = { id: 1, username: 'updateduser' };
  const mockUpdateUserStatusRequest = { id: 1, status: 'active' };
  const mockUsersResponse = [{ id: 1, username: 'user1' }];
  const mockApiResponse = { success: true };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login and return the result', () => {
    service.login(mockLoginRequest).subscribe((res) => {
      expect(res).toEqual(mockApiResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/appUser/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLoginRequest);
    req.flush(mockApiResponse);
  });

  it('should call addNewAppuser and return the result', () => {
    service.addNewAppuser(mockAddUserRequest).subscribe((res) => {
      expect(res).toEqual(mockApiResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/appUser/addNewAppuser`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockAddUserRequest);
    req.flush(mockApiResponse);
  });

  it('should call getAllAppUser and return the result', () => {
    service.getAllAppUser().subscribe((res) => {
      expect(res).toEqual(mockUsersResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/appUser/getAllAppUser`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersResponse);
  });

  // it('should call updateUser and return the result', () => {
  //   service.updateUser(mockUpdateUserRequest).subscribe((res) => {
  //     expect(res).toEqual(mockApiResponse);
  //   });

  //   const req = httpMock.expectOne(`${environment.apiUrl}/appUser/updateUser`);
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.body).toEqual(mockUpdateUserRequest);
  //   req.flush(mockApiResponse);
  // });

  it('should call updateUserStatus and return the result', () => {
    service.updateUserStatus(mockUpdateUserStatusRequest).subscribe((res) => {
      expect(res).toEqual(mockApiResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/appUser/updateUserStatus`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUpdateUserStatusRequest);
    req.flush(mockApiResponse);
  });
});
