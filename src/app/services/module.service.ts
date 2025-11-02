import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
export interface module {
  id: number;          // SP te id use hobe compId
  menuName: string;
  sortOrder: number;

}
export interface Companymodule {
  compId:number;
  cName:string;
  id: number;          // SP te id use hobe compId
  menuName: string;
  sortOrder: number;
  ids:number;

}
export interface VW_Response {
  statusCode: number;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
   private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
    getallmodule(): Observable<{ info: module[] }> {
      const headers = this.getAuthHeaders();
      return this.http.get<{ info: module[] }>(`${this.baseUrl}/Menu/modules`, { headers });
    }
    getcompanymodule(): Observable<Companymodule[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<Companymodule[]>(`${this.baseUrl}/AdminPanelCtrl/getcompanymodule`, { headers });
}
saveCompanyModule(data: any) {
 const headers = this.getAuthHeaders();
  return this.http.post<any>(
    `${this.baseUrl}/Menu/save-module`,
    data,
    { headers }
  );
}
 deleteCompanyModule(id: number): Observable<VW_Response> {
  const headers = this.getAuthHeaders();
  return this.http.post<VW_Response>(
    `${this.baseUrl}/AdminPanelCtrl/delete-company-module?id=${id}`,
    {},            // empty body
    { headers }    // headers object
  );
}
}
