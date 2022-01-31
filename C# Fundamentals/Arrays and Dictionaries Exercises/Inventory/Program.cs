using System;
using System.Collections.Generic;
using System.Linq;

namespace Emoji_Detector
{
    class Program
    {
        static void Main(string[] args)
        {
            List<string> journal = Console.ReadLine()
                .Split(", ")
                .ToList();

            string command = Console.ReadLine();

            while (command != "Craft!")
            {
                string[] tokens = command
                    .Split(" - ")
                    .ToArray();

                string action = tokens[0];

                switch (action)
                {
                    case "Collect":
                        if (!journal.Contains(tokens[1]))
                        {
                            journal.Add(tokens[1]);
                        }
                        break;

                    case "Drop":
                        journal.Remove(tokens[1]);
                        break;

                    case "Combine Items":

                        string[] items = tokens[1]
                            .Split(":")
                            .ToArray();

                        string oldItem = items[0];
                        string newItem = items[1];

                        if (journal.Contains(oldItem))
                        {
                            journal.Insert(journal.IndexOf(oldItem) + 1, newItem);
                        }
                        break;

                    case "Renew":
                        if (journal.Contains(tokens[1]))
                        {
                            int oldPosition = journal.IndexOf(tokens[1]);
                            journal.RemoveAt(oldPosition);
                            journal.Add(tokens[1]);
                        }
                        break;

                    default:
                        break;
                }

                command = Console.ReadLine();
            }

            Console.WriteLine(string.Join(", ", journal));
        }
    }
}
