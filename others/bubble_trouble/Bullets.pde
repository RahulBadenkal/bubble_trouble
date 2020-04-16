class Bullet
{
  PVector initial;
  PVector Final;
  Bullet(float x, float y)
  {
    this.initial = new PVector(x,y);
    this.Final = new PVector(x+20,y-20);
  }
}
