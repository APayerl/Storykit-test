import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../util/interface';
import { VideoService } from '../VideoService/video.service';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
    constructor(private videoService: VideoService) { }

    @Input() video?: Video;

    ngOnInit(): void {
    }

    async onInputChange(id: number, event: any) {
        let res = await this.videoService.changeGrade(id, event.target.valueAsNumber);
        console.log(res);
    }

}