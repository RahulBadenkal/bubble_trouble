PImage player;
void setup()
{
   size(1366, 400);  // Size must be the first statement
   player = loadImage("player.png");
  stroke(255);     // Set line drawing color to white
  frameRate(30);
}
Ball b = new Ball(40,40,30);
Player p =new Player();
ArrayList<Power> plist = new ArrayList<Power>();
void draw()
{
  background(0);
  image(player,100,100,40,40);
  for(Bullet bullet:p.blist)
  {
    if(bullet.Final.y<=b.y && abs(bullet.Final.x-b.x)<=3)
    {
       InstantiatePower(b.x,b.y);
    }
  }
  b.Draw();
  p.Draw();
  if(plist.size()>0)
  plist.get(0).Draw();
}

void InstantiatePower(float x, float y)
{
  int rand = int(random(1,3));
  plist.clear();
  if(rand==1)
  {
    plist.add(new S_Power(x,y));
  }
  else
  {
    plist.add(new E_Power(x,y));
  }
}

void keyPressed()
{
  if(keyCode==LEFT)
  {
    p.glide=0;
    p.timer=100;
    p.x=p.x-5; //<>//
  }
  if(keyCode==RIGHT)
  {
    p.glide=0;
    p.timer=100;
    p.x=p.x+5;
  }
  if(key==ENTER)
  {
    p.ShootBullet(p.x,p.y);
    p.shoot=true;
  }
}

void keyReleased()
{
  if(keyCode==LEFT)
  p.glide =-1 ;
  if(keyCode==RIGHT)
  p.glide=1;
}
