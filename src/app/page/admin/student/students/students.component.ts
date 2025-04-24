import { NgClass, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { StudentsService } from '../../../../services/students.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

  constructor(
    private studentsService: StudentsService
  ) {}

 

  async getAllStudents() {
    return await this.studentsService.getAllStudents()
  }

  readonly students = signal<any[]>([])

  async ngOnInit() {
    const data = await this.getAllStudents()

    this.students.set(data)
    
  }

  async onDelete(id: number) {
    try {
      await this.studentsService.deleteStudent(id);
      // Refresh the list after deletion
      const updatedData = await this.getAllStudents();
      this.students.set(updatedData);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  }
}
