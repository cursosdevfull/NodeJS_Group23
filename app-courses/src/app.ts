import { createAuthRouter } from "@features/auth/presentation/auth.routes";
import { createUserRouter } from "@features/users/presentation/user.routes";
import { filterResponse, response } from "@shared/middlewares";
import {
  authenticationGuard,
  authorizationGuard,
} from "@shared/middlewares/guards";
import express from "express";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeRoutes(): void {
    const {
      createCourseRouter,
    } = require("./features/courses/presentation/course.routes");
    const {
      createRoleRouter,
    } = require("./features/roles/presentation/role.routes");
    const {
      createStudentRouter,
    } = require("./features/students/presentation/student.routes");
    const {
      createTeacherRouter,
    } = require("./features/teachers/presentation/teacher.routes");
    const {
      createCertificateRouter,
    } = require("./features/certificates/presentation/certificate.routes");
    const {
      createScheduleRouter,
    } = require("./features/schedules/presentation/schedule.routes");
    const {
      createSessionRouter,
    } = require("./features/sessions/presentation/session.routes");
    const {
      createEnrollmentRouter,
    } = require("./features/enrollments/presentation/enrollment.routes");
    const {
      createPaymentRouter,
    } = require("./features/payments/presentation/payment.routes");

    const routerAuth = createAuthRouter();
    const routerUser = createUserRouter();
    const routerCourse = createCourseRouter();
    const routerRole = createRoleRouter();
    const routerStudent = createStudentRouter();
    const routerTeacher = createTeacherRouter();
    const routerCertificate = createCertificateRouter();
    const routerSchedule = createScheduleRouter();
    const routerSession = createSessionRouter();
    const routerEnrollment = createEnrollmentRouter();
    const routerPayment = createPaymentRouter();

    this.app.use(
      "/courses",
      authenticationGuard,
      response,
      filterResponse(),
      routerCourse,
    );
    this.app.use(
      "/users",
      authenticationGuard,
      authorizationGuard("admin"),
      response,
      filterResponse(),
      routerUser,
    );
    this.app.use(
      "/roles",
      authenticationGuard,
      authorizationGuard("admin"),
      response,
      filterResponse(),
      routerRole,
    );
    this.app.use(
      "/students",
      authenticationGuard,
      response,
      filterResponse(),
      routerStudent,
    );
    this.app.use(
      "/teachers",
      authenticationGuard,
      response,
      filterResponse(),
      routerTeacher,
    );
    this.app.use(
      "/certificates",
      authenticationGuard,
      response,
      filterResponse(),
      routerCertificate,
    );
    this.app.use(
      "/schedules",
      authenticationGuard,
      response,
      filterResponse(),
      routerSchedule,
    );
    this.app.use(
      "/sessions",
      authenticationGuard,
      response,
      filterResponse(),
      routerSession,
    );
    this.app.use(
      "/enrollments",
      authenticationGuard,
      response,
      filterResponse(),
      routerEnrollment,
    );
    this.app.use(
      "/payments",
      authenticationGuard,
      response,
      filterResponse(),
      routerPayment,
    );
    this.app.use("/auth", response, filterResponse(), routerAuth);
  }
}

export const appInstance = new App();
export const app = appInstance.app;
