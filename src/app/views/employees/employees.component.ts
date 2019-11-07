import { Component, OnInit, ViewChild ,OnDestroy,AfterViewInit} from '@angular/core';
import { EmployeeService,Employee} from '../../services/employee.service';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';

import { Subject } from 'rxjs'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('myModal', {static: false}) public myModal: ModalDirective;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  constructor(private service : EmployeeService) {

  }
  list: Array<Employee>=[];
  data : Employee;
  dtOptions: DataTables.Settings = {};
  image:any;
  ngOnInit()  {
    let i=0;
    this.service.getAll().subscribe(res=>
      {
        for (let key in res)
        {     
          this.list.push
           ( {
              Id:key,
              Email: res[key].Email,
              Password: res[key].Password,
              Firstname : res[key].Firstname,
              Lastname : res[key].Lastname,
              Phone : res[key].Phone ,
              Address : res[key].Address,
              Birthday : res[key].Birthday ,
              Image : res[key].Image,
              Position : res[key].Position ,
              Status : res[key].Status
            }
    )
        }

        this.rerender();
      },error=>{
        console.log(error);
      });

    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      scrollCollapse : true,
      autoWidth: false,
      scrollX: true,
      language:
      { 
        emptyTable: "Đang Load",
        lengthMenu: "Hiển thị _MENU_ trường trên một trang",
        zeroRecords: "Không tìm thấy dữ liệu",
        info: "Hiển thị trang _PAGE_ trong _PAGES_ trang",
        infoEmpty: "Không có trường hợp lệ",
        infoFiltered: "(Lọc từ _MAX_ total trường)",

        paginate:{ 
          first: '<i class="fa fa-angle-double-left "></i>',
          last: '<i class="fa fa-angle-double-right "></i>',
          next: '<i class="fa fa-angle-right "></i>',
          previous: '<i class="fa fa-angle-left "></i>'
      }
      }
    };
    this.service.resetForm();
  }
  ngAfterViewInit(): void {
    
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  showModal()
  {
    this.service.showModal(null);
    this.myModal.show();
  }
  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.service.formData.Image=this.image;
    }
    myReader.readAsDataURL(file);
  }
  showedit(data: Employee)
  {
    this.service.showModal(data);
    this.myModal.show();
  }
   onSubmit (form:NgForm)
  {
    this.service.insert(form);
    this.myModal.hide();
    this.service.getAll().subscribe(res=>
      {
        for (let key in res)
        {     
          this.list.push
           ( {
              Id:key,
              Email: res[key].Email,
              Password: res[key].Password,
              Firstname : res[key].Firstname,
              Lastname : res[key].Lastname,
              Phone : res[key].Phone ,
              Address : res[key].Address,
              Birthday : res[key].Birthday ,
              Image : res[key].Image,
              Position : res[key].Position ,
              Status : res[key].Status
            }
    )
        }

        this.rerender();
      },error=>{
        console.log(error);
      });
  }
}
