// IELTS Speaking topic: Work & Study
// part: 1 = short questions, 2 = cue card (long turn), 3 = discussion
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "work-study",
  name: "Work & Study",
  questions: [
    {
      part: 1,
      question: "Do you work or are you a student?",
      sample: {
        point: "I'm working at the moment. I'm a software engineer at a tech company.",
        explanation: "I chose this career because I've always enjoyed solving problems and building things with technology.",
        example: "For instance, most of my day is spent developing web applications and fixing issues in our systems, which keeps me busy but never bored.",
        link: "So yes, I'm a full-time worker, and I'm really happy with the path I've chosen.",
      },
      peel: {
        point: { idea: "Say you're working and name your job", vocab: ["at the moment", "a software engineer"] },
        explanation: { idea: "Why you chose this career", vocab: ["I chose this career because", "solving problems"] },
        example: { idea: "What a normal workday involves", vocab: ["most of my day is spent", "keeps me busy"] },
        link: { idea: "Confirm you work full-time and feel happy about it", vocab: ["full-time", "the path I've chosen"] },
      },
    },
    {
      part: 1,
      question: "What do you enjoy most about your job?",
      sample: {
        point: "What I enjoy most about being a software engineer is solving complex problems and building systems that can handle large amounts of data.",
        explanation: "I also enjoy learning new technologies, because the IT industry changes very quickly, so there's always something new to explore.",
        example: "Another thing I like is working with other engineers. For example, we often share knowledge in code reviews and find better solutions together.",
        link: "That's why I find my job both challenging and rewarding.",
      },
      peel: {
        point: { idea: "Name the one thing you enjoy most", vocab: ["What I enjoy most about", "complex problems", "large amounts of data"] },
        explanation: { idea: "Why the job keeps you interested", vocab: ["changes very quickly", "something new to explore"] },
        example: { idea: "A teamwork moment, e.g. code reviews", vocab: ["share knowledge", "find better solutions"] },
        link: { idea: "Sum up how the job feels", vocab: ["That's why", "challenging and rewarding"] },
      },
    },
    {
      part: 1,
      question: "Would you like to change your job in the future?",
      sample: {
        point: "Not really, at least not in the near future.",
        explanation: "I still have a lot to learn in my field, and I feel I haven't reached my full potential yet.",
        example: "That said, in about five years I'd like to move into a team lead position, so I can guide junior developers and have more influence on technical decisions.",
        link: "So rather than changing jobs, I'd prefer to grow within the same industry.",
      },
      peel: {
        point: { idea: "Give a clear yes or no", vocab: ["Not really", "in the near future"] },
        explanation: { idea: "Why you want to stay in your job for now", vocab: ["a lot to learn in my field", "full potential"] },
        example: { idea: "A future goal inside the same field", vocab: ["That said", "move into a team lead position", "have more influence on"] },
        link: { idea: "You'd rather grow than change", vocab: ["rather than", "grow within the same industry"] },
      },
    },
    {
      part: 2,
      question: "Describe a challenging task you completed at work or school.",
      cues: [
        "what the task was",
        "when you did it",
        "why it was challenging",
        "and explain how you felt after completing it",
      ],
      sample: {
        point:
          "I'd like to talk about a project I did last year at my company. We had to migrate our old system to a new cloud platform, and I was responsible for the database part.",
        explanation:
          "It was challenging for two main reasons. Firstly, the deadline was really tight: we only had about two months. Secondly, the system was used by thousands of customers every day, so we couldn't afford any downtime. On top of that, a lot of the old code had no documentation, so I had to spend hours figuring out how things worked.",
        example:
          "I remember one night, just a week before the launch, our test migration failed and some data went missing. Instead of panicking, I broke the problem into smaller steps, checked each table one by one and asked a senior colleague for advice. By the next morning, we had found the bug and fixed it.",
        link:
          "In the end, we finished the migration a few days early with no serious problems. I felt relieved and genuinely proud of myself, because it was the biggest responsibility I had ever taken on. Looking back, it taught me how important planning and teamwork are, and that's why I see it as a turning point in my career.",
      },
      peel: {
        point: { idea: "What the task was and your role in it", vocab: ["I'd like to talk about", "migrate", "I was responsible for"] },
        explanation: { idea: "Why it was hard: tight deadline, no downtime, no documentation", vocab: ["two main reasons", "couldn't afford", "On top of that"] },
        example: { idea: "One tense moment and how you solved it", vocab: ["I remember one night", "Instead of panicking", "broke the problem into smaller steps"] },
        link: { idea: "The result, how you felt and what you learned", vocab: ["In the end", "relieved", "Looking back", "a turning point"] },
      },
    },
    {
      part: 3,
      question: "What qualities make someone a good colleague?",
      sample: {
        point: "In my opinion, the most important quality of a good colleague is reliability.",
        explanation:
          "When someone always does what they promise, the whole team can plan their work with confidence, and there's much less stress.",
        example:
          "For example, in my company, there's a senior engineer who always reviews code on time and explains things patiently to newcomers. Because of him, the team works smoothly and the atmosphere is very positive.",
        link: "So although skills matter, I believe being reliable and supportive is what really makes someone a great person to work with.",
      },
      peel: {
        point: { idea: "Name the single most important quality", vocab: ["In my opinion", "reliability"] },
        explanation: { idea: "What happens when people keep their promises", vocab: ["does what they promise", "with confidence"] },
        example: { idea: "Describe a real colleague", vocab: ["explains things patiently", "works smoothly"] },
        link: { idea: "Skills matter, but reliability matters more", vocab: ["although skills matter", "supportive"] },
      },
    },
    {
      part: 3,
      question: "Do you think people prefer working from home or at the office?",
      sample: {
        point: "I think most people nowadays prefer a hybrid model, combining working from home with some days at the office.",
        explanation:
          "Working from home saves commuting time and lets people focus without interruptions, while the office is better for teamwork and building relationships.",
        example:
          "Take my company as an example. After we switched to three days at the office and two at home, both productivity and job satisfaction went up, according to an internal survey.",
        link: "Therefore, rather than choosing one or the other, I believe a balance between the two suits most employees best.",
      },
      peel: {
        point: { idea: "State your view: a mix of both", vocab: ["nowadays", "a hybrid model"] },
        explanation: { idea: "Benefits of home vs the office", vocab: ["commuting time", "without interruptions", "building relationships"] },
        example: { idea: "A change at your company and its result", vocab: ["Take my company as an example", "job satisfaction"] },
        link: { idea: "A balance suits most people", vocab: ["Therefore", "rather than choosing one or the other"] },
      },
    },
  ],
});
