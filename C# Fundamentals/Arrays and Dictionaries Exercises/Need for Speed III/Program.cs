using System;
using System.Collections.Generic;
using System.Linq;

namespace FINAL_EXAM_Need_for_Speed_III
{
    class Program
    {
        static void Main(string[] args)
        {
            var cars = new Dictionary<string, List<int>>();

            int n = int.Parse(Console.ReadLine());

            for (int i = 0; i < n; i++)
            {
                string input = Console.ReadLine();

                string[] tokens = input.Split("|");
                string carName = tokens[0];
                int carMileage = int.Parse(tokens[1]);
                int carFuel = int.Parse(tokens[2]);

                if (!cars.ContainsKey(carName))
                {
                    cars.Add(carName, new List<int>()
                    {
                        {carMileage},
                        {carFuel}
                    });
                }
            }

            string command = Console.ReadLine();

            while (command != "Stop")
            {
                string[] tokens = command.Split(" : ", StringSplitOptions.RemoveEmptyEntries);
                string action = tokens[0];
                string carName = tokens[1];

                switch (action)
                {
                    case "Drive":
                        int distanceToDrive = int.Parse(tokens[2]);
                        int fuelNeeded = int.Parse(tokens[3]);

                        if (cars[carName][1] < fuelNeeded)
                        {
                            Console.WriteLine("Not enough fuel to make that ride");
                        }
                        else
                        {
                            cars[carName][0] += distanceToDrive;
                            cars[carName][1] -= fuelNeeded;

                            Console.WriteLine($"{carName} driven for {distanceToDrive} kilometers. {fuelNeeded} liters of fuel consumed.");
                        }

                        if (cars[carName][0] >= 100000)
                        {
                            cars.Remove(carName);
                            Console.WriteLine($"Time to sell the {carName}!");
                        }

                        break;

                    case "Refuel":
                        int currentFuel = cars[carName][1];
                        int fuelToRefill = int.Parse(tokens[2]);

                        cars[carName][1] += fuelToRefill;

                        while (cars[carName][1] > 75)
                        {
                            cars[carName][1]--;
                        }

                        Console.WriteLine($"{carName} refueled with {cars[carName][1] - currentFuel} liters");

                        break;

                    case "Revert":
                        int kilometersToDecrease = int.Parse(tokens[2]);

                        cars[carName][0] -= kilometersToDecrease;
                        Console.WriteLine($"{carName} mileage decreased by {kilometersToDecrease} kilometers");

                        if (cars[carName][0] < 10000)
                        {
                            cars[carName][0] = 10000;
                        }

                        break;

                    default:
                        break;
                }

                command = Console.ReadLine();
            }

            cars = cars.OrderByDescending(c => c.Value[0])
                    .ThenBy(c => c.Key)
                    .ToDictionary(k => k.Key, v => v.Value);

            foreach (var car in cars)
            {
                Console.WriteLine($"{car.Key} -> Mileage: {cars[car.Key][0]} kms, Fuel in the tank: {cars[car.Key][1]} lt.");
            }
        }
    }
}
