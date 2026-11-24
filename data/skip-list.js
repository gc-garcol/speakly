// Tech concept: Skip List
// Source: https://gc-garcol.github.io/cafe-docs/content/datastructure-algorithm/skiplist/skiplist.html
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "skip-list",
  name: "Skip List",
  questions: [
    {
      part: 1,
      question: "What is a skip list?",
      sample: {
        point: "A skip list is a sorted linked list with extra \"express lanes\" on top, so you can search it quickly.",
        explanation:
          "Every node is on the bottom lane, and each node is promoted to the next lane with a probability of one half, a bit like flipping a coin. Higher lanes have fewer nodes, so you can jump far ahead in one step.",
        example: "It's similar to taking an express train to get close to your stop, and then switching to the local train for the last few stations.",
        link: "So it gives you O(log n) search on average, without the complexity of a balanced tree.",
      },
      peel: {
        point: { idea: "A one-sentence definition", vocab: ["sorted linked list", "express lanes"] },
        explanation: { idea: "How the lanes are built", vocab: ["promoted", "probability", "a bit like"] },
        example: { idea: "An everyday comparison", vocab: ["It's similar to", "express train"] },
        link: { idea: "Why it's useful", vocab: ["on average", "without the complexity of"] },
      },
    },
    {
      part: 2,
      question: "Explain how searching and inserting work in a skip list.",
      cues: [
        "how the lanes are built",
        "how a search moves through the list",
        "how a new key is inserted",
        "and explain why the structure stays balanced",
      ],
      sample: {
        point:
          "I'd like to explain how a skip list handles search and insert. The structure is a sorted linked list where every key is a \"tower\", and the height of each tower decides how many lanes it joins. Lane zero visits every node, and each higher lane skips more nodes.",
        explanation:
          "Searching follows a simple rule: move right if you can, move down if you must. You start on the top lane of the head node, and you keep moving right while the next key is smaller than your target. When the next key is too big, you drop down one lane. When you reach the bottom, the next node is either your target or proof that it doesn't exist. Inserting is just a search that remembers the last node before the new key on each lane. Then you flip a coin until you get tails to decide the height, and splice the new node in after those predecessors.",
        example:
          "For example, imagine a list holding 3, 6, 7, 9, 12, 17, 19, 21 and 25, and we search for 17. We start at the top, peek at 19, which is too big, so we drop down. We move right to 7, then drop again, move right to 12, drop to the bottom lane and find 17. We only stand on four nodes and never touch 3, 6, 9, 21 or 25.",
        link:
          "What I like about it is that the random coin flips do all the balancing, so there are no complicated rotations like in a red-black tree. That's why I think it's one of the most elegant data structures to implement.",
      },
      peel: {
        point: { idea: "What the structure looks like", vocab: ["tower", "how many lanes it joins"] },
        explanation: { idea: "The search rule, then how insert reuses it", vocab: ["move right if you can, move down if you must", "drop down", "proof", "splice", "predecessors"] },
        example: { idea: "Search for 17 step by step", vocab: ["imagine a list", "peek at", "never touch"] },
        link: { idea: "Why no rebalancing is needed", vocab: ["coin flips do all the balancing", "rotations"] },
      },
    },
    {
      part: 3,
      question: "Why would you choose a skip list over a balanced binary search tree?",
      sample: {
        point: "The main reason is simplicity: a skip list gives you the same expected O(log n) performance, but it's much easier to write and maintain.",
        explanation:
          "Balanced trees need rotations to stay balanced, which are tricky to get right. A skip list balances itself through randomness, and an insert only touches a few neighbouring links, which also makes it popular for concurrent maps.",
        example:
          "A good real-world example is Redis. Its sorted sets are built on a skip list, partly because it also makes range queries easy: once you find the start, you just walk along the bottom lane.",
        link: "So if you need an ordered structure with fast search, easy range scans and simple code, a skip list is a very attractive option.",
      },
      peel: {
        point: { idea: "The main reason: simplicity", vocab: ["simplicity", "easier to write and maintain"] },
        explanation: { idea: "Rotations vs randomness", vocab: ["tricky to get right", "randomness", "concurrent"] },
        example: { idea: "A real system that uses it", vocab: ["real-world example", "range queries"] },
        link: { idea: "When it's the right choice", vocab: ["a very attractive option"] },
      },
    },
    {
      part: 3,
      question: "When is a skip list not a good choice?",
      sample: {
        point: "A skip list isn't a good choice when you need guaranteed worst-case performance or the fastest possible speed for small data sets.",
        explanation:
          "Its guarantees are probabilistic, so the worst case is O(n), even though it's extremely unlikely. Also, it relies on pointer chasing, which isn't cache friendly, so it can be slower than structures that store data close together in memory.",
        example:
          "For example, for a small in-memory set, a B-tree or even a sorted array can win on raw speed. And if an attacker can predict your random seed, they could craft input that makes the list badly unbalanced.",
        link: "So I'd say it's great for simplicity and concurrency, but you should think twice when strict guarantees or cache performance really matter.",
      },
      peel: {
        point: { idea: "When it's not a good choice", vocab: ["guaranteed worst-case", "fastest possible"] },
        explanation: { idea: "Probabilistic guarantees + cache misses", vocab: ["probabilistic", "worst case", "cache friendly"] },
        example: { idea: "Small data sets and predictable seeds", vocab: ["win on raw speed", "predict your random seed"] },
        link: { idea: "Balance the pros and cons", vocab: ["think twice"] },
      },
    },
    {
      part: 3,
      question: "What should developers be careful about when implementing a skip list?",
      sample: {
        point: "There are a few common pitfalls, and the most important one is to cap the maximum height of the towers.",
        explanation:
          "Without a cap, a lucky series of coin flips could create very tall towers and waste memory. A maximum of around log base two of n is enough, so 16 to 32 levels covers most cases.",
        example:
          "Another classic mistake is comparing with \"less than or equal\" instead of \"less than\" during the search. You actually want to stop at the predecessor, so that insert and delete can reuse the same walk. And when a new node is taller than the current list, you need to remember that its missing predecessors are the head node.",
        link: "So although the idea is simple, paying attention to these small details is what makes the implementation correct and reliable.",
      },
      peel: {
        point: { idea: "The most important pitfall", vocab: ["pitfalls", "cap the maximum height"] },
        explanation: { idea: "What goes wrong without a cap", vocab: ["Without a cap", "waste memory"] },
        example: { idea: "Other classic mistakes", vocab: ["classic mistake", "reuse"] },
        link: { idea: "Details make it correct", vocab: ["paying attention to", "correct and reliable"] },
      },
    },
  ],
});
