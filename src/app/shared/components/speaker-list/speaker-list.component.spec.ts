import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeakerListComponent } from './speaker-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/core/services/state/reducers/speaker.reducer';
import {
  isLoading,
  loadSpeakersPage,
  currentPageDetails,
} from 'src/app/core/services/state/actions/speaker.action';
import { of } from 'rxjs';

describe('SpeakerListComponent', () => {
  let component: SpeakerListComponent;
  let fixture: ComponentFixture<SpeakerListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeakerListComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakerListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    spyOn(store, 'pipe').and.returnValue(of([]));
    spyOn(store, 'dispatch'); // Spy on the dispatch method

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadSpeakersPage action on init if speakers array is empty', () => {
    // Arrange
    spyOn(component, 'loadSpeakers').and.callThrough(); // Spy on the loadSpeakers method

    // Act
    component.ngOnInit();

    // Assert
    expect(component.loadSpeakers).toHaveBeenCalled(); // Ensure loadSpeakers is called
    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        page: 1,
        resultsPerPage: 20,
        type: '[Speaker] Load Speakers Page',
      })
    );
  });

  it('should dispatch currentPageDetails action when navigating to a different page', () => {
    // Arrange
    const pageNumber = 2;

    // Act
    component.onPageChange(pageNumber);

    // Assert
    expect(store.dispatch).toHaveBeenCalledWith(
      currentPageDetails({ currentPage: pageNumber })
    );
  });

  it('should dispatch loadSpeakersPage action when clicking next button', () => {
    // Arrange
    spyOn(component, 'loadSpeakers');

    // Act
    component.nextButton(2);

    // Assert
    expect(component.loadSpeakers).toHaveBeenCalled();
  });

  it('should not dispatch loadSpeakersPage action when clicking previous button', () => {
    // Arrange
    spyOn(component, 'loadSpeakers');

    // Act
    component.previousButton(1);

    // Assert
    expect(component.loadSpeakers).not.toHaveBeenCalled();
  });
});
