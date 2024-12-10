export interface Exam {
  id?: number;
  studentName: string;
  location?: string;
  date: string; // Format ISO 8601 (ex: '2024-06-20')
  time: string; // Format 'HH:MM:SS'
  status: 'Confirmé' | 'À organiser' | 'Annulé' | 'En recherche de place';
}
