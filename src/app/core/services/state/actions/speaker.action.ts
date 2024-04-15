import { createAction, props } from "@ngrx/store";
import { Speaker } from "../models/speaker.model";



export const loadSpeakersPage = createAction('[Speaker] Load Speakers Page', props<{page:number;resultsPerPage:number}>())
export const loaderSpeakerPageSuccess = createAction('[Speaker] Load Speakers Page Success',props<{speakers:Speaker[]}>())
export const loaderSpeakerPageFailure = createAction('[Speaker] Load Speakers Page Failure',props<{error:null}>())
export const isLoading = createAction('[Speaker] Data loading',props<{isLoading:boolean}>())
export const currentPageDetails = createAction('[Speaker] Current Page',props<{currentPage:number}>())
 