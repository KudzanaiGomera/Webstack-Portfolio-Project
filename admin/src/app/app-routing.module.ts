import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AccountComponent } from './pages/account/account.component';
import { BookingManagementComponent } from './pages/booking-management/booking-management.component';
import { ChoicesComponent } from './pages/choices/choices.component';
import { CourseManagementComponent } from './pages/course-management/course-management.component';
import { CourseModalComponent } from './pages/course-modal/course-modal.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { HomeComponent } from './pages/home/home.component';
import { LessonContentComponent } from './pages/lesson-content/lesson-content.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { PurchasedComponent } from './pages/purchased/purchased.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { SubadminManagementComponent } from './pages/subadmin-management/subadmin-management.component';
import { SubtopicComponent } from './pages/subtopic/subtopic.component';
import { TopicComponent } from './pages/topic/topic.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';

const routes: Routes = [

  {
    path: '',
    component: LoginComponent,
    // canActivate: [BeforeLoginService],
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'usermanagement',
    component: UserManagementComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'subadminmanagement',
    component: SubadminManagementComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'purchased',
    component: PurchasedComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'subjects',
    component: CourseManagementComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'subject/:name',
    component: CourseModalComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'topic/:subject/:grade',
    component: TopicComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'subtopic/:subject/:grade/:topic',
    component: SubtopicComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'lesson/:subject/:grade/:topic/:subtopic',
    component: LessonsComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'lesson-content/:subject/:grade/:topic/:subtopic/:lesson',
    component: LessonContentComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'quiz',
    component: QuizComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'choices/:lesson/:qnNumber',
    component: ChoicesComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'booking',
    component: BookingManagementComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'create-quiz/:lesson',
    component: CreateQuizComponent,
    canActivate: [AfterLoginService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
