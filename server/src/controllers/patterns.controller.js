import Pattern from '../models/pattern.model.js';
import User from '../models/user.model.js';
import { handleError } from '../utils/handleError.js';

export const getPatterns = async (req, res, next) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const patterns = await Pattern.find(query).sort({ createdAt: 1 });
        res.status(200).json({ success: true, patterns });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

export const getPatternBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const pattern = await Pattern.findOne({ slug });
        if (!pattern) return next(handleError(404, "Pattern not found"));
        res.status(200).json({ success: true, pattern });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

export const masterPattern = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const userId = req.user._id;

        const pattern = await Pattern.findOne({ slug });
        if (!pattern) return next(handleError(404, "Pattern not found"));

        const user = await User.findById(userId);
        if (!user) return next(handleError(404, "User not found"));

        const isMastered = user.masteredPatterns.includes(pattern._id);

        if (isMastered) {
            // Revert mastery (Un-master)
            user.masteredPatterns = user.masteredPatterns.filter(id => !id.equals(pattern._id));
            user.karma = Math.max(0, user.karma - pattern.karmaPoints); // Prevent negative karma
            await user.save();

            return res.status(200).json({ 
                success: true, 
                message: "Pattern un-mastered", 
                mastered: false,
                karma: user.karma 
            });
        } else {
            // Add mastery
            user.masteredPatterns.push(pattern._id);
            user.karma += pattern.karmaPoints;
            await user.save();

            return res.status(200).json({ 
                success: true, 
                message: "Pattern mastered!", 
                mastered: true,
                karma: user.karma,
                karmaPoints: pattern.karmaPoints 
            });
        }

    } catch (error) {
        next(handleError(500, error.message));
    }
};


export const seedPatterns = async (req, res, next) => {
    try {
        // Clear existing patterns to ensure new categories are applied
        await Pattern.deleteMany({});

        const patterns = [
            // DSA
            {
                title: "Sliding Window Technique",
                slug: "sliding-window",
                description: "Master fixed and variable size window problems efficiently.",
                category: "DSA",
                difficulty: "Intermediate",
                karmaPoints: 100,
                content: {
                    videoUrl: "https://www.youtube.com/embed/MK-NZ4hN7rs", // Example video
                    theoryMarkdown: "The Sliding Window pattern is used to perform a required operation on a specific window size of a given array or linked list...",
                    realWorldUseCase: "Used in TCP flow control and data streaming algorithms.",
                    projectBrief: "Solve 'Longest Substring Without Repeating Characters' using this pattern."
                }
            },
            {
                title: "Two Pointers",
                slug: "two-pointers",
                description: "Optimize quadratic solutions to linear time using two pointers.",
                category: "DSA",
                difficulty: "Beginner",
                karmaPoints: 50,
                content: {
                    videoUrl: "https://www.youtube.com/embed/-GrNYtB3KB0",
                    theoryMarkdown: "In problems where we deal with sorted arrays (or linked lists) and need to find a set of elements that fulfill certain constraints...",
                    realWorldUseCase: "Memory management algorithms often use pointers to track free and allocated blocks.",
                    projectBrief: "Implement 'Container With Most Water'."
                }
            },
            // DBMS
            {
                title: "B-Tree Indexing",
                slug: "btree-indexing",
                description: "Understand how databases store data for fast retrieval.",
                category: "DBMS",
                difficulty: "Advanced",
                karmaPoints: 150,
                content: {
                    videoUrl: "https://www.youtube.com/embed/aZjYr87r1b8",
                    theoryMarkdown: "B-Tree is a self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time...",
                    realWorldUseCase: "Used by MySQL (InnoDB) and PostgreSQL for standard indexing.",
                    projectBrief: "Analyze the performance difference between a full table scan and an index scan."
                }
            },
            {
                title: "ACID Properties",
                slug: "acid-properties",
                description: "Atomicity, Consistency, Isolation, Durability in transactions.",
                category: "DBMS",
                difficulty: "Intermediate",
                karmaPoints: 100,
                content: {
                    videoUrl: "https://www.youtube.com/embed/pomxJODhsRs",
                    theoryMarkdown: "ACID is a set of properties of database transactions intended to guarantee validity even in the event of errors, power failures, etc...",
                    realWorldUseCase: "Banking systems ensuring money isn't lost during a transfer failure.",
                    projectBrief: "Simulate a transaction failure and observe rollback behavior."
                }
            },
            // Networking
            {
                title: "OSI Model Layers",
                slug: "osi-model",
                description: "The 7 layers of the OSI model explained.",
                category: "Networking",
                difficulty: "Beginner",
                karmaPoints: 50,
                content: {
                    videoUrl: "https://www.youtube.com/embed/vv4y_uOneC0",
                    theoryMarkdown: "The Open Systems Interconnection (OSI) model characterizes and standardizes the communication functions of a telecommunication or computing system...",
                    realWorldUseCase: "Troubleshooting network connectivity issues by isolating layers.",
                    projectBrief: "Use Wireshark to capture packets from different layers."
                }
            },
            {
                title: "TCP vs UDP",
                slug: "tcp-udp",
                description: "Connection-oriented vs Connectionless protocols.",
                category: "Networking",
                difficulty: "Intermediate",
                karmaPoints: 75,
                content: {
                    videoUrl: "https://www.youtube.com/embed/uwoD5YsghoA",
                    theoryMarkdown: "TCP provides reliable, ordered, and error-checked delivery of a stream of octets. UDP provides a connectionless datagram service...",
                    realWorldUseCase: "Video streaming (UDP) vs File Transfer (TCP).",
                    projectBrief: "Build a simple chat app using TCP sockets."
                }
            },
            // OS
            {
                title: "Process Scheduling",
                slug: "process-scheduling",
                description: "Round Robin, FCFS, and Priority Scheduling algorithms.",
                category: "OS",
                difficulty: "Advanced",
                karmaPoints: 120,
                content: {
                    videoUrl: "https://www.youtube.com/embed/zFnrATQyeLw",
                    theoryMarkdown: "Process scheduling is the activity of the process manager that handles the removal of the running process from the CPU and the selection of another process on the basis of a particular strategy...",
                    realWorldUseCase: "How Linux scheduler (CFS) allocates CPU time to tasks.",
                    projectBrief: "Simulate Round Robin scheduling in Python."
                }
            },
            {
                title: "Virtual Memory & Paging",
                slug: "virtual-memory",
                description: "How OS manages memory larger than physical RAM.",
                category: "OS",
                difficulty: "Advanced",
                karmaPoints: 150,
                content: {
                    videoUrl: "https://www.youtube.com/embed/qlH4-oHnBb8",
                    theoryMarkdown: "Virtual memory is a memory management technique that provides an idealized abstraction of the storage resources that are actually available on a given machine...",
                    realWorldUseCase: "Running large applications like Photoshop on limited RAM.",
                    projectBrief: "Implement a simple LRU Page Replacement algorithm."
                }
            }
        ];

        await Pattern.insertMany(patterns);
        res.status(201).json({ success: true, message: "Patterns seeded successfully" });
    } catch (error) {
        next(handleError(500, error.message));
    }
};
