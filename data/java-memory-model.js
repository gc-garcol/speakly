// Tech concept: Java Memory Model (JLS chapter 17, JSR-133)
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "java-memory-model",
  name: "Java Memory Model",
  questions: [
    {
      part: 1,
      question: "What is the Java Memory Model?",
      sample: {
        point: "The Java Memory Model is the part of the Java Language Specification that defines when a write made by one thread is guaranteed to be visible to another thread.",
        explanation:
          "Modern CPUs and compilers reorder instructions and keep values in caches and registers for speed, so without clear rules, threads could see each other's changes late, or in a surprising order.",
        example: "For instance, if one thread sets a plain boolean flag to stop a loop, the other thread might never see the change and keep running forever.",
        link: "So the memory model is basically a contract that tells us exactly what we need to do to share data safely between threads.",
      },
      peel: {
        point: { idea: "Define it in terms of visibility", vocab: ["Java Language Specification", "guaranteed to be visible"] },
        explanation: { idea: "Why rules are needed: reordering and caches", vocab: ["reorder instructions", "caches and registers", "in a surprising order"] },
        example: { idea: "A stop flag that is never seen", vocab: ["For instance", "plain boolean flag", "keep running forever"] },
        link: { idea: "Call it a contract for sharing data", vocab: ["a contract", "share data safely"] },
      },
    },
    {
      part: 2,
      question: "Explain the happens-before relationship in the Java Memory Model.",
      cues: [
        "what happens-before means",
        "the main rules that create it",
        "a code example that uses it",
        "and explain why it matters for everyday Java code",
      ],
      sample: {
        point:
          "I'd like to explain happens-before, which is the central idea of the Java Memory Model. If action A happens-before action B, then everything A did, and everything before it, is guaranteed to be visible to B. It's not really about time on a clock; it's about visibility and ordering.",
        explanation:
          "There are a handful of rules that create this relationship. First, within a single thread, each action happens-before the next one in program order. Second, unlocking a monitor happens-before every later lock of the same monitor, which is what makes synchronized blocks work. Third, a write to a volatile field happens-before every later read of that same field. There are also rules for threads: calling start on a thread happens-before anything that thread does, and everything a thread does happens-before another thread returns from join on it. Most importantly, the relationship is transitive, so these rules chain together. If two threads access the same variable, at least one of them writes, and there's no happens-before between them, that's called a data race, and the results are not guaranteed.",
        example:
          "For example, imagine a producer thread that fills in a plain config object and then sets a volatile boolean called ready to true. A consumer thread spins until it reads ready as true, and then it reads the config. Because of program order, filling the config happens-before the volatile write; the volatile write happens-before the read; and the read happens-before using the config. Thanks to transitivity, the consumer is guaranteed to see the fully filled config, even though the config fields themselves aren't volatile.",
        link:
          "So in everyday code, we rarely think about CPU caches directly. Instead, we make sure there's a happens-before edge, through a lock, a volatile, or a concurrent collection, whenever data crosses from one thread to another. That's why I think it's the single most useful idea to understand in Java concurrency.",
      },
      peel: {
        point: { idea: "Define happens-before as a visibility guarantee", vocab: ["central idea", "time on a clock", "visibility and ordering"] },
        explanation: { idea: "List the rules, transitivity, and data races", vocab: ["program order", "unlocking a monitor", "volatile field", "transitive", "data race"] },
        example: { idea: "Producer sets a volatile ready flag", vocab: ["imagine a producer thread", "spins until", "Thanks to transitivity"] },
        link: { idea: "Always create an edge between threads", vocab: ["happens-before edge", "crosses from one thread to another"] },
      },
    },
    {
      part: 3,
      question: "What does the volatile keyword guarantee, and what doesn't it guarantee?",
      sample: {
        point: "Volatile guarantees visibility and ordering for a single variable, but it doesn't make compound operations atomic.",
        explanation:
          "Every read of a volatile field sees the latest write to it, and the compiler and CPU can't move ordinary reads and writes across a volatile access in a way that breaks happens-before. However, something like count++ is really a read, an add and a write, and another thread can sneak in between those steps.",
        example:
          "For instance, if ten threads each increment a volatile counter a thousand times, you'll often end up with less than ten thousand. In that case you should use an AtomicInteger or a lock instead. On the other hand, volatile is perfect for a simple flag that one thread sets and others only read.",
        link: "So I'd say volatile is the right tool for publishing state, but not for read-modify-write logic.",
      },
      peel: {
        point: { idea: "Visibility yes, atomicity no", vocab: ["visibility and ordering", "compound operations atomic"] },
        explanation: { idea: "What volatile prevents and why count++ breaks", vocab: ["sees the latest write", "a read, an add and a write", "sneak in"] },
        example: { idea: "A lost-update counter vs a simple flag", vocab: ["less than ten thousand", "AtomicInteger", "perfect for a simple flag"] },
        link: { idea: "When volatile is the right tool", vocab: ["publishing state", "read-modify-write"] },
      },
    },
    {
      part: 3,
      question: "Why was double-checked locking broken, and how do you fix it?",
      sample: {
        point: "Double-checked locking was broken because another thread could see a non-null reference to an object that wasn't fully constructed yet.",
        explanation:
          "Creating an object involves allocating memory, running the constructor and assigning the reference, and without a happens-before edge, those writes can be reordered or seen out of order. The first check happens outside the lock, so a second thread could skip synchronization completely and read fields that still hold default values.",
        example:
          "The standard fix since Java 5 is to declare the instance field as volatile, because the volatile write then publishes the finished object safely. An even simpler option is the holder class idiom, where a static nested class holds the instance and the JVM's class initialisation does the locking for you.",
        link: "So the lesson is that a clever shortcut around locking is only safe if it still creates a proper happens-before relationship.",
      },
      peel: {
        point: { idea: "Readers could see a half-built object", vocab: ["non-null reference", "fully constructed"] },
        explanation: { idea: "Why the unlocked first check is unsafe", vocab: ["can be reordered", "outside the lock", "default values"] },
        example: { idea: "Fix with volatile or a holder class", vocab: ["The standard fix", "publishes the finished object", "holder class idiom"] },
        link: { idea: "Shortcuts still need happens-before", vocab: ["clever shortcut", "proper happens-before relationship"] },
      },
    },
    {
      part: 3,
      question: "How do final fields help with thread safety?",
      sample: {
        point: "Final fields give you a special guarantee: once a constructor finishes, any thread that sees the object will see the correct values of its final fields, even without synchronization.",
        explanation:
          "The memory model adds a freeze at the end of the constructor, so the final values can't appear to be set after the reference is shared. This is what makes properly built immutable objects safe to pass between threads freely.",
        example:
          "For example, String and the boxed types like Integer rely on this, which is why you can share them without locks. The catch is that you mustn't let this escape during construction, for instance by registering a listener inside the constructor, because then another thread could see the object before the freeze.",
        link: "So making fields final and objects immutable is one of the simplest and most reliable ways to avoid concurrency bugs.",
      },
      peel: {
        point: { idea: "The special guarantee for final fields", vocab: ["special guarantee", "even without synchronization"] },
        explanation: { idea: "The freeze and immutable objects", vocab: ["a freeze", "immutable objects"] },
        example: { idea: "String, and the escaping-this catch", vocab: ["rely on this", "The catch is", "let this escape"] },
        link: { idea: "Prefer final and immutability", vocab: ["simplest and most reliable"] },
      },
    },
    {
      part: 3,
      question: "When should developers avoid relying on low-level memory model rules?",
      sample: {
        point: "In most application code, I think developers should avoid hand-crafting tricks with volatile and reordering, and use higher-level tools instead.",
        explanation:
          "The rules are subtle, and bugs caused by data races are often impossible to reproduce on a developer's laptop but appear under load on a different CPU. Libraries in java.util.concurrent have already been written and tested by experts to provide the right happens-before edges.",
        example:
          "For instance, instead of building your own lock-free queue, you can use a ConcurrentLinkedQueue or a BlockingQueue, and instead of a volatile flag plus waiting, you can use a CountDownLatch or a CompletableFuture. Even a small detail like non-volatile long and double writes not being guaranteed atomic is easy to forget.",
        link: "So the memory model is essential to understand, but in practice the safest choice is to lean on well-tested concurrency utilities and keep low-level tricks for performance-critical code.",
      },
      peel: {
        point: { idea: "Prefer higher-level tools over tricks", vocab: ["hand-crafting tricks", "higher-level tools"] },
        explanation: { idea: "Races are hard to reproduce; libraries are tested", vocab: ["impossible to reproduce", "under load", "java.util.concurrent"] },
        example: { idea: "Concrete library replacements and a gotcha", vocab: ["ConcurrentLinkedQueue", "CountDownLatch", "easy to forget"] },
        link: { idea: "Understand it, but lean on utilities", vocab: ["lean on", "performance-critical"] },
      },
    },
  ],
});
