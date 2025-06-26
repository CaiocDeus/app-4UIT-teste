import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseGetTransactions, Transaction, TransactionRelatorio } from '../../interfaces/transaction.interface';
import { Response } from '../../interfaces/response.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('auth-token') }
  private apiUrl: string = environment.apiUrl + '/transaction';

  constructor(private httpClient: HttpClient) { }

  getTransactions(tipo?: string, data_transacao?: string, page: number = 1, perPage: number = 10): Observable<ResponseGetTransactions> {
    let params = new HttpParams();

    if (tipo) params = params.set('tipo', tipo);
    if (data_transacao) params = params.set('data_transacao', data_transacao)
    params = params.set('page', page.toString());
    params = params.set('per_page', perPage.toString());

    return this.httpClient.get<ResponseGetTransactions>(this.apiUrl, {headers: this.headers, params, withCredentials: true});
  }

  createTransaction(transaction: Transaction): Observable<Response> {
    return this.httpClient.post<Response>(this.apiUrl, transaction, {headers: this.headers, withCredentials: true});
  }

  updateTransaction(transaction: Transaction): Observable<Response> {
    return this.httpClient.put<Response>(this.apiUrl + `/${transaction.id}`, transaction, {headers: this.headers, withCredentials: true});
  }

  deleteTransaction(id: number): Observable<Response> {
    return this.httpClient.delete<Response>(this.apiUrl + `/${id}`, {headers: this.headers, withCredentials: true});
  }

  getRelatorio(): Observable<TransactionRelatorio> {
    return this.httpClient.get<TransactionRelatorio>(this.apiUrl + '/relatorio', {headers: this.headers, withCredentials: true});
  }
}
