import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  onAddUser = new EventEmitter();
  onEditUser = new EventEmitter();
  usersForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsersComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.usersForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.usersForm.patchValue(this.dialogData.data);
      this.usersForm.controls['password'].setValue('password');
    }

  }

  handleSubmit() {
    if (this.dialogAction == "Edit") {
      this.edit();
    }
    else {
      this.add();
    }
  }

  add() {
    let formData = this.usersForm.value;
    let data = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
    }
    this.userService.addNewAppuser(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddUser.emit();
      this.responseMessage = response.message;
    }, (error: any) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      //snackbar
    })
  }

  edit() {
    let formData = this.usersForm.value;
    let data = {
      email: formData.email,
      name: formData.name,
      id: this.dialogData.data.id
    }
    this.userService.updateUser(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditUser.emit();
      this.responseMessage = response.message;
    }, (error: any) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      //snackbar
    })
  }
}
