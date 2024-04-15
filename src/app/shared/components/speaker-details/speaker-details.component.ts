import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoading } from 'src/app/core/services/state/actions/speaker.action';
import { Speaker } from 'src/app/core/services/state/models/speaker.model';
import { selectSpeakerById } from 'src/app/core/services/state/selectors/speaker.selector';

@Component({
  selector: 'app-speaker-details',
  templateUrl: './speaker-details.component.html',
  styleUrls: ['./speaker-details.component.scss'],
})
export class SpeakerDetailsComponent implements OnInit {
  selectedSpeaker$!: Observable<Speaker | undefined>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    const speakerId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(isLoading({ isLoading: true }));
    if (speakerId) {
      this.selectedSpeaker$ = this.store.pipe(
        select(selectSpeakerById(speakerId))
      );
      this.store.dispatch(isLoading({ isLoading: false }));
    }
  }

  goBack(): void {
    this.router.navigate(['/speaker-list']);
  }
}
