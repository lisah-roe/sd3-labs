public class AnimalEnclosure
{
   private string name;

    private List<IEnclosureFeature> features = new List<IEnclosureFeature>();

    public void addFeature(IEnclosureFeature feature)
    {
        this.features.Add(feature);
    }

    public AnimalEnclosure(string name) {
      this.name = name;

    }
    public int getCost()
    {

        int cost = 0;
        foreach (IEnclosureFeature feature in this.features)
        {
            cost = +feature.getCost();
        }
        return cost;

    }

    public void describeEnclosure()
    {
        Console.WriteLine($"Enclosure {this.name} has features:");
        foreach (IEnclosureFeature feature in this.features)
        {
            Console.WriteLine($"    {feature.getName()}");
        }

    }
}