import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/services/profile.service';
import { LikesService } from '../services/likes.service';
import { VisitService } from '../services/visit.service';
import { MatchService } from '../services/match.service';
import { Profile } from '../profile/models/profile.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  profiles : Profile [] = [];
  tabSelection : string = 'match';
  profileSelect :Profile;
  profileId : number;

  constructor(private profileService : ProfileService, private likeService : LikesService,
              private visitService : VisitService, private matchService : MatchService) { }

  ngOnInit(): void {
    switch(this.tabSelection){
      case 'match' :{
        this.getMatchData();
        break;
      }
      case 'visit' :{
        this.getVisitData();
        break;
      }
      case 'like' :{
        this.getLikesData();
        break;
      }
    }
    this.profileSelect = this.profiles.find(e => e.id == this.profileId);

  }

  getVisitData(){
    this.profileService.getProfilesByVisits().pipe(take(1)).subscribe(
      e => {
        if (e['success'] == true){
          this.profiles = e['data'];
          
          this.visitService.getVisits().pipe(take(1)).subscribe(e => {
            this.profiles.forEach(element => {
              let temp = e['data'].find(g => g['visitor'] == element.id);
              element['date'] = temp['data'];
              element['visit_id'] = temp['id'];
            })
          })
        }
      }
    )
  }

  getLikesData(){
    this.profileService.getProfilesByLikes().pipe(take(1)).subscribe(
      e => {
        if (e['success'] == true){
          this.profiles = e['data'];
          
          this.likeService.getLikes().pipe(take(1)).subscribe(e => {
            this.profiles.forEach(element => {
              let temp = e['data'].find(g => g['liking_user'] == element.id);
              element['date'] = temp['date'];
              element['like_id'] = temp['id'];
            });
        });
      }
      });
  }

  getMatchData(){
    this.profileService.getProfilesByMatches().pipe(take(1)).subscribe(
      e => {
        if (e['success'] == true){
          this.profiles = e['data'];
          
          this.matchService.getMatches().pipe(take(1)).subscribe(e => {
            this.profiles.forEach(element => {
              let temp = e['data'].find(g =>(g['user1'] == element.id || g['user2'] == element.id) );
              element['date'] = temp['date'];
              element['match_id'] = temp['id'];
            });
        });
      }});
  }

}