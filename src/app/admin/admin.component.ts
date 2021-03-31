import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from '../models';
import {StudentService} from '../shared/services/student.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns = ['classe', 'name', 'action'];
  
  // todo utiliser la structure disponible dans "models > student.ts"
  // todo remplacer par un tableau vide
  students: Student[] = [];
  
  dataSource!: MatTableDataSource<Student>;

  // todo injecter le service StudentService
  constructor(private router: Router, private studentService: StudentService) {

    // todo initialiser la liste "students" en appelant le service
    // todo une fois que la liste est initialisée, initialiser la dataSource avec "this.dataSource = new MatTableDataSource(this.students);"
   }

  ngOnInit(): void {
    const obsStudents = this.studentService.getAllStudents();
    obsStudents.subscribe((students) =>{this.students = students;
    this.dataSource = new MatTableDataSource(this.students);
    } );
    }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editStudent(studentId: string) {
    this.router.navigate(['admin', 'student', studentId]);
  }

  deleteStudent(studentId: string) {
    // todo appeler le service StudentService pour supprimer l'étudiant
    const obsDelete = this.studentService.deleteStudent(studentId);
    // todo une fois que l'étudiant a été supprimé, mettre à jour la liste d'étudiants
    obsDelete.subscribe(() =>{
      const obsStudents = this.studentService.getAllStudents();
      obsStudents.subscribe((students) =>{
    // todo une fois que la liste d'étudiants est mise à jour, mettre à jour la dataSource
        this.students = students;
        this.dataSource = new MatTableDataSource(this.students);
      } );
    });
  }
}
