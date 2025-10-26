import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  public apiUrl =  environment.apiUrl +'/api/feedback'; // keep or move to environments

  constructor(private readonly http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  /** Convenience alias to match some component calls */
  getAll(): Observable<Feedback[]> {
    return this.getFeedbacks();
  }

  /** Create (send) feedback */
  sendFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback, { headers: this.getAuthHeaders() });
  }

  /** Read all feedbacks */
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  /** Read by userId */
  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  /** Read by id */
  getFeedbackById(feedbackId: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/${feedbackId}`, { headers: this.getAuthHeaders() });
  }

  /** Delete by id */
  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${feedbackId}`, { headers: this.getAuthHeaders() });
  }

  /** Optional: backward-compatible wrapper in case other code calls `delete()` */
  delete(feedbackId: number): Observable<void> {
    return this.deleteFeedback(feedbackId);
  }
}