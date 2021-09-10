import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoComponent } from './video/video.component';

import { NgxFileHelpersModule } from 'ngx-file-helpers';

@NgModule({
    declarations: [
        AppComponent,
        VideoListComponent,
        VideoComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgxFileHelpersModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }