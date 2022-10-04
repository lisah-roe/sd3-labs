class Square : IShape
{
 private int height = 200;

 public double getArea() {
   return this.height * this.height;
 }

public double getPerimeter() {
   return 4 * this.height;
}
 public void setHeight(int h) {
    this.height = h;
 }

}