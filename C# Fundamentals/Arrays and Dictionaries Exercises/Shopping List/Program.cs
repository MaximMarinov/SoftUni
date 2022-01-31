using System;
using System.Collections.Generic;
using System.Linq;

namespace Emoji_Detector
{
    class Program
    {
        static void Main(string[] args)
        {
            List<string> groceries = Console.ReadLine()
                .Split("!")
                .ToList();

            string command = Console.ReadLine();

            while (command != "Go Shopping!")
            {
                string[] tokens = command
                    .Split(" ")
                    .ToArray();

                string action = tokens[0];
                string item = tokens[1];

                switch (action)
                {
                    case "Urgent":
                        if (!groceries.Contains(item))
                        {
                            groceries.Add(item);
                            int oldPosition = groceries.IndexOf(item);
                            groceries.Insert(0, item);
                            groceries.RemoveAt(oldPosition + 1);
                        }
                        break;

                    case "Unnecessary":
                        groceries.Remove(item);
                        break;

                    case "Correct":
                        string oldItem = tokens[1];
                        string newItem = tokens[2];

                        if (groceries.Contains(oldItem))
                        {
                            int oldItemIndex = groceries.IndexOf(oldItem);

                            groceries[oldItemIndex] = newItem;
                        }
                        break;

                    case "Rearrange":
                        if (groceries.Contains(item))
                        {
                            int oldPosition = groceries.IndexOf(item);
                            groceries.RemoveAt(oldPosition);
                            groceries.Add(item);
                        }

                        break;

                    default:
                        break;
                }

                command = Console.ReadLine();
            }

            Console.WriteLine(string.Join(", ", groceries));
        }
    }
}
