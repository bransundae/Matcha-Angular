<<<<<<< HEAD
import {Component, HostListener, OnInit} from '@angular/core';
import {CoreComponent} from '../../core/core.component';
import {Profile, ProfileInterface} from '../models/profile.model';
import {ProfileService} from '../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent extends CoreComponent implements OnInit {

  profile: Profile;
  selectedCarouselImage: string;
  carouselButtonEvent = false;
  constructor(private profileService: ProfileService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    super();
    this.activatedRoute.data.subscribe(data => {
      this.profile = new Profile(data.profile.data as ProfileInterface);
    });
  }

  onCarouselImageEvent(event: Event, item: string) {
    if (event.type === 'mousedown') {
      this.selectedCarouselImage = this.selectedCarouselImage === item ? null : item;
    } else if (event.type === 'focusout' && this.selectedCarouselImage === item && !this.carouselButtonEvent) {
      this.selectedCarouselImage = null;
    }
  }

  onCarouselButtonEvent(event: Event) {
    if (event.type === 'mousedown') {
      console.log('MOUSE CLICK IN PROGRESS');
      this.carouselButtonEvent = true;
    } else if (event.type === 'click') {
      if (this.selectedCarouselImage) {
        // REMOVE IMAGE
        console.log('REMOVE - ' + this.selectedCarouselImage);
        // this.profileService.deleteImage(this.selectedCarouselImage)
        //   .subscribe(result => {
        //     const {error, success} = result as any;
        //     if (success) {
        //       this.router.navigate(['profile'],
        //         {
        //           relativeTo: this.activatedRoute.parent
        //         }).then();
        //     } else {
        //       console.log(error);
        //     }
        //   });
      } else {
        // ADD UPLOAD IMAGE
        console.log('ADD');
      }
      console.log('MOUSE CLICK COMPLETE - CLICK');
      this.carouselButtonEvent = false;
      this.selectedCarouselImage = null;
    }
  }

  onImageSelected(event: Event) {
    const imageUpload: HTMLInputElement = event.target as HTMLInputElement;
    if (imageUpload.files && imageUpload.files.length === 1) {
      this.profileService.uploadImage(imageUpload.files[0]).then(request => {
        request.subscribe(result => {
          const {error, success} = result as any;
          if (success) {
            this.router.navigate(['profile'])
              .then();
          } else {
            console.log(error);
          }
        });
      });
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp(event: Event) {
    if (this.carouselButtonEvent) {
      const elem = event.target as HTMLElement;
      if (elem.id !== 'carouselButton') {
        this.selectedCarouselImage = null;
        this.carouselButtonEvent = false;
      }
    }
  }

  ngOnInit(): void {
    const data = history.state.profile || {};
    this.profile = new Profile(data);
    //this.inputImageUpload = this.inputImageRef.nativeElement as HTMLInputElement;
    // const data = history.state.profile || {};
    // this.profile = new Profile(data);

  }

  profileAvatar:string = "http://dummyimage.com/241x205.png/5fa2dd/ffffff";

}
