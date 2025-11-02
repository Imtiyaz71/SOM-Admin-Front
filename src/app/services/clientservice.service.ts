import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Company {
  id: number;          // SP te id use hobe compId
  cName: string;
  cPhone: string;
  cEmail: string;
  cWebsite?: string;
  cAddress?: string;
  cLogo?: string;
  createAt?: string;
}
export interface ClientStatus {
  id: number;
  clientId: number;
  pDate: string;  // Angular e date string hishebe handle kora easy
  eDate: string;
  cStatus: number;
}
export interface ClientStatusWithCompany {
  id: number;
  cName: string;
  pDate: string;  // backend theke datetime string asche
  eDate: string;
  cStatus: number;
}
@Injectable({
  providedIn: 'root'
})
export class ClientserviceService {

  private baseUrl = environment.apiBaseUrl;  // example: http://localhost:5000/api

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // ✅ Get all companies with Authorization header
  getAllCompanies(): Observable<{ info: Company[] }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ info: Company[] }>(`${this.baseUrl}/Log/allcominfo`, { headers });
  }
getclientstatus(): Observable<ClientStatusWithCompany[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<ClientStatusWithCompany[]>(`${this.baseUrl}/AdminPanelCtrl/get-client-status`, { headers });
}
  // ✅ Add or update company
  addCompany(company: Company): Observable<any> {
    const headers = this.getAuthHeaders();

    // backend expects compId field
    const payload = {
      compId: company.id,
      cname: company.cName,
      cphone: company.cPhone,
      cemail: company.cEmail,
      cwebsite: company.cWebsite,
      caddress: company.cAddress,
      clogo: company.cLogo,
      createat: company.createAt
    };

    return this.http.post(`${this.baseUrl}/Log/companyadd`, payload, { headers });
  }
EditClientStatus(status: ClientStatus): Observable<any> {
    const headers = this.getAuthHeaders();

    const payload = {
      id: status.id,
      clientId: status.clientId,
      pDate: new Date(status.pDate).toISOString().split('T')[0],
      eDate: new Date(status.eDate).toISOString().split('T')[0]
    };

    return this.http.put(`${this.baseUrl}/AdminPanelCtrl/edit-client-status`, payload, { headers });
}


}
