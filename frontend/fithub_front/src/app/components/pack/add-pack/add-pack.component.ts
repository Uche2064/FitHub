import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PackResponseSchema } from '../model/PackResponseSchema';
import { CommonModule } from '@angular/common';
import { AddPackSchema } from '../model/AddPackSchema';
import { NotificationComponent } from "../../../utils/notification/notification.component";
import { NotificationService } from '../../../services/notification_service/notification.service';
import { CustomerComponent } from '../../customer/customer.component';
import { CustomMessage } from '../../../utils/notification/CustomMessage';
import { PackServiceService } from '../../../services/pack_service/pack-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PackListComponent } from "../pack-list/pack-list.component";

@Component({
  selector: 'app-add-pack',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-pack.component.html',
  styleUrl: './add-pack.component.css'
})
export class AddPackComponent {
  packForm: FormGroup;
  isLoading = false;
  newPack: AddPackSchema = new AddPackSchema('', 0, 0);

  constructor(private fb: FormBuilder, private notificationService: NotificationService, private packService: PackServiceService) {
    this.packForm = this.fb.group({
      offerName: ['', [Validators.required]],
      durationMonths: ['', [Validators.required, Validators.pattern("^(1[0-2]|[1-9])$")]],
      monthlyPrice: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.newPack = this.packForm.value;
    this.packService.savePack(this.newPack).subscribe((pack) => {
      if (pack) {
        this.notificationService.notify(new CustomMessage('Pack ajouté avec succès', 'success'));
        this.packForm.reset();
        this.isLoading = false;
        this.packService.fetchPacks();
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.notificationService.notify(new CustomMessage(error.error, 'error'));
      this.isLoading = false;
    });
    console.log(this.newPack);
  }
}
