import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import { interval } from 'rxjs';
import { ScreenSizeService } from 'src/app/service/ScreenSizeService';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  imgs: string[] = [];
  randomImgs: string[] = [];
  currentIndex = 0;
  intervalTime = 8000;
  transitionDuration = 1000;
  opacity = 1;
  isSmallScreen = false;
  constructor(
    private dataService: DataService,
    private screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.screenSizeService.isSmallScreen$.subscribe((isSmall) => {
      this.isSmallScreen = isSmall;
    });
  }

  getData() {
    this.dataService.getDataObservable().subscribe((data) => {
      this.imgs = this.dataService.getImgs();
      this.getRandomImgs();
      this.changeImg();
    });
  }

  getRandomImgs() {
    const shuffledImgs = this.shuffleArray(this.imgs);
    for (const img of shuffledImgs) {
      if (!this.randomImgs.includes(img)) {
        this.randomImgs.push(img);
      }
    }
  }

  private shuffleArray(array: any[]): any[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  changeImg() {
    interval(this.intervalTime).subscribe(() => {
      this.opacity = 0.5;
      this.changeToNextImage();
    });
  }

  changeImgOnClick(index: number) {
    this.opacity = 1;
    this.currentIndex = index;
  }

  changeToNextImage() {
    setTimeout(() => {
      this.opacity = 1;
    }, this.transitionDuration);
    this.currentIndex = (this.currentIndex + 1) % this.randomImgs.length;
  }
}
