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
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss'],
})
export class RewardComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  @ViewChild('win') win!: ElementRef;

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
  start: any;
  end: any;
  game_id: any;
  store_id: any;
  current_play_times: any;
  max_play_times: any;
  disabled = '';
  imgX = 0;
  imgY = 0;

  constructor(
    public dialog: MatDialog,
    private service: RewardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.loadData();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.game_id = Number(params.get('id'));
    });

    this.route.queryParamMap.subscribe((params) => {
      this.store_id = params.get('store_id');
      this.max_play_times = params.get('max_play_times');
    });

    this.loadGames();

    console.log(this.current_play_times);

    console.log(this.randomDegree);
  }

  loadData() {
    this.service.allPrize().subscribe((res: any) => {
      this.prize = res.data;
      console.log(this.prize.length);
      this.step = 360 / this.prize.length;
      this.setImgXY();
      this.draw();
    });
  }

  setImgXY() {
    switch (this.prize.length) {
      case 2:
        this.imgX = -90;
        this.imgY = 50;
        break;

      case 3:
        this.imgX = 30;
        this.imgY = 60;
        break;

      case 4:
        this.imgX = 50;
        this.imgY = 50;
        break;
      case 5:
      case 6:
        this.imgX = 100;
        this.imgY = 50;
        break;
      case 7:
        this.imgX = 100;
        this.imgY = 40;
        break;
      case 8:
        this.imgX = 100;
        this.imgY = 30;
        break;
      default:
        break;
    }
  }

  loadGames() {
    this.service.getGames(this.game_id).subscribe((res: any) => {
      this.current_play_times = res.current_play_times;

      console.log(this.current_play_times);

      if (this.current_play_times == this.max_play_times) {
        this.disabled = 'disabled';

        console.log('test');
      }
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
    canvas.style.transform = `rotate(${this.num}deg)`;

    console.log(this.ctx);

    // this.draw();
    // this.spin();
  }

  toRad(deg: any) {
    return deg * (Math.PI / 180.0);
  }

  draw(spinActive: boolean = false) {
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
          this.start = startDeg;
          this.end = endDeg;
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
          let colorStyle2 = `black`;
          this.ctx.fillStyle = colorStyle2;
          this.ctx.lineTo(this.centerX, this.centerY);
          this.ctx.fill();

          this.ctx.beginPath();
          this.rad = this.toRad(360 / this.step);
          this.ctx.arc(
            this.centerX,
            this.centerY,
            this.radius - 10,
            this.toRad(startDeg),
            this.toRad(endDeg)
          );
          this.ctx.fillStyle = this.prize[i].color;
          this.ctx.lineTo(this.centerX, this.centerY);
          this.ctx.fill();

          // draw text
          // this.ctx.save();
          // this.ctx.translate(this.centerX, this.centerY);
          // this.ctx.rotate(this.toRad((startDeg + endDeg) / 2));
          // this.ctx.textAlign = 'center';
          // this.ctx.fillStyle = '#000';
          // this.ctx.font = 'bold 24px serif';
          // this.ctx.fillText(this.prize[i].image, 130, 10);
          // this.ctx.restore();

          // draw img

          imgPrize.src = `${this.url}/static/${this.prize[i].image}`;

          imgPrize.onload = () => {
            this.ctx.save();
            this.ctx.translate(this.centerX, this.centerY);
            this.ctx.rotate(this.toRad(endDeg - 360 / this.prize.length));
            this.ctx.textAlign = 'center';
            this.ctx.drawImage(
              imgPrize,
              this.imgX,
              this.imgY,
              360 / this.prize.length,
              360 / this.prize.length
            );
            this.ctx.restore();
          };

          // console.log(this.prize[i].image);

          // this.ctx.drawImage(imgPrize, 130, 10);

          this.itemDegs[this.prize[i]] = {
            startDeg: startDeg,
            endDeg: endDeg,
          };
          // this.prizeImg = this.prize[i].image;
          if (
            this.randomDegree >= startDeg &&
            this.randomDegree <= endDeg &&
            spinActive == true
          ) {
            this.service
              .updateGame({
                game_id: this.game_id,
                prize_id: this.prize[i].id,
                store_id: this.store_id,
              })
              .subscribe((res: any) => {
                console.log(res);
                this.current_play_times = res.game.current_play_times;
                this.openDialog('0ms', '0ms', this.prize[i].image);
                this.loadGames();
                this.triggerConfetti();
                console.log(this.prize[i].image);
              });
          }
        }
      }
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: any
  ): void {
    const dialogRef = this.dialog.open(RewardPopupComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { img: data },
      width: '300px',
    });
  }

  randomInRange(min: any, max: any) {
    return Math.random() * (max - min) + min;
  }

  spin() {
    let myInterval = setInterval(() => {
      this.num += this.randomDegree;
      // console.log(this.num);

      if (this.num >= 360) {
        this.count += 1;
        this.resultValue -= 5;
        this.num = 0;
      } else if (this.count > 15 && this.num == this.randomDegree) {
        // this.randomDegree = 0;

        clearInterval(myInterval);
        this.count = 0;
        this.resultValue = 101;
        this.randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
        // spinBtn.disabled = false;
        // canvas.style.transform = `rotate(-${this.randomDegree}deg)`;
        this.num = -this.randomDegree;
        this.draw(true);
      }
      this.canvas.nativeElement.style.transform = `rotate(${this.num}deg)`;

      // console.log(this.num);
    }, 10);
  }

  triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}
