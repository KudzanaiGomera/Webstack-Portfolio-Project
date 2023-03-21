import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JarwisService {
  private baseUrl = 'https://sgcholdings.co.za/Backend/api';

  private url = 'https://sgcholdings.co.za/Backend';

  constructor(private http: HttpClient) {}

  loggedIn() {
    return localStorage.getItem('token');
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/adminLogin.php`, data);
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/listUsers.php`);
  }

  getSubadmins() {
    return this.http.get(`${this.baseUrl}/listSubadmin.php`);
  }

  purchasedContent() {
    return this.http.get(`${this.baseUrl}/purchasedContent.php`);
  }

  getSubjects() {
    return this.http.get(`${this.baseUrl}/getSubjects.php`);
  }

  getGrades(data: any) {
    return this.http.post(`${this.baseUrl}/getGrades.php`, data);
  }

  getTopics(data: any) {
    return this.http.post(`${this.baseUrl}/getTopics.php`, data);
  }

  getSubTopics(data: any) {
    return this.http.post(`${this.baseUrl}/getSubTopics.php`, data);
  }

  getLessons(data: any) {
    return this.http.post(`${this.baseUrl}/getLessons.php`, data);
  }

  getContents(data: any) {
    return this.http.post(`${this.baseUrl}/getContents.php`, data);
  }

  listLessons() {
    return this.http.get(`${this.baseUrl}/listLessons.php`);
  }

  addUser(data: any) {
    return this.http.post(`${this.baseUrl}/addUser.php`, data);
  }

  addSubadmin(data: any) {
    return this.http.post(`${this.baseUrl}/addSubadmin.php`, data);
  }

  addSubject(data: any) {
    return this.http.post(`${this.baseUrl}/createSubject.php`, data);
  }

  addGrade(data: any) {
    return this.http.post(`${this.baseUrl}/createGrade.php`, data);
  }

  addTopic(data: any) {
    return this.http.post(`${this.baseUrl}/createTopic.php`, data);
  }

  addSubTopic(data: any) {
    return this.http.post(`${this.baseUrl}/createSubTopic.php`, data);
  }

  addQuiz(data: any) {
    return this.http.post(`${this.url}/quiz/add.php`, data);
  }

  editChoice(data: any) {
    const req = new HttpRequest(
      'POST',
      `${this.url}/quiz/editChoice.php`,
      data,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }

  addLesson(data: any) {
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/createLesson.php`,
      data,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }

  uploadLesson(data: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/uploadLesson.php`,
      data,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }

  uploadLessonFile(data: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/uploadLessonFile.php`,
      data,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }

  deleteUser(data: any) {
    return this.http.post(`${this.baseUrl}/deleteUser.php`, data);
  }

  deleteSubadmin(data: any) {
    return this.http.post(`${this.baseUrl}/deleteSubadmin.php`, data);
  }

  deleteSub(data: any) {
    return this.http.post(`${this.baseUrl}/deleteSub.php`, data);
  }

  deleteSubject(data: any) {
    return this.http.post(`${this.baseUrl}/deleteSubject.php`, data);
  }

  editSubject(data: any) {
    return this.http.post(`${this.baseUrl}/editSubject.php`, data);
  }

  editGradeDescription(data: any) {
    return this.http.post(`${this.baseUrl}/editGradeDescription.php`, data);
  }

  editTopic(data: any) {
    return this.http.post(`${this.baseUrl}/editTopic.php`, data);
  }

  editSubTopic(data: any) {
    return this.http.post(`${this.baseUrl}/editSubTopic.php`, data);
  }

  editLesson(data: any) {
    return this.http.post(`${this.baseUrl}/editLesson.php`, data);
  }

  editPreviewImage(data: any) {
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/editPreviewImage.php`,
      data,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }

  deleteGrade(data: any) {
    return this.http.post(`${this.baseUrl}/deleteGrade.php`, data);
  }

  deleteTopic(data: any) {
    return this.http.post(`${this.baseUrl}/deleteTopic.php`, data);
  }

  deleteSubTopic(data: any) {
    return this.http.post(`${this.baseUrl}/deleteSubTopic.php`, data);
  }

  deleteLesson(data: any) {
    return this.http.post(`${this.baseUrl}/deleteLesson.php`, data);
  }

  deleteContent(data: any) {
    return this.http.post(`${this.baseUrl}/deleteContent.php`, data);
  }

  getAccount(data: any) {
    return this.http.post(`${this.baseUrl}/getAccount.php`, data);
  }

  getAdminAccount(data: any) {
    return this.http.post(`${this.baseUrl}/getAdminAccount.php`, data);
  }

  adminAccount(data: any) {
    return this.http.post(`${this.baseUrl}/adminAccount.php`, data);
  }

  upload(data: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/adminUpload.php`,
      data,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }

  getImage(data: any) {
    return this.http.post(`${this.baseUrl}/getAdminImage.php`, data);
  }

  getQuestion() {
    return this.http.get(`${this.url}/quiz/getQuestion.php`);
  }

  getChoices(data: any) {
    return this.http.post(`${this.url}/quiz/getChoices.php`, data);
  }

  deleteQuestion(data: any) {
    return this.http.post(`${this.url}/quiz/deleteQuestion.php`, data);
  }

  deleteChoice(data: any) {
    return this.http.post(`${this.url}/quiz/deleteChoice.php`, data);
  }

  approveUser(data: any) {
    return this.http.post(`${this.baseUrl}/approveUser.php`, data);
  }

  paySubject(data: any) {
    return this.http.post(`${this.baseUrl}/paySubject.php`, data);
  }

  unPaySubject(data: any) {
    return this.http.post(`${this.baseUrl}/unPaySubject.php`, data);
  }

  disableUser(data: any) {
    return this.http.post(`${this.baseUrl}/disableUser.php`, data);
  }

  getBookings() {
    return this.http.get(`${this.baseUrl}/getBookings.php`);
  }

  deleteBooking(data: any) {
    return this.http.post(`${this.baseUrl}/deleteBooking.php`, data);
  }

  approveBooking(data: any) {
    return this.http.post(`${this.baseUrl}/approveBooking.php`, data);
  }

  resetPassword(data: any) {
    return this.http.post(`${this.baseUrl}/resetPassword.php`, data);
  }
}
