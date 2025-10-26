import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  public apiUrl =  environment.apiUrl +'/api/driver'; // Replace with actual backend URL if deployed

  constructor(private readonly http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Get all drivers
  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Get driver by ID
  getDriverById(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/${driverId}`, { headers: this.getAuthHeaders() });
  }

  // Add a new driver
  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driver, { headers: this.getAuthHeaders() });
  }

  // Update an existing driver
  updateDriver(driverId: number, driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${this.apiUrl}/${driverId}`, driver, { headers: this.getAuthHeaders() });
  }

  // Delete a driver
  deleteDriver(driverId: number): Observable<Driver> {
    return this.http.delete<Driver>(`${this.apiUrl}/${driverId}`, { headers: this.getAuthHeaders() });
  }
}