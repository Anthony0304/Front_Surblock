import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.css']
})
export class ModalNotificationComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalNotificationComponent>, // Referencia al modal
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string } // Recibe los datos
  ) {}


  close(): void {
    this.dialogRef.close();
  }
}
