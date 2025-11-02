import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientserviceService, Company } from '../../services/clientservice.service';
import { MenuService, Module, authorizerlist } from '../../services/menu.service';

@Component({
  selector: 'app-menuentry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menuentry.component.html',
  styleUrls: ['./menuentry.component.css']
})
export class MenuentryComponent implements OnInit {

  companies: Company[] = [];
  moduleTree: Module[] = [];
  authorizers: authorizerlist[] = [];

  selectedCompanyId: number | null = null;
  selectauthorizer: number | null = null;
  selectedModuleId: number | null = null;

  childMenus: any[] = [];
  selectedChildIds: number[] = [];

  constructor(
    private clientService: ClientserviceService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.loadAuthorizers();
  }

  loadCompanies() {
    this.clientService.getAllCompanies().subscribe({
      next: res => this.companies = res.info ?? res,
      error: err => console.error('Error loading companies', err)
    });
  }

  loadAuthorizers() {
    this.menuService.getautho().subscribe({
      next: res => this.authorizers = res,
      error: err => console.error('Error loading authorizers', err)
    });
  }

  onCompanyChange() {
    if (!this.selectedCompanyId) return;

    this.menuService.getallmodule(this.selectedCompanyId).subscribe({
      next: (res: any) => {
        const moduleList = res.info ?? res;
        const assignedIds: number[] = res.assignedMenuIds ?? [];

        this.moduleTree = moduleList.map((m: Module) => ({
          ...m,
          children: m.children ?? [],
          selected: assignedIds.includes(m.id)
        }));
      },
      error: err => console.error('Module load error', err)
    });
  }

  loadChildMenusForSelectedModule() {
    if (!this.selectedModuleId) {
      this.childMenus = [];
      this.selectedChildIds = [];
      return;
    }

    const module = this.moduleTree.find(m => m.id == this.selectedModuleId);

    if (!module) return;

    this.menuService.getchild(this.selectedModuleId).subscribe({
      next: (res: any) => {
        this.childMenus = res.info ?? res;
        this.selectedChildIds = this.childMenus.filter((c: any) => c.selected).map((c: any) => c.id);
      },
      error: err => console.error('Child menu load error', err)
    });
  }

  saveEligibility() {
    if (!this.selectedCompanyId || !this.selectauthorizer) {
      alert("⚠️ Company & Authorizer select korun!");
      return;
    }

    if (this.selectedChildIds.length === 0) {
      alert("⚠️ At least ekta child menu select korun!");
      return;
    }

    const payload = {
      CompId: this.selectedCompanyId,
      RoleId: this.selectauthorizer,
      MenuIds: this.selectedChildIds
    };

    this.menuService.saveMenuEligibilityRequest(payload).subscribe({
      next: (res: any) => alert(res.message ?? "✅ Saved Successfully!"),
      error: err => console.error('Save error:', err)
    });
  }

}
