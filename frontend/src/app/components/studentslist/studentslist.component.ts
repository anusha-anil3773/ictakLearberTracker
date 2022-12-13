import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';

import { AddstudentsComponent } from '../addstudents/addstudents.component';
import { CsvfileuploadComponent } from '../csvfileupload/csvfileupload.component';
import {faFile} from '@fortawesome/free-regular-svg-icons'
import {faPlusSquare} from '@fortawesome/free-regular-svg-icons'
import {faEdit} from '@fortawesome/free-regular-svg-icons'
import {faWindowClose} from '@fortawesome/free-regular-svg-icons'



@Component({
  selector: 'app-studentslist',
  templateUrl: './studentslist.component.html',
  styleUrls: ['./studentslist.component.css']
})
export class StudentslistComponent implements OnInit {

  students : any = [];
  id:any;
  searchText:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  filterTerm!: string;
  faFile = faFile;
  faPlusSquare = faPlusSquare;
  faWindowClose = faWindowClose;
  faEdit = faEdit;



  constructor(private apiService: ApiService,  private router: Router,private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getstudentData();

  }

  
  getstudentData() {
    this.apiService.getstudentsList().subscribe(res => {
      this.students = res;
    })
  }

  updatestudent(_id: any) {
    console.log(_id)
    this.apiService.formupdate = _id;
    console.log(_id)
    this.router.navigate(['/edit-students']);
  }

  deletestudent(id:any){
    this.apiService.deletestudent(id).subscribe(res=>{
      this.getstudentData()
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getstudentData();
  } 
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getstudentData();
  }



}
