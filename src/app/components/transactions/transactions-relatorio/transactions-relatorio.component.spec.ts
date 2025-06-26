import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsRelatorioComponent } from './transactions-relatorio.component';

describe('TransactionsRelatorioComponent', () => {
  let component: TransactionsRelatorioComponent;
  let fixture: ComponentFixture<TransactionsRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsRelatorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
