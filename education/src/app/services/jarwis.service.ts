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

  signup(data: any) {
    return this.http.post(`${this.baseUrl}/signup.php`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login.php`, data);
  }

  getSubjects() {
    return this.http.get(`${this.baseUrl}/getSubjects.php`);
  }

  getMoreSubjects(data: any) {
    return this.http.post(`${this.baseUrl}/getMoreSubjects.php`, data);
  }

  getSubscription(data: any) {
    return this.http.post(`${this.baseUrl}/subscriptions.php`, data);
  }

  getAllLessons() {
    return this.http.get(`${this.baseUrl}/getAllLessons.php`);
  }

  getTopicsByUser(data: any) {
    return this.http.post(`${this.baseUrl}/getTopicsByUser.php`, data);
  }

  getUnPaidTopics(data: any) {
    return this.http.post(`${this.baseUrl}/getUnPaidTopics.php`, data);
  }

  getUnPaidSubjects(data: any) {
    return this.http.post(`${this.baseUrl}/getUnPaidSubjects.php`, data);
  }

  getTopicsBySubject(data: any) {
    return this.http.post(`${this.baseUrl}/getTopicsBySubject.php`, data);
  }

  getOtherTopicsBySubject(data: any) {
    return this.http.post(`${this.baseUrl}/getOtherTopicsBySubject.php`, data);
  }

  getModules(data: any) {
    return this.http.post(`${this.baseUrl}/getModules.php`, data);
  }

  getSubjectsByUser(data: any) {
    return this.http.post(`${this.baseUrl}/getSubjectsByUser.php`, data);
  }

  getLessonsByModule(data: any) {
    return this.http.post(`${this.baseUrl}/getLessonsByModule.php`, data);
  }

  getGrades(data: any) {
    return this.http.post(`${this.baseUrl}/getGrades.php`, data);
  }

  getGrade(data: any) {
    return this.http.post(`${this.baseUrl}/getGrade.php`, data);
  }

  getTopics(data: any) {
    return this.http.post(`${this.baseUrl}/getTopics.php`, data);
  }

  getSubTopics(data: any) {
    return this.http.post(`${this.baseUrl}/getSubTopics.php`, data);
  }

  payment(data: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/payment.php`, data, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  watch(data: any) {
    return this.http.post(`${this.baseUrl}/watch.php`, data);
  }

  getUpNext(data: any) {
    return this.http.post(`${this.baseUrl}/getUpNext.php`, data);
  }

  getPrevious(data: any) {
    return this.http.post(`${this.baseUrl}/getPrevious.php`, data);
  }

  get_quiz(data: any) {
    return this.http.post(`${this.url}/quiz/question.php`, data);
  }

  getScore(data: any) {
    return this.http.post(`${this.url}/quiz/getScore.php`, data);
  }

  getContentByLesson(data: any) {
    return this.http.post(`${this.baseUrl}/getContentByLesson.php`, data);
  }

  getLessonDetails(data: any) {
    return this.http.post(`${this.baseUrl}/getLessonDetails.php`, data);
  }

  getContentDetails(data: any) {
    return this.http.post(`${this.baseUrl}/getContentDetails.php`, data);
  }

  checkTrial(data: any) {
    return this.http.post(`${this.baseUrl}/checkTrial.php`, data);
  }

  getMyBooking(data: any) {
    return this.http.post(`${this.baseUrl}/getMyBooking.php`, data);
  }

  resetScore(data: any) {
    return this.http.post(`${this.url}/quiz/resetScore.php`, data);
  }

  process(data: any) {
    return this.http.post(`${this.url}/quiz/process.php`, data);
  }

  book(data: any) {
    return this.http.post(`${this.baseUrl}/book.php`, data);
  }

  bookStatus(data: any) {
    return this.http.post(`${this.baseUrl}/getBookingStatus.php`, data);
  }

  check4Bookings(data: any) {
    return this.http.post(`${this.baseUrl}/check4Bookings.php`, data);
  }

  contact(data: any) {
    return this.http.post(`${this.baseUrl}/contact.php`, data);
  }

  pay(data: any) {
    return this.http.post(`${this.baseUrl}/pay.php`, data);
  }

  payEft(data: any) {
    return this.http.post(`${this.baseUrl}/payEft.php`, data);
  }

  payTopic(data: any) {
    return this.http.post(`${this.baseUrl}/payTopic.php`, data);
  }

  payTopicEft(data: any) {
    return this.http.post(`${this.baseUrl}/payTopicEft.php`, data);
  }

  checkout(data: any) {
    return this.http.post(`${this.baseUrl}/checkout.php`, data);
  }

  payBooking(data: any) {
    return this.http.post(`${this.baseUrl}/payBooking.php`, data);
  }

  payBookingEft(data: any) {
    return this.http.post(`${this.baseUrl}/payBookingEft.php`, data);
  }

  removeFromCart(data: any) {
    return this.http.post(`${this.baseUrl}/removeFromCart.php`, data);
  }

  removeSubjectFromCart(data: any) {
    return this.http.post(`${this.baseUrl}/removeSubjectFromCart.php`, data);
  }

  cancelSubscription(data: any) {
    return this.http.post(`${this.baseUrl}/cancelSubscription.php`, data);
  }

  getUserAccount(data: any) {
    return this.http.post(`${this.baseUrl}/getUserAccount.php`, data);
  }

  getUserImage(data: any) {
    return this.http.post(`${this.baseUrl}/getUserImage.php`, data);
  }

  uploadUserData(data: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/userUpload.php`,
      data,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }

  userAccount(data: any) {
    return this.http.post(`${this.baseUrl}/userAccount.php`, data);
  }

  getId(data: any) {
    return this.http.post(`${this.baseUrl}/getId.php`, data);
  }
}
