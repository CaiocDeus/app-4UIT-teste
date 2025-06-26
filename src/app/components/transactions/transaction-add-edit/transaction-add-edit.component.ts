import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../../../interfaces/transaction.interface';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-add-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    TransactionService
  ],
  templateUrl: './transaction-add-edit.component.html',
  styleUrl: './transaction-add-edit.component.scss'
})
export class TransactionAddEditComponent implements OnInit {
  transactionAddEditForm!: FormGroup;
  isSaving: boolean = false;

  constructor(
    private transactionService: TransactionService,
    private toastService: ToastrService,
    private dialogRef: MatDialogRef<TransactionAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public transaction: Transaction
  ) {
    this.transactionAddEditForm = new FormGroup({
      type: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
      amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      transaction_date: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.transaction) {
      this.transactionAddEditForm.patchValue({
        type: this.transaction.type,
        description: this.transaction.description,
        amount: this.transaction.amount,
        transaction_date: this.transaction.transaction_date
      });
    }
  }

  // TODO Talvez de para melhorar
  onSubmit(): void {
    if (this.transactionAddEditForm.invalid) return;
    const { type, description, amount, transaction_date } = this.transactionAddEditForm.value;
    const transaction: Transaction = {
      type,
      description,
      amount: amount.toFixed(2),
      transaction_date
    }

    this.isSaving = true;

    if (this.transaction) {
      transaction.id = this.transaction.id;
      this.transactionService.updateTransaction(transaction).subscribe({
        next: () => {
          this.isSaving = false;
          this.dialogRef.close('saved');
        },
        error: () => {
          this.toastService.error("Erro ao atualizar transação");
          this.isSaving = false;
        }
      });
    } else {
      this.transactionService.createTransaction(transaction).subscribe({
        next: () => {
          this.isSaving = false;
          this.dialogRef.close('saved');
        },
        error: () => {
          this.toastService.error("Erro ao criar transação");
          this.isSaving = false;
        }
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
