// Speak Up — collocations page (classic script, works over file://)
// In each example, the collocation is wrapped in [square brackets] so it can be highlighted.
// Everyday list cross-checked against https://www.myenglishpages.com/common-collocations-in-english/
// Software list informed by https://preply.com/en/blog/b2b-english-for-software-engineers-developers-and-programmers/
// Example sentences are original.
(function () {
"use strict";

const GROUPS = [
  // ---------- Everyday ----------
  {
    area: "everyday", name: "Time & routine",
    items: [
      { phrase: "make time for", vi: "dành thời gian cho", example: "However busy I am, I always [make time for] my family at weekends." },
      { phrase: "spend time (doing)", vi: "dành thời gian (làm gì)", example: "I [spend a lot of time] reading on the train." },
      { phrase: "save time", vi: "tiết kiệm thời gian", example: "Cooking in bulk on Sundays [saves time] during the week." },
      { phrase: "waste time", vi: "lãng phí thời gian", example: "I try not to [waste time] scrolling through social media." },
      { phrase: "run late", vi: "bị trễ, chậm hơn dự kiến", example: "Sorry, I'm [running late], I'll be there in ten minutes." },
      { phrase: "a tight schedule", vi: "lịch trình dày đặc", example: "We're on [a tight schedule], so let's start straight away." },
      { phrase: "kill time", vi: "giết thời gian", example: "I usually [kill time] at the airport by people-watching." },
      { phrase: "run out of time", vi: "hết thời gian", example: "I [ran out of time] and couldn't finish the last question." },
      { phrase: "on time", vi: "đúng giờ", example: "The trains here are almost always [on time]." },
      { phrase: "take your time", vi: "cứ từ từ, không cần vội", example: "There's no rush, [take your time]." },
      { phrase: "from time to time", vi: "thỉnh thoảng", example: "I still play the piano [from time to time]." },
      { phrase: "a daily routine", vi: "thói quen hằng ngày", example: "Going for a run is part of my [daily routine]." },
      { phrase: "a busy day", vi: "một ngày bận rộn", example: "I've had [a really busy day], so I just want to relax." },
    ],
  },
  {
    area: "everyday", name: "Work & study",
    items: [
      { phrase: "meet a deadline", vi: "kịp hạn chót", example: "I stayed up late to [meet the deadline] for my essay." },
      { phrase: "take a break", vi: "nghỉ giải lao", example: "It helps to [take a short break] every hour or so." },
      { phrase: "pay attention to", vi: "chú ý đến", example: "You need to [pay attention to] the details in this report." },
      { phrase: "make progress", vi: "tiến bộ", example: "I've [made a lot of progress] with my English this year." },
      { phrase: "take notes", vi: "ghi chép", example: "I always [take notes] during lectures so I can revise later." },
      { phrase: "sit an exam", vi: "dự thi (Anh-Anh)", example: "I'm going to [sit the exam] again in March." },
      { phrase: "gain experience", vi: "tích luỹ kinh nghiệm", example: "My part-time job helped me [gain experience] in customer service." },
      { phrase: "make a mistake", vi: "mắc lỗi", example: "Everyone [makes mistakes] when they're learning a language." },
      { phrase: "make an effort", vi: "cố gắng, nỗ lực", example: "I [make an effort] to speak English every day." },
      { phrase: "do research", vi: "nghiên cứu, tìm hiểu", example: "I [did some research] before choosing a laptop." },
      { phrase: "do your best", vi: "cố gắng hết sức", example: "Just [do your best] and don't worry about the result." },
      { phrase: "take responsibility for", vi: "chịu trách nhiệm về", example: "A good manager [takes responsibility for] the team's mistakes." },
      { phrase: "give a presentation", vi: "thuyết trình", example: "I have to [give a presentation] to the whole department tomorrow." },
      { phrase: "work from home", vi: "làm việc tại nhà", example: "I [work from home] twice a week." },
      { phrase: "a heavy workload", vi: "khối lượng công việc lớn", example: "I've got [a heavy workload] this month because of the year-end reports." },
    ],
  },
  {
    area: "everyday", name: "Decisions & problems",
    items: [
      { phrase: "make a decision", vi: "đưa ra quyết định", example: "It took me weeks to [make a decision] about which university to choose." },
      { phrase: "weigh up the options", vi: "cân nhắc các lựa chọn", example: "I [weighed up the options] before accepting the job offer." },
      { phrase: "solve a problem", vi: "giải quyết vấn đề", example: "We managed to [solve the problem] by working together." },
      { phrase: "face a challenge", vi: "đối mặt với thử thách", example: "Many young people [face the challenge] of finding affordable housing." },
      { phrase: "take a risk", vi: "chấp nhận rủi ro", example: "Starting my own business meant [taking a big risk]." },
      { phrase: "come to a conclusion", vi: "đi đến kết luận", example: "After a long discussion, we [came to the conclusion] that it wasn't worth it." },
      { phrase: "make a difference", vi: "tạo ra khác biệt", example: "Even small changes can [make a big difference]." },
      { phrase: "make a plan", vi: "lên kế hoạch", example: "Let's [make a plan] for the weekend." },
      { phrase: "take action", vi: "hành động", example: "The government needs to [take action] on air pollution." },
      { phrase: "make a suggestion", vi: "đưa ra gợi ý", example: "Can I [make a suggestion]? Let's try a different route." },
      { phrase: "reach an agreement", vi: "đạt được thoả thuận", example: "The two sides finally [reached an agreement]." },
      { phrase: "bear in mind", vi: "ghi nhớ, lưu ý", example: "[Bear in mind] that the shops close early on Sundays." },
      { phrase: "a tough decision", vi: "một quyết định khó khăn", example: "Moving abroad was [a tough decision] for me." },
    ],
  },
  {
    area: "everyday", name: "People & conversation",
    items: [
      { phrase: "keep in touch", vi: "giữ liên lạc", example: "We still [keep in touch] even though she moved abroad." },
      { phrase: "lose touch", vi: "mất liên lạc", example: "I [lost touch] with most of my classmates after school." },
      { phrase: "make friends", vi: "kết bạn", example: "Joining a club is a great way to [make friends] in a new city." },
      { phrase: "get on well with", vi: "hợp với, quan hệ tốt với", example: "I [get on really well with] my colleagues." },
      { phrase: "break the ice", vi: "phá vỡ sự ngượng ngùng ban đầu", example: "A quick joke can help [break the ice] in a meeting." },
      { phrase: "have a chat", vi: "trò chuyện", example: "Let's grab a coffee and [have a chat] about it." },
      { phrase: "do someone a favour", vi: "giúp ai một việc", example: "Could you [do me a favour] and water my plants?" },
      { phrase: "give someone a hand", vi: "giúp ai một tay", example: "Can you [give me a hand] with these boxes?" },
      { phrase: "give advice", vi: "cho lời khuyên", example: "My older sister always [gives me good advice]." },
      { phrase: "keep a secret", vi: "giữ bí mật", example: "Can you [keep a secret]? I'm getting engaged." },
      { phrase: "keep a promise", vi: "giữ lời hứa", example: "He always [keeps his promises]." },
      { phrase: "break a promise", vi: "thất hứa", example: "I hate it when people [break their promises]." },
      { phrase: "tell a joke", vi: "kể chuyện cười", example: "My dad loves to [tell jokes] at dinner." },
      { phrase: "pay someone a compliment", vi: "khen ai", example: "My boss [paid me a compliment] on my report." },
    ],
  },
  {
    area: "everyday", name: "Money & shopping",
    items: [
      { phrase: "save money", vi: "tiết kiệm tiền", example: "I cycle to work to [save money] on transport." },
      { phrase: "spend money on", vi: "tiêu tiền vào", example: "I try not to [spend too much money on] clothes." },
      { phrase: "can't afford", vi: "không đủ tiền", example: "I [can't afford] a new phone at the moment." },
      { phrase: "a good deal", vi: "một món hời", example: "I got [a really good deal] on this laptop in the sales." },
      { phrase: "on a tight budget", vi: "ngân sách eo hẹp", example: "As a student, I'm always [on a tight budget]." },
      { phrase: "pay in cash", vi: "trả bằng tiền mặt", example: "Some small shops still prefer you to [pay in cash]." },
      { phrase: "pay by card", vi: "trả bằng thẻ", example: "Can I [pay by card]?" },
      { phrase: "pay the bill", vi: "thanh toán hoá đơn", example: "Let me [pay the bill] this time." },
      { phrase: "make money", vi: "kiếm tiền", example: "He [makes money] by selling his photos online." },
      { phrase: "save up for", vi: "để dành tiền cho", example: "I'm [saving up for] a trip to Japan." },
      { phrase: "a waste of money", vi: "phí tiền", example: "That gym membership was [a complete waste of money]." },
      { phrase: "go shopping", vi: "đi mua sắm", example: "We usually [go shopping] on Saturday mornings." },
      { phrase: "good value for money", vi: "đáng đồng tiền", example: "The set lunch is [good value for money]." },
    ],
  },
  {
    area: "everyday", name: "Health & lifestyle",
    items: [
      { phrase: "get some exercise", vi: "vận động, tập thể dục", example: "I walk to the office so I [get some exercise] every day." },
      { phrase: "stay in shape", vi: "giữ dáng, giữ sức khoẻ", example: "Swimming is how I [stay in shape]." },
      { phrase: "get enough sleep", vi: "ngủ đủ giấc", example: "I find it hard to concentrate if I don't [get enough sleep]." },
      { phrase: "a balanced diet", vi: "chế độ ăn cân bằng", example: "Eating [a balanced diet] is more important than any supplement." },
      { phrase: "catch a cold", vi: "bị cảm lạnh", example: "I [caught a cold] after getting soaked in the rain." },
      { phrase: "under pressure", vi: "chịu áp lực", example: "I tend to work better [under pressure]." },
      { phrase: "take medicine", vi: "uống thuốc", example: "Don't forget to [take your medicine] after meals." },
      { phrase: "take a deep breath", vi: "hít một hơi thật sâu", example: "Before the interview, I [took a deep breath] and smiled." },
      { phrase: "get better", vi: "khỏi bệnh, tốt lên", example: "I hope you [get better] soon." },
      { phrase: "a bad habit", vi: "thói quen xấu", example: "Checking my phone in bed is [a bad habit]." },
      { phrase: "break a habit", vi: "bỏ một thói quen", example: "It took me months to [break the habit] of snacking at night." },
      { phrase: "fall asleep", vi: "ngủ thiếp đi", example: "I often [fall asleep] on the sofa watching TV." },
      { phrase: "a healthy lifestyle", vi: "lối sống lành mạnh", example: "Living near a park makes it easier to have [a healthy lifestyle]." },
    ],
  },
  {
    area: "everyday", name: "Opinions",
    items: [
      { phrase: "strongly agree", vi: "hoàn toàn đồng ý", example: "I [strongly agree] that children should learn to cook." },
      { phrase: "have a point", vi: "nói có lý", example: "You [have a point], but I still think it's too expensive." },
      { phrase: "change my mind", vi: "đổi ý", example: "I was against it at first, but I've [changed my mind]." },
      { phrase: "make sense", vi: "hợp lý, dễ hiểu", example: "It [makes sense] to book early if you want a cheaper flight." },
      { phrase: "a matter of taste", vi: "tuỳ sở thích mỗi người", example: "Whether modern art is beautiful is really [a matter of taste]." },
      { phrase: "make a point", vi: "nêu một ý", example: "She [made a good point] about the cost of public transport." },
      { phrase: "take into account", vi: "tính đến, cân nhắc", example: "You have to [take into account] the cost of living, not just the salary." },
      { phrase: "see eye to eye", vi: "đồng quan điểm", example: "My brother and I don't always [see eye to eye] on politics." },
      { phrase: "a valid point", vi: "một ý hợp lý", example: "That's [a valid point], but there's another side to it." },
      { phrase: "to some extent", vi: "ở một mức độ nào đó", example: "I agree [to some extent], but I think it depends on the person." },
    ],
  },
  {
    area: "everyday", name: "Home & chores",
    items: [
      { phrase: "do the housework", vi: "làm việc nhà", example: "My flatmates and I take turns to [do the housework]." },
      { phrase: "do the washing-up", vi: "rửa bát (Anh-Anh)", example: "I cook and my partner [does the washing-up]." },
      { phrase: "do the laundry", vi: "giặt đồ", example: "I [do the laundry] on Sunday evenings." },
      { phrase: "make the bed", vi: "dọn giường", example: "The first thing I do every morning is [make the bed]." },
      { phrase: "make a mess", vi: "bày bừa", example: "The kids [made a mess] in the kitchen." },
      { phrase: "do the shopping", vi: "đi chợ, mua đồ dùng", example: "I usually [do the shopping] online now." },
      { phrase: "tidy up", vi: "dọn dẹp", example: "I need to [tidy up] before my friends come round." },
    ],
  },
  {
    area: "everyday", name: "Travel & transport",
    items: [
      { phrase: "catch a bus", vi: "bắt xe buýt", example: "I have to [catch the bus] at 7.15 to get to work on time." },
      { phrase: "miss the train", vi: "lỡ chuyến tàu", example: "I overslept and [missed the train]." },
      { phrase: "heavy traffic", vi: "giao thông đông đúc", example: "There's always [heavy traffic] in the city centre at rush hour." },
      { phrase: "a traffic jam", vi: "tắc đường", example: "We were stuck in [a traffic jam] for an hour." },
      { phrase: "get lost", vi: "bị lạc", example: "We [got lost] in the old town, but it was fun." },
      { phrase: "book a hotel", vi: "đặt khách sạn", example: "I always [book a hotel] near the station." },
      { phrase: "go abroad", vi: "ra nước ngoài", example: "I'd love to [go abroad] to study." },
      { phrase: "a long journey", vi: "chuyến đi dài", example: "It's [a long journey], so bring some snacks." },
    ],
  },
  {
    area: "everyday", name: "Food & eating out",
    items: [
      { phrase: "have breakfast", vi: "ăn sáng", example: "I rarely [have breakfast] on weekdays." },
      { phrase: "grab a bite", vi: "ăn nhanh, ăn qua loa", example: "Let's [grab a bite] before the film." },
      { phrase: "eat out", vi: "ăn ngoài", example: "We [eat out] about once a week." },
      { phrase: "book a table", vi: "đặt bàn", example: "I'll [book a table] for four at eight o'clock." },
      { phrase: "a home-cooked meal", vi: "bữa cơm nhà nấu", example: "Nothing beats [a home-cooked meal] after a long trip." },
      { phrase: "strong coffee", vi: "cà phê đậm", example: "I can't start the day without [a strong coffee]." },
      { phrase: "fast food", vi: "đồ ăn nhanh", example: "I try to avoid [fast food], but it's so convenient." },
      { phrase: "a light meal", vi: "bữa ăn nhẹ", example: "I just want [a light meal] tonight." },
    ],
  },
  {
    area: "everyday", name: "Feelings & reactions",
    items: [
      { phrase: "have a good time", vi: "có khoảng thời gian vui vẻ", example: "We [had a great time] at the festival." },
      { phrase: "in a good mood", vi: "tâm trạng tốt", example: "You seem [in a good mood] today." },
      { phrase: "keep calm", vi: "giữ bình tĩnh", example: "Try to [keep calm] during the exam." },
      { phrase: "lose your temper", vi: "mất bình tĩnh, nổi nóng", example: "I rarely [lose my temper], but that really annoyed me." },
      { phrase: "get upset", vi: "buồn, khó chịu", example: "Don't [get upset] about small things." },
      { phrase: "get bored", vi: "thấy chán", example: "I [get bored] easily if I stay at home all day." },
      { phrase: "feel at home", vi: "thấy thoải mái như ở nhà", example: "My host family made me [feel at home] straight away." },
    ],
  },
  {
    area: "everyday", name: "Weather",
    items: [
      { phrase: "heavy rain", vi: "mưa to", example: "[Heavy rain] caused flooding in several streets." },
      { phrase: "a strong wind", vi: "gió mạnh", example: "[A strong wind] blew my umbrella inside out." },
      { phrase: "pouring with rain", vi: "mưa như trút", example: "It was [pouring with rain] when we arrived." },
      { phrase: "boiling hot", vi: "nóng như thiêu", example: "It's [boiling hot] in Ho Chi Minh City in April." },
      { phrase: "a mild winter", vi: "mùa đông ấm áp, không quá lạnh", example: "We had [a mild winter] this year." },
      { phrase: "clear skies", vi: "trời quang", example: "[Clear skies] are forecast for the weekend." },
    ],
  },

  // ---------- Software ----------
  {
    area: "software", name: "Writing code",
    items: [
      { phrase: "write code", vi: "viết code", example: "I spend most of my day [writing code] in Java." },
      { phrase: "add a feature", vi: "thêm tính năng", example: "We're planning to [add a new feature] for offline mode." },
      { phrase: "refactor the code", vi: "tái cấu trúc code", example: "Before adding anything new, we [refactored the code] to make it easier to read." },
      { phrase: "follow best practices", vi: "tuân theo cách làm tốt nhất", example: "Our team tries to [follow best practices] for naming and testing." },
      { phrase: "readable code", vi: "code dễ đọc", example: "[Readable code] saves the next developer a lot of time." },
      { phrase: "hard-code a value", vi: "gán cứng giá trị trong code", example: "Don't [hard-code the URL]; put it in the config file." },
      { phrase: "implement a solution", vi: "triển khai giải pháp", example: "We [implemented a simple solution] first and improved it later." },
      { phrase: "maintain the codebase", vi: "bảo trì codebase", example: "Three of us [maintain the codebase] for the mobile app." },
      { phrase: "legacy code", vi: "code cũ, code kế thừa", example: "Half of my job is working with [legacy code] that nobody fully understands." },
      { phrase: "duplicate code", vi: "code bị lặp", example: "I moved the [duplicate code] into a shared helper function." },
      { phrase: "a code smell", vi: "dấu hiệu code có vấn đề", example: "A function with ten parameters is usually [a code smell]." },
      { phrase: "follow naming conventions", vi: "tuân theo quy tắc đặt tên", example: "Please [follow the naming conventions] in the style guide." },
    ],
  },
  {
    area: "software", name: "Bugs & debugging",
    items: [
      { phrase: "fix a bug", vi: "sửa lỗi", example: "I [fixed a bug] that was causing the app to crash on login." },
      { phrase: "reproduce a bug", vi: "tái hiện lỗi", example: "We couldn't [reproduce the bug] on our own machines." },
      { phrase: "track down a bug", vi: "lần ra lỗi", example: "It took two days to [track down the bug] in the payment flow." },
      { phrase: "find the root cause", vi: "tìm nguyên nhân gốc", example: "A quick patch isn't enough; we need to [find the root cause]." },
      { phrase: "throw an exception", vi: "ném ra ngoại lệ", example: "The parser [throws an exception] if the input is empty." },
      { phrase: "handle errors", vi: "xử lý lỗi", example: "Make sure you [handle errors] when the network is down." },
      { phrase: "a temporary workaround", vi: "giải pháp tạm thời", example: "Restarting the service is only [a temporary workaround]." },
      { phrase: "file a bug report", vi: "báo cáo lỗi", example: "If you find a problem, please [file a bug report] with the steps to reproduce it." },
      { phrase: "introduce a bug", vi: "vô tình tạo ra lỗi", example: "The last refactor [introduced a bug] in the date parsing." },
      { phrase: "check the logs", vi: "xem log", example: "The first thing I do is [check the logs] on the server." },
      { phrase: "a known issue", vi: "lỗi đã biết", example: "Slow loading on older phones is [a known issue]." },
      { phrase: "step through the code", vi: "chạy từng bước trong code", example: "I [stepped through the code] in the debugger to see where the value changed." },
      { phrase: "crash on startup", vi: "bị crash khi khởi động", example: "After the update, the app started to [crash on startup] on some devices." },
    ],
  },
  {
    area: "software", name: "Version control & review",
    items: [
      { phrase: "open a pull request", vi: "mở pull request", example: "Once the tests pass, [open a pull request] and tag me." },
      { phrase: "review code", vi: "review code", example: "I spend about an hour a day [reviewing code] for my team." },
      { phrase: "address feedback", vi: "xử lý góp ý", example: "I've [addressed all the feedback] from the review." },
      { phrase: "merge a branch", vi: "gộp nhánh", example: "We [merge the feature branch] into main after approval." },
      { phrase: "resolve conflicts", vi: "giải quyết xung đột", example: "I had to [resolve a few conflicts] before I could merge." },
      { phrase: "roll back a change", vi: "hoàn tác thay đổi", example: "The release broke checkout, so we [rolled back the change]." },
      { phrase: "commit changes", vi: "commit thay đổi", example: "[Commit your changes] in small, focused steps." },
      { phrase: "push changes", vi: "đẩy thay đổi lên remote", example: "I'll [push my changes] once the tests pass." },
      { phrase: "create a branch", vi: "tạo nhánh", example: "[Create a new branch] for each feature." },
      { phrase: "leave a comment", vi: "để lại bình luận", example: "I [left a few comments] on your pull request." },
      { phrase: "approve a pull request", vi: "duyệt pull request", example: "Two people need to [approve the pull request] before it can be merged." },
    ],
  },
  {
    area: "software", name: "Testing & quality",
    items: [
      { phrase: "write tests", vi: "viết test", example: "We always [write tests] for every bug we fix." },
      { phrase: "run the tests", vi: "chạy test", example: "[Run the tests] locally before you push." },
      { phrase: "a flaky test", vi: "test lúc pass lúc fail", example: "[A flaky test] is worse than no test, because people stop trusting it." },
      { phrase: "an edge case", vi: "trường hợp biên", example: "We forgot [an edge case] where the list is empty." },
      { phrase: "test coverage", vi: "độ bao phủ test", example: "Our [test coverage] is good, but the integration tests are weak." },
      { phrase: "break the build", vi: "làm hỏng bản build", example: "Someone [broke the build] by pushing without running the tests." },
      { phrase: "pass all the tests", vi: "pass toàn bộ test", example: "The change [passes all the tests], but I'd like a second review." },
      { phrase: "a failing test", vi: "test bị fail", example: "Start by writing [a failing test] that shows the bug." },
      { phrase: "catch bugs early", vi: "phát hiện lỗi sớm", example: "Code reviews help us [catch bugs early]." },
      { phrase: "mock a dependency", vi: "giả lập phụ thuộc", example: "We [mock the payment service] in our unit tests." },
      { phrase: "automated testing", vi: "kiểm thử tự động", example: "[Automated testing] saves us hours before every release." },
    ],
  },
  {
    area: "software", name: "Release & operations",
    items: [
      { phrase: "deploy to production", vi: "triển khai lên production", example: "We [deploy to production] several times a day." },
      { phrase: "ship a feature", vi: "phát hành tính năng", example: "We [shipped the feature] a week ahead of schedule." },
      { phrase: "go live", vi: "chính thức chạy thật", example: "The new website [goes live] on Monday." },
      { phrase: "monitor performance", vi: "theo dõi hiệu năng", example: "We use dashboards to [monitor performance] after each release." },
      { phrase: "a production incident", vi: "sự cố trên production", example: "We had [a production incident] last night when the database ran out of disk space." },
      { phrase: "cause downtime", vi: "gây gián đoạn dịch vụ", example: "The migration shouldn't [cause any downtime] for users." },
      { phrase: "release a new version", vi: "phát hành phiên bản mới", example: "We [release a new version] every two weeks." },
      { phrase: "push a hotfix", vi: "đẩy bản sửa lỗi khẩn", example: "We had to [push a hotfix] on Friday night." },
      { phrase: "roll out a feature", vi: "triển khai dần tính năng", example: "We [rolled out the feature] to 10% of users first." },
      { phrase: "be on call", vi: "trực sự cố", example: "I'm [on call] this week, so I keep my laptop with me." },
      { phrase: "restore the service", vi: "khôi phục dịch vụ", example: "It took us forty minutes to [restore the service]." },
      { phrase: "write release notes", vi: "viết ghi chú phát hành", example: "Don't forget to [write the release notes] for version 2.1." },
    ],
  },
  {
    area: "software", name: "Design & teamwork",
    items: [
      { phrase: "design a system", vi: "thiết kế hệ thống", example: "I was asked to [design a system] that could handle a million users." },
      { phrase: "make a trade-off", vi: "đánh đổi", example: "We [made a trade-off] between speed and memory usage." },
      { phrase: "technical debt", vi: "nợ kỹ thuật", example: "Rushing releases has left us with a lot of [technical debt]." },
      { phrase: "meet the requirements", vi: "đáp ứng yêu cầu", example: "The first version didn't fully [meet the requirements]." },
      { phrase: "estimate the effort", vi: "ước lượng công sức", example: "It's hard to [estimate the effort] until we understand the legacy code." },
      { phrase: "raise a concern", vi: "nêu lo ngại", example: "I [raised a concern] about security during the design review." },
      { phrase: "be on the same page", vi: "thống nhất, hiểu giống nhau", example: "Let's have a quick call so we're all [on the same page]." },
      { phrase: "gather requirements", vi: "thu thập yêu cầu", example: "We spent the first week [gathering requirements] from the sales team." },
      { phrase: "pay off technical debt", vi: "trả nợ kỹ thuật", example: "We set aside one sprint to [pay off technical debt]." },
      { phrase: "a single point of failure", vi: "điểm lỗi duy nhất", example: "Having only one database server is [a single point of failure]." },
      { phrase: "loosely coupled", vi: "liên kết lỏng", example: "[Loosely coupled] services are easier to change independently." },
      { phrase: "prioritise tasks", vi: "sắp xếp ưu tiên công việc", example: "When everything is urgent, you have to [prioritise tasks] carefully." },
      { phrase: "take ownership of", vi: "nhận trách nhiệm chính về", example: "She [took ownership of] the search feature from start to finish." },
    ],
  },
  {
    area: "software", name: "Meetings & communication",
    items: [
      { phrase: "give an update", vi: "cập nhật tiến độ", example: "Each of us [gives a quick update] at the stand-up." },
      { phrase: "a daily stand-up", vi: "họp nhanh hằng ngày", example: "We have [a daily stand-up] at 9.30." },
      { phrase: "be blocked on", vi: "bị kẹt vì phụ thuộc vào", example: "I'm [blocked on] the API changes from the backend team." },
      { phrase: "follow up on", vi: "theo dõi tiếp, phản hồi tiếp", example: "I'll [follow up on] this after the meeting." },
      { phrase: "share my screen", vi: "chia sẻ màn hình", example: "Let me [share my screen] and show you the error." },
      { phrase: "walk someone through", vi: "hướng dẫn ai từng bước", example: "Could you [walk me through] how the login flow works?" },
      { phrase: "set up a meeting", vi: "sắp xếp cuộc họp", example: "I'll [set up a meeting] with the designers for Thursday." },
      { phrase: "push back on", vi: "phản đối, không đồng ý với", example: "It's fine to [push back on] a deadline if it isn't realistic." },
    ],
  },
  {
    area: "software", name: "Tools & environment",
    items: [
      { phrase: "set up the environment", vi: "thiết lập môi trường", example: "It took me a whole day to [set up the development environment]." },
      { phrase: "install dependencies", vi: "cài đặt thư viện phụ thuộc", example: "Run this command to [install the dependencies]." },
      { phrase: "back up data", vi: "sao lưu dữ liệu", example: "We [back up the data] every night." },
      { phrase: "log in to", vi: "đăng nhập vào", example: "I can't [log in to] the staging server." },
      { phrase: "reboot the server", vi: "khởi động lại máy chủ", example: "We had to [reboot the server] after the kernel update." },
      { phrase: "upgrade to the latest version", vi: "nâng cấp lên bản mới nhất", example: "We should [upgrade to the latest version] of the library." },
      { phrase: "run a script", vi: "chạy script", example: "Just [run the script] and it will create the test data for you." },
    ],
  },
  {
    area: "software", name: "Performance & scaling",
    items: [
      { phrase: "improve performance", vi: "cải thiện hiệu năng", example: "Adding an index [improved performance] dramatically." },
      { phrase: "reduce latency", vi: "giảm độ trễ", example: "We moved the servers closer to our users to [reduce latency]." },
      { phrase: "a performance bottleneck", vi: "nút thắt hiệu năng", example: "The image resizing step turned out to be [a performance bottleneck]." },
      { phrase: "handle traffic", vi: "chịu tải lưu lượng truy cập", example: "Can the system [handle the traffic] on Black Friday?" },
      { phrase: "cache the results", vi: "lưu cache kết quả", example: "We [cache the results] for five minutes to avoid hitting the database." },
      { phrase: "a memory leak", vi: "rò rỉ bộ nhớ", example: "[A memory leak] was slowly crashing the service every few days." },
      { phrase: "scale horizontally", vi: "mở rộng theo chiều ngang", example: "Stateless services are easy to [scale horizontally]." },
    ],
  },
  {
    area: "software", name: "Security & data",
    items: [
      { phrase: "store data", vi: "lưu trữ dữ liệu", example: "We [store user data] in a separate, encrypted database." },
      { phrase: "a security vulnerability", vi: "lỗ hổng bảo mật", example: "The scanner found [a security vulnerability] in an old package." },
      { phrase: "patch a vulnerability", vi: "vá lỗ hổng", example: "We [patched the vulnerability] within hours." },
      { phrase: "grant access", vi: "cấp quyền truy cập", example: "Ask your manager to [grant you access] to the dashboard." },
      { phrase: "encrypt data", vi: "mã hoá dữ liệu", example: "We [encrypt all data] at rest and in transit." },
      { phrase: "a data breach", vi: "vụ rò rỉ dữ liệu", example: "[A data breach] can destroy customers' trust overnight." },
      { phrase: "rotate the keys", vi: "thay khoá định kỳ", example: "We [rotate the API keys] every ninety days." },
    ],
  },
];

const AREA_LABEL = { everyday: "Everyday", software: "Software" };

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Escape text, turn [brackets] into the collocation highlight, then mark the search term outside tags
function format(text, term, brackets = false) {
  let html = escapeHtml(text);
  if (brackets) html = html.replace(/\[([^\]]+)\]/g, '<span class="hl">$1</span>');
  if (term) html = html.replace(new RegExp(`(?![^<]*>)(${escapeRe(escapeHtml(term))})`, "gi"), '<mark class="q">$1</mark>');
  return html;
}

const state = { area: "all" };
const els = {
  areas: document.getElementById("areas"),
  search: document.getElementById("search"),
  count: document.getElementById("result-count"),
  list: document.getElementById("list"),
};

function render() {
  const term = els.search.value.trim();
  const t = term.toLowerCase();
  const matches = (it) =>
    !t || [it.phrase, it.vi, it.example.replace(/[[\]]/g, "")].some((s) => s.toLowerCase().includes(t));

  let total = 0;
  const html = GROUPS.filter((g) => state.area === "all" || g.area === state.area)
    .map((g) => {
      const items = g.items.filter(matches);
      total += items.length;
      if (!items.length) return "";
      const headId = `g-${g.area}-${g.name.toLowerCase().replace(/\W+/g, "-")}`;
      return `<section class="group area-${g.area}" aria-labelledby="${headId}">
        <div class="group-head">
          <h2 id="${headId}">${escapeHtml(g.name)}</h2>
          <span class="area-badge">${AREA_LABEL[g.area]}</span>
        </div>
        <ul class="items">${items
          .map(
            (it) => `<li class="item">
              <p class="phrase">${format(it.phrase, term)}</p>
              <p class="meaning" lang="vi">${format(it.vi, term)}</p>
              <p class="example">${format(it.example, term, true)}</p>
            </li>`
          )
          .join("")}</ul>
      </section>`;
    })
    .join("");

  els.list.innerHTML = total ? html : `<p class="empty">No collocations for “${escapeHtml(term)}”</p>`;
  els.count.textContent = `${total} collocation${total === 1 ? "" : "s"}`;
}

els.areas.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-area]");
  if (!btn || btn.dataset.area === state.area) return;
  state.area = btn.dataset.area;
  els.areas.querySelectorAll("[data-area]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
  render();
});
els.search.addEventListener("input", render);
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && !e.target.matches("input, textarea")) {
    e.preventDefault();
    els.search.focus();
  }
});

render();
})();
