import { createReducer, on } from '@ngrx/store';
import { Speaker } from '../models/speaker.model';
import * as SpeakerActions from '../actions/speaker.action';
import { state } from '@angular/animations';

export interface SpeakerState {
  speakers: Speaker[];
  loading: boolean;
  error: any;
  currentPage: number;
}

export const initialState: SpeakerState = {
  speakers: [],
  loading: false,
  error: null,
  currentPage: 1,
};

export const speakerReducer = createReducer(
  initialState,

  on(SpeakerActions.loadSpeakersPage, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(SpeakerActions.loaderSpeakerPageSuccess, (state, { speakers }) => {
    state.speakers.concat(speakers);

    return {
      ...state,
      speakers: [...state.speakers, ...speakers],
      loading: false,
      error: null,
    };
  }),
  on(SpeakerActions.loaderSpeakerPageFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(SpeakerActions.isLoading, (state, { isLoading }) => {
    return {
      ...state,
      loading: isLoading,
    };
  }),
  on(SpeakerActions.currentPageDetails, (state, action) => {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  })
);
