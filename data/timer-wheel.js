// Tech concept: Timer Wheel
// Source: https://gc-garcol.github.io/cafe-docs/content/datastructure-algorithm/timer-wheel/timer-wheel.html
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "timer-wheel",
  name: "Timer Wheel",
  questions: [
    {
      part: 1,
      question: "What is a timer wheel?",
      sample: {
        point: "A timer wheel is a data structure for managing a very large number of timeouts efficiently.",
        explanation:
          "Instead of sorting timers, it works like a clock face. Time is split into ticks, and each timer is dropped into the slot where it will expire. Then a pointer moves around the wheel and fires whatever is in the current slot.",
        example: "For example, if the pointer is at slot 2 and a timer should fire in 3 ticks, it simply goes into slot 5.",
        link: "So basically, it buckets timers by expiry time, which makes adding and cancelling a timer O(1).",
      },
      peel: {
        point: { idea: "A one-sentence definition", vocab: ["a data structure for", "efficiently"] },
        explanation: { idea: "The clock-face idea", vocab: ["Instead of sorting", "clock face", "split into"] },
        example: { idea: "Slot 2 + 3 ticks = slot 5", vocab: ["it simply goes into"] },
        link: { idea: "Why it's fast", vocab: ["basically", "buckets timers"] },
      },
    },
    {
      part: 2,
      question: "Explain how a hierarchical timer wheel works.",
      cues: [
        "what problem a single wheel has",
        "how the levels are organised",
        "what happens during a cascade",
        "and explain why this design is efficient",
      ],
      sample: {
        point:
          "I'd like to explain the hierarchical timer wheel, which is an improved version of the basic timer wheel. It solves the main limitation of a single wheel: range. With N slots, a single wheel can only schedule timers up to N minus one ticks ahead.",
        explanation:
          "The idea is to stack several wheels, just like the hands of a clock: seconds, minutes and hours. The lowest wheel has fine slots, for example one tick each, and the wheel above it has coarse slots that each cover eight ticks. Timers that are far in the future wait in the coarse wheel, and anything beyond the top wheel goes into an overflow list.",
        example:
          "Let's say we have two wheels of eight slots, and at time zero we add a timer that expires at tick 21. It's too far for the inner wheel, so it goes into the outer wheel, in the slot covering ticks 16 to 23. When the clock reaches 16, the outer hand moves, and that slot is emptied. The timer is re-inserted, and now it's only 5 ticks away, so it drops into the inner wheel. This is called a cascade. Finally, at tick 21, it fires.",
        link:
          "The reason this design is so efficient is that each timer is moved at most once per level, so the total work stays almost constant. That's why systems like the Linux kernel and Kafka rely on it, and personally I think it's a really elegant solution.",
      },
      peel: {
        point: { idea: "What it is and the problem it solves", vocab: ["an improved version of", "limitation"] },
        explanation: { idea: "How the levels are organised", vocab: ["stack several wheels", "fine slots", "coarse slots", "overflow list"] },
        example: { idea: "Follow one timer from tick 0 to tick 21", vocab: ["Let's say", "re-inserted", "cascade"] },
        link: { idea: "Why it's efficient + who uses it", vocab: ["at most", "rely on", "elegant"] },
      },
    },
    {
      part: 3,
      question: "Why would you use a timer wheel instead of a min-heap?",
      sample: {
        point: "The main reason is performance: a timer wheel adds and cancels timers in O(1), while a min-heap needs O(log n) for both.",
        explanation:
          "That difference matters when you have millions of timers, and most of them are cancelled before they ever fire. With a heap, the cost keeps growing as the number of timers grows, but with a wheel it stays predictable.",
        example:
          "Think about a busy server. Every request has a deadline, every TCP connection has retransmit timers, and every session has an expiry. Almost all of these are cancelled because the request finishes in time, so the server spends most of its effort adding and cancelling, which is exactly what the wheel makes cheap.",
        link: "So when timers are created and cancelled at a very high rate, a timer wheel is usually the better choice.",
      },
      peel: {
        point: { idea: "The main reason: O(1) vs O(log n)", vocab: ["The main reason is", "performance"] },
        explanation: { idea: "When the difference matters", vocab: ["matters when", "predictable"] },
        example: { idea: "A busy server's timers", vocab: ["Think about a busy server", "exactly what"] },
        link: { idea: "Conclude when the wheel wins", vocab: ["at a very high rate", "the better choice"] },
      },
    },
    {
      part: 3,
      question: "When should you use a timer wheel, and when should you avoid it?",
      sample: {
        point: "You should use a timer wheel when you have a huge number of timers and a small delay error is acceptable.",
        explanation:
          "The trade-off is precision. A timer can fire up to one tick late, so you choose the tick size to match your needs. On the other hand, the wheel keeps ticking even when there's nothing to do, which wastes CPU and power.",
        example:
          "For instance, a one-millisecond tick is fine for RPC timeouts, and one second is fine for session expiry. But if you only have a handful of timers, or you need exact deadlines, like in some financial or real-time systems, a min-heap or a balanced tree is a better fit.",
        link: "So in a nutshell, it's perfect for high-volume network timeouts, but it's overkill when you just need a few precise timers.",
      },
      peel: {
        point: { idea: "When to use it", vocab: ["a huge number of", "acceptable"] },
        explanation: { idea: "The trade-offs", vocab: ["The trade-off is precision", "wastes CPU"] },
        example: { idea: "Good tick sizes vs cases to avoid", vocab: ["a handful of", "a better fit"] },
        link: { idea: "Sum up both sides", vocab: ["in a nutshell", "overkill"] },
      },
    },
    {
      part: 3,
      question: "Where are timer wheels used in real systems?",
      sample: {
        point: "Timer wheels are used in many well-known, high-performance systems.",
        explanation:
          "This is because any system that handles lots of network connections needs to track a huge number of timeouts cheaply.",
        example:
          "For example, the Linux kernel uses one in its timer subsystem, Netty provides a HashedWheelTimer, and Kafka's purgatory combines a hierarchical wheel with a delay queue. Many TCP stacks use the same idea for retransmissions.",
        link: "So if you work on backend or networking software, there's a good chance you're already relying on a timer wheel without realising it.",
      },
      peel: {
        point: { idea: "Say they're widely used", vocab: ["well-known", "high-performance"] },
        explanation: { idea: "Why these systems need it", vocab: ["This is because", "cheaply"] },
        example: { idea: "Name real systems", vocab: ["the Linux kernel", "combines"] },
        link: { idea: "Connect it to the listener", vocab: ["there's a good chance", "without realising it"] },
      },
    },
  ],
});
