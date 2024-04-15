import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { SpeakerDetailsComponent } from './speaker-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Speaker } from 'src/app/core/services/state/models/speaker.model';
import * as fromSpeaker from '../../../core/services/state/reducers/speaker.reducer';

describe('SpeakerDetailsComponent', () => {
  let component: SpeakerDetailsComponent;
  let fixture: ComponentFixture<SpeakerDetailsComponent>;
  let store: MockStore;
  let router: Router;
  const mockSpeaker: Speaker = {
    name: { first: 'John', last: 'Doe' },
    email: 'john.doe@example.com',
    phone: '123456789',
    location: { city: 'New York', country: 'USA' },
    gender: 'male',
    dob: { date: '1990-01-01', age: 31 },
    registered: { date: '2021-01-01', age: 1 },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/1.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/1.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
    },
    id: {
      name: 'raghav',
      value: '1234556',
    },
    login: {
      uuid: '123456-45667',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeakerDetailsComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ speaker: fromSpeaker.speakerReducer }), // Provide your reducer
      ],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakerDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load speaker details correctly', fakeAsync(() => {
    const mockSelectedSpeaker$ = of(mockSpeaker);
    spyOn(store, 'select').and.returnValue(mockSelectedSpeaker$);

    component.ngOnInit();
    tick(); // Wait for observable to emit data

    expect(component.selectedSpeaker$).toBeDefined();
    expect(component.selectedSpeaker$).toEqual(mockSelectedSpeaker$);
    expect(store.select).toHaveBeenCalledOnceWith(fromSpeaker.initialState);
  }));
  it('should display speaker details', fakeAsync(() => {
    const mockSelectedSpeaker$ = of(mockSpeaker);
    spyOn(store, 'select').and.returnValue(mockSelectedSpeaker$);
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-body')).toBeTruthy();
    expect(compiled.querySelector('.card-footer')).toBeTruthy();
    expect(compiled.querySelector('.img-responsive').getAttribute('src')).toBe(
      mockSpeaker.picture.large
    );
    expect(compiled.querySelector('h3').textContent).toContain(
      `${mockSpeaker.name.first} ${mockSpeaker.name.last}`
    );
    expect(compiled.querySelector('p').textContent).toContain(
      `Email: ${mockSpeaker.email}`
    );
    expect(compiled.querySelector('p').textContent).toContain(
      `Phone: ${mockSpeaker.phone}`
    );
    expect(compiled.querySelector('p').textContent).toContain(
      `Location: ${mockSpeaker.location.city}, ${mockSpeaker.location.country}`
    );
  }));

  it('should navigate back to speaker list when goBack is called', () => {
    spyOn(router, 'navigateByUrl');
    component.goBack();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/speaker-list');
  });
});
