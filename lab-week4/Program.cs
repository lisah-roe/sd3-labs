using System;

class Program
{

    static void Main()
    {

        // Demonstrate the singleton pattern
        // Now lets make a zoo, there should only be one.
        Zoo zoo = Zoo.getInstance();

        /* Create the zoo without a factory
        zoo.addAnimal(new Lion("Elsa"));
        zoo.addAnimal(new Elephant("Elmer"));
        zoo.addAnimal(new Elephant("George"));
        zoo.addAnimal(new Lion("Walter"));
        */

      // Create the zoo with factory.  Now the client code doens't need to know anything about classes for different animals.
      // We use an animal factory object that is part of the zoo singleton.
      // We use the IAnimal interface we created already.
        zoo.addAnimal("Lion", "Elsa");
        zoo.addAnimal("Elephant", "Elmer");

        // Get the instance again and see if its the same
        // Note that this cannot run:  Zoo zoo1 = new Zoo();

        Zoo zoo1 = Zoo.getInstance();

        zoo1.feedAnimals();
        zoo1.listAnimals();


        // Lets demonstrate the builder pattern. Here we have many varying components that make up the enclosures in the zoo. 
        // Lets create an enclosure for the lions

        AnimalEnclosure LionHouse = new AnimalEnclosure("The Lion House");
        LionHouse.addFeature(new grassEnclosureFeature("A large meadow", "big"));
        LionHouse.addFeature(new waterEnclosureFeature("small water hole", "small"));

        AnimalEnclosure penguinPond = new AnimalEnclosure("The Penguins place");
        penguinPond.addFeature(new grassEnclosureFeature("A small patch of grass", "small"));
        penguinPond.addFeature(new waterEnclosureFeature("An enormous pond", "very big"));

        LionHouse.describeEnclosure();
        penguinPond.describeEnclosure();

        // TODO add inheritance for the enclosure features.
        // TODO consider adding a factory method to Animal Enclosure to make it neater in creating features.
        // TODO consider abstract factory pattern for enclosures for different kinds of animals
        // TODO add the animals to their enclosures
        
    }
}