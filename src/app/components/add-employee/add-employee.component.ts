import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employee;
  employeeForm: FormGroup;
  mode = 'create';

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      name: [''],
      salary: [''],
      gender: [''],
      competencyLevel: ['']
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('employeeId')) {
        this.mode = 'edit';
        const employeeId = paramMap.get('employeeId');
        this.employeeService.getEmployee(employeeId).subscribe((response) => {
          this.employee = response;
          this.assignValues();
        });
      }
    });
  }

  assignValues() {
    this.employeeForm.patchValue({
      name: this.employee.employeeName,
      gender: this.employee.employeeGender,
      competencyLevel: this.employee.employeeCompetencyLevel,
      salary: this.employee.employeeSalary
    });
  }

  employeeFormSubmit() {
    if (this.mode === 'create') {
      const employee = {
        employeeName: this.employeeForm.get('name').value,
        employeeSalary: this.employeeForm.get('salary').value,
        employeeGender: this.employeeForm.get('gender').value,
        employeeCompetencyLevel: this.employeeForm.get('competencyLevel').value
      };

      this.employeeService.insertEmployee(employee).subscribe((response) => {
        alert('Employee added!');
        this.router.navigate(['/']);
      });
    } else if (this.mode === 'edit') {
      const employeeUpdate = {
        employeeId: this.employee.employeeId,
        employeeName: this.employeeForm.get('name').value,
        employeeSalary: this.employeeForm.get('salary').value,
        employeeGender: this.employeeForm.get('gender').value,
        employeeCompetencyLevel: this.employeeForm.get('competencyLevel').value
      };
      this.employeeService.updateEmployee(employeeUpdate).subscribe((response) => {
        alert('Employee updated!');
        this.router.navigate(['/']);
      });
    }
  }
}
