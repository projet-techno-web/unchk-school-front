import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:8080/api/courses';
  private apiUrlCmt = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) { }

  createCourse(courseData: FormData): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.post<any>(`${this.apiUrl}`, courseData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }


  getAllCourses(): Observable<Course[]> {
    const token = sessionStorage.getItem('authToken');
    return this.http.get<Course[]>(`${this.apiUrl}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  updateCourse(id: number, data: FormData): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  getCourseById(id: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  deleteCourse(id: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  createComment(id: number, comment: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.post<any>(`${this.apiUrlCmt}/${id}`, comment, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
}

export interface Course {
  id?: number;
  title: string;
  description: string;
  image?: string;
  imageUrl?: string;
}
