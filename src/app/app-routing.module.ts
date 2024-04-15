import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeakerDetailsComponent } from './shared/components/speaker-details/speaker-details.component';
import { SpeakerListComponent } from './shared/components/speaker-list/speaker-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'speaker-list', pathMatch: 'full' },
  { path: 'speaker-list', component: SpeakerListComponent },
  { path: 'speaker-details/:id', component: SpeakerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
