using System;
using System.Linq;
using System.Text;

namespace FINAL_EXAM_The_Imitation_Game
{
    class Program
    {
        static void Main(string[] args)
        {
            string message = Console.ReadLine();

            string command = Console.ReadLine();

            while (command != "Decode")
            {
                string[] tokens = command.Split("|");
                string action = tokens[0];

                switch (action)
                {
                    case "Move":
                        int n = int.Parse(tokens[1]);

                        string stringToMove = message.Substring(0, n);
                        message = message.Remove(0, n);
                        message = message.Insert(message.Length, stringToMove);

                        break;

                    case "Insert":
                        int index = int.Parse(tokens[1]);
                        string value = tokens[2];

                        message = message.Insert(index, value);

                        break;

                    case "ChangeAll":
                        string oldString = tokens[1];
                        string newString = tokens[2];

                        if (message.Contains(oldString))
                        {
                            message = message.Replace(oldString, newString);
                        }

                        break;

                    default:
                        break;
                }

                command = Console.ReadLine();
            }

            Console.WriteLine($"The decrypted message is: {message}");
        }
    }
}
