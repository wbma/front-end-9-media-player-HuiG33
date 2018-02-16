import {Component, OnInit} from '@angular/core';
import {MediaService} from '../services/media.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss'],
})
export class FrontComponent implements OnInit {

  fileArray: any;

  constructor(private mediaService: MediaService, private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.mediaService.getUserData().subscribe(response => {
        console.log('Welcome ' + response['full_name']);
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.router.navigate(['login']);
      });
    } else {
      this.router.navigate(['login']);
    }
    // get media stuff
    this.mediaService.getNewFiles().subscribe(data => {
      console.log(data);
      this.fileArray = data;

      /*this.fileArray.map(media => {
        const temp = media.filename.split('.');
        const thumbName = temp[0] + '-tn320.png';
        media.thumbnail = thumbName;
      });*/
      console.log(this.fileArray);
    });
  }
}
