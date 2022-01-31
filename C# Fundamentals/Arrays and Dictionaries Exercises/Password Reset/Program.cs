using System;
using System.Linq;
using System.Text;

namespace FINAL_EXAM_Password_Reset
{
    class Program
    {
        static void Main(string[] args)
        {
            string password = Console.ReadLine();

            string command = Console.ReadLine();

            while (command != "Done")
            {
                string[] tokens = command.Split(" ", StringSplitOptions.RemoveEmptyEntries);

                string action = tokens[0];

                switch (action)
                {
                    case "TakeOdd":
                        string oddPass = "";

                        for (int i = 0; i < password.Length; i++)
                        {
                            if (i % 2 == 1)
                            {
                                oddPass += password[i].ToString();
                            }
                        }

                        password = oddPass;
                        Console.WriteLine(password);

                        break;

                    case "Cut":
                        int index = int.Parse(tokens[1]);
                        int count = int.Parse(tokens[2]);

                        password = password.Remove(index, count);

                        Console.WriteLine(password);

                        break;

                    case "Substitute":
                        string oldString = tokens[1];
                        string newString = tokens[2];

                        if (password.Contains(oldString))
                        {
                            password = password.Replace(oldString, newString);
                            Console.WriteLine(password);
                        }
                        else
                        {
                            Console.WriteLine("Nothing to replace!");
                        }

                        break;

                    default:
                        break;
                }

                command = Console.ReadLine();
            }

            Console.WriteLine($"Your password is: {password}");
        }
    }
}
