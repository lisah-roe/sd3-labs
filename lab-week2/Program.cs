using System;

class Program
{

    static void Main()
    {
        // Create a list of different shapes
        List<IShape> shapes = new List<IShape>();
        Square s1 = new Square();
        s1.setHeight(30);
        shapes.Add(s1);
        Circle c1 = new Circle();
        c1.radius = 20;
        shapes.Add(c1);
        Circle c2 = new Circle();
        shapes.Add(c2);

        // Loop through the shapes getting their perimeter and radius - code works regardless if its a circle or a square
        foreach (IShape s in shapes) {
            Console.WriteLine($"{s.GetType()} has perimeter {s.getPerimeter()} and area {s.getArea()}");
        }

        // Now lets make a zoo
        Zoo zoo = new Zoo();

        // Add a lion
        zoo.addAnimal(new Lion("Elsa"));
        zoo.addAnimal(new Elephant("Elmer"));
        zoo.addAnimal(new Elephant("George"));
        zoo.addAnimal(new Lion("Walter"));

        zoo.listAnimals();

        zoo.feedAnimals();
        
    }
}