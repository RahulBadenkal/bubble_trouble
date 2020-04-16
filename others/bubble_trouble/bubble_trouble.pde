import sprites.utils.*; //<>// //<>//
import sprites.maths.*;
import sprites.*;
import java.util.Map;

Sprite trap;
Ball b = new Ball(40, 40, 30);
ArrayList<Ball> balls = new ArrayList<Ball>();

void setup()
{
  size(1080, 400);  // Size must be the first statement
  stroke(255);     // Set line drawing color to white
  frameRate(30);
  trap = new Sprite(this, "ghostmask2.png", 1, 1, 50);
  trap.setXY(1080/2, 400 - 40);
  balls.add(b);
}

Player p =new Player();
ArrayList<Power> plist = new ArrayList<Power>();
int roof_Height=0;
boolean lvl=false;
void draw()
{
  background(0);
  if (keyPressed)
  {
    if (keyCode==LEFT)
    {
      p.glide=0;
      p.timer=100;
      p.x=p.x-5;
    }
    if (keyCode==RIGHT)
    {
      p.glide=0;
      p.timer=100;
      p.x=p.x+5;
    }
    if (keyCode==UP)
    {
      lvl=true;
    }
    if (key==ENTER)
    {
      p.ShootBullet(p.x, p.y);
      p.shoot=true;
    }
  }
  HandleCollisions();
  //if (lvl)
  //{
  //  roof_Height= roof_Height + 1;
  //  line(0, roof_Height, width, roof_Height);
  //}
  for (Ball b : balls)
  {
    b.Draw();
  }
  p.Draw();
  if (plist.size()>0)
    plist.get(0).Draw();
}

void InstantiatePower(float x, float y)
{
  int rand = int(random(1, 3));
  plist.clear();
  if (rand==1)
  {
    plist.add(new S_Power(x, y));
  } else
  {
    plist.add(new E_Power(x, y));
  }
}
void Split(float x, float y, Ball b)
{
  Ball b1 = new Ball(x, y, 15);
  b1.velocity_x = 10;
  Ball b2 = new Ball(x, y, 15);
  b2.velocity_x = 10;
  b2.d=-1;
  balls.add(b1);
  balls.add(b2);
  balls.remove(b);
}

void HandleCollisions()
{
  HashMap<PVector, Ball> hm = new HashMap<PVector, Ball>(); 
  for (Bullet bullet : p.blist)
  {
    for (Ball ball : balls)
    {
      if (bullet.Final.y<=ball.y && abs(bullet.Final.x-ball.x)<=5)
      {
        hm.put(new PVector(ball.x, ball.y), ball);
      }
    }
  }
  for (Map.Entry<PVector, Ball> me : hm.entrySet())
  {
    InstantiatePower(me.getKey().x, me.getKey().y);
    Split(me.getKey().x, me.getKey().y, me.getValue());
  }
}

void keyReleased()
{
  if (keyCode==LEFT)
    p.glide =-1 ;
  if (keyCode==RIGHT)
    p.glide=1;
}
