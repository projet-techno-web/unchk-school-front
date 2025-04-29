import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class StudentsService {
  private apiUrl = 'http://localhost:8080/api/user';  

  constructor(private http: HttpClient) { }

  createStudent(etudiant: Student): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.post<any>(`${this.apiUrl}/create-student`, etudiant, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  getAllStudents(): Promise<any[]> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      console.log(token)
      throw new Error('Token non trouvé');
    }
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/students`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  updateStudent(id: number, student: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.put(`${this.apiUrl}/students/${id}`, student, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  getStudentById(id: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.get(`${this.apiUrl}/students/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  getMyProfil(): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.get(`${this.apiUrl}/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  deleteStudent(id: number): Promise<any> {
    const token = sessionStorage.getItem('authToken');
    return firstValueFrom(this.http.delete<any>(`${this.apiUrl}/students/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

}

export interface Student {
  email?: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  role?: string;
  newPassword?: string;
  confirmPassword?: string;
}