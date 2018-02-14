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
  user: string;
  liked: any;
  likedByUser: any;

  constructor(private mediaService: MediaService) {
  }

  ngOnInit() {
    this.mediaService.getOneFile().subscribe(file => {
      console.log(file);
      this.file = this.mediaService.mediaUrl + file[0]['filename'];
      this.title = file[0]['title'];
      this.description = file[0]['description'];
    });
    this.mediaService.getLikes(33).subscribe(likes => {
      console.log(likes);
    });
    this.mediaService.postingUser(54).subscribe(poster => {
      console.log(poster);
    });
    this.mediaService.likedByUser().subscribe(myLikes => {
      console.log(myLikes);
    });
  }
}
