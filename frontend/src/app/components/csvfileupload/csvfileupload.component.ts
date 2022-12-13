import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
//import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-csvfileupload',
  templateUrl: './csvfileupload.component.html',
  styleUrls: ['./csvfileupload.component.css'],
})
export class CsvfileuploadComponent implements OnInit {

  // file:any;
  students: any = [];
  courses: any = [];
  batches: any = [];
  programs: any = [];
  addstudentform: any = new FormGroup({
    contact_number: new FormControl(''),
    student_name: new FormControl(''),
    email_id: new FormControl(''),
    contact_address: new FormControl(''),
    course: new FormControl(''),
    batch: new FormControl(''),
    program: new FormControl(''),
    training_head: new FormControl(''),
    placement_officer: new FormControl(''),
    employment_status: new FormControl(''),
    course_status: new FormControl(''),
  });

  constructor(private api: ApiService, private router: Router) {}
  file: any;
  fd = new FormData();
  ngOnInit(): void {}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  refresh(): void {
    window.location.reload();
  }
  //onSubmit() {
  uploadCSV() {
    let requireData = this.addstudentform.value;
    for (const prop in requireData) {
      this.fd.append(prop, requireData[prop]);
    }
    this.fd.append('csv', this.file, this.file.name);
    this.api.upload(this.fd).subscribe((res) => {
      console.log(res);
      alert('studentfile Added Successfully');
      this.refresh();
    });
  }
}
