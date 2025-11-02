import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Module {
  id: number;
  menuName: string;
  sortOrder: number;
  children?: any[]; // <-- ekhane add koro
}

export interface ChildMenu {
  id: number;
  menuName: string;
  parentId: number;
  menuUrl: string;
}
export interface ParentModule {
  id: number;
  name: string;
  children: ChildModule[];
}

export interface ChildModule {
  id: number;
  name: string;
  url: string;
}

export interface VW_Response {
  statusCode: number;
  message: string;
}

export interface authorizerlist {
  id: number;
  designation: string;
}
export interface SaveMenuEligibilityRequest {
  CompId: number;
  RoleId: number;
  MenuIds: number[];
}
export interface MenuResponseItem {
  id: number;           // Unique record id
  compId: number;       // Company ID
  cName: string;        // Company name
  designation: string;  // Role/authorizer designation
  parentId: number;     // Parent menu ID
  parentMenu: string;   // Parent menu name
  childId: number;      // Child menu ID
  childMenu: string;    // Child menu name
  menuUrl: string;      // URL of the child menu
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
  getAllMenu(): Observable<MenuResponseItem[]> {
    return this.http.get<MenuResponseItem[]>(`${this.baseUrl}/AdminPanelCtrl/getcompanymenu`);
  }
  getallmodule(compId: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.get<any>(`${this.baseUrl}/Menu/parentmenu?compId=${compId}`, { headers });
}

getchild(parentid: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.get<any>(`${this.baseUrl}/Menu/childmenu?parentid=${parentid}`, { headers });
}


  getautho(): Observable<authorizerlist[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<authorizerlist[]>(`${this.baseUrl}/SelectedValue/authorizerlist`, { headers });
  }

  // ✅ New method to save menu eligibility

saveMenuEligibilityRequest(payload: { CompId: number, RoleId: number, MenuIds: number[] }) {
  const headers = this.getAuthHeaders();
  return this.http.post<VW_Response>(`${this.baseUrl}/Menu/save-menu-eligibility-request`, payload, { headers });
}

}
