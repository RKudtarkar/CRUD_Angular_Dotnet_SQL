import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { IEmployee } from '../../interfaces/Employee';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule, RouterLink, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  constructor(private httpservice: HttpService,private toastr: ToastrService) { }
  router = inject(Router)
  formBuilder = inject(FormBuilder)
  route = inject(ActivatedRoute)
  employeeForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    emailId: ['', [Validators.required,Validators.email]],
    phone: ['', []],
    age: [0, [Validators.required]],
    salary: [0, [Validators.required]]
    // id: [0],
  })

  employeeId!: number
  isEdit = false
  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true
      // this.httpservice.getEmployeeById(this.employeeId).
      //   subscribe({
      //     next: (res: any) => {
      //       this.employeeForm.patchValue(res)
      //       console.log(res)
      //     },
      //     error: err => {
      //       console.log(err);
      //     }
      //   })

      this.httpservice.getEmployeeById(this.employeeId).
        subscribe(result => {
          console.log(result)
          this.employeeForm.patchValue(result)
        })
    }
    else {

    }
  }

  save() {
    const employee: IEmployee = {
      id: this.employeeId,
      name: this.employeeForm.value.name!,
      emailId: this.employeeForm.value.emailId!,
      phone: this.employeeForm.value.phone!,
      age: this.employeeForm.value.age!,
      salary: this.employeeForm.value.salary!,
    }
    if (this.isEdit) {
      this.httpservice.UpdateEmployee(employee).subscribe(() => (
        //console.log(result.values + "success")
        this.showSuccess()
        //this.router.navigateByUrl('/employeelist')
        
      ));
    }
    else {
      this.httpservice.createEmployee(employee).subscribe(result => (
        this.showSuccess()
      ))
    }

  }

  showSuccess() {
    this.toastr.success('Success!');
  }

  showError() {
    this.toastr.success('Error');
  }


}
