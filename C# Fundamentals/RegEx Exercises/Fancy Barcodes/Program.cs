using System;
using System.Text.RegularExpressions;

namespace FINAL_EXAM_Fancy_Barcodes
{
    class Program
    {
        static void Main(string[] args)
        {
            string pattern = @"@#+([A-Z]{1}[A-Za-z0-9]{4,}[A-Z]{1})@#+";

            int n = int.Parse(Console.ReadLine());

            for (int i = 0; i < n; i++)
            {
                string input = Console.ReadLine();

                var match = Regex.Match(input, pattern);

                if (match.Success)
                {
                    string productGroup = "";

                    for (int j = 0; j < match.Groups[1].Value.Length; j++)
                    {
                        if (char.IsDigit(match.Groups[1].Value[j]))
                        {
                            productGroup += match.Groups[1].Value[j].ToString();
                        }
                    }

                    if (productGroup == "")
                    {
                        productGroup = "00";
                    }

                    Console.WriteLine($"Product group: {productGroup}");
                }
                else
                {
                    Console.WriteLine("Invalid barcode");
                }
            }
        }
    }
}
