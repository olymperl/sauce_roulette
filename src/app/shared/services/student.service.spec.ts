import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { StudentService } from './student.service';

fdescribe('StudentService', () => {
  let service: StudentService;

  let httpTestingController: HttpTestingController;

  const expectedStudents = [
    { id: '1', name: 'Twana Watchman', classe: '1' },
    { id: '2', name: 'Fidelia Westbrook', classe: '2' },
    { id: '3', name: 'Caroline Buster', classe: '3' },
    { id: '4', name: 'Brinda Troung', classe: '4' },
    { id: '5', name: 'Kemberly Minjarez', classe: '1' },
    { id: '6', name: 'Lucilla Steakley', classe: '2' },
    { id: '7', name: 'Dudley Felipe', classe: '3' },
    { id: '8', name: 'Melvin Ruocco', classe: '4' },
    { id: '9', name: 'Evan Crinklaw', classe: '1' },
    { id: '10', name: 'Marisela Zell', classe: '2' },
    { id: '11', name: 'Laurence Ditch', classe: '3' },
    { id: '12', name: 'Oscar Harding', classe: '4' },
    { id: '13', name: 'Dorene Vanscyoc', classe: '1' },
    { id: '14', name: 'Edwardo Southwick', classe: '2' },
    { id: '15', name: 'Deeann Ruth', classe: '3' },
    { id: '16', name: 'Clayton Mulhall', classe: '4' },
    { id: '17', name: 'Marceline Kelch', classe: '1' },
    { id: '18', name: 'Lula Linnen', classe: '2' },
    { id: '19', name: 'Herschel Potter', classe: '3' },
    { id: '20', name: 'Dominique Cookson', classe: '4' },
    { id: '21', name: 'Liz Deangelis', classe: '1' },
    { id: '22', name: 'Shonta Roser', classe: '2' },
    { id: '23', name: 'Khalilah Aldinger', classe: '3' },
    { id: '24', name: 'Bill Maciejewski', classe: '4' },
    { id: '25', name: 'Lanny Cerezo', classe: '1' },
    { id: '26', name: 'Luba Genest', classe: '2' },
    { id: '27', name: 'Bethel Rusch', classe: '3' },
    { id: '28', name: 'Maile Sheeley', classe: '4' },
    { id: '29', name: 'Sari Columbus', classe: '1' },
    { id: '30', name: 'Vinnie Accardi', classe: '2' },
    { id: '31', name: 'Miquel Moretti', classe: '3' },
    { id: '32', name: 'Mariah Borchardt', classe: '4' },
    { id: '33', name: 'Chau Waites', classe: '1' },
    { id: '34', name: 'Elly Easter', classe: '2' },
    { id: '35', name: 'Tim Mazer', classe: '3' },
    { id: '36', name: 'Morris Bak', classe: '4' },
    { id: '37', name: 'Charity Karp', classe: '1' },
    { id: '38', name: 'Vania Woodfork', classe: '2' },
    { id: '39', name: 'Harvey Connally', classe: '3' },
    { id: '40', name: 'Bobby Bucker', classe: '4' },
  ];

  const expectedClasses = [
    { id: '1', name: 'classe 1' },
    { id: '2', name: 'classe 2' },
    { id: '3', name: 'classe 3' },
    { id: '4', name: 'classe 4' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all classes', () => {
    // Make an HTTP GET request
    service.getAllClasses().subscribe((classes) =>
      // When observable resolves, result should match test data
      expect(classes).toEqual(expectedClasses)
    );

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(
      `${(service as any).baseUrl}/classes`
    );

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(expectedClasses);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('should retrieve all students', () => {
    service.getAllStudents().subscribe((students) =>
      expect(students).toEqual(expectedStudents)
    );

    const req = httpTestingController.expectOne(
      `${(service as any).baseUrl}/students`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(expectedStudents);

    httpTestingController.verify();
  });

  it('should get a student by ID', () => {
    const expectedStudent = expectedStudents[0];
    service.getStudentById(expectedStudent.id).subscribe((student) =>
      expect(student).toEqual(expectedStudent)
    );

    const req = httpTestingController.expectOne(
      `${(service as any).baseUrl}/students/1`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(expectedStudent);

    httpTestingController.verify();
  });

  it('should delete a student by ID', () => {
    service.deleteStudent(expectedStudents[0].id).subscribe(() => {
      expect(true);
    });

    const req = httpTestingController.expectOne(
      `${(service as any).baseUrl}/students/${expectedStudents[0].id}`
    );

    expect(req.request.method).toEqual('DELETE');

    httpTestingController.verify();
  });

  it('should update a student', () => {
    const expectedStudent = {...expectedStudents[0], name: expectedStudents[0].name + '1'};
    service.updateStudent(expectedStudent).subscribe((student) => {
      expect(student).toEqual(expectedStudent);
    });

    const req = httpTestingController.expectOne(
      `${(service as any).baseUrl}/students/${expectedStudent.id}`
    );

    expect(req.request.method).toEqual('PUT');

    req.flush(expectedStudent);

    httpTestingController.verify();
  });

  it('should retrieve all students of a given classe', () => {
    const studentsOfClass = expectedStudents.filter(s => s.classe === expectedClasses[0].id);

    service.getStudentsByClasse(expectedClasses[0]).subscribe((students) => {
      expect(students).toEqual(studentsOfClass);
    });

    const req = httpTestingController.expectOne(
      `${(service as any).baseUrl}/students?classe=${expectedClasses[0].id}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(studentsOfClass);

    httpTestingController.verify();
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
