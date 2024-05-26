class Segment {
  constructor(parent, l, a, first) {
    this.first = first;
    this.pos = first ? { x: parent.x, y: parent.y } : { x: parent.nextPos.x, y: parent.nextPos.y };
    this.l = l;
    this.ang = a;
    this.nextPos = { x: this.pos.x + this.l * Math.cos(this.ang), y: this.pos.y + this.l * Math.sin(this.ang) };
  }

  update(t) {
    this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
    this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
    this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
    this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
    this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
  }

  fallback(t) {
    this.pos.x = t.x;
    this.pos.y = t.y;
    this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
    this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
  }

  show(context) {
    context.lineTo(this.nextPos.x, this.nextPos.y);
  }
}

class Tentacle {
  constructor(x, y, l, n, a) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.n = n;
    this.rand = Math.random();
    this.segments = [new Segment(this, this.l / this.n, 0, true)];
    for (let i = 1; i < this.n; i++) {
      this.segments.push(new Segment(this.segments[i - 1], this.l / this.n, 0, false));
    }
  }

  move(lastTarget, target) {
    const angle = Math.atan2(target.y - this.y, target.x - this.x);
    const dt = dist(lastTarget.x, lastTarget.y, target.x, target.y) + 5;
    const t = {
      x: target.x - 0.8 * dt * Math.cos(angle),
      y: target.y - 0.8 * dt * Math.sin(angle),
    };
    this.segments[this.n - 1].update(t);
    for (let i = this.n - 2; i >= 0; i--) {
      this.segments[i].update(this.segments[i + 1].pos);
    }
    if (dist(this.x, this.y, target.x, target.y) <= this.l + dist(lastTarget.x, lastTarget.y, target.x, target.y)) {
      this.segments[0].fallback({ x: this.x, y: this.y });
      for (let i = 1; i < this.n; i++) {
        this.segments[i].fallback(this.segments[i - 1].nextPos);
      }
    }
  }

  show(context, target) {
    if (dist(this.x, this.y, target.x, target.y) <= this.l) {
      context.globalCompositeOperation = 'lighter';
      context.beginPath();
      context.lineTo(this.x, this.y);
      for (let i = 0; i < this.n; i++) {
        this.segments[i].show(context);
      }
      context.strokeStyle = `hsl(${this.rand * 60 + 180},100%,${this.rand * 60 + 25}%)`;
      context.lineWidth = this.rand * 2;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.stroke();
      context.globalCompositeOperation = 'source-over';
    }
  }

  show2(context, target) {
    context.beginPath();
    if (dist(this.x, this.y, target.x, target.y) <= this.l) {
      context.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
      context.fillStyle = 'white';
    } else {
      context.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
      context.fillStyle = 'darkcyan';
    }
    context.fill();
  }
}

const dist = (p1x, p1y, p2x, p2y) => Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));

const initCanvas = (canvas) => {
  const context = canvas.getContext('2d');
  const w = (canvas.width = window.innerWidth);
  const h = (canvas.height = window.innerHeight);
  context.fillStyle = 'rgba(30,30,30,1)';
  context.fillRect(0, 0, w, h);

  const target = { x: 0, y: 0 };
  const lastTarget = {};

  const numt = 500;
  const maxl = 300;
  const minl = 50;
  const n = 30;
  const tentacles = [];

  for (let i = 0; i < numt; i++) {
    tentacles.push(
      new Tentacle(
        Math.random() * w,
        Math.random() * h,
        Math.random() * (maxl - minl) + minl,
        n,
        Math.random() * 2 * Math.PI
      )
    );
  }

  return { context, tentacles, target, lastTarget };
};

const handleResize = (canvas, context) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.fillStyle = 'rgba(30,30,30,1)';
  context.fillRect(0, 0, canvas.width, canvas.height);
};

const loop = (context, tentacles, target, lastTarget) => {
  const animate = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (target.x !== false) {
      tentacles.forEach(tentacle => {
        tentacle.move(lastTarget, target);
        tentacle.show2(context, target);
        tentacle.show(context, target);
      });
    }

    requestAnimationFrame(animate);
  };

  animate();
};

export default { initCanvas, handleResize, loop };