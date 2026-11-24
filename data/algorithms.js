// Tech concept: Algorithms (what / how / why / when)
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "algorithms",
  name: "Algorithms",
  questions: [
    {
      part: 1,
      question: "What is Big-O notation?",
      sample: {
        point: "Big-O notation is a way to describe how the running time or memory of an algorithm grows as the input gets bigger.",
        explanation: "It ignores small details like the speed of your computer and focuses on the overall growth rate, so you can compare algorithms fairly.",
        example: "For example, checking every item in a list is O(n), while binary search on a sorted list is O(log n), so with a million items it needs only about twenty steps.",
        link: "So basically, Big-O tells you whether an algorithm will still be fast when your data becomes huge.",
      },
      peel: {
        point: { idea: "A one-sentence definition", vocab: ["running time", "as the input gets bigger"] },
        explanation: { idea: "What it ignores and why", vocab: ["ignores small details", "growth rate"] },
        example: { idea: "O(n) vs O(log n)", vocab: ["O(n)", "only about twenty steps"] },
        link: { idea: "Why developers care", vocab: ["basically", "when your data becomes huge"] },
      },
    },
    {
      part: 1,
      question: "What is your favourite algorithm and why?",
      sample: {
        point: "My favourite algorithm is probably Dijkstra's algorithm, which finds the shortest path in a graph.",
        explanation: "I like it because the idea is surprisingly simple: always expand the closest unvisited place first, and you're guaranteed to find the best route, as long as no distance is negative.",
        example: "For instance, it's the same basic idea behind map apps that work out the quickest way to drive from one side of the city to the other.",
        link: "So for me, it's a great example of a short algorithm that solves a real everyday problem.",
      },
      peel: {
        point: { idea: "Name it and say what it does", vocab: ["My favourite algorithm", "the shortest path"] },
        explanation: { idea: "Why you like it", vocab: ["surprisingly simple", "guaranteed to"] },
        example: { idea: "Where it's used in real life", vocab: ["map apps", "the quickest way"] },
        link: { idea: "What it shows about algorithms", vocab: ["a great example of", "real everyday problem"] },
      },
    },
    {
      part: 2,
      question: "Explain how binary search works.",
      cues: [
        "what problem it solves",
        "how the algorithm works step by step",
        "how fast it is",
        "and explain when you can and cannot use it",
      ],
      sample: {
        point:
          "I'd like to explain binary search, which is one of the most fundamental algorithms in computer science. It solves a simple problem: finding a target value in a sorted list as quickly as possible.",
        explanation:
          "The idea is to cut the search space in half at every step. You look at the middle element of the list. If it's the target, you're done. If the target is smaller, you know it can only be in the left half, so you throw away the right half, and vice versa. You keep repeating this until you either find the value or there's nothing left to search. It works because the list is sorted, so a single comparison tells you which half to keep.",
        example:
          "Let's say we have a sorted list of the numbers from 1 to 1,000, and we're looking for 731. We check the middle one, which is 500, so we ignore everything below it. Then we check 750, which is too big, so we ignore the top part, and so on. Because the list halves each time, we need at most about ten comparisons, whereas checking one by one could take a thousand. That's why its time complexity is O(log n).",
        link:
          "The main limitation is that the data must be sorted and you need fast access to any position, like in an array. It doesn't work well on a linked list, for example. But when those conditions are met, it's incredibly efficient, and personally I find it a perfect example of how a clever idea can save a huge amount of work.",
      },
      peel: {
        point: { idea: "What it is and the problem it solves", vocab: ["fundamental algorithms", "a sorted list"] },
        explanation: { idea: "The halving idea, step by step", vocab: ["cut the search space in half", "the middle element", "vice versa"] },
        example: { idea: "Search for 731 among 1 to 1,000", vocab: ["Let's say", "at most about ten comparisons", "O(log n)"] },
        link: { idea: "When it works, when it doesn't + your opinion", vocab: ["The main limitation is", "fast access to any position", "incredibly efficient"] },
      },
    },
    {
      part: 3,
      question: "Why do developers still need to learn algorithms when AI can write code?",
      sample: {
        point: "I think developers still need algorithms because AI can write code, but it can't always tell whether that code is good enough.",
        explanation: "If you don't understand time complexity, you won't notice when a solution works on small test data but becomes painfully slow in production.",
        example: "For example, an AI assistant might suggest a nested loop that compares every pair of users, which is fine for a hundred users but completely unusable for ten million.",
        link: "So in my view, knowing algorithms is what allows engineers to review, question and improve AI-generated code, rather than just copying it.",
      },
      peel: {
        point: { idea: "Give your opinion directly", vocab: ["AI can write code", "good enough"] },
        explanation: { idea: "What happens without this knowledge", vocab: ["time complexity", "painfully slow in production"] },
        example: { idea: "A slow AI suggestion", vocab: ["a nested loop", "completely unusable"] },
        link: { idea: "What algorithms let engineers do", vocab: ["in my view", "rather than just copying it"] },
      },
    },
    {
      part: 3,
      question: "When should you use a greedy algorithm instead of dynamic programming?",
      sample: {
        point: "You should use a greedy algorithm when making the best local choice at each step is guaranteed to lead to the best overall solution.",
        explanation: "Greedy algorithms are usually faster and simpler, but they never go back and reconsider earlier choices, so they can give wrong answers on some problems. Dynamic programming, on the other hand, solves and stores smaller subproblems, so it finds the true optimum at the cost of more time and memory.",
        example: "Making change with coins is a classic example. With coins of 1, 5, 10 and 25, always taking the largest coin works perfectly. But with coins of 1, 3 and 4, a greedy approach makes 6 as 4 + 1 + 1, while dynamic programming finds the better answer, 3 + 3.",
        link: "So my rule of thumb is to use greedy only when you can prove it's correct, and to switch to dynamic programming when the problem has overlapping subproblems.",
      },
      peel: {
        point: { idea: "When greedy is safe", vocab: ["the best local choice", "guaranteed to lead to"] },
        explanation: { idea: "The trade-offs of each approach", vocab: ["never go back", "subproblems", "at the cost of"] },
        example: { idea: "The coin change example", vocab: ["a classic example", "4 + 1 + 1", "3 + 3"] },
        link: { idea: "Your rule of thumb", vocab: ["rule of thumb", "overlapping subproblems"] },
      },
    },
    {
      part: 3,
      question: "What makes an algorithm good?",
      sample: {
        point: "In my opinion, a good algorithm is one that is correct, efficient and easy to understand.",
        explanation: "Correctness comes first, because a fast algorithm that gives wrong answers is useless. After that, it should scale well with large inputs, and it should be simple enough that other developers can maintain it.",
        example: "Quicksort is a good illustration. It's fast in practice and fairly short to write, although its worst case is O(n squared), which is why many standard libraries combine it with other sorting methods.",
        link: "So I'd say the best algorithm isn't always the most clever one; it's the one that balances speed, correctness and simplicity for the problem you actually have.",
      },
      peel: {
        point: { idea: "Name three qualities", vocab: ["correct, efficient and easy to understand"] },
        explanation: { idea: "Why correctness comes first", vocab: ["Correctness comes first", "scale well"] },
        example: { idea: "Quicksort as an illustration", vocab: ["a good illustration", "worst case"] },
        link: { idea: "What 'best' really means", vocab: ["isn't always the most clever one", "balances speed, correctness and simplicity"] },
      },
    },
  ],
});
