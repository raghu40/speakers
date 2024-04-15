import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SpeakerListComponent } from './shared/components/speaker-list/speaker-list.component';
import { SpeakerDetailsComponent } from './shared/components/speaker-details/speaker-details.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { speakerReducer } from './core/services/state/reducers/speaker.reducer';
import { SpeakerEfforts } from './core/services/state/effects/speaker.effects';
import { FormsModule } from '@angular/forms';
import { SPEAKER } from './core/services/state/selectors/speaker.selector';

@NgModule({
  declarations: [
    AppComponent,
    SpeakerListComponent,
    SpeakerDetailsComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ [SPEAKER]: speakerReducer }),
    EffectsModule.forRoot([SpeakerEfforts]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
