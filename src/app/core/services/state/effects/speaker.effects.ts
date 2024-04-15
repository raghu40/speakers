import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpeakerService } from '../../speaker.service';
import * as SpeakerActions from '../actions/speaker.action';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class SpeakerEfforts {
  constructor(
    private action$: Actions,
    private speakerService: SpeakerService
  ) {}

  loadSpeakersPage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(SpeakerActions.loadSpeakersPage),
      mergeMap(({ page, resultsPerPage }) =>
        this.speakerService.getSpeakers(page, resultsPerPage).pipe(
          tap(() => SpeakerActions.isLoading({ isLoading: false })),
          map((speakers) =>
            SpeakerActions.loaderSpeakerPageSuccess({ speakers })
          ),
          catchError((error) =>
            of(SpeakerActions.loaderSpeakerPageFailure({ error }))
          )
        )
      )
    );
  });
}
