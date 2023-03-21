import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ApartComponent } from './pages/apart/apart.component';
import { BookComponent } from './pages/book/book.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CourseModalComponent } from './pages/course-modal/course-modal.component';
import { CourseComponent } from './pages/course/course.component';
import { DocumentComponent } from './pages/document/document.component';
import { GradeComponent } from './pages/grade/grade.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { MissionComponent } from './pages/mission/mission.component';
import { ModuleComponent } from './pages/module/module.component';
import { MytopicsComponent } from './pages/mytopics/mytopics.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PurchaseBookingComponent } from './pages/purchase-booking/purchase-booking.component';
import { PurchaseTopicComponent } from './pages/purchase-topic/purchase-topic.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { TestimonialComponent } from './pages/testimonial/testimonial.component';
import { TopicComponent } from './pages/topic/topic.component';
import { WatchComponent } from './pages/watch/watch.component';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { MoreSubjectsComponent } from './pages/more-subjects/more-subjects.component';
import { MybookingComponent } from './pages/mybooking/mybooking.component';
import { AccountComponent } from './pages/account/account.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { SubjectEftComponent } from './pages/subject-eft/subject-eft.component';
import { VerifyEftComponent } from './pages/verify-eft/verify-eft.component';

const appRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    // canActivate: [BeforeLoginService],
  },

  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [BeforeLoginService],
  },

  {
    path: 'signup',
    component: SignupComponent,
    // canActivate: [BeforeLoginService],
  },

  {
    path: 'verify',
    component: VerifyComponent,
    // canActivate: [BeforeLoginService],
  },

  {
    path: 'verify-eft/:token',
    component: VerifyEftComponent,
  },

  {
    path: 'contact',
    component: ContactComponent,
    // canActivate: [BeforeLoginService],
  },

  {
    path: 'mission',
    component: MissionComponent,
    // canActivate: [BeforeLoginService],
  },

  {
    path: 'apart',
    component: ApartComponent,
    // canActivate: [BeforeLoginService],
  },

  {
    path: 'testimonial',
    component: TestimonialComponent,
    // canActivate: [BeforeLoginService],
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'subject',
    component: SubjectComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'more-subject',
    component: MoreSubjectsComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'mybooking',
    component: MybookingComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'subscription',
    component: SubscriptionComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'grade/:subject',
    component: GradeComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'subject-eft/:contentId/:subject/:topic/:grade',
    component: SubjectEftComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'topic/:subject/:grade',
    component: TopicComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'payment/:subject/:grade/:topic',
    component: PaymentComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'purchase-topic/:subject/:grade/:topic',
    component: PurchaseTopicComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'purchase-booking/:topic/:date/:time',
    component: PurchaseBookingComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'course/:module/:grade',
    component: CourseComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'mytopics/:subject/:grade',
    component: MytopicsComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'watch/:id',
    component: WatchComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'course-modal/:subtopic/:grade/:lesson',
    component: CourseModalComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'view/:url',
    component: DocumentComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'quiz/:n/:lesson',
    component: QuizComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'book/:topic',
    component: BookComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'module/:topic/:grade',
    component: ModuleComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true, onSameUrlNavigation: 'reload', scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
