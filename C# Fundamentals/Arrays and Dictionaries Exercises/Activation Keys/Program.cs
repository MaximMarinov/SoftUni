using System;
using System.Linq;
using System.Text;

namespace Final_Exam_01._Activation_Keys
{
    class Program
    {
        static void Main(string[] args)
        {
            string activationKey = Console.ReadLine();

            string command = Console.ReadLine();

            while (command != "Generate")
            {
                string[] tokens = command.Split(">>>", StringSplitOptions.RemoveEmptyEntries);

                string action = tokens[0];

                switch (action)
                {
                    case "Contains":
                        string substring = tokens[1];

                        if (activationKey.Contains(substring))
                        {
                            Console.WriteLine($"{activationKey} contains {substring}");
                        }
                        else
                        {
                            Console.WriteLine("Substring not found!");
                        }

                        break;

                    case "Flip":
                        string UpperLower = tokens[1];
                        int startIndex = int.Parse(tokens[2]);
                        int endIndex = int.Parse(tokens[3]);

                        string firstPart = activationKey.Substring(0, startIndex);
                        string middlePart = activationKey.Substring(startIndex, endIndex - startIndex);
                        string endPart = activationKey.Substring(endIndex);

                        if (UpperLower == "Upper")
                        {
                            activationKey = firstPart + middlePart.ToUpper() + endPart;
                            Console.WriteLine(activationKey);
                        }
                        else if (UpperLower == "Lower")
                        {
                            activationKey = firstPart + middlePart.ToLower() + endPart;
                            Console.WriteLine(activationKey);
                        }

                        break;

                    case "Slice":
                        int startIndexToSlice = int.Parse(tokens[1]);
                        int endIndexToSlice = int.Parse(tokens[2]);

                        activationKey = activationKey.Remove(startIndexToSlice, endIndexToSlice - startIndexToSlice);
                        Console.WriteLine(activationKey);

                        break;

                    default:
                        break;
                }

                command = Console.ReadLine();
            }

            Console.WriteLine($"Your activation key is: {activationKey}");
        }
    }
}
