import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private apiUrl = 'http://localhost:8000/api/exams'; // URL du backend

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/ld+json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Récupérer la liste des examens
 getExams(): Observable<Exam[]> {
    return this.http.get<{ member: Exam[] }>(this.apiUrl).pipe(
      map((response) => response.member) // Extraire le tableau d'examens depuis la réponse
    );
  }

  // Ajouter un nouvel examen
  addExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(this.apiUrl, exam, this.httpOptions);
  }
}
