import { Component,
         OnInit,
         ViewChild } from '@angular/core';
import '../../opencv'
//import * as cv from 'opencv4nodejs';
// import * as robotjs from 'robotjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'camerajs';

  
  @ViewChild('videoElement') videoElement: any;  
  video: any;

  ngOnInit() {
    const rows = 100; // height
    const cols = 100; // width

    this.video = this.videoElement.nativeElement;
    console.log(this.video);
    this.initCamera({ video: true, audio: false }); 
    
    
    console.log(cv);
    
  }

  initCamera(config:any) {
    var browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    });
  }
  

}
