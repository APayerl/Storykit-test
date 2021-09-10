import { Component, OnInit } from '@angular/core';
import { Video } from '../util/interface';
import { VideoService } from '../VideoService/video.service';

@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
    constructor(public videoService: VideoService) { }

    videos: Video[] = [];
    filter: any = (tx: Video) => tx.title.includes("");
    get filteredVideos(): Video[] {
        return this.videos.filter(this.filter);
    }

    ngOnInit(): void {
        this.videoService.getVideos().then(val => {
            this.videos = val.sort((vid1, vid2) => vid1.title.toUpperCase() > vid2.title.toUpperCase() ? 1 : -1);
        })
    }

    searchVideo(event: any) {
        console.log(event.target.value);
        this.filter = (tx: Video) => tx.title.includes(event.target.value);
    }
}