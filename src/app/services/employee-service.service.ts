import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { text } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private httpClient: HttpClient) { }

  getAllEmployees () {
    return this.httpClient.get(environment.serverUrl + '/employees');
  }

  insertEmployee(employee) {
    return this.httpClient.post(environment.serverUrl + '/employee', employee);
  }

  deleteEmployee(employeeId) {
    return this.httpClient.delete(environment.serverUrl + '/employee/' + employeeId);
  }

  getEmployee(employeeId) {
    return this.httpClient.get(environment.serverUrl + '/employee/' + employeeId);
  }

  updateEmployee(employee) {
    return this.httpClient.put(environment.serverUrl + '/employee', employee);
  }
}
