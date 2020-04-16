class Ball
{
  float x;
  float y;
  float radius;
  float velocity=2;
  float velocity_x=2;
  int d=1,u=1;
  Ball(float x,float y,float r)
  {
    this.x=x;
    this.y=y;
    this.radius=r;
  }
  
  void Draw()
  {
    if(this.x>=width-this.radius || this.x<=this.radius)
    {
      d=d*-1;
    }
    this.x=this.x + velocity_x*d;
    if(this.y>=height-this.radius || this.y-roof_Height<= this.radius|| velocity<=0)
    {
      u=u*-1;
    }
    if(this.y>=height-this.radius)
    {
      velocity=30;
    }
    velocity = velocity + u*3*0.5;
    this.y = this.y + u*velocity;
    circle(this.x,this.y,this.radius);
  }
}
