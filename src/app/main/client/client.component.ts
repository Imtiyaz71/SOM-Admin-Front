import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientserviceService, Company } from '../../services/clientservice.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  companies: Company[] = [];
  paginatedCompanies: Company[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  company: Company = {
    id: 0,
    cName: '',
    cPhone: '',
    cEmail: '',
    cWebsite: '',
    cAddress: '',
    cLogo: '',
    createAt: ''
  };

  successMsg: string = '';
  errorMsg: string = '';

  constructor(private clientService: ClientserviceService) {
    this.loadCompanies();
  }

  // Load companies from backend
  loadCompanies() {
    this.clientService.getAllCompanies().subscribe({
      next: res => {
        this.companies = res.info;
        this.totalPages = Math.ceil(this.companies.length / this.pageSize);
        this.setPaginatedCompanies();
      },
      error: err => console.error('Error loading companies', err)
    });
  }

  // Pagination logic
  setPaginatedCompanies() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCompanies = this.companies.slice(start, end);
  }

  goToPage(p: number) { this.page = p; this.setPaginatedCompanies(); }
  prevPage() { if (this.page > 1) { this.page--; this.setPaginatedCompanies(); } }
  nextPage() { if (this.page < this.totalPages) { this.page++; this.setPaginatedCompanies(); } }
  totalPagesArray() { return new Array(this.totalPages); }

  // Logo preview
  onLogoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.company.cLogo = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  // Edit company
  editCompany(c: Company) {
    this.company = { ...c }; // copy all properties including id
  }

  // Add or update company
saveCompany() {

      // Add new company
      this.clientService.addCompany(this.company).subscribe({
          next: res => {
              this.successMsg = 'Company added successfully!';
              this.errorMsg = '';
              this.resetForm();
              this.loadCompanies();
          },
          error: err => {
              this.errorMsg = 'Failed to add company';
              this.successMsg = '';
          }
      });
  
}

resetForm() {
  this.company = {
      id: 0,
      cName: '',
      cPhone: '',
      cEmail: '',
      cWebsite: '',
      cAddress: '',
      cLogo: '',
      createAt: ''
  };
}


}
