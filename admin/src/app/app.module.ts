import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { CourseManagementComponent } from './pages/course-management/course-management.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CourseModalComponent } from './pages/course-modal/course-modal.component';
import { TopicComponent } from './pages/topic/topic.component';
import { SubtopicComponent } from './pages/subtopic/subtopic.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { BookingManagementComponent } from './pages/booking-management/booking-management.component';
import { LessonContentComponent } from './pages/lesson-content/lesson-content.component';
import { ChoicesComponent } from './pages/choices/choices.component';
import { PurchasedComponent } from './pages/purchased/purchased.component';
import { SubadminManagementComponent } from './pages/subadmin-management/subadmin-management.component';
import { AfterLoginService } from './services/after-login.service';
import { AuthService } from './services/auth.service';
import { BeforeLoginService } from './services/before-login.service';
import { JarwisService } from './services/jarwis.service';
import { TokenService } from './services/token.service';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    HomeComponent,
    AccountComponent,
    UserManagementComponent,
    CourseManagementComponent,
    CourseModalComponent,
    TopicComponent,
    SubtopicComponent,
    LessonsComponent,
    QuizComponent,
    CreateQuizComponent,
    BookingManagementComponent,
    LessonContentComponent,
    ChoicesComponent,
    PurchasedComponent,
    SubadminManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    JarwisService,
    TokenService,
    AuthService,
    BeforeLoginService,
    AfterLoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
