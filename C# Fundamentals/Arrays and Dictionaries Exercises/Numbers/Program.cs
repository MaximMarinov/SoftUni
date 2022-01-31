using System;
using System.Collections.Generic;
using System.Linq;

namespace Emoji_Detector
{
    class Program
    {
        static void Main(string[] args)
        {
            double[] numbers = Console.ReadLine()
                .Split(" ")
                .Select(double.Parse)
                .ToArray();

            double average = numbers.Average();

            double[] sequence = numbers
                .Where(number => number > average)
                .OrderByDescending(number => number)
                .Take(5)
                .ToArray();

            if (sequence.Length == 0)
            {
                Console.WriteLine("No");
            }
            else
            {
                Console.WriteLine(string.Join(" ", sequence));
            }
        }
    }
}
