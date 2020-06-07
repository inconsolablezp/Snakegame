export enum DirectionType {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}
import Map from "./Map";
export default class Snake {
  body: { x: number; y: number }[] = [];
  direction: DirectionType;
  map:Map;
  constructor(height: number, width: number, direction: DirectionType,map:Map) {
    this.body.push({ x: Math.floor(height / 2), y: Math.floor(width / 2) });
    this.body.push({ x: Math.floor(height / 2 + 1), y: Math.floor(width / 2) });
    this.body.push({ x: Math.floor(height / 2 + 2), y: Math.floor(width / 2) });
    this.direction = direction;
    this.map = map;
  }

  move() {
    const length = this.body.length;
    let x: number;
    let y: number;
    switch (this.direction) {
      case DirectionType.UP:
        x = this.body[0].x - 1;
        y = this.body[0].y;
        break;
      case DirectionType.DOWN:
        x = this.body[0].x + 1;
        y = this.body[0].y;
        break;
      case DirectionType.LEFT:
        x = this.body[0].x;
        y = this.body[0].y - 1;
        break;
      case DirectionType.RIGHT:
        x = this.body[0].x;
        y = this.body[0].y + 1;
        break;
    }
    if (x === this.map.Randomx && y === this.map.Randomy){
      this.body.unshift({ x, y });
      this.map.ShowApp = true;
    }
    else{
      this.body.pop();
      this.body.unshift({ x, y });
    }
  }

  turnLeft() {
    if ([DirectionType.LEFT, DirectionType.RIGHT].includes(this.direction))
      return;
    this.direction = DirectionType.LEFT;
  }

  turnup() {
    if ([DirectionType.UP, DirectionType.DOWN].includes(this.direction)) return;
    this.direction = DirectionType.UP;
  }

  turndown() {
    if ([DirectionType.UP, DirectionType.DOWN].includes(this.direction)) return;
    this.direction = DirectionType.DOWN;
  }

  turnright() {
    if ([DirectionType.LEFT, DirectionType.RIGHT].includes(this.direction))
      return;
    this.direction = DirectionType.RIGHT;
  }
}
