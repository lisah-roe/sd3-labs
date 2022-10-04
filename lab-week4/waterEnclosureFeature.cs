class waterEnclosureFeature : IEnclosureFeature {

    private string name;
    private int cost = 5;
    private string dimensions;

    public waterEnclosureFeature(string name, string dimensions){
        this.name = name;
        this.dimensions = dimensions;
    }

    public string getName() {
        return this.name;
    }

    public int getCost() {
        return this.cost;

    }

    public string getDimensions() {
        return this.dimensions;
    }

}