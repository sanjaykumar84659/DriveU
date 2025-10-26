import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

type SortKey = 'date' | 'rating' | 'category' | 'user' | 'driver';
type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css'],
})
export class AdminviewfeedbackComponent implements OnInit {
  loading = true;
  error: string | null = null;

  feedbacks: Feedback[] = [];
  filtered: Feedback[] = [];

  // Filters
  search = '';
  selectedCategory = 'ALL';
  minRating: number | null = null;

  // Sorting
  sortKey: SortKey = 'date';
  sortDir: SortDir = 'desc';

  // Pagination
  page = 1;
  pageSize = 10;

  constructor(private readonly feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.fetchAll();
  }

  private fetchAll(): void {
    this.loading = true;
    this.error = null;

    this.feedbackService.getFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load feedback. Please try again.';
        this.loading = false;
      },
    });
  }

  get categories(): string[] {
    const set = new Set<string>();
    this.feedbacks.forEach(f => f.category && set.add(f.category));
    //return ['ALL', ...Array.from(set).sort()];
    return ['ALL', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }

  applyFilters(): void {
    const term = this.search.trim().toLowerCase();

    const byTerm = (f: Feedback) => {
      if (!term) return true;
      const haystack = [
        f.feedbackText || '',
        f.category || '',
        f.user?.userId != null ? `user ${f.user?.userId}` : '',
        f.driver?.driverId != null ? `driver ${f.driver?.driverId}` : '',
      ].join(' ').toLowerCase();
      return haystack.includes(term);
    };

    const byCategory = (f: Feedback) =>
      this.selectedCategory === 'ALL' ? true : f.category === this.selectedCategory;

    const byRating = (f: Feedback) =>
      this.minRating == null ? true : (f.rating ?? 0) >= this.minRating;


    this.filtered = this.feedbacks
      .filter(byTerm)
      .filter(byCategory)
      .filter(byRating);

    this.sort(this.sortKey, false);
    this.page = 1;
  }

  clearFilters(): void {
    this.search = '';
    this.selectedCategory = 'ALL';
    this.minRating = null;
    this.applyFilters();
  }

  sort(key: SortKey, toggleIfSame = true): void {
    if (toggleIfSame) {
      if (this.sortKey === key) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      }
    }
    this.sortKey = key;
    const dir = this.sortDir === 'asc' ? 1 : -1;

    const valueOf = (f: Feedback) => {
      switch (key) {
        case 'date':
          // backend sends LocalDate string; treat as string for sorting
          return (f.date as unknown as string) || '';
        case 'rating':
          return f.rating ?? -999;
        case 'category':
          return f.category || '';
        case 'user':
          //return f.userId ?? -1; chekkkkk
          return f.user?.userId ?? -1; 
        case 'driver':
          return f.driver!.driverId ?? -1;
         // return f.driver.driverId ?? -1;checkkk
      }
    };

    this.filtered = [...this.filtered].sort((a, b) => {
      const va = valueOf(a);
      const vb = valueOf(b);
      if (va > vb) {
        return 1 * dir;
      } else if (va < vb) {
        return -1 * dir;
      } else {
        return 0;
      }
    });
  }

  onHeaderClick(key: SortKey): void {
    this.sort(key, true);
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
    }

  paged(): Feedback[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  trackByFeedbackId = (_: number, f: Feedback) => f.feedbackId;

  delete(f: Feedback): void {
    if (!confirm(`Delete feedback #${f.feedbackId}?`)) return;
    // Use the implemented method that returns Observable<void>
    this.feedbackService.deleteFeedback(f.feedbackId!).subscribe({
      next: () => {
        this.feedbacks = this.feedbacks.filter(x => x.feedbackId !== f.feedbackId);
        this.applyFilters();
      },
      error: () => alert('Deletion failed. Please retry.'),
    });
  }
}