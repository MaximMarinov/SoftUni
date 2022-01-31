using System;
using System.Text.RegularExpressions;
using System.Linq;
using System.Collections.Generic;

namespace Final_Exam_02._Emoji_Detector
{
    class Program
    {
        static void Main(string[] args)
        {
            string input = Console.ReadLine();

            string pattern = @"(:|\*)\1([A-Z]{1}[a-z]{2,})\1{2}";

            long coolTreshold = 1;

            for (int i = 0; i < input.Length; i++)
            {
                if (char.IsDigit(input[i]))
                {
                    coolTreshold *= int.Parse(input[i].ToString());
                }
            }
            Console.WriteLine($"Cool threshold: {coolTreshold}");

            MatchCollection emojisFound = Regex.Matches(input, pattern);

            Console.WriteLine($"{emojisFound.Count} emojis found in the text. The cool ones are: ");

            var coolEmojis = new List<string>();

            foreach (Match emoji in emojisFound)
            {
                int coolnes = 0;

                for (int i = 0; i < emoji.Groups[2].Value.Length; i++)
                {
                    coolnes += emoji.Groups[2].Value[i];
                }

                if (coolnes > coolTreshold)
                {
                    coolEmojis.Add(emoji.ToString());
                }
            }

            foreach (var coolEmoji in coolEmojis)
            {
                Console.WriteLine(coolEmoji);
            }
        }
    }
}
