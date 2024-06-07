import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from '../interfaces/Employee';
import { IId } from '../interfaces/ModelId';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "https://localhost:7075/api/";
  // http=inject(HttpClient)
  constructor(private http: HttpClient) { }

  getAllEmployee() {
    return this.http.post<IEmployee[]>(this.apiUrl + "Employee/Get", {});
  }

  createEmployee(employee: IEmployee) {
    return this.http.post<IEmployee[]>(this.apiUrl + "Employee/Insert", employee);
  }

  getEmployeeById(id: number) {
    return this.http.post<IEmployee>(this.apiUrl + "Employee/GetById?id=" + id, {})
  }

  UpdateEmployee(employee: IEmployee) {
    return this.http.post<IEmployee[]>(this.apiUrl + "Employee/Update", employee);
  }

  deleteEmployeeById(id: number) {
    return this.http.post<IEmployee[]>(this.apiUrl + "Employee/delete?id=" + id, {})
  }
}
