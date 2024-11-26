import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modalgeneral',
  standalone: true,
  imports: [],
  templateUrl: './modalgeneral.component.html',
  styleUrl: './modalgeneral.component.css'
})
export class ModalgeneralComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalgeneralComponent>) {}
  // Método para cerrar el modal
  closeModal(): void {
    this.dialogRef.close();
  }
}
