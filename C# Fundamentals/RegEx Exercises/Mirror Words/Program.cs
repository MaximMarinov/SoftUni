using System;
using System.Text.RegularExpressions;
using System.Linq;
using System.Collections.Generic;

namespace _03._Programming_Fundamentals_Final_Exam_Retake
{
    class Program
    {
        static void Main(string[] args)
        {
            string input = Console.ReadLine();

            string pattern = @"([#@])([A-z]{3,})\1{2}([A-z]{3,})\1";

            var wordsPairsFound = Regex.Matches(input, pattern);

            if (wordsPairsFound.Count > 0)
            {
                Console.WriteLine($"{wordsPairsFound.Count} word pairs found!");
            }
            else
            {
                Console.WriteLine("No word pairs found!");
            }

            var mirrorWords = new Dictionary<string, string>();

            foreach (Match word in wordsPairsFound)
            {
                string firstMirrorWord = "";
                string secondMirrorWord = "";

                for (int i = word.Groups[3].Value.Length - 1; i >= 0; i--)
                {
                    secondMirrorWord += word.Groups[3].Value[i].ToString();
                }

                for (int i = word.Groups[2].Value.Length - 1; i >= 0; i--)
                {
                    firstMirrorWord += word.Groups[2].Value[i].ToString();
                }

                if (secondMirrorWord == word.Groups[2].Value && firstMirrorWord == word.Groups[3].Value)
                {
                    mirrorWords.Add(word.Groups[2].Value, firstMirrorWord);
                }
            }

            if (mirrorWords.Count > 0)
            {
                Console.WriteLine("The mirror words are: ");
            }
            else
            {
                Console.WriteLine("No mirror words!");
            }

            var pairs = new List<string>();

            foreach (var mirror in mirrorWords)
            {
                string pair = string.Join(" <=> ", mirror.Key, mirror.Value);

                pairs.Add(pair);
            }

            Console.WriteLine(string.Join(", ", pairs));
        }
    }
}
