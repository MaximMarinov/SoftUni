using System;
using System.Collections.Generic;
using System.Linq;

namespace Emoji_Detector
{
    class Program
    {
        static void Main(string[] args)
        {
            List<int> pirateShipStatus = Console.ReadLine()
                .Split(">", StringSplitOptions.RemoveEmptyEntries)
                .Select(int.Parse)
                .ToList();

            List<int> warShipStatus = Console.ReadLine()
                .Split(">", StringSplitOptions.RemoveEmptyEntries)
                .Select(int.Parse)
                .ToList();

            int maxHealthToBeReached = int.Parse(Console.ReadLine());

            string command = Console.ReadLine();

            while (command != "Retire")
            {
                string[] tokens = command
                    .Split(" ", StringSplitOptions.RemoveEmptyEntries)
                    .ToArray();

                string action = tokens[0];

                switch (action)
                {
                    case "Fire":
                        int index = int.Parse(tokens[1]);
                        int fireDamage = int.Parse(tokens[2]);

                        if (index < warShipStatus.Count && index >= 0)
                        {
                            warShipStatus[index] -= fireDamage;

                            if (warShipStatus[index] <= 0)
                            {
                                Console.WriteLine("You won! The enemy ship has sunken.");
                                return;
                            }
                        }

                        break;

                    case "Defend":

                        int startIndex = int.Parse(tokens[1]);
                        int endIndex = int.Parse(tokens[2]);
                        int defendDamage = int.Parse(tokens[3]);

                        if (startIndex >= 0 && endIndex < pirateShipStatus.Count)
                        {
                            for (int i = startIndex; i <= endIndex; i++)
                            {
                                pirateShipStatus[i] -= defendDamage;

                                if (pirateShipStatus[i] <= 0)
                                {
                                    Console.WriteLine("You lost! The pirate ship has sunken.");
                                    return;
                                }
                            }
                        }
                        break;

                    case "Repair":
                        int indexToRepair = int.Parse(tokens[1]);
                        int healthForRepair = int.Parse(tokens[2]);

                        if (indexToRepair < pirateShipStatus.Count && indexToRepair >= 0)
                        {
                            pirateShipStatus[indexToRepair] += healthForRepair;

                            if (pirateShipStatus[indexToRepair] > maxHealthToBeReached)
                            {
                                pirateShipStatus[indexToRepair] = maxHealthToBeReached;
                            }
                        }
                        break;

                    case "Status":
                        int neededForRepair = pirateShipStatus
                            .Where(section => section < maxHealthToBeReached * 0.20)
                            .Count();

                        Console.WriteLine($"{neededForRepair} sections need repair.");
                        break;

                    default:
                        break;
                }

                command = Console.ReadLine();
            }

            int pirateShipSum = 0;

            for (int i = 0; i < pirateShipStatus.Count; i++)
            {
                pirateShipSum += pirateShipStatus[i];
            }

            int warShipSum = 0;

            for (int i = 0; i < warShipStatus.Count; i++)
            {
                warShipSum += warShipStatus[i];
            }

            Console.WriteLine($"Pirate ship status: {pirateShipSum}");
            Console.WriteLine($"Warship status: {warShipSum}");
        }
    }
}
