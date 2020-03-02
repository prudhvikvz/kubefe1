import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: any;

  constructor(private employeeService: EmployeeServiceService) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
    });
  }

  deleteEmployee(employeeId) {
    this.employeeService.deleteEmployee(employeeId).subscribe((response) => {
      this.getAllEmployees();
      alert('Employee deleted!');
    });
  }
}
