import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core';
import { ReadFile, ReadMode } from 'ngx-file-helpers';
import { Video } from '../util/interface';
import { VideoService } from '../VideoService/video.service';

@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
    constructor(public videoService: VideoService) { }

    readmode = ReadMode.text;
    videos: Video[] = [];
    filter: any = (tx: Video) => tx.title.includes("");
    get filteredVideos(): Video[] {
        return this.videos.filter(this.filter);
    }

    async ngOnInit(): Promise<void> {
        this.videos = await this.videoService.getVideos();
        this.sortVideos();
    }

    sortVideos() {
        this.videos = this.videos.sort((vid1, vid2) => vid1.title.toUpperCase() > vid2.title.toUpperCase() ? 1 : -1);
    }

    searchVideo(event: any) {
        console.log(event.target.value);
        this.filter = (tx: Video) => tx.title.includes(event.target.value);
    }

    async onFilePicked(event: ReadFile) {
        console.log(JSON.parse(event.content).videos as Video[]);
        this.videos = await this.videoService.setVideos(JSON.parse(event.content).videos as Video[])
        this.sortVideos();
    }
}