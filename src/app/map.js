const map = {
  tileSize: 32,
  cols: 5,
  rows: 5,
  atlas: null,
  tiles: [
    { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
    { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
    { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
    { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
    { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }
  ],
  loadAtlas() {
    return new Promise((resolve, reject) => {
      const atlasImg = new Image();
      atlasImg.src = require('../assets/images/atlas.png');
      atlasImg.onload = () => {
        this.atlas = atlasImg;
        resolve();
      }
    });
  },
  getTile(col, row) {
    return this.tiles[row * this.cols + col];
  },
  render(ctx, scale = 1) {
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        let tile = this.getTile(col, row);
        ctx.drawImage(
          this.atlas,
          tile.x * this.tileSize,
          tile.y * this.tileSize,
          this.tileSize,
          this.tileSize,
          col * this.tileSize * scale,
          row * this.tileSize * scale,
          this.tileSize * scale,
          this.tileSize * scale
        );
      }
    }
  }
};

export default map;
