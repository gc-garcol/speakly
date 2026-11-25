// Tech concept: Cache Strategies
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "cache-strategies",
  name: "Cache Strategies",
  questions: [
    {
      part: 1,
      question: "What is a cache and why do we use one?",
      sample: {
        point: "A cache is a small, fast storage layer that keeps copies of data we read often, so we don't have to fetch it from a slower source every time.",
        explanation:
          "Reading from memory takes well under a millisecond, while a database query or a network call can take tens of milliseconds. Most systems read the same hot data again and again, so keeping it close saves a lot of time and load.",
        example: "For instance, a news website might keep today's top stories in Redis, so thousands of visitors are served without hitting the database at all.",
        link: "So a cache is basically a trade-off: we spend a bit of memory to get faster responses and a lighter load on the back end.",
      },
      peel: {
        point: { idea: "Define a cache in one sentence", vocab: ["fast storage layer", "keeps copies of data"] },
        explanation: { idea: "Compare memory speed with database speed", vocab: ["well under a millisecond", "hot data", "saves a lot of time"] },
        example: { idea: "A news site using Redis", vocab: ["For instance", "without hitting the database"] },
        link: { idea: "Sum it up as a trade-off", vocab: ["trade-off", "lighter load on the back end"] },
      },
    },
    {
      part: 2,
      question: "Describe the main strategies for reading and writing data with a cache.",
      cues: [
        "how cache-aside works",
        "how read-through differs from it",
        "the difference between write-through, write-back and write-around",
        "and explain which one you would choose by default",
      ],
      sample: {
        point:
          "I'd like to talk about the main caching strategies, which really come down to two questions: who loads data into the cache on a read, and what happens to the cache on a write. The answers to those two questions decide how fresh, how fast and how safe your data is.",
        explanation:
          "On the read side, the most common pattern is cache-aside, also called lazy loading. The application checks the cache first; on a hit it returns the value, and on a miss it reads from the database, stores the result in the cache and then returns it. Read-through looks the same from the outside, but the cache itself is responsible for loading from the database, so the application only ever talks to the cache. On the write side, write-through writes to the cache and the database at the same time, so the cache is always up to date, but every write is slower. Write-back, sometimes called write-behind, writes only to the cache and flushes to the database later, which is very fast but risks losing data if the cache node crashes. Finally, write-around skips the cache and writes straight to the database, which avoids filling the cache with data nobody reads.",
        example:
          "For example, on a project I worked on, we cached user profiles with cache-aside and a time-to-live of ten minutes. When a user updated their profile, we wrote to the database and simply deleted the cache key, so the next read loaded the fresh version. It was easy to reason about, and if Redis went down, the app still worked, just more slowly.",
        link:
          "So if I had to pick a default, I'd go with cache-aside plus invalidation on write, because it's simple and fails gracefully. I'd only reach for write-back when write speed matters more than durability.",
      },
      peel: {
        point: { idea: "Frame it as two questions: reads and writes", vocab: ["come down to two questions", "how fresh, how fast and how safe"] },
        explanation: { idea: "Walk through each read and write pattern", vocab: ["lazy loading", "on a miss", "always up to date", "flushes to the database later", "skips the cache"] },
        example: { idea: "Caching user profiles with cache-aside", vocab: ["time-to-live", "deleted the cache key", "easy to reason about"] },
        link: { idea: "Pick a default and say why", vocab: ["fails gracefully", "reach for"] },
      },
    },
    {
      part: 3,
      question: "How does a cache decide what to remove when it is full?",
      sample: {
        point: "A cache uses an eviction policy, and the most popular one is LRU, which removes the least recently used item first.",
        explanation:
          "The idea is that data you used recently is likely to be used again soon. LRU is usually built with a hash map plus a doubly linked list, so both lookups and updates take O(1) time. Another option is LFU, which removes the least frequently used item, and that works better when some keys stay popular for a long time.",
        example:
          "For example, Redis lets you choose a policy such as allkeys-lru or allkeys-lfu, and it uses an approximate version that samples a few keys instead of tracking every single one. Browsers and CDNs also combine eviction with expiry times, so old content disappears even if there's still space.",
        link: "So there's no single best policy; you choose the one that matches how your data is actually accessed.",
      },
      peel: {
        point: { idea: "Name eviction and LRU", vocab: ["eviction policy", "least recently used"] },
        explanation: { idea: "Why LRU works and how it's built, then LFU", vocab: ["likely to be used again", "doubly linked list", "least frequently used"] },
        example: { idea: "Redis policies and expiry in CDNs", vocab: ["approximate version", "samples a few keys", "expiry times"] },
        link: { idea: "Match the policy to the access pattern", vocab: ["no single best policy", "actually accessed"] },
      },
    },
    {
      part: 3,
      question: "Why is cache invalidation considered difficult?",
      sample: {
        point: "Cache invalidation is difficult because you have two copies of the same data, and keeping them in sync without slowing everything down is genuinely hard.",
        explanation:
          "If you update the database but the cache still holds the old value, users see stale data. If you invalidate too aggressively, you lose most of the benefit of caching. On top of that, updates can arrive in a different order on different servers, which creates race conditions.",
        example:
          "A classic case is when one request reads an old value from the database, another request updates the row and deletes the cache key, and then the first request writes its old value back into the cache. Now the stale value can stay there until it expires. That's why many teams add a short time-to-live as a safety net.",
        link: "So invalidation is hard not because the idea is complex, but because timing and concurrency make it easy to get subtly wrong.",
      },
      peel: {
        point: { idea: "Two copies that must stay in sync", vocab: ["two copies of the same data", "genuinely hard"] },
        explanation: { idea: "Stale data vs losing the benefit, plus races", vocab: ["stale data", "too aggressively", "race conditions"] },
        example: { idea: "A race that puts an old value back", vocab: ["A classic case", "safety net"] },
        link: { idea: "Timing and concurrency are the real problem", vocab: ["timing and concurrency", "subtly wrong"] },
      },
    },
    {
      part: 3,
      question: "When should you avoid adding a cache?",
      sample: {
        point: "I think you should avoid a cache when the data changes constantly, must always be exactly correct, or is rarely read twice.",
        explanation:
          "A cache only helps if the hit rate is high. If most requests are misses, you pay for an extra network hop and extra complexity for almost no gain. And for data like account balances, serving even slightly stale values can cause real problems.",
        example:
          "For example, caching search results with millions of unique queries often gives a very low hit rate. In that case it's usually better to add a database index or optimise the query first, and only cache once you've measured a real bottleneck.",
        link: "So my view is that a cache is a powerful tool, but it shouldn't be the first fix; you should add it when the numbers clearly justify it.",
      },
      peel: {
        point: { idea: "Three cases where a cache doesn't fit", vocab: ["changes constantly", "exactly correct", "rarely read twice"] },
        explanation: { idea: "Low hit rate and stale-value risk", vocab: ["hit rate", "extra network hop", "slightly stale"] },
        example: { idea: "Unique search queries; fix the query first", vocab: ["very low hit rate", "database index", "measured a real bottleneck"] },
        link: { idea: "Cache only when numbers justify it", vocab: ["shouldn't be the first fix", "clearly justify"] },
      },
    },
    {
      part: 3,
      question: "What problems can happen when a popular cache entry expires?",
      sample: {
        point: "The main problem is a cache stampede, where lots of requests miss at the same moment and all hit the database together.",
        explanation:
          "If a hot key expires, every request that arrives before it's reloaded will try to rebuild it. The database suddenly gets hundreds of identical queries, slows down, and that can cascade into a wider outage.",
        example:
          "To prevent this, teams often use a lock so only one request rebuilds the value while the others wait or get the old one. Another common trick is to add random jitter to expiry times, so thousands of keys don't expire in the same second, or to refresh hot keys in the background before they expire.",
        link: "So caching isn't just about storing data; you also have to plan for what happens at the moment it disappears.",
      },
      peel: {
        point: { idea: "Name the cache stampede", vocab: ["cache stampede", "hit the database together"] },
        explanation: { idea: "Why one expiry overloads the database", vocab: ["hot key", "identical queries", "cascade"] },
        example: { idea: "Locks, jitter and background refresh", vocab: ["a lock", "random jitter", "in the background"] },
        link: { idea: "Plan for when data disappears", vocab: ["plan for", "the moment it disappears"] },
      },
    },
  ],
});
