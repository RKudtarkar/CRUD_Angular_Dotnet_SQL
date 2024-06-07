import { Component, ViewChild, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/Employee';
import { HttpService } from '../../services/http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink,MatTableModule, MatPaginatorModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  displayedColumns: string[] = ['id', 'name', 'emailId', 'phone', 'age', 'salary', 'action'];
  employeeList: IEmployee[] = [];
  // dataSource = new MatTableDataSource<IEmployee>(ELEMENT_DATA);
  //  @ViewChild(MatPaginator) paginator: MatPaginator;
  router = inject(Router)

  // httpService=inject(HttpService)
  constructor(private httpService: HttpService,private toastr: ToastrService) {
     
   }
  //  ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit() {
    this.getAllEmployee()
  }

  getAllEmployee()
  {
    this.httpService.getAllEmployee().subscribe(result => {
      this.employeeList = result
      console.log(result);
    })
  }

  edit(id: number) {
    this.router.navigateByUrl("employee/" + id)
  }
  delete(id: number) {
    this.httpService.deleteEmployeeById(id).
      subscribe({
        next: (res: any) => {
          if (res) {
            this.showSuccess() 
            this.getAllEmployee()
          }
          else {
            this.showError() 
          }
        },
        error: err => {
          this.showError() 
        }
      })
  }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError() {
    this.toastr.success('Error');
  }
}
