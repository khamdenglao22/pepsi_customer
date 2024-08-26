import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { RewardService } from './reward.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss'],
})
export class RewardComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  url = environment.imgUrl;
  prize: any = [];
  centerX: any;
  centerY: any;
  radius: any;

  // itemArr = [
  //   {
  //     id: 5,
  //     image: 'images/prize-1.jpg',
  //     color: '#7C00FE',
  //   },
  //   {
  //     id: 4,
  //     image: 'images/pepsi-big.jpeg',
  //     color: '#FF8C9E',
  //   },
  //   {
  //     id: 2,
  //     image: 'images/prize-manual.png',
  //     color: '#41B3A2',
  //   },
  //   {
  //     id: 3,
  //     image: 'images/pepsi.png',
  //     color: '#219C90',
  //   },
  // ];

  num = 0;
  count = 0;
  resultValue = 101;
  randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  itemDegs: any = {};
  currentDeg = 0;
  rad: any;
  step: any;
  width: any;
  height: any;

  constructor(public dialog: MatDialog, private service: RewardService) {}

  ngOnInit(): void {
    // this.loadData();
  }

  loadData() {
    this.service.allPrize().subscribe((res: any) => {
      this.prize = res.data;
      console.log(this.prize.length);
      this.step = 360 / this.prize.length;
      this.draw();
    });
  }

  ngAfterViewInit() {
    this.loadData();
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.radius = this.width / 2;

    console.log(this.ctx);

    this.draw();
  }

  toRad(deg: any) {
    return deg * (Math.PI / 180.0);
  }

  draw() {
    if (this.ctx) {
      // // Draw a rectangle
      // this.ctx.fillStyle = 'blue';
      // this.ctx.fillRect(50, 50, 150, 100);

      // // Draw a circle
      // this.ctx.beginPath();
      // this.ctx.arc(200, 200, 50, 0, Math.PI * 2, true); // Outer circle
      // this.ctx.fillStyle = 'red';
      // this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(
        this.centerX,
        this.centerY,
        this.radius,
        this.toRad(0),
        this.toRad(360)
      );
      this.ctx.fillStyle = `rgb(${33},${33},${33})`;
      this.ctx.lineTo(this.centerX, this.centerY);
      this.ctx.fill();

      let startDeg = this.currentDeg;

      if (this.prize.length > 0) {
        for (let i = 0; i < this.prize.length; i++, startDeg += this.step) {
          let endDeg = startDeg + this.step;
          const imgPrize = new Image();
          const imgPrize2 = new Image();

          // color = colors[i];
          let colorStyle = `rgb(255,255,255)`;

          this.ctx.beginPath();
          this.rad = this.toRad(360 / this.step);
          this.ctx.arc(
            this.centerX,
            this.centerY,
            this.radius - 2,
            this.toRad(startDeg),
            this.toRad(endDeg)
          );
          let colorStyle2 = `rgb(0,0,0)`;
          this.ctx.fillStyle = colorStyle2;
          this.ctx.lineTo(this.centerX, this.centerY);
          this.ctx.fill();

          this.ctx.beginPath();
          this.rad = this.toRad(360 / this.step);
          this.ctx.arc(
            this.centerX,
            this.centerY,
            this.radius - 30,
            this.toRad(startDeg),
            this.toRad(endDeg)
          );
          this.ctx.fillStyle = this.prize[i].color;
          this.ctx.lineTo(this.centerX, this.centerY);
          this.ctx.fill();

          // draw text
          this.ctx.save();
          this.ctx.translate(this.centerX, this.centerY);

          this.ctx.rotate(this.toRad((startDeg + endDeg) / 2));
          this.ctx.textAlign = 'center';
          // if (color.r > 150 || color.g > 150 || color.b > 150) {
          //   this.ctx.fillStyle = '#000';
          // } else {
          //   this.ctx.fillStyle = '#fff';
          // }
          this.ctx.fillStyle = '#000';
          this.ctx.font = 'bold 24px serif';
          // console.log(this.prize[i]);
          imgPrize.src = `${this.url}/static/${this.prize[i].image}`;
          imgPrize2.src = `${this.url}/static/${this.prize[1].image}`;
          // console.log(imgPrize);

          // console.log(360 / this.prize[i].length);

          console.log(i);

          let prizeX = i * 50;
          // let prizeY = 360 / i;

          this.ctx.beginPath();
          // imgPrize.onload = () => {
          //   this.ctx.drawImage(imgPrize, 50, 150, 90, 90);
          //   this.ctx.arc(50, 190, 100, 50, 2 * Math.PI);
          // };
          // imgPrize2.onload = () => {
          //   this.ctx.drawImage(imgPrize2, 100, 100, 90, 90);
          //   // this.ctx.moveTo(80, 80);
          // };
          // this.ctx.fillText(this.prize[i].color, 130, 10);
          // this.ctx.drawImage(imgPrize, 130, 10);
          this.ctx.restore();

          this.itemDegs[this.prize[i]] = {
            startDeg: startDeg,
            endDeg: endDeg,
          };

          if (this.randomDegree >= startDeg && this.randomDegree <= endDeg) {
            // document.getElementById('winner').innerHTML = items[i];
            console.log('test winner');
          }
        }
      }
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(RewardPopupComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  randomInRange(min: any, max: any) {
    return Math.random() * (max - min) + min;
  }

  // spin() {}

  // confetti({
  //   angle: randomInRange(55, 125),
  //   spread: randomInRange(50, 70),
  //   particleCount: randomInRange(50, 100),
  //   origin: { y: 0.6 },
  // });
}
