import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EditStudentComponent } from './edit-student/edit-student.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'student/:id',
    component: EditStudentComponent
  },
  {
    path: '**/**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [AdminComponent, EditStudentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AdminModule { }
