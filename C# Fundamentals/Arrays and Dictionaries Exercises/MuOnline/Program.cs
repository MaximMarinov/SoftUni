using System;
using System.Linq;

namespace Emoji_Detector
{
    class Program
    {
        static void Main(string[] args)
        {
            int health = 100;
            int bitcoins = 0;

            string[] rooms = Console.ReadLine()
                .Split("|")
                .ToArray();

            int currentHealth = health;
            for (int i = 0; i < rooms.Length; i++)
            {
                string[] tokens = rooms[i]
                    .Split(" ")
                    .ToArray();

                string command = tokens[0];

                switch (command)
                {
                    case "potion":
                        int healAmount = int.Parse(tokens[1]);
                        currentHealth += healAmount;

                        if (currentHealth > 100)
                        {
                            Console.WriteLine($"You healed for {health - (currentHealth - healAmount)} hp.");
                            while (currentHealth > 100)
                            {
                                currentHealth--;
                            }
                        }
                        else
                        {
                            Console.WriteLine($"You healed for {healAmount} hp.");
                        }

                        Console.WriteLine($"Current health: {currentHealth} hp.");

                        break;

                    case "chest":
                        int bitcoinsFound = int.Parse(tokens[1]);
                        bitcoins += bitcoinsFound;
                        Console.WriteLine($"You found {bitcoinsFound} bitcoins.");
                        break;

                    default:
                        int damage = int.Parse(tokens[1]);
                        currentHealth -= damage;

                        if (currentHealth > 0)
                        {
                            Console.WriteLine($"You slayed {command}.");
                        }
                        else
                        {
                            Console.WriteLine($"You died! Killed by {command}.");
                            Console.WriteLine($"Best room: {i + 1}");
                            return;
                        }

                        break;
                }

            }

            Console.WriteLine("You've made it!");
            Console.WriteLine($"Bitcoins: {bitcoins}");
            Console.WriteLine($"Health: {currentHealth}");
        }
    }
}
