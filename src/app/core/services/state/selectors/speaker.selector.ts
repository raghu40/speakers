import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpeakerState } from '../reducers/speaker.reducer';
import { Speaker } from '../models/speaker.model';

export const selectSpeakerState =
  createFeatureSelector<SpeakerState>('speaker');

export const displayAllSpeakers = createSelector(
  selectSpeakerState,
  (state: SpeakerState) => state.speakers
);

export const selectSpeakerById = (id: string) =>
  createSelector(displayAllSpeakers, (state: Speaker[]) => {
    return state.find((speaker) => speaker.login.uuid === id);
  });

export const speakersDataLoading = createSelector(
  selectSpeakerState,
  (state: SpeakerState) => state.loading
);

export const selectError = createSelector(
  selectSpeakerState,
  (state: SpeakerState) => state.error
);

export const currentPageNumber = createSelector(
  selectSpeakerState,
  (state: SpeakerState) => state.currentPage
);
