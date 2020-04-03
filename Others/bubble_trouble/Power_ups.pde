class Power implements IPower
{
  float x;
  float y;
  void Draw()
  {
  }
  
}
class S_Power extends Power
{
  S_Power(float a, float b)
  {
    this.x=a;
    this.y=b;
  }
  
   void Draw()
  {
    this.y = this.y + 2;
    rect(this.x, this.y,20,20);
  }
}
class E_Power extends Power
{
  E_Power(float a,float b)
  {
    this.x=a;
    this.y=b;
  }
  void Draw()
  {
    this.y = this.y +2;
    circle(this.x,this.y,5);
  }
}
interface IPower
{
  
  void Draw();
}
