import { Component, Input } from '@angular/core';
import { ILedgerVM } from '../shared/view-models/ledger-vm';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent {
  @Input() ledgerList: ILedgerVM[] = [];
}
