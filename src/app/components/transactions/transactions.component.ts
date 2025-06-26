import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../interfaces/transaction.interface';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-transactions',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  @Input() transactions: Transaction[] = [];
  @Input() total!: number;
  @Input() perPage!: number;
  @Input() currentPage!: number;

  @Output() editTransaction = new EventEmitter<Transaction>();
  @Output() deleteTransaction = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<PageEvent>();

  onEdit(transaction: Transaction): void {
    this.editTransaction.emit(transaction);
  }

  onDelete(transactionId: number): void {
    this.deleteTransaction.emit(transactionId);
  }

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
