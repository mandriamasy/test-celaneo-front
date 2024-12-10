import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamService } from '../services/exam.service';
import { Exam } from '../models/exam.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-exams',
  standalone: true,
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
  imports : [CommonModule, ReactiveFormsModule]
})
export class ExamsComponent implements OnInit {
  exams: Exam[] = []; // Liste des examens
  showForm = false; // Affiche le formulaire ou non
  examForm!: FormGroup;

  constructor(private examService: ExamService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchExams(); // Charger les examens au démarrage

    // Initialiser le formulaire
    this.examForm = this.fb.group({
      studentName: ['', [Validators.required]],
      location: [''],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  // Récupérer la liste des examens
  fetchExams(): void {
    this.examService.getExams().subscribe((data) => {
      this.exams = data;
    });
  }

  // Afficher / cacher le formulaire
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  get totalExams(): number {
    let som = 0;
    this.exams.map((item) => {
      item.status !== 'Annulé' ? som++ : null;
    })
    return som;
  }

  // Ajouter un nouvel examen
  addExam(): void {
    if (this.examForm.valid) {
      const newExam: Exam = this.examForm.value;
      this.examService.addExam(newExam).subscribe(() => {
        this.fetchExams(); // Recharger la liste
        this.showForm = false; // Cacher le formulaire
        this.examForm.reset();
      });
    }
  }
}
