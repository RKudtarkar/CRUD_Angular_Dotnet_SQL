using DataAccess.Data;
using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MasterWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly MasterDBContext context;
        public EmployeeController(MasterDBContext _context)
        {
            context = _context;
        }

        [HttpPost]
        [Route("Get")]
        public async Task<List<EmployeeModel>> Get()
        {
            var lst = context.EmployeeMasters.ToList();
            var lstEmp = lst.Select(e => new EmployeeModel
            {
                Id = e.Id,
                Name = e.Name,
                EmailId = e.EmailId,
                Phone = e.Phone,
                Age = e.Age,
                Salary = e.Salary,
                //Password=e.Password
            }
            ).ToList();

            return lstEmp;
        }

        [HttpPost]
        [Route("GetById")]
        public async Task<EmployeeModel> GetById(int id)
        {
            EmployeeModel Emp = new();
            var e = context.EmployeeMasters.Where(x => x.Id == id).FirstOrDefault();
            if (e != null)
            {
                Emp = new EmployeeModel()
                {
                    //Id = e.Id,
                    Name = e.Name,
                    EmailId = e.EmailId,
                    Phone = e.Phone,
                    Age = e.Age,
                    Salary = e.Salary,
                    //Password=e.Password
                };
            }
            return Emp;
        }

        [HttpPost]
        [Route("Insert")]
        public async Task<EmployeeModel> Insert(EmployeeModel employeeModel)
        {
            EmployeeMaster Emp = new()
            { 
                //Id = employeeModel.Id,
                Name = employeeModel.Name,
                EmailId = employeeModel.EmailId,
                Phone = employeeModel.Phone,
                Age = employeeModel.Age,
                Salary = employeeModel.Salary,
            };
            context.EmployeeMasters.Add(Emp);
            context.SaveChanges();
            return employeeModel;
        }

        [HttpPost]
        [Route("Update")]
        public async Task<EmployeeModel> Update(EmployeeModel employeeModel)
        {
            var e = context.EmployeeMasters.Where(x => x.Id == employeeModel.Id).FirstOrDefault();
            if (e != null)
            {
                e.Id = employeeModel.Id;
                e.Name = employeeModel.Name;
                e.EmailId = employeeModel.EmailId;
                e.Phone = employeeModel.Phone;
                e.Age = employeeModel.Age;
                e.Salary = employeeModel.Salary;
                context.EmployeeMasters.Update(e);
                context.SaveChanges();
            }
            else
            {

            }
            return employeeModel;
        }

        [HttpPost]
        [Route("Delete")]
        public async Task<bool> Delete(int id)
        {
            var e = context.EmployeeMasters.Where(x => x.Id == id).FirstOrDefault();
            if (e != null)
            {
                
                context.EmployeeMasters.Remove(e);
                context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
