using System;
using System.Collections.Generic;
using System.Linq;

namespace FINAL_EXAM_The_Pianist
{
    class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());

            var pianoPieces = new Dictionary<string, List<string>>();

            for (int i = 0; i < n; i++)
            {
                string[] input = Console.ReadLine()
                    .Split("|")
                    .ToArray();

                string piece = input[0];
                string composer = input[1];
                string key = input[2];

                if (!pianoPieces.ContainsKey(piece))
                {
                    pianoPieces.Add(piece, new List<string>()
                    {
                        {composer},
                        {key}
                    });
                }
            }

            string command = Console.ReadLine();

            while (command != "Stop")
            {
                string[] tokens = command
                    .Split("|");

                string action = tokens[0];
                string piece = tokens[1];

                switch (action)
                {
                    case "Add":
                        string composer = tokens[2];
                        string key = tokens[3];

                        if (!pianoPieces.ContainsKey(piece))
                        {
                            pianoPieces.Add(piece, new List<string>()
                            {
                                {composer},
                                {key}
                            });

                            Console.WriteLine($"{piece} by {composer} in {key} added to the collection!");
                        }
                        else
                        {
                            Console.WriteLine($"{piece} is already in the collection!");
                        }
                        break;

                    case "Remove":
                        if (pianoPieces.ContainsKey(piece))
                        {
                            pianoPieces.Remove(piece);
                            Console.WriteLine($"Successfully removed {piece}!");
                        }
                        else
                        {
                            Console.WriteLine($"Invalid operation! {piece} does not exist in the collection.");
                        }

                        break;

                    case "ChangeKey":
                        string newKey = tokens[2];

                        if (pianoPieces.ContainsKey(piece))
                        {
                            pianoPieces[piece][1] = newKey;
                            Console.WriteLine($"Changed the key of {piece} to {newKey}!");
                        }
                        else
                        {
                            Console.WriteLine($"Invalid operation! {piece} does not exist in the collection.");
                        }
                        break;

                    default:
                        break;
                }

                command = Console.ReadLine();
            }

            pianoPieces = pianoPieces.OrderBy(c => c.Key)
                    .ThenBy(c => c.Value[0])
                    .ToDictionary(k => k.Key, v => v.Value);

            foreach (var piece in pianoPieces)
            {
                Console.WriteLine($"{piece.Key} -> Composer: {pianoPieces[piece.Key][0]}, Key: {pianoPieces[piece.Key][1]}");
            }
        }
    }
}
