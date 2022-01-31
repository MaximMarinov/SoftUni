using System;
using System.Collections.Generic;
using System.Linq;

namespace Treasure_Hunt
{
    class Program
    {
        static void Main(string[] args)
        {
            List<string> loot = Console.ReadLine()
                .Split("|")
                .ToList();

            List<string> stolenitems = new List<string>();

            string command = Console.ReadLine();

            while (command != "Yohoho!")
            {
                string[] tokens = command.Split(" ");

                string action = tokens[0];

                switch (action)
                {
                    case "Loot":
                        for (int i = 1; i < tokens.Length; i++)
                        {
                            if (!loot.Contains(tokens[i]))
                            {
                                loot.Insert(0, tokens[i]);
                            }
                        }
                        break;

                    case "Drop":
                        int index = int.Parse(tokens[1]);

                        if (index >= 0 && index < loot.Count)
                        {
                            string item = loot[index];
                            loot.RemoveAt(index);
                            loot.Add(item);
                        }
                        break;

                    case "Steal":
                        int itemsToSteal = int.Parse(tokens[1]);
                        if (itemsToSteal > loot.Count)
                        {
                            itemsToSteal = loot.Count;
                            for (int i = 0; i < itemsToSteal; i++)
                            {
                                stolenitems.Add(loot[loot.Count - 1]);
                                loot.RemoveAt(loot.Count - 1);

                            }
                            stolenitems.Reverse();
                            Console.WriteLine(string.Join(", ", stolenitems));
                            stolenitems.Clear();
                        }
                        else
                        {
                            stolenitems = loot.TakeLast(itemsToSteal).ToList();
                            loot.RemoveRange(loot.Count - itemsToSteal, itemsToSteal);
                            Console.WriteLine(string.Join(", ", stolenitems));
                            stolenitems.Clear();
                        }
                        break;

                    default:
                        break;
                }


                command = Console.ReadLine();
            }

            double sumOfLenght = 0;

            foreach (var item in loot)
            {
                sumOfLenght += item.Length;
            }

            if (loot.Count == 0)
            {
                Console.WriteLine("Failed treasure hunt.");
            }
            else
            {
                double pirateCredits = sumOfLenght / loot.Count;
                Console.WriteLine($"Average treasure gain: {pirateCredits:f2} pirate credits.");
            }
        }
    }
}
