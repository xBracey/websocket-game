import SAT from "sat";

export class Engine {
  private width: number;
  private height: number;
  private addPoint: () => void;
  private items: Record<string, SAT.Polygon> = {};

  constructor(width: number, height: number, addPoint: () => void) {
    this.width = width;
    this.height = height;
    this.addPoint = addPoint;
  }

  addItem(id: string, item: SAT.Polygon) {
    this.items[id] = item;
  }

  addBox(
    id: string,
    { x, y, w, h }: { x: number; y: number; w: number; h: number }
  ) {
    const box = new SAT.Box(new SAT.Vector(0, 0), w, h).toPolygon();
    box.translate(x, y);

    this.addItem(id, box);
  }

  removeItem(id: string) {
    delete this.items[id];
  }

  moveItem(id: string, x: number, y: number, rotation?: number) {
    const item = this.items[id];

    item.translate(x, y);
    if (rotation) this.setAngleItemAroundCenter(id, rotation);

    const shouldCollide = this.checkCollision(id);

    if (shouldCollide === false) return;

    if (shouldCollide === "prize") {
      const prize = this.getItem("prize");

      if (!prize) return;

      const centroid = prize.getCentroid();

      prize.translate(-centroid.x, -centroid.y);
      const newPos = this.generatePosition();
      prize.translate(newPos.x, newPos.y);

      this.addPoint();

      return;
    }

    item.translate(-x, -y);
    if (rotation) this.setAngleItemAroundCenter(id, -rotation);
    return shouldCollide;
  }

  setAngleItemAroundCenter(id: string, rotation: number) {
    const item = this.items[id];
    const centroid = item.getCentroid();

    item.translate(-centroid.x, -centroid.y);
    item.rotate(rotation);
    item.translate(centroid.x, centroid.y);
  }

  getItem(id: string): SAT.Polygon | undefined {
    return this.items[id];
  }

  getItems() {
    return this.items;
  }

  generatePosition() {
    const minX = this.width * 0.1;
    const maxX = this.width * 0.9;
    const minY = this.height * 0.1;
    const maxY = this.height * 0.9;
    const randomX = Math.floor(Math.random() * this.width);
    const randomY = Math.floor(Math.random() * this.height);

    const xArray = [minX, maxX, randomX];
    const yArray = [minY, maxY, randomY];

    xArray.sort((a, b) => a - b);
    yArray.sort((a, b) => a - b);

    const x = xArray[1];
    const y = yArray[1];

    console.log([minX, maxX, randomX]);
    console.log([minY, maxY, randomY]);

    console.log(
      x,
      y,
      this.width,
      this.height,
      minX,
      maxX,
      minY,
      randomX,
      randomY
    );

    return { x, y };
  }

  checkCollision(id: string): false | string {
    const item = this.items[id];

    if (item) {
      for (const [key, value] of Object.entries(this.items)) {
        if (key !== id) {
          const collided = SAT.testPolygonPolygon(item, value);

          if (collided) {
            return key;
          }
        }
      }

      return false;
    }

    return false;
  }
}
