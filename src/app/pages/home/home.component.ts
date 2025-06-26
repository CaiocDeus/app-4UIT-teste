import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TransactionsComponent } from '../../components/transactions/transactions.component';
import { TransactionService } from '../../services/transaction/transaction.service';
import { Transaction } from '../../interfaces/transaction.interface';
import { CommonModule } from '@angular/common';
import { TransactionAddEditComponent } from '../../components/transactions/transaction-add-edit/transaction-add-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TransactionsRelatorioComponent } from '../../components/transactions/transactions-relatorio/transactions-relatorio.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    TransactionsComponent
  ],
  providers: [
    TransactionService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  transactions: Transaction[] = [];

  transactionsForm!: FormGroup;
  isLoading: boolean = true;

  currentPage: number = 1;
  perPage: number = 5;
  total: number = 0;

  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router,
    private toastService: ToastrService,
    private transactionService: TransactionService,
  ){
    this.transactionsForm = new FormGroup({
      tipo: new FormControl('', []),
      data_transacao: new FormControl('', []),
    })
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    const { tipo, data_transacao } = this.transactionsForm.value;

    this.isLoading = true;

    this.transactionService.getTransactions(tipo, data_transacao, this.currentPage, this.perPage).subscribe({
      next: (response) => {
        this.transactions = response.data;
        this.total = response.meta.total;
        this.isLoading = false;

        this.cd.detectChanges();
      },
      error: () => {
        this.toastService.error('Erro ao carregar transações');
        this.isLoading = false;
      }
    });
  }

  deleteTransaction(transactionId: number): void {
    if (!confirm('Tem certeza que deseja excluir esta transação?')) {
      return;
    }

    this.transactionService.deleteTransaction(transactionId).subscribe({
      next: () => this.loadTransactions(),
      error: () => this.toastService.error('Erro ao excluir transação:')
    });
  }

  onSubmit(){
    this.currentPage = 1;
    this.loadTransactions();
  }

  onReset(): void {
    this.transactionsForm.controls['tipo'].setValue('');
    this.transactionsForm.controls['data_transacao'].setValue('');
    this.currentPage = 1;
    this.loadTransactions();
  }

  openAddForm(): void {
    const dialogRef = this.dialog.open(TransactionAddEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.loadTransactions();
      }
    });
  }

  openEditForm(transaction: Transaction): void {
    const dialogRef = this.dialog.open(TransactionAddEditComponent, {
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.loadTransactions();
      }
    });
  }

  openRelatorioForm(): void {
    this.dialog.open(TransactionsRelatorioComponent);
  }

  onPageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.loadTransactions();
  }

  logout(): void {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("email");

    this.router.navigate([""]);
  }
}
