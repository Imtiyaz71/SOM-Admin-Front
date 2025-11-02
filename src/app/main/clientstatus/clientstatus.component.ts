import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientserviceService, ClientStatus, ClientStatusWithCompany } from '../../services/clientservice.service';

@Component({
  selector: 'app-clientstatus',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientstatus.component.html',
  styleUrls: ['./clientstatus.component.css']
})
export class ClientstatusComponent implements OnInit {

  clientStatusList: ClientStatusWithCompany[] = [];
  selectedStatus: ClientStatus | null = null;
  message: string = '';

  constructor(private clientService: ClientserviceService) { }

  ngOnInit(): void {
    this.loadClientStatusList();
  }

  // ✅ Load all client status
  loadClientStatusList(): void {
    this.clientService.getclientstatus().subscribe({
      next: (res) => {
        this.clientStatusList = res;
      },
      error: (err) => {
        console.error(err);
        this.message = 'Failed to load client status list.';
      }
    });
  }

  // ✅ Select row for editing
  editStatus(status: ClientStatusWithCompany): void {
    this.selectedStatus = {
      id: status.id,
      clientId: 0, // backend e fetch korte hole assign koro
      pDate: status.pDate,
      eDate: status.eDate,
      cStatus: status.cStatus
    };
    this.message = '';
  }

  // ✅ Update selected status
  updateStatus(): void {
    if (!this.selectedStatus) return;

    this.clientService.EditClientStatus(this.selectedStatus).subscribe({
      next: (res) => {
        if (res.statusCode === 1) {
          this.message = res.message;
          this.loadClientStatusList(); // reload list after update
          this.selectedStatus = null; // clear form
        } else {
          this.message = res.message;
        }
      },
      error: (err) => {
        console.error(err);
        this.message = 'Failed to update status.';
      }
    });
  }

  // ✅ Cancel editing
  cancelEdit(): void {
    this.selectedStatus = null;
    this.message = '';
  }
}
