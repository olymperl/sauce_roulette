import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classe, Student } from '../models/student';
import { StudentService } from '../shared/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // todo utiliser la structure disponible dans "models > student.ts" pour typer cette liste
  // todo initialiser cette liste par un tableau vide
  classes : Classe[] = [];

  // todo utiliser la structure disponible dans "models > student.ts" pour typer la liste
  // todo remplacer toute cette liste par un tableau vide
  students: Student[] = [];

  // l'étudiant mis dans la sauce
  saucedStudent!: string;

  sauceForm!: FormGroup;
  // todo injecter le service StudentService
  constructor(private fb: FormBuilder, private studentService: StudentService) { 
    // Construction du formulaire (Reactive Forms)
    this.sauceForm = this.fb.group({
      classe: this.fb.control('', {
        // todo ajouter un validateur "required"
        validators: [Validators.required]
      })
    });

    // todo utiliser le service StudentService pour récupérer la liste des classes disponibles
    const obsDispo = this.studentService.getAllClasses();
    obsDispo.subscribe((classes) =>{this.classes = classes}
    );
  }

  onSelectChange() {
    // todo lorsque la classe sélectionnée change, il faut utiliser StudentService pour récupérer la liste des étudiants de cette classe
    const obsChange = this.studentService.getStudentsByClasse(this.sauceForm.value.classe);
    obsChange.subscribe((students) =>{this.students = students}
    );
  }

  ngOnInit(): void {
  }

  get classeControl() {
    return this.sauceForm?.controls.classe;
  }

  onSubmit() {
    /* 
    todo implémenter la méthode de sorte à ce qu'elle choisisse un élève au hasard parmi la liste d'élèves
    todo cet élève devra ensuite être affecté au champ "saucedStudent"
    */
    this.saucedStudent = this.students[Math.floor(Math.random() * this.students.length)].name;
  }

  private pickRandom(array: string[]): string {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  }
}
