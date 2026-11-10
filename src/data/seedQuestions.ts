import { Question, ContributorProfile } from '../types';

export const SEED_CONTRIBUTORS: ContributorProfile[] = [
  {
    id: 'usr-1',
    name: 'Siddharth Rao',
    handle: 'siddharth_os',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    department: 'Computer Science & Engineering',
    reputation: 2480,
    badges: [
      { title: 'Kernel Wizard', tier: 'gold' },
      { title: 'POSIX Master', tier: 'silver' },
      { title: 'Top 1% Campus', tier: 'gold' },
    ],
    questionsCount: 14,
    answersCount: 42,
    acceptedCount: 28,
  },
  {
    id: 'usr-2',
    name: 'Aanya Sharma',
    handle: 'aanya_ml',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    department: 'Artificial Intelligence & Data Science',
    reputation: 1920,
    badges: [
      { title: 'Tensor Titan', tier: 'gold' },
      { title: 'PyTorch Guru', tier: 'silver' },
    ],
    questionsCount: 9,
    answersCount: 31,
    acceptedCount: 19,
  },
  {
    id: 'usr-3',
    name: 'Rohan Deshmukh',
    handle: 'rohan_net',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    department: 'Computer Networks Lab',
    reputation: 1650,
    badges: [
      { title: 'Packet Whisperer', tier: 'silver' },
      { title: 'Raft Consensus', tier: 'bronze' },
    ],
    questionsCount: 6,
    answersCount: 25,
    acceptedCount: 15,
  },
  {
    id: 'usr-4',
    name: 'Meera Nambiar',
    handle: 'meera_sec',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    department: 'Cybersecurity & Systems',
    reputation: 1420,
    badges: [
      { title: 'Buffer Overflow Hunter', tier: 'silver' },
      { title: 'GDB Detective', tier: 'silver' },
    ],
    questionsCount: 8,
    answersCount: 22,
    acceptedCount: 14,
  },
];

export const SEED_QUESTIONS: Question[] = [
  {
    id: 'q-101',
    title: 'Why does child process hang indefinitely on read() when using pipe() before fork() in C?',
    body: 'In my CS 401 Operating Systems lab, I am trying to establish a unidirectional pipe between parent and child. The child writes a 64-byte payload and exits, but the parent hangs forever on `read()`. How do I ensure EOF is signaled properly?',
    codeSnippet: `int fd[2];
pipe(fd);
pid_t pid = fork();

if (pid == 0) {
    // Child process
    write(fd[1], "Hello Parent\\n", 13);
    // Exit without closing write end in parent
    exit(0);
} else {
    // Parent process
    char buf[128];
    // Hanging here!
    while (read(fd[0], buf, sizeof(buf)) > 0) {
        printf("%s", buf);
    }
}`,
    tags: ['C', 'Linux', 'Operating-Systems', 'Pipes', 'IPC'],
    courseCode: 'CS 401',
    courseName: 'Operating Systems',
    authorName: 'Tanmay Kulkarni',
    authorHandle: 'tanmay_k',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    votes: 38,
    views: 412,
    hasAcceptedAnswer: true,
    createdAt: '2026-02-14 14:20',
    answers: [
      {
        id: 'ans-101-1',
        authorName: 'Siddharth Rao',
        authorHandle: 'siddharth_os',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        body: 'The reason your parent process hangs indefinitely is that **the parent process still has the write-end `fd[1]` open**.\n\nA `read()` on a pipe returns `0` (EOF) **only when ALL write file descriptors referencing the pipe across all processes are closed**.\n\nSince `fork()` duplicates all file descriptor tables, both parent and child have copies of both `fd[0]` and `fd[1]`. Even after the child exits and closes its copy of `fd[1]`, the parent itself still holds `fd[1]` open, so the kernel assumes another write could arrive at any moment!',
        codeSnippet: `// Fix: Close unused ends in BOTH processes
if (pid == 0) {
    close(fd[0]); // Child does not read
    write(fd[1], "Hello Parent\\n", 13);
    close(fd[1]); // Close write end when done
    exit(0);
} else {
    close(fd[1]); // CRUCIAL: Parent must close write end!
    char buf[128];
    int n;
    while ((n = read(fd[0], buf, sizeof(buf))) > 0) {
        write(STDOUT_FILENO, buf, n);
    }
    close(fd[0]);
    wait(NULL);
}`,
        votes: 45,
        isAccepted: true,
        createdAt: '2026-02-14 14:35',
      },
    ],
  },
  {
    id: 'q-102',
    title: 'How to eliminate Immediate Left Recursion in an LL(1) grammar for CS 405 Compiler lab?',
    body: 'We are implementing an LL(1) recursive descent parser for an arithmetic expression grammar. The current grammar has left-recursive rules causing infinite recursion in parser functions. How do I systematically convert it to right-recursive form?',
    codeSnippet: `E -> E + T | T
T -> T * F | F
F -> ( E ) | id`,
    tags: ['Compilers', 'Grammars', 'LL1', 'Parsing', 'Algorithms'],
    courseCode: 'CS 405',
    courseName: 'Compiler Design',
    authorName: 'Zainab Siddiqui',
    authorHandle: 'zainab_s',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    votes: 29,
    views: 340,
    hasAcceptedAnswer: true,
    createdAt: '2026-02-12 11:15',
    answers: [
      {
        id: 'ans-102-1',
        authorName: 'Meera Nambiar',
        authorHandle: 'meera_sec',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        body: 'For any rule of the form:\n`A -> A α | β` (where β does not begin with A),\n\nyou introduce a new auxiliary non-terminal `A\'`:\n1. `A -> β A\'`\n2. `A\' -> α A\' | ε`\n\nApplying this rule to your grammar transforms left recursion into right-recursion with trailing epsilon transitions.',
        codeSnippet: `// Transformed Right-Recursive Grammar for LL(1):
E  -> T E'
E' -> + T E' | ε
T  -> F T'
T' -> * F T' | ε
F  -> ( E ) | id`,
        votes: 34,
        isAccepted: true,
        createdAt: '2026-02-12 11:40',
      },
    ],
  },
  {
    id: 'q-103',
    title: 'Why is TCP TIME_WAIT state necessary for 2*MSL duration and how to prevent socket bind errors?',
    body: 'When restarting my server application in CS 350 Computer Networks lab, `bind()` fails immediately with `EADDRINUSE (Address already in use)`. I read this is due to `TIME_WAIT`. Why is 2*MSL (Maximum Segment Lifetime) strictly enforced by the kernel?',
    codeSnippet: `// Server restart fails here
if (bind(sockfd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
    perror("bind failed"); // Address already in use
    exit(EXIT_FAILURE);
}`,
    tags: ['Networks', 'TCP', 'Sockets', 'Linux', 'C'],
    courseCode: 'CS 350',
    courseName: 'Computer Networks',
    authorName: 'Aarav Nair',
    authorHandle: 'aarav_n',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    votes: 42,
    views: 520,
    hasAcceptedAnswer: true,
    createdAt: '2026-02-10 16:00',
    answers: [
      {
        id: 'ans-103-1',
        authorName: 'Rohan Deshmukh',
        authorHandle: 'rohan_net',
        authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
        body: 'The active closer of a TCP connection transitions into `TIME_WAIT` for two fundamental safety reasons:\n\n1. **Reliable Full-Duplex Termination**: If the final ACK from the closer is lost in transit, the remote peer will retransmit its FIN. The closer must remain alive in TIME_WAIT to resend the ACK; otherwise it would reply with an RST, causing an unclean shutdown.\n2. **Old Duplicate Segment Quenching**: Packets delayed in internet routers must expire before a new incarnation of the socket (same IP:Port 4-tuple) is instantiated. 2*MSL (typically 60s or 120s) guarantees no orphan packets corrupt future streams.\n\nFor development servers, you can safely enable `SO_REUSEADDR` socket option before calling `bind()`:',
        codeSnippet: `int opt = 1;
// Allow immediate address reuse during development
if (setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt)) < 0) {
    perror("setsockopt SO_REUSEADDR failed");
    exit(EXIT_FAILURE);
}`,
        votes: 51,
        isAccepted: true,
        createdAt: '2026-02-10 16:25',
      },
    ],
  },
  {
    id: 'q-104',
    title: 'Why does Dijkstra algorithm fail on graphs with negative edge weights even when there are no cycles?',
    body: 'In CS 301 Design and Analysis of Algorithms, we proved Dijkstra correctness using induction. However, our professor demonstrated a 3-node DAG with negative weights where Dijkstra yields an incorrect distance. What greedy invariant gets broken?',
    codeSnippet: `Graph:
A -> B (weight: 5)
A -> C (weight: 2)
C -> B (weight: -4)

Dijkstra visits A, then visits C (dist=2), then visits B (dist=5).
True shortest path A -> C -> B is 2 + (-4) = -2!`,
    tags: ['Algorithms', 'Graphs', 'Dijkstra', 'DSA', 'Greedy'],
    courseCode: 'CS 301',
    courseName: 'Algorithms & Complexity',
    authorName: 'Priya Narayanan',
    authorHandle: 'priya_n',
    authorAvatar: 'https://images.unsplash.com/photo-1534751516642-a171ef28292b?w=120&auto=format&fit=crop&q=80',
    votes: 35,
    views: 480,
    hasAcceptedAnswer: true,
    createdAt: '2026-02-08 09:30',
    answers: [
      {
        id: 'ans-104-1',
        authorName: 'Siddharth Rao',
        authorHandle: 'siddharth_os',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        body: 'Dijkstra greedy invariant states:\n> *"Once a vertex `u` is extracted from the Priority Queue (marked finalized), its currently recorded distance `dist[u]` is strictly optimal and will never decrease."*\n\nThis invariant holds **if and only if all edge weights are non-negative**, because any alternative path to `u` through an unvisited vertex `v` must have `dist[v] >= dist[u]`. With non-negative edges, adding further edge costs can only increase or maintain the path length.\n\nWith negative edges, `dist[v] + weight(v, u)` can be strictly less than `dist[u]`, retroactively violating the finalized state!\n\nFor negative edge weights without negative cycles, use the **Bellman-Ford algorithm** (O(V * E)) or topological sort relaxation for DAGs (O(V + E)).',
        votes: 41,
        isAccepted: true,
        createdAt: '2026-02-08 10:05',
      },
    ],
  },
  {
    id: 'q-105',
    title: 'Difference between Write-Ahead Logging (WAL) and Shadow Paging in ARIES DBMS Recovery',
    body: 'In CS 210 Database Management Systems, we are studying fault tolerance. Why did modern relational databases like PostgreSQL and SQLite converge on WAL rather than Shadow Paging?',
    tags: ['DBMS', 'WAL', 'Transactions', 'ACID', 'Storage'],
    courseCode: 'CS 210',
    courseName: 'Database Systems',
    authorName: 'Karthik Raja',
    authorHandle: 'karthik_r',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    votes: 26,
    views: 310,
    hasAcceptedAnswer: false,
    createdAt: '2026-02-05 15:45',
    answers: [
      {
        id: 'ans-105-1',
        authorName: 'Aanya Sharma',
        authorHandle: 'aanya_ml',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        body: 'Shadow paging avoids writing log records by duplicating page tables and swapping root pointers at commit time. However, it suffers from two fatal architectural bottlenecks:\n\n1. **Severe Data Fragmentation**: Shadow paging destroys spatial locality on disk. Sequentially clustered pages become scattered randomly across disk blocks after multiple updates.\n2. **Garbage Collection Overhead**: Reclaiming obsolete shadow pages requires expensive bitmap sweeps and lock escalation, ruining concurrent multi-threaded writes.\n\nIn contrast, **Write-Ahead Logging (WAL)** writes sequential append-only delta log records, preserving in-place B+tree page layouts and maximizing I/O bandwidth.',
        votes: 28,
        isAccepted: false,
        createdAt: '2026-02-05 16:10',
      },
    ],
  },
  {
    id: 'q-106',
    title: 'Why do exploding gradients occur in deep Recurrent Neural Networks and how does Gradient Clipping fix it?',
    body: 'When backpropagating through time (BPTT) in PyTorch over long sequences (T > 100), the loss suddenly jumps to `NaN`. Mathematically, why does repeated matrix multiplication cause eigenvalues to explode?',
    codeSnippet: `// Loss suddenly turns NaN after step 140
for epoch in range(epochs):
    loss = model(inputs, targets)
    loss.backward()
    # torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
    optimizer.step()`,
    tags: ['PyTorch', 'Deep-Learning', 'RNN', 'Gradients', 'AI'],
    courseCode: 'CS 480',
    courseName: 'Machine Learning',
    authorName: 'Ananya Bose',
    authorHandle: 'ananya_b',
    authorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
    votes: 31,
    views: 388,
    hasAcceptedAnswer: true,
    createdAt: '2026-02-03 13:20',
    answers: [
      {
        id: 'ans-106-1',
        authorName: 'Aanya Sharma',
        authorHandle: 'aanya_ml',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        body: 'In an unrolled RNN across $T$ timesteps, the gradient of the loss with respect to the recurrent weight matrix $W$ involves a chain of Jacobian matrices:\n\n$$\\frac{\\partial h_t}{\\partial h_1} = \\prod_{k=2}^{t} \\frac{\\partial h_k}{\\partial h_{k-1}} = \\prod_{k=2}^{t} W^T \\text{diag}(1 - \\tanh^2(...))$$\n\nIf the largest eigenvalue $\\lambda_{max}(W) > 1$, the continuous matrix power $W^{T-1}$ scales exponentially as $\\lambda_{max}^{T-1}$, driving gradients to infinity and triggering IEEE 754 floating-point overflow (`NaN`).\n\n**Gradient L2 Norm Clipping** preserves the directional vector while bounding the magnitude:',
        codeSnippet: `// Renormalize gradient vector if norm exceeds threshold C
total_norm = torch.norm(torch.stack([torch.norm(p.grad.detach(), 2) for p in model.parameters()]), 2)
clip_coef = max_norm / (total_norm + 1e-6)
if clip_coef < 1:
    for p in model.parameters():
        p.grad.detach().mul_(clip_coef)`,
        votes: 39,
        isAccepted: true,
        createdAt: '2026-02-03 13:50',
      },
    ],
  },
];
