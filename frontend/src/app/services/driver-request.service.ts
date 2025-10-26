import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DriverRequest } from '../models/driver-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverRequestService {
  private apiUrl = environment.apiUrl + '/api/driver-requests';

  constructor(private readonly http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Get all driver requests
  getAllDriverRequests(): Observable<DriverRequest[]> {
    return this.http.get<DriverRequest[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Get driver request by ID
  getDriverRequestById(driverRequestId: number): Observable<DriverRequest> {
    return this.http.get<DriverRequest>(`${this.apiUrl}/${driverRequestId}`, { headers: this.getAuthHeaders() });
  }

  // Get driver requests by user ID
  getDriverRequestsByUserId(userId: number): Observable<DriverRequest[]> {
    return this.http.get<DriverRequest[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  // Get driver requests by driver ID
  getDriverRequestsByDriverId(driverId: number): Observable<DriverRequest[]> {
    return this.http.get<DriverRequest[]>(`${this.apiUrl}/driver/${driverId}`, { headers: this.getAuthHeaders() });
  }

  // Add a new driver request
  addDriverRequest(driverRequest: DriverRequest): Observable<DriverRequest> {
    return this.http.post<DriverRequest>(this.apiUrl, driverRequest, { headers: this.getAuthHeaders() });
  }

  // Update an existing driver request
  updateDriverRequest(driverRequestId: number, driverRequest: DriverRequest): Observable<DriverRequest> {
    return this.http.put<DriverRequest>(`${this.apiUrl}/${driverRequestId}`, driverRequest, { headers: this.getAuthHeaders() });
  }

  // Delete a driver request
  deleteDriverRequest(driverRequestId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${driverRequestId}`, { headers: this.getAuthHeaders() });
  }
  
  checkDriverRequestExists(userId: number, driverId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists`, {
      headers: this.getAuthHeaders(),
      params: {
        userId: userId.toString(),
        driverId: driverId.toString()
      }
    });
  }
}
