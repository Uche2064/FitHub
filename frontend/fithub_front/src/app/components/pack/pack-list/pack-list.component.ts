import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PackResponseSchema } from '../model/PackResponseSchema';
import { PackServiceService } from '../../../services/pack_service/pack-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DeletePopupComponent } from "../../delete-popup/delete-popup.component";
import { NotificationService } from '../../../services/notification_service/notification.service';
import { CustomMessage } from '../../../utils/notification/CustomMessage';
import { NotificationComponent } from "../../../utils/notification/notification.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pack-list',
  imports: [CommonModule, DeletePopupComponent, ReactiveFormsModule],
  templateUrl: './pack-list.component.html',
  styleUrl: './pack-list.component.css'
})
export class PackListComponent implements OnInit {


  showUpdateDialog: boolean = false;
  updateForm: FormGroup = new FormGroup({});
  packToDelete: PackResponseSchema = new PackResponseSchema();
  packs: PackResponseSchema[] = [];
  showDeleteDialog: boolean = false;
  packToUpdate: PackResponseSchema = new PackResponseSchema();
  isHoverable: boolean = true;
  displayPackInfo(pack: PackResponseSchema) {
    console.log('Pack info:', pack);
  }

  constructor(private packService: PackServiceService, private notificationService: NotificationService, private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      offerNameUpdate: ['', [Validators.required, Validators.minLength(3)]],
      durationMonthsUpdate: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      monthlyPriceUpdate: ['', [Validators.required, Validators.min(0)]]
    });
  }
  ngOnInit() {
    this.loadPacks();
  }

  openUpdateDialog(pack: PackResponseSchema) {
    this.isHoverable = false
    this.packToUpdate = pack;
    this.showUpdateDialog = true;
    console.log(pack);
    this.updateForm.patchValue({
      offerNameUpdate: pack.offerName,
      durationMonthsUpdate: pack.durationMonths,
      monthlyPriceUpdate: pack.monthlyPrice,
    });
  }

  closeUpdateDialog() {
    console.log('close update dialog');
    this.showUpdateDialog = false;
    this.isHoverable = true;
    this.packToDelete = new PackResponseSchema();
  }
  openDeleteDialog(pack: PackResponseSchema) {
    this.packToDelete = pack;
    this.showDeleteDialog = true;
  }
  cancelDelete() {
    this.showDeleteDialog = false;
    this.packToDelete = new PackResponseSchema('', 0, 0);
  }

  confirmDelete() {
    if (this.packToDelete?.id) {
      this.deletePacks(this.packToDelete.id);
      this.showDeleteDialog = false;

      this.packToDelete = new PackResponseSchema('', 0, 0);
    }
  }

  confirmUpdate(pack: PackResponseSchema) {
    if (this.updateForm.valid) {
      const updatedPack = {
        id: pack.id,
        offerName: this.updateForm.get('offerNameUpdate')?.value,
        durationMonths: this.updateForm.get('durationMonthsUpdate')?.value,
        monthlyPrice: this.updateForm.get('monthlyPriceUpdate')?.value
      };

      this.packService.updatePack(updatedPack, updatedPack.id!).subscribe({
        next: (response) => {
          this.showUpdateDialog = false;
          this.notificationService.notify(new CustomMessage('Mise à jour effectuée', 'info'));
          this.loadPacks();
          this.packToUpdate = new PackResponseSchema();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating pack:', error);
          this.notificationService.notify(new CustomMessage('Erreur lors de la mise à jour', 'error'));
        }
      });
    }
  }

  loadPacks() {
    this.packService.fetchPacks();
    this.packService.getPacks().subscribe((response: PackResponseSchema[]) => {
      this.packs = response;
      console.log('Packs:', response);
    }, (error: HttpErrorResponse) => {
      console.error('Error fetching packs:', error);
    })
  }

  deletePacks(packId: number) {
    this.packService.deletePacks(packId).subscribe(() => {
      this.loadPacks();
      this.notificationService.notify(new CustomMessage('Suppression effectuée', 'info'));


    }, (error: HttpErrorResponse) => {
      this.notificationService.notify(new CustomMessage(error.error, 'error'))
    });
  }
}
