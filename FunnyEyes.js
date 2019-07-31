function Eye(tx, ty, ts) {
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
      fill(255);
      ellipse(0, 0, this.size, this.size);
      rotate(this.angle);
      if(effectColor.a == 0)
      fill(153, 204, 0);
      else fill(effectColor.r,effectColor.g,effectColor.b);
      ellipse(this.size / 4, 0, this.size / 2, this.size / 2);
      pop();
    };
  }