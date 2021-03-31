import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Classe, Student } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly baseUrl = `http://localhost:3000`;
  constructor(private http: HttpClient) { }

  getAllClasses(): Observable<Classe[]> {
    // todo implémenter la méthode pour récupérer toutes les classes
    return this.http.get<Classe[]>(this.baseUrl+'/classes');
  }

  getStudentsByClasse(classe: Classe): Observable<Student[]> {
    // todo implémenter la méthode pour récupérer tous les étudiants pour une classe donnée
    return this.http.get<Student[]>(this.baseUrl+'/students?classe='+classe.id);
  }

  getStudentById(studentId: string): Observable<Student> {
    // todo implémenter une méthode pour récupérer un étudiant à partir de son ID
    return this.http.get<Student>(this.baseUrl+'/students/'+studentId);
  }

  deleteStudent(studentId: string): Observable<void> {
    // todo implémenter une méthode pour supprimer un étudiant juste avec son ID
    return this.http.delete<void>(this.baseUrl+'/students/'+studentId);
  }

  updateStudent(student: Student): Observable<Student> {
    // todo implémenter une méthode pour mettre à jour un étudiant
    return this.http.put<Student>(this.baseUrl+'/students/'+student.id, student);
  }

  getAllStudents(): Observable<Student[]> {
    // todo implémenter une méthode pour récupérer absolument tous les étudiants, toutes classes confondues
    return this.http.get<Student[]>(this.baseUrl+'/students');
  }
}
