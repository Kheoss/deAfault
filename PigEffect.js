function PigNose(tx, ty, ts) {
    this.x = tx;
    this.y = ty;
    this.size = ts;
    this.angle = 0;
  
    this.update = function(mx, i,j) {
      this.x = i;
      this.y = j;
      this.angle += mx;
      //this.angle = atan2(my - this.y, mx - this.x);
    };
  
    this.display = function() {
      push();
      translate(this.x, this.y);
      fill(effectColor.r,effectColor.g,effectColor.b,effectColor.a);
      ellipse(0, 0, this.size, this.size * 0.9);    
      fill(effectColor.r/2,effectColor.g/2,effectColor.b/2,effectColor.a);
      ellipse(this.size / 4, 0, this.size / 2.4, this.size / 2.4);
      ellipse(this.size / 4 - 30, 0, this.size / 2.4, this.size / 2.4);
      pop();
    };
  }