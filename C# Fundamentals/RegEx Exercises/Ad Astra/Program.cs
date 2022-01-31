using System;
using System.Text.RegularExpressions;

namespace FINAL_EXAM_Ad_Astra
{
    class Program
    {
        static void Main(string[] args)
        {
            string input = Console.ReadLine();

            string pattern = @"([\||\#])([A-z\s]+)\1([\d]{2}\/[\d]{2}\/[\d]{2})\1([0-9]{1,10000})\1";

            MatchCollection foods = Regex.Matches(input, pattern);

            int calories = 0;

            foreach (Match food in foods)
            {
                calories += int.Parse(food.Groups[4].Value.ToString());
            }

            int counter = 0;
            while (calories >= 2000)
            {
                calories -= 2000;
                counter++;
            }

            Console.WriteLine($"You have food to last you for: {counter} days!");
            foreach (Match match in foods)
            {
                Console.WriteLine($"Item: {match.Groups[2].Value}, Best before: {match.Groups[3].Value}, Nutrition: {match.Groups[4].Value}");
            }
        }
    }
}
