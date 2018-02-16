import {Component, OnInit} from '@angular/core';
import {MediaService} from '../services/media.service';

@Component({
  selector: 'app-viewfile',
  templateUrl: './viewfile.component.html',
  styleUrls: ['./viewfile.component.scss'],
})
export class ViewfileComponent implements OnInit {

  file: any;
  title: string;
  description: string;
  poster: any;
  likes: any;
  likedByUser: any;
  amount: any;

  constructor(private mediaService: MediaService) {
  }

  ngOnInit() {
    this.mediaService.getOneFile().subscribe(file => {
      console.log(file);
      this.file = this.mediaService.mediaUrl + file[0]['filename'];
      this.title = file[0]['title'];
      this.description = file[0]['description'];
      this.poster = file[0]['user_id'];
      console.log(this.poster);
    });
    this.mediaService.getLikes(33).subscribe(likes => {
      console.log('Likes:');
      console.log(likes);
      this.likes = likes;
      this.amount = this.likes.length;
    });
    this.mediaService.getUser(88).subscribe(poster => {
      console.log('User:');
      this.poster = poster.username;
    });
    this.mediaService.likedByUser().subscribe(myLikes => {
      console.log('My Likes:');
      console.log(myLikes);
    });
  }
}
