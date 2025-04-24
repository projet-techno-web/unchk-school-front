import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin/layout-admin.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './page/admin/dashboard/dashboard.component';
import { StudentsComponent } from './page/admin/student/students/students.component';
import { AddStudentComponent } from './page/admin/student/add-student/add-student.component';
import { UpdateStudentComponent } from './page/admin/student/update-student/update-student.component';
import { CoursesComponent } from './page/admin/cours/courses/courses.component';
import { UpdateCoursesComponent } from './page/admin/cours/update-courses/update-courses.component';
import { ShowCoursesComponent } from './page/admin/cours/show-courses/show-courses.component';
import { AddCoursesComponent } from './page/admin/cours/add-courses/add-courses.component';

export const routes: Routes = [
    { path: '', component: LoginComponent }, // Path vide pour la racine
    { path: 'register', component: RegisterComponent },
    { path: 'password-forget', component: ForgetPasswordComponent },
    { path: 'password-reset/:token', component: ResetPasswordComponent },

     // Routes Admin - protégées par AuthGuard et RoleGuard
     {
        path: 'admin',
        component: LayoutAdminComponent,
        canActivate: [AuthGuard],
        data: { role: 'ADMIN' }, 
        children: [
            { path: 'dashboard', component: DashboardComponent},
            { path: 'students', component: StudentsComponent },
            { path: 'students/add', component: AddStudentComponent },
            { path: 'students/:id', component: UpdateStudentComponent },
            { path: 'courses', component: CoursesComponent },
            { path: 'courses/add', component: AddCoursesComponent },
            { path: 'courses/:id', component: UpdateCoursesComponent },
            { path: 'courses/show', component: ShowCoursesComponent },
        ]
    },
];
