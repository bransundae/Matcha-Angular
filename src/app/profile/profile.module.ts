import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [ProfileComponent, EditProfileComponent]
})
export class ProfileModule {}
