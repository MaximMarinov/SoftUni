using System;
using System.Collections.Generic;
using System.Linq;

namespace P_rates_MID_EXAM
{
    class Program
    {
        static void Main(string[] args)
        {
            string command = Console.ReadLine();

            var towns = new Dictionary<string, List<int>>();

            while (command != "Sail")
            {
                string[] tokens = command.Split("||", StringSplitOptions.RemoveEmptyEntries);
                string townName = tokens[0];
                int townPopulation = int.Parse(tokens[1]);
                int townGold = int.Parse(tokens[2]);

                if (!towns.ContainsKey(townName))
                {
                    towns.Add(townName, new List<int>()
                    {
                        {townPopulation},
                        {townGold}
                    });
                }
                else
                {
                    towns[townName][0] += townPopulation;
                    towns[townName][1] += townGold;
                }

                command = Console.ReadLine();
            }

            command = Console.ReadLine();

            while (command != "End")
            {
                string[] tokens = command.Split("=>", StringSplitOptions.RemoveEmptyEntries);
                string action = tokens[0];
                string townName = tokens[1];

                switch (action)
                {
                    case "Plunder":
                        int peopleKilled = int.Parse(tokens[2]);
                        int goldStolen = int.Parse(tokens[3]);

                        towns[townName][0] -= peopleKilled;
                        towns[townName][1] -= goldStolen;

                        Console.WriteLine($"{townName} plundered! {goldStolen} gold stolen, {peopleKilled} citizens killed.");

                        if (towns[townName][0] <= 0 || towns[townName][1] <= 0)
                        {
                            Console.WriteLine($"{townName} has been wiped off the map!");
                            towns.Remove(townName);
                        }

                        break;

                    case "Prosper":
                        int goldAdded = int.Parse(tokens[2]);

                        if (goldAdded < 0)
                        {
                            Console.WriteLine("Gold added cannot be a negative number!");
                        }
                        else
                        {
                            towns[townName][1] += goldAdded;
                            Console.WriteLine($"{goldAdded} gold added to the city treasury. {townName} now has {towns[townName][1]} gold.");
                        }

                        break;

                    default:
                        break;
                }

                command = Console.ReadLine();
            }

            towns = towns
                .OrderByDescending(x => x.Value[1])
                .ThenBy(x => x.Key)
                .ToDictionary(k => k.Key, v => v.Value);

            Console.WriteLine($"Ahoy, Captain! There are {towns.Count} wealthy settlements to go to:");

            foreach (var town in towns)
            {
                Console.WriteLine($"{town.Key} -> Population: {towns[town.Key][0]} citizens, Gold: {towns[town.Key][1]} kg");
            }
        }
    }
}
