import { Component } from '@angular/core';
import { PackListComponent } from "./pack-list/pack-list.component";
import { AddPackComponent } from "./add-pack/add-pack.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PackResponseSchema } from './model/PackResponseSchema';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from "../../utils/notification/notification.component";

@Component({
  selector: 'app-pack',
  imports: [AddPackComponent, CommonModule, FormsModule, ReactiveFormsModule, PackListComponent, NotificationComponent],
  templateUrl: './pack.component.html',
  styleUrl: './pack.component.css'
})
export class PackComponent {
  packs: PackResponseSchema[] = [];
  packForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.packForm = this.fb.group({
      offerName: ['', [Validators.required]],
      durationMonths: ['', [Validators.required, Validators.min(1)]],
      monthlyPrice: ['', [Validators.required, Validators.min(0)]]
    });
  }

}
