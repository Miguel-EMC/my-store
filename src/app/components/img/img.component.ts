import {  Component,  EventEmitter,  Input,  Output,  OnChanges,  OnInit, AfterViewInit, OnDestroy, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy{
  
  img: string = '';

  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img  =>' ,this.img);
    // code
  }

  // @Input() img: string = '';
  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = 'https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg';
  // counter = 0;
  // counterFn: number| undefined;

  constructor() {
    // before render
    // No async -- once time
    console.log('Constructor', 'imgValue => ', this.img);
  }
  ngOnChanges(changes: SimpleChanges) {
    // before render
    // change inputs -- multiples times
    console.log('ngOnChange', 'imgValue => ', this.img);
    console.log('changes',changes)
  }

  ngOnInit(): void {
    // before - during render
    // async - fetch -- once time
    console.log('ngOnInit', 'imgValue => ', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter +=1;
    //   console.log('Run counter');
    // }, 1000);
  }
  ngAfterViewInit(): void {
    // after render
    //handler children
    console.log('After View Init');
  }

  ngOnDestroy(): void {
    // delete
    console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imgDefault;
  }
  imgLoaded() {
    console.log('Log hijo');
    this.loaded.emit(this.img);
  }
}
