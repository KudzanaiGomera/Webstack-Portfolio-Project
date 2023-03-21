import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CourseComponent } from './pages/course/course.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { BeforeLoginService } from './services/before-login.service';
import { JarwisService } from './services/jarwis.service';
import { TokenService } from './services/token.service';
import { FooterComponent } from './components/footer/footer.component';
import { AccountComponent } from './pages/account/account.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { GradeComponent } from './pages/grade/grade.component';
import { TopicComponent } from './pages/topic/topic.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { WatchComponent } from './pages/watch/watch.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { BookComponent } from './pages/book/book.component';
import { IndexComponent } from './pages/index/index.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MytopicsComponent } from './pages/mytopics/mytopics.component';
import { SafePipe } from './safe.pipe';
import { DocumentComponent } from './pages/document/document.component';
import { ModuleComponent } from './pages/module/module.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { MissionComponent } from './pages/mission/mission.component';
import { ApartComponent } from './pages/apart/apart.component';
import { TestimonialComponent } from './pages/testimonial/testimonial.component';
import { PurchaseTopicComponent } from './pages/purchase-topic/purchase-topic.component';
import { PurchaseBookingComponent } from './pages/purchase-booking/purchase-booking.component';
import { SwiperModule } from 'swiper/angular';

import { CarouselModule as Slider } from 'ngx-owl-carousel-o';
import { CourseModalComponent } from './pages/course-modal/course-modal.component';
import { AfterLoginService } from './services/after-login.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { MybookingComponent } from './pages/mybooking/mybooking.component';
import { MoreSubjectsComponent } from './pages/more-subjects/more-subjects.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { SubjectEftComponent } from './pages/subject-eft/subject-eft.component';
import { VerifyEftComponent } from './pages/verify-eft/verify-eft.component';

import { BnNgIdleService } from 'bn-ng-idle';
import { BannerComponent } from './components/banner/banner.component';
import { DividerComponent } from './components/divider/divider.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NotfoundComponent,
    CourseComponent,
    FooterComponent,
    AccountComponent,
    SubjectComponent,
    GradeComponent,
    TopicComponent,
    PaymentComponent,
    WatchComponent,
    QuizComponent,
    BookComponent,
    IndexComponent,
    ContactComponent,
    NavigationComponent,
    MytopicsComponent,
    SafePipe,
    DocumentComponent,
    ModuleComponent,
    VerifyComponent,
    MissionComponent,
    ApartComponent,
    TestimonialComponent,
    PurchaseTopicComponent,
    PurchaseBookingComponent,
    CourseModalComponent,
    MybookingComponent,
    MoreSubjectsComponent,
    SubscriptionComponent,
    WhatsappComponent,
    SubjectEftComponent,
    VerifyEftComponent,
    BannerComponent,
    DividerComponent,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    SwiperModule,
    Slider,
    BrowserAnimationsModule,
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
    BnNgIdleService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
