// Tech concept: Matrices
// Source: https://gc-garcol.github.io/cafe-docs/content/math/matrices/matrices.html
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "matrices",
  name: "Matrices",
  questions: [
    {
      part: 1,
      question: "What is a matrix?",
      sample: {
        point: "A matrix is a rectangular grid of numbers, with m rows and n columns, plus rules for adding and multiplying it.",
        explanation:
          "You can read it in three ways: as a table of data, as a list of column vectors side by side, or as a machine that takes a vector in and gives a new vector out.",
        example: "For instance, a spreadsheet where each row is a customer and each column is a feature is really just a matrix.",
        link: "So I'd say the machine view is the most useful one, because it's what makes the rest of matrix algebra make sense.",
      },
      peel: {
        point: { idea: "Define it as a grid with rules", vocab: ["rectangular grid of numbers", "rows and n columns"] },
        explanation: { idea: "The three ways to read a matrix", vocab: ["a table of data", "column vectors side by side", "a machine"] },
        example: { idea: "A spreadsheet as a matrix", vocab: ["For instance", "each column is a feature"] },
        link: { idea: "Why the machine view matters most", vocab: ["the most useful one", "make sense"] },
      },
    },
    {
      part: 2,
      question: "Explain how matrix multiplication works and why the order matters.",
      cues: [
        "the rule for computing each entry",
        "when two matrices can be multiplied",
        "what a product means geometrically",
        "and explain why AB is usually not equal to BA",
      ],
      sample: {
        point:
          "I'd like to explain matrix multiplication, which looks strange at first but becomes obvious once you see a matrix as a machine that moves vectors. The short version is that multiplying two matrices means chaining two machines together.",
        explanation:
          "The rule is that the entry in row i and column j of AB is the dot product of row i of A with column j of B. For that to work, A must have as many columns as B has rows, so an m by n matrix times an n by p matrix gives an m by p matrix: the inner sizes must match and cancel. The reason for this rule is that it makes AB times x equal to A applied to B times x. In other words, B acts first, then A, so you read a product from right to left. A nice way to picture it is that the columns of a matrix show where the basis vectors land, and each column of AB is just A applied to the matching column of B.",
        example:
          "For example, take a rotation by ninety degrees and a shear. If you rotate first and then shear, the letter F ends up in one position, but if you shear first and then rotate, it lands somewhere completely different, and the two product matrices have different numbers. Order matters for speed as well: for square matrices, computing A times B, then times a vector, costs order n cubed, while A times B times the vector, done right to left, only costs order n squared.",
        link:
          "So matrix multiplication isn't commutative, because doing one motion and then another is not the same as doing them the other way round. It's still associative and it distributes over addition, so most algebra works as usual, as long as you never swap the order of a product.",
      },
      peel: {
        point: { idea: "Multiplication means chaining machines", vocab: ["looks strange at first", "chaining two machines"] },
        explanation: { idea: "Entry rule, size rule, right-to-left reading", vocab: ["dot product", "inner sizes must match and cancel", "B acts first, then A", "right to left", "basis vectors land"] },
        example: { idea: "Rotate then shear vs shear then rotate", vocab: ["take a rotation", "completely different", "Order matters for speed"] },
        link: { idea: "Not commutative, but still associative", vocab: ["isn't commutative", "associative", "never swap the order"] },
      },
    },
    {
      part: 3,
      question: "What is the inverse of a matrix, and when does it exist?",
      sample: {
        point: "The inverse of a matrix is the matrix that undoes it, so A times its inverse gives the identity.",
        explanation:
          "It only exists for square matrices that don't crush space flat, which is the same as saying the determinant isn't zero. If a matrix squashes the plane onto a line, information is lost, and no other matrix can bring the lost direction back.",
        example:
          "For a two by two matrix there's a neat shortcut: swap the diagonal entries, negate the other two, and divide by the determinant. Another detail people often forget is that the inverse of a product reverses the order, a bit like socks and shoes: to undo putting on socks and then shoes, you take the shoes off first.",
        link: "So the inverse is a useful idea, but you always need to check that the matrix can actually be undone.",
      },
      peel: {
        point: { idea: "Define the inverse as an undo", vocab: ["undoes it", "gives the identity"] },
        explanation: { idea: "When it exists and why flattening breaks it", vocab: ["crush space flat", "determinant isn't zero", "information is lost"] },
        example: { idea: "The 2×2 shortcut and socks and shoes", vocab: ["neat shortcut", "reverses the order", "socks and shoes"] },
        link: { idea: "Check before you invert", vocab: ["actually be undone"] },
      },
    },
    {
      part: 3,
      question: "Why do computers solve systems of equations by elimination instead of using the inverse?",
      sample: {
        point: "Computers use elimination because it's faster and more accurate than calculating the inverse.",
        explanation:
          "Elimination factors the matrix into a lower and an upper triangular matrix, which is called LU, and then solves two triangular systems one unknown at a time. Solving a system this way takes roughly two thirds of n cubed steps, while building the full inverse does extra work and adds more rounding error.",
        example:
          "For instance, with two equations like 2x plus y equals 5 and x minus y equals 1, you can subtract half of the first row from the second, get y equals 1, and then back-substitute to get x equals 2. Libraries do exactly this on much bigger systems.",
        link: "That's why the usual advice is to factor rather than invert whenever you need to solve a system.",
      },
      peel: {
        point: { idea: "Elimination is faster and more accurate", vocab: ["faster and more accurate"] },
        explanation: { idea: "LU factoring and the cost", vocab: ["lower and an upper triangular", "one unknown at a time", "rounding error"] },
        example: { idea: "Solve a 2×2 system by elimination", vocab: ["subtract half of the first row", "back-substitute"] },
        link: { idea: "The rule of thumb", vocab: ["factor rather than invert"] },
      },
    },
    {
      part: 3,
      question: "Where are matrices used in the real world?",
      sample: {
        point: "Matrices are used almost everywhere computers handle numbers, from graphics to machine learning.",
        explanation:
          "That's because so many problems boil down to transforming vectors or storing tables of numbers, and matrix operations can run very fast on modern hardware in parallel.",
        example:
          "For example, a 3D game moves every vertex through a chain of four by four matrices, from the model to the camera to the screen. Similarly, a neural network layer is a weight matrix times an input vector plus a bias, so training is mostly matrix multiplication. Even in finance, portfolio variance is calculated with the covariance matrix.",
        link: "So learning how matrices work isn't just academic; it's the foundation of a lot of the technology we use every day.",
      },
      peel: {
        point: { idea: "Used almost everywhere with numbers", vocab: ["almost everywhere", "graphics to machine learning"] },
        explanation: { idea: "Why: transforms, tables, fast hardware", vocab: ["boil down to", "in parallel"] },
        example: { idea: "Games, neural networks and finance", vocab: ["a chain of four by four matrices", "weight matrix", "covariance matrix"] },
        link: { idea: "It's practical, not just academic", vocab: ["isn't just academic", "the foundation of"] },
      },
    },
    {
      part: 3,
      question: "What are common mistakes people make with matrices?",
      sample: {
        point: "The most common mistake is assuming that AB equals BA, which is usually false even for small matrices.",
        explanation:
          "Our intuition comes from ordinary numbers, but matrices describe actions, and the order of actions matters. In fact, AB might exist when BA doesn't even have the right sizes.",
        example:
          "Another trap is cancelling, because AB equals AC doesn't mean B equals C unless A is invertible. People also expect AB equals zero to force one of them to be zero, but two projections onto perpendicular lines multiply to zero. And there's no such thing as dividing by a matrix; you multiply by its inverse on a specific side.",
        link: "So the safest habit is to treat matrices as actions, not as numbers, and to keep track of the order at every step.",
      },
      peel: {
        point: { idea: "The biggest mistake: assuming AB = BA", vocab: ["most common mistake", "usually false"] },
        explanation: { idea: "Numbers intuition vs actions", vocab: ["Our intuition", "the order of actions matters"] },
        example: { idea: "Cancelling, zero products, division", vocab: ["Another trap is cancelling", "perpendicular lines", "no such thing as dividing"] },
        link: { idea: "Treat matrices as actions", vocab: ["safest habit", "keep track of the order"] },
      },
    },
  ],
});
