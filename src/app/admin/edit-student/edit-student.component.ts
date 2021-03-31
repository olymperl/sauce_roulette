import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {

  // todo typer avec la structure disponible dans "models > student.ts"
  // todo ne pas initialiser l'étudiant en dur comme c'est fait actuellement
  student! : Student;

  // todo ne pas initialiser la liste des classes disponibles en dur comme c'est fait actuellement mais plutôt avec une liste vide
  classes : String[] = [];

  studentForm!: FormGroup;

  // todo injecter le service StudentService
  constructor(private fb: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute, private studentService: StudentService) {


    // todo initialiser la liste des classes disponibles avec le service StudentService
      const obsClasses = this.studentService.getAllClasses();
      obsClasses.subscribe((classes) =>{
      this.classes = classes.map(classe => classe.id)
      } );

      
    this.activatedRoute.params.subscribe(params => {
      // todo récupérer l'étudiant grâce à son id et au service StudentService
      const id = params.id;
      const obsStudent = this.studentService.getStudentById(id);
      obsStudent.subscribe((student) =>{this.student = student ;
        this.studentForm = this.fb.group({
          name: this.fb.control(this.student.name, {
            validators: [Validators.required],
          }),
          classe: this.fb.control(this.student.classe, {
            validators: [Validators.required],
          }),
        });
      });
    });
  }

  ngOnInit(): void {
  }

  validate() {
    this.student.name = this.studentForm.value.name;
    this.student.classe = this.studentForm.value.classe;
    // todo enregistrer les modifications avec le service StudentService
      const obsUpdate = this.studentService.updateStudent(this.student);
      obsUpdate.subscribe((student) =>{ 
      });
  }

  cancel() {
    this.location.back();
  }

  get nameControl() {
    return this.studentForm.controls.name;
  }

  get classeControl() {
    return this.studentForm.controls.classe;
  }
}
