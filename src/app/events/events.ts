import { Component, Input, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

interface EventItem {
  id: number;
  title: string;
  bullets: string[];
  date: string; // ISO date e.g. '2025-10-04'
}

@Component({
  selector: 'app-events',
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events implements OnInit {
  events: EventItem[] = [
    { id: 1, title: 'Project Kickoff', bullets: ['Introduce stakeholders', 'Finalize milestones', 'Share docs'], date: '2025-10-06' },
    { id: 2, title: 'Sprint Planning', bullets: ['Review backlog', 'Estimate stories', 'Allocate tasks'], date: '2025-10-07' },
    { id: 3, title: 'Tech Talk: Observability', bullets: ['Introduction to tracing', 'Demo using Jaeger', 'Q&A'], date: '2025-10-07' },
    { id: 4, title: 'Release Candidate', bullets: ['Tag release', 'Smoke tests', 'Notify QA'], date: '2025-10-09' }
  ];

  days: { label: string; isoDate: string }[] = [];
  selectedDayIso?: string;
  grouped: Map<string, EventItem[]> = new Map();

  ngOnInit(): void {
    const start = new Date();
    this.days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      this.days.push({ label: this.dayLabel(d), isoDate: d.toISOString().slice(0, 10) });
    }
    this.groupEvents();
    this.selectedDayIso = this.days[0].isoDate;
  }

  private dayLabel(d: Date) {
    const opts: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    return d.toLocaleDateString(undefined, opts);
  }

  private groupEvents() {
    this.grouped.clear();
    for (const e of this.events) {
      const key = e.date;
      if (!this.grouped.has(key)) this.grouped.set(key, []);
      this.grouped.get(key)!.push(e);
    }
  }

  eventsFor(dayIso: string) {
    return this.grouped.get(dayIso) || [];
  }

  selectDay(iso: string) {
    this.selectedDayIso = iso;
  }

  getDayLabelByIsoDate(isoDate: string): string {
    return this.days.find((day) => day.isoDate === isoDate)?.label || 'Selected Day';
  }
}