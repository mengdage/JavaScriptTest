class HoverIntent {
  constructor({
    sensitivity = 0.1,
    interval = 1000,
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.trackSpeed = this.trackSpeed.bind(this);

    this.elem.addEventListener('mouseover', this.onMouseOver);
    this.elem.addEventListener('mouseout', this.onMouseOut);
  }

  onMouseOver(e) {
    if(this.isOverElem) {
      return;
    }
    this.isOverElem = true;
    console.log(`
      -------- add onMouseMove ----------
    `);
    this.prevX = e.clientX;
    this.prevY = e.clientY;
    this.prevTime = Date.now();

    this.elem.addEventListener('mousemove', this.onMouseMove);
    this.clearTrackSpeed = setInterval(this.trackSpeed, this.interval);
  }

  onMouseMove(e) {
    this.curX = e.clientX;
    this.curY = e.clientY;
    this.curTime = Date.now();

  }

  trackSpeed() {
    let speed = 0;
    console.log('trackSpeed');

    if(!this.curTime || this.prevTime === this.curTime) {
      speed = 0;
    } else {
      speed = Math.sqrt(Math.pow(this.curX - this.prevX, 2) + Math.pow(this.curY - this.prevY,2)) / (this.curTime - this.prevTime) ;
    }

    if(speed < this.sensitivity) {
      // clear interval
      clearInterval(this.clearTrackSpeed);
      console.log('clear trackSpeed');
      // show tips
      console.log('tips');
    } else {
      this.prevX = this.curX;
      this.prevY = this.curX;
      this.prevTime = this.curTime;
    }
  }

  onMouseOut(e) {
    if(!e.relatedTarget || !this.elem.contains(e.relatedTarget)) {
      console.log(`
        -------- remove onMouseMove ----------
      `);
      clearInterval(this.clearTrackSpeed);
      this.elem.removeEventListener('mousemove', this.onMouseMove);
      this.isOverElem = false;  
    }

  }
}
