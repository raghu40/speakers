import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SpeakerService } from './speaker.service';

describe('SpeakerService', () => {
  let service: SpeakerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpeakerService]
    });
    service = TestBed.inject(SpeakerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch speakers from the API', () => {
    const page = 1;
    const resultsPerPage = 10;
    const dummyData = {
      results: [
        { name: { first: 'John', last: 'Doe' }, email: 'john.doe@example.com', phone: '123456789', location: { city: 'New York', country: 'USA' } },
        { name: { first: 'Jane', last: 'Doe' }, email: 'jane.doe@example.com', phone: '987654321', location: { city: 'Los Angeles', country: 'USA' } }
      ]
    };

    service.getSpeakers(page, resultsPerPage).subscribe(speakers => {
      expect(speakers.length).toBe(2);
      expect(speakers[0].name.first).toBe('John');
      expect(speakers[1].name.first).toBe('Jane');
    });

    const req = httpMock.expectOne(`https://randomuser.me/api/?results=${resultsPerPage}&page=${page}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
});
