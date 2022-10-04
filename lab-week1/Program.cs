using System;
class Program
{

    // static void main is the entrypoint to your program
    static void Main()
    {
        // Exercise 1: strings and ints - what happens if you 'add' and int to a string
        int a = 42;
        string b = "119";
        // If c should be a string, then the variables are concatenated
        string c = a + b;
        Console.WriteLine(c);

        // Exercise 1: strings and ints
        int d = 42;
        string e = "119";
        // What happens if you want an arithmetic add but one variable is a string
        int f = a + Convert.ToInt16(e);
        Console.WriteLine(f);


        // Example of a simple loop.  Note that the types that will be populateing the list need to be declared
        int[] g = { 1, 4, 6, 7 };
        // Print each item in b
        foreach (int item in g)
        {
            Console.WriteLine(item);
        }

        // Example of a conditional statement - inside a loop
        foreach (int item in g)
        {
            // Only output if the number is 6
            if (item == 6)
            {
                Console.WriteLine(item);
            }
        }

        // Making use of the Student class
        Student st1 = new Student("lisa", "haskel", 1);
        Student st2 = new Student("arturo", "araujo", 1);
        Console.WriteLine(st1.getFormattedName());
        Console.WriteLine(st2.getFormattedName());

    }
}