class Player
{
  float x=1080/2;
  float y=400-40;
  float w=40;
  float h=40;
  boolean shoot=false;
  int glide = 0;
  int timer= 100;
  ArrayList<Bullet> blist = new ArrayList<Bullet>();
  
  void Draw()
  {
    if(glide==-1)
    {
      if(timer<=0)
      {
        glide = 0;
        timer = 100;
      }
      this.x = this.x-timer*0.05;
      timer=timer-1;
      rect(this.x,this.y,w,h);
    }
    else if(glide==1)
    {
      if(timer<=0)
      {
        glide = 0;
        timer = 100;
      }
      this.x = this.x+timer*0.05;
      timer=timer-1;
      rect(this.x,this.y,w,h);
    }
    else
    {
    rect(this.x,this.y,w,h);
    }
    if(shoot)
    {
      if(blist.get(0).Final.y<=0)
      {
        shoot =false;
        blist.clear();
        return;
      }
      blist.get(0).initial.y = blist.get(0).initial.y - 20;
      blist.get(0).Final.x= blist.get(0).initial.x+20;
      blist.get(0).Final.y = blist.get(0).Final.y - 20;
      line(blist.get(0).initial.x+20,blist.get(0).initial.y,blist.get(0).Final.x,blist.get(0).Final.y);
    }
  }
  void ShootBullet(float x, float y)
  {
    Bullet b = new Bullet(x,y);
    blist.add(b);
  }
}
