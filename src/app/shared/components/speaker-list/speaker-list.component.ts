import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import {
  currentPageDetails,
  isLoading,
  loadSpeakersPage,
} from 'src/app/core/services/state/actions/speaker.action';
import { Speaker } from 'src/app/core/services/state/models/speaker.model';
import {
  currentPageNumber,
  displayAllSpeakers,
  selectError,
  speakersDataLoading,
} from 'src/app/core/services/state/selectors/speaker.selector';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.scss'],
})
export class SpeakerListComponent implements OnInit {
  speakers$!: Observable<Speaker[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  currentPage: number = 1;
  resultsPerPage: number = 20;
  totalSpeakers: number = 0;
  searchText: string = '';
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.speakers$ = this.store.pipe(
      select(displayAllSpeakers),
      map((speakers) => speakers.slice(
        this.resultsPerPage * (this.currentPage - 1),
        this.resultsPerPage * this.currentPage
      ))
    );
    this.loading$ = this.store.pipe(select(speakersDataLoading));
    this.error$ = this.store.pipe(select(selectError));
    this.store.pipe(select(currentPageNumber)).subscribe((data) => {
      this.currentPage = data;
    });
    this.speakers$.subscribe((speakers) => {
      if (!speakers || !speakers.length) {
        this.loadSpeakers();
      }
    });
  }

  loadSpeakers(): void {
    this.store.dispatch(isLoading({ isLoading: true }));
    this.store.dispatch(
      loadSpeakersPage({
        page: this.currentPage,
        resultsPerPage: this.resultsPerPage,
      })
    );
  }

  previousButton(pageNumber: number): void {
    this.currentPage = pageNumber;

    this.store.dispatch(currentPageDetails({ currentPage: this.currentPage }));

    this.speakers$ = this.store.pipe(
      select(displayAllSpeakers),
      map((speakers) =>
        speakers.slice(
          this.resultsPerPage * (this.currentPage - 1),
          this.resultsPerPage * this.currentPage
        )
      )
    );
  }

  nextButton(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.store.dispatch(currentPageDetails({ currentPage: pageNumber }));
    this.loadSpeakers();
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.store.dispatch(currentPageDetails({ currentPage: pageNumber }));
    this.loadSpeakers();
  }

  getTotalPages(): number[] {
    const totalPages = Math.ceil(this.totalSpeakers / this.resultsPerPage);
    return Array(totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }
  navigateToSpeakerDetails(id: string) {
    this.router.navigate(['/speaker-details', id]);
  }
}
