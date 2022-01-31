using System;
using System.Collections.Generic;
using System.Linq;

namespace Heroes_of_Code_and_Logic_VII
{
    class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());

            var heroes = new Dictionary<string, List<int>>();

            for (int i = 0; i < n; i++)
            {
                string[] input = Console.ReadLine().Split(" ");

                string heroName = input[0];
                int HP = int.Parse(input[1]);
                int MP = int.Parse(input[2]);

                if (HP > 100)
                {
                    HP = 100;
                }

                if (MP > 200)
                {
                    MP = 200;
                }

                if (!heroes.ContainsKey(heroName))
                {
                    heroes.Add(heroName, new List<int>()
                    {
                        {HP},
                        {MP}
                    });
                }
            }

            string command = Console.ReadLine();

            while (command != "End")
            {
                string[] tokens = command.Split(" - ");

                string action = tokens[0];
                string heroName = tokens[1];

                int MP = heroes[heroName][1];

                switch (action)
                {
                    case "CastSpell":
                        int neededMP = int.Parse(tokens[2]);
                        string spell = tokens[3];

                        if (heroes[heroName][1] >= neededMP)
                        {
                            heroes[heroName][1] -= neededMP;
                            Console.WriteLine($"{heroName} has successfully cast {spell} and now has {heroes[heroName][1]} MP!");
                        }
                        else
                        {
                            Console.WriteLine($"{heroName} does not have enough MP to cast {spell}!");
                        }

                        break;


                    case "TakeDamage":
                        int damage = int.Parse(tokens[2]);
                        string attacker = tokens[3];

                        heroes[heroName][0] -= damage;

                        if (heroes[heroName][0] > 0)
                        {
                            Console.WriteLine($"{heroName} was hit for {damage} HP by {attacker} and now has {heroes[heroName][0]} HP left!");
                        }
                        else
                        {
                            Console.WriteLine($"{heroName} has been killed by {attacker}!");
                            heroes.Remove(heroName);
                        }

                        break;

                    case "Recharge":
                        int amountToRecharge = int.Parse(tokens[2]);
                        int currentMP = heroes[heroName][1];

                        heroes[heroName][1] += amountToRecharge;

                        while (heroes[heroName][1] > 200)
                        {
                            heroes[heroName][1]--;
                        }

                        Console.WriteLine($"{heroName} recharged for {heroes[heroName][1] - currentMP} MP!");
                        break;

                    case "Heal":
                        int amountToHeal = int.Parse(tokens[2]);
                        int currentHP = heroes[heroName][0];

                        heroes[heroName][0] += amountToHeal;

                        while (heroes[heroName][0] > 100)
                        {
                            heroes[heroName][0]--;
                        }

                        Console.WriteLine($"{heroName} healed for {heroes[heroName][0] - currentHP} HP!");
                        break;

                    default:
                        break;
                }

                command = Console.ReadLine();
            }

            heroes = heroes
                .OrderByDescending(x => x.Value[0])
                .ThenBy(x => x.Key)
                .ToDictionary(k => k.Key, v => v.Value);

            foreach (var hero in heroes)
            {
                Console.WriteLine($"{hero.Key}");
                Console.WriteLine($"  HP: {hero.Value[0]}");
                Console.WriteLine($"  MP: {hero.Value[1]}");

            }
        }
    }
}
