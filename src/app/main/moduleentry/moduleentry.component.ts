import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientserviceService, Company } from '../../services/clientservice.service';
import { ModuleService, module, Companymodule } from '../../services/module.service';

@Component({
  selector: 'app-moduleentry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './moduleentry.component.html',
  styleUrls: ['./moduleentry.component.css']
})
export class ModuleentryComponent implements OnInit {

  companies: Company[] = [];
  modules: module[] = [];
  commodule: Companymodule[] = [];
groupedCompanyModules: { [key: string]: Companymodule[] } = {};
  selectedCompany: any = "";
  selectedModule: any = "";

  constructor(
    private clientService: ClientserviceService,
    private moduleservice: ModuleService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.loadModules();
    this.loadCompanyModules();
  }

  loadCompanies() {
    this.clientService.getAllCompanies().subscribe({
      next: res => this.companies = res.info,
      error: err => console.error('Error loading companies', err)
    });
  }

  loadModules() {
    this.moduleservice.getallmodule().subscribe({
      next: res => this.modules = res.info,
      error: err => console.error('Error loading modules', err)
    });
  }

// loadCompanyModules() {
//   this.moduleservice.getcompanymodule().subscribe({
//     next: res => {
//       this.commodule = res;   // NOT res.info
//       console.log("Company Module List =>", this.commodule);
//     },
//     error: err => console.error('Error loading modules', err)
//   });
// }

loadCompanyModules() {
  this.moduleservice.getcompanymodule().subscribe({
    next: (res: Companymodule[]) => {
      this.commodule = res;

      this.groupedCompanyModules = res.reduce((group: { [key: string]: Companymodule[] }, item) => {
        if (!group[item.cName]) {
          group[item.cName] = [];
        }
        group[item.cName].push(item);
        return group;
      }, {});

      console.log("Grouped Data =>", this.groupedCompanyModules);
    },
    error: err => console.error("Error loading modules", err)
  });
}

saveData() {
  if (!this.selectedCompany || !this.selectedModule) {
    alert("Please select both Company and Module.");
    return;
  }

  const body = {
    id: 0,
    compId: Number(this.selectedCompany),
    parentMenuId: Number(this.selectedModule)
  };

  console.log("Save Payload:", body);

  this.moduleservice.saveCompanyModule(body).subscribe({
    next: (res) => {
      // Backend theke asha message show koro
      alert(res.message);

      if (res.statusCode === 200) {
        // Reset dropdown and refresh list
        this.selectedCompany = "";
        this.selectedModule = "";
        this.loadCompanyModules();
      }
    },
    error: (err) => {
      console.error("Save Error:", err);
      alert("Server error while saving module!");
    }
  });
}
deleteModule(id: number) {
  if (!confirm("Are you sure you want to delete this module?")) {
    return; // user cancelled
  }

  this.moduleservice.deleteCompanyModule(id).subscribe({
    next: (res) => {
      alert(res.message); // backend message show korbe

      if (res.statusCode === 1) {
        // delete success → refresh table
        this.loadCompanyModules();
      }
    },
    error: (err) => {
      console.error("Delete error:", err);
      alert("Server error while deleting module!");
    }
  });
}


}
