// Note that inheritance could be used here
class grassEnclosureFeature : IEnclosureFeature
{

    private string name;
    private int cost = 5;
    private string dimensions;

    public grassEnclosureFeature(string name, string dimensions)
    {
        this.name = name;
        this.dimensions = dimensions;
    }

    public string getName()
    {
        return this.name;
    }

    public int getCost()
    {
        return this.cost;

    }

    public string getDimensions()
    {
        return this.dimensions;
    }

}