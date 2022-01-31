using System;
using System.Text;
using System.Linq;

namespace FINAL_EXAM_Secret_Chat
{
    class Program
    {
        static void Main(string[] args)
        {
            string message = Console.ReadLine();

            string command = Console.ReadLine();

            while (command != "Reveal")
            {
                string[] tokens = command.Split(":|:", StringSplitOptions.RemoveEmptyEntries);
                string action = tokens[0];

                switch (action)
                {
                    case "InsertSpace":
                        int index = int.Parse(tokens[1]);
                        message = message.Insert(index, " ");
                        Console.WriteLine(message);
                        break;

                    case "Reverse":
                        string substring = tokens[1];

                        if (message.Contains(substring))
                        {
                            int indexOfSubstring = message.IndexOf(substring);
                            message = message.Remove(indexOfSubstring, substring.Length);

                            for (int i = substring.Length - 1; i >= 0; i--)
                            {
                                message += substring[i];
                            }

                            Console.WriteLine(message);
                        }
                        else
                        {
                            Console.WriteLine("error");
                        }

                        break;

                    case "ChangeAll":
                        string oldString = tokens[1];
                        string newString = tokens[2];

                        if (message.Contains(oldString))
                        {
                            message = message.Replace(oldString, newString);
                            Console.WriteLine(message);
                        }

                        break;

                    default:
                        break;
                }

                command = Console.ReadLine();
            }

            Console.WriteLine($"You have a new text message: {message}");
        }
    }
}
