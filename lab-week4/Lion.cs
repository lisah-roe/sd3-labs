class Lion : IAnimal 
{
    // Properties
    private string name;
    private string sound = "ROAAAR";
    private string eats = "Lots of meat";

    public Lion(string name) {
        this.name = name;
    }
    public string makeSound() {
        return this.sound;

    }
    public string getFood() {
        return $"give me {this.eats}";
    }
    public string getName() {
        return $"{this.name}, the {this.GetType()}";
    }
    
    public void setName(string name) {

        this.name = name;

    }


}