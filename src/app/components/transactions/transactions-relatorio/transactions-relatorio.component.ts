import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { TransactionRelatorio } from '../../../interfaces/transaction.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-transactions-relatorio',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    TransactionService
  ],
  templateUrl: './transactions-relatorio.component.html',
  styleUrl: './transactions-relatorio.component.scss'
})
export class TransactionsRelatorioComponent implements OnInit {
  relatorio!: TransactionRelatorio;
  isLoading: boolean = true;

  constructor(
    private transactionService: TransactionService,
    private toastService: ToastrService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getRelatorio();
  }

  getRelatorio(): void {
    this.isLoading = true;

    this.transactionService.getRelatorio().subscribe({
      next: (response) => {
        this.relatorio = response;
        this.isLoading = false;

        console.log(this.relatorio);

        this.cd.detectChanges();
      },
      error: () => {
        this.toastService.error("Erro ao carregar relatório");
        this.isLoading = false;
      }
    });
  }
}
