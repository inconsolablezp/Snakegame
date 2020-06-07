import Map from "./Map";
import Snake, { DirectionType } from "./Snake";
class Game {
  map: Map;
  snake: Snake;
  private _start:boolean = false;
  private _timer:any;
  constructor() {
    this.map = new Map(20, 20);
    this.map.createMap("map");
    this.snake = new Snake(8, 8, DirectionType.UP,this.map);
    this.map.displaySnake(this.snake);
    window.addEventListener("keydown", this.keydown, false);
  }

  private move = () => {
    this.map.clearSnake(this.snake);
    if (this.map.Showapp)
      this.map.showFood(this.snake);
    this.snake.move();
    this._gameover(this.snake);
    this.map.displaySnake(this.snake);
  }

  private _gameover = (snake:Snake)=>{
      let x = snake.body[0].x;
      let y = snake.body[0].y;
      let newsnake = snake.body.slice(1);
      if (x < 0 || y < 0  || x > this.map.height - 1 || y > this.map.width - 1 || newsnake.some(item => item.x === x && item.y === y)){
            alert("gameover");
            this.snake = new Snake(this.map.height, this.map.width, DirectionType.UP,this.map);
            clearInterval(this._timer);
            this._start = false;
            this.map.clearfood();
      }
  }

  private keydown = (event: KeyboardEvent) => {
    if (!this._start){
        this._timer = setInterval(this.move,200);
        this._start = true;
    }
    switch (event.keyCode) {
      case 37: //左
        this.snake.turnLeft();
        break;
      case 38: //上
        this.snake.turnup();
        break;
      case 39: //右
        this.snake.turnright();
        break;
      case 40: //下
        this.snake.turndown();
        break;
    }
  };
}

new Game();
