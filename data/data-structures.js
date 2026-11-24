// Tech concept: Data structures (what / how / why / when)
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "data-structures",
  name: "Data Structures",
  questions: [
    {
      part: 1,
      question: "What is a hash table?",
      sample: {
        point: "A hash table is a data structure that stores key-value pairs and lets you look them up very quickly.",
        explanation: "It uses a hash function to turn each key into an index in an array, so instead of searching through everything, you jump almost directly to the right place.",
        example: "For example, a phone book app could use a person's name as the key and their number as the value, so finding someone takes roughly the same time whether there are ten contacts or ten million.",
        link: "That's why hash tables, like dictionaries in Python or HashMaps in Java, are probably the most widely used data structure in everyday programming.",
      },
      peel: {
        point: { idea: "A one-sentence definition", vocab: ["key-value pairs", "very quickly"] },
        explanation: { idea: "How it finds things so fast", vocab: ["hash function", "jump almost directly"] },
        example: { idea: "A phone book app", vocab: ["as the key", "roughly the same time"] },
        link: { idea: "Where you see it every day", vocab: ["That's why", "the most widely used"] },
      },
    },
    {
      part: 1,
      question: "Which data structure do you use most often?",
      sample: {
        point: "The data structure I use most often is probably the array, or a list in languages like Python.",
        explanation: "That's because most data in real applications comes as a sequence, like a list of orders or messages, and arrays are simple and very fast to loop through.",
        example: "Just yesterday, for instance, I fetched a list of users from an API, filtered out inactive ones and sorted the rest by sign-up date, all using basic array operations.",
        link: "So although fancier structures are interesting, I'd say arrays do most of the hard work in my daily job.",
      },
      peel: {
        point: { idea: "Name it", vocab: ["The data structure I use most often", "the array"] },
        explanation: { idea: "Why it's so common", vocab: ["comes as a sequence", "fast to loop through"] },
        example: { idea: "Something you did recently", vocab: ["Just yesterday", "filtered out", "sorted the rest"] },
        link: { idea: "Wrap up", vocab: ["fancier structures", "do most of the hard work"] },
      },
    },
    {
      part: 2,
      question: "Explain how a hash map handles collisions.",
      cues: [
        "what a collision is",
        "why collisions happen",
        "how they can be handled",
        "and explain how this affects performance",
      ],
      sample: {
        point:
          "I'd like to explain how a hash map deals with collisions, which is one of the most important details in its design. A collision happens when two different keys produce the same index in the underlying array.",
        explanation:
          "Collisions are impossible to avoid completely. A hash map has a limited number of slots, but the number of possible keys is practically unlimited, so sooner or later two keys will land in the same slot. This is basically the pigeonhole principle. So the question is not how to prevent collisions, but how to handle them efficiently.",
        example:
          "There are two common approaches. The first is called separate chaining: each slot holds a small list, and if two keys collide, both are simply stored in that list. Java's HashMap works like this, and it even turns a very long list into a balanced tree. The second approach is open addressing: if a slot is already taken, you look for the next free one according to a fixed rule. Python's dictionaries use a form of open addressing. Both work well in practice: chaining is simpler to implement, while open addressing is usually more cache friendly, because everything stays inside one array.",
        link:
          "As for performance, as long as the hash function spreads keys evenly and the table isn't too full, lookups stay at O(1) on average. That's why hash maps resize themselves, usually doubling in size, once they become roughly two-thirds to three-quarters full. So in short, collisions are completely normal, and a good hash map is designed to keep them cheap.",
      },
      peel: {
        point: { idea: "Define a collision", vocab: ["deals with collisions", "the same index"] },
        explanation: { idea: "Why collisions can't be avoided", vocab: ["impossible to avoid completely", "sooner or later", "the pigeonhole principle"] },
        example: { idea: "Chaining vs open addressing, with real languages", vocab: ["separate chaining", "open addressing", "the next free one"] },
        link: { idea: "The effect on speed and resizing", vocab: ["As for performance", "spreads keys evenly", "resize themselves"] },
      },
    },
    {
      part: 3,
      question: "When would you choose a linked list over an array?",
      sample: {
        point: "Honestly, I would choose a linked list only in quite specific situations, because arrays are the better default in most cases.",
        explanation: "A linked list makes inserting or removing an element cheap once you have a reference to its position, but it's slow to access items by index and isn't cache friendly, because its nodes are scattered in memory.",
        example: "A good use case is an LRU cache, where items are constantly moved to the front and removed from the back; combining a hash map with a doubly linked list makes both operations O(1).",
        link: "So my answer is: use an array by default, and switch to a linked list when you frequently insert and delete in the middle and rarely need random access.",
      },
      peel: {
        point: { idea: "Give your honest default", vocab: ["specific situations", "the better default"] },
        explanation: { idea: "Strengths and weaknesses of linked lists", vocab: ["once you have a reference", "cache friendly", "scattered in memory"] },
        example: { idea: "The LRU cache use case", vocab: ["A good use case", "doubly linked list"] },
        link: { idea: "A clear rule", vocab: ["use an array by default", "random access"] },
      },
    },
    {
      part: 3,
      question: "Why is choosing the right data structure important?",
      sample: {
        point: "Choosing the right data structure is important because it often has a bigger impact on performance than any other optimisation.",
        explanation: "The same algorithm can be fast or painfully slow depending on how the data is stored, since each structure makes some operations cheap and others expensive.",
        example: "For instance, checking whether a username already exists in a list of a million names means scanning the whole list, but with a hash set it's almost instant.",
        link: "That's why I think experienced engineers think about data structures first, and only then start writing the actual code.",
      },
      peel: {
        point: { idea: "The main reason: impact on performance", vocab: ["a bigger impact on performance", "optimisation"] },
        explanation: { idea: "Why the way data is stored matters", vocab: ["depending on how the data is stored", "cheap and others expensive"] },
        example: { idea: "A list vs a hash set", vocab: ["a million names", "almost instant"] },
        link: { idea: "What experienced engineers do", vocab: ["That's why", "think about data structures first"] },
      },
    },
    {
      part: 3,
      question: "What is a heap, and where is it used?",
      sample: {
        point: "A heap is a tree-based data structure that always keeps the smallest, or the largest, element at the top.",
        explanation: "It doesn't keep everything fully sorted, which makes it cheaper to maintain: adding an element or removing the top one only takes O(log n) time.",
        example: "That's why heaps are used to build priority queues, for example in operating systems to decide which task runs next, in Dijkstra's shortest-path algorithm, and for scheduling timers on a server.",
        link: "So whenever you repeatedly need \"the next most important item\", a heap is usually the right tool.",
      },
      peel: {
        point: { idea: "A one-sentence definition", vocab: ["tree-based", "at the top"] },
        explanation: { idea: "Why it's cheap to maintain", vocab: ["fully sorted", "O(log n) time"] },
        example: { idea: "Real uses", vocab: ["priority queues", "which task runs next"] },
        link: { idea: "When to reach for it", vocab: ["the next most important item", "the right tool"] },
      },
    },
  ],
});
