public class AnimalFactory
{

    public IAnimal makeAnimal(string type, string name)
    {

        if (type == "Lion")
        {
            return new Lion(name);

        }

        else if (type == "Elephant")
        {
            return new Elephant(name);
        }

        else {
            return new Lion("default animal");
        }

    }

}