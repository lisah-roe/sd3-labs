class Circle : IShape 
{

public int radius { get ; set; } = 50;

public double getArea() {

        // Area of a circle πr-squared 
        return Math.PI * (this.radius * this.radius);
}

public double getPerimeter() {

    // Circumference of a circle 2πr
    return 2 * Math.PI * this.radius;

}




}