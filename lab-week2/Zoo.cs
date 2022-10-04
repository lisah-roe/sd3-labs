class Zoo
{
   List<IAnimal> animals = new List<IAnimal>();

    public void addAnimal(IAnimal animal)
    {
        this.animals.Add(animal);

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