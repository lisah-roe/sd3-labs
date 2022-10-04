// Make the zoo into a singleton as it is the single point of reference for the zoo.
class Zoo
{
    // The Zoo holds an instance of itself.
    private static Zoo zooInstance = null;
    private List<IAnimal> animals = new List<IAnimal>();

    // Have a factory class ready and waiting
    private AnimalFactory animalFactory = new AnimalFactory();

    private Zoo()
    {

    }

    public static Zoo getInstance()
    {

        // Make sure zoo is instantiated only once
        if (zooInstance == null)
        {
            zooInstance = new Zoo();
        }
        return zooInstance;

    }

    public void addAnimal(string type, string name)
    {
        this.animals.Add(this.animalFactory.makeAnimal(type, name));

    }

    public void feedAnimals()
    {

        foreach (IAnimal animal in animals)
        {
            Console.WriteLine(animal.getFood());
        }
    }

    public void listAnimals()
    {
        foreach (IAnimal animal in animals)
        {
            Console.WriteLine(animal.getName());
        }
    }
}