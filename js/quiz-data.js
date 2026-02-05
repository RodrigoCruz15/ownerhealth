const quizData = [
    {
        day: 1,
        title: "Day 1: The Oxidation Trap",
        intro: "Learn how Nitrous Oxide chemically locks your B12, making it useless for your body.",
        questions: [
            {
                q: "How does Nitrous Oxide (N2O) interact with B12?",
                options: ["It makes it stronger", "It oxidizes the cobalt core, locking it", "It helps absorption", "No interaction"],
                correct: 1
            },
            {
                q: "Can your body use B12 that has been 'oxidized'?",
                options: ["Yes, immediately", "Yes, after drinking water", "No, it is chemically inactive", "Only if you exercise"],
                correct: 2
            },
            {
                q: "When does the inactivation of B12 happen?",
                options: ["Two weeks after use", "Only after 24h of use", "Instantly during consumption", "Only when you sleep"],
                correct: 2
            },
            {
                q: "Does eating B12-rich food immediately 'fix' the lock?",
                options: ["No, the system needs time to recover", "Yes, a steak fixes it in 5 mins", "Yes, if you eat spinach", "The lock doesn't exist"],
                correct: 0
            }
        ]
    },
    {
        day: 2,
        title: "Day 2: Neural Connection",
        intro: "Movement and coordination depend on a healthy connection between brain and muscle.",
        questions: [
            {
                q: "What is Proprioception?",
                options: ["Night vision", "The brain's sense of body position", "A type of muscle", "A supplement"],
                correct: 1
            },
            {
                q: "How does healthy Myelin affect your movement?",
                options: ["Signals travel faster and smoother", "Makes bones heavier", "Makes you jump higher", "No effect"],
                correct: 0
            },
            {
                q: "Why is the Eyes-Closed Balance Test harder with deficiency?",
                options: ["You are sleepy", "Nerves can't communicate position clearly", "Room is dark", "It isn't harder"],
                correct: 1
            },
            {
                q: "What is the benefit of light movement during recovery?",
                options: ["Uses up all B12", "Helps reconnect brain and muscles", "Keeps N2O longer", "No benefit"],
                correct: 1
            }
        ]
    },
    {
        day: 3,
        title: "Day 3: Warning Signs",
        intro: "Learn to listen to your body and recognize the first signs of neurological distress.",
        questions: [
            {
                q: "What is a common early sign of nerve signal 'lag'?",
                options: ["Improving eyesight", "Tingling or 'pins and needles'", "Increased hearing", "Faster hair growth"],
                correct: 1
            },
            {
                q: "How does B12 deficiency affect your physical energy?",
                options: ["It causes extreme fatigue", "It gives you more energy", "It makes you run faster", "No impact"],
                correct: 0
            },
            {
                q: "What happens to your balance when B12 is low?",
                options: ["It becomes perfect", "You may feel wobbly or unsteady", "You gain the ability to fly", "Nothing changes"],
                correct: 1
            },
            {
                q: "Where do neurological symptoms usually appear first?",
                options: ["Top of the head", "Fingers and toes", "The stomach", "The ears"],
                correct: 1
            }
        ]
    },
    {
        day: 4,
        title: "Day 4: Restoration",
        intro: "Fueling your body with the right nutrients to rebuild and protect your nerves.",
        questions: [
            {
                q: "Which of these is a natural source of Vitamin B12?",
                options: ["Apples", "Eggs and Meat", "White bread", "Bottled water"],
                correct: 1
            },
            {
                q: "Can you find B12 in plants without fortification?",
                options: ["Yes, in all vegetables", "No, must be fortified or supplements", "Yes, in sunlight", "Yes, in carrots"],
                correct: 1
            },
            {
                q: "Why is gut health important for B12?",
                options: ["Where B12 is absorbed into blood", "It isn't important", "Gut stores N2O", "Gut makes Myelin"],
                correct: 0
            },
            {
                q: "Recovery requires B12 and what other factor?",
                options: ["Continuing N2O use", "Balanced diet and recovery time", "Drinking soda", "Staying awake"],
                correct: 1
            }
        ]
    },
    {
        day: 5,
        title: "Day 5: Restoration",
        intro: "Fueling your body with the right nutrients to rebuild and protect your nerves.",
        questions: [
            {
                q: "Which of these is a natural source of Vitamin B12?",
                options: ["Apples", "Eggs and Meat", "White bread", "Bottled water"],
                correct: 1
            },
            {
                q: "Can you find B12 in plants without fortification?",
                options: ["Yes, in all vegetables", "No, must be fortified or supplements", "Yes, in sunlight", "Yes, in carrots"],
                correct: 1
            },
            {
                q: "Why is gut health important for B12?",
                options: ["Where B12 is absorbed into blood", "It isn't important", "Gut stores N2O", "Gut makes Myelin"],
                correct: 0
            },
            {
                q: "Recovery requires B12 and what other factor?",
                options: ["Continuing N2O use", "Balanced diet and recovery time", "Drinking soda", "Staying awake"],
                correct: 1
            }
        ]
    },
    {
        day: 6,
        title: "Day 6: The Support Network",
        intro: "Health is a collective journey. Breaking isolation is key to long-term well-being.",
        questions: [
            {
                q: "Why is Peer Support important?",
                options: ["To see who is best", "To reduce isolation and share facts", "To judge others", "To trade balloons"],
                correct: 1
            },
            {
                q: "What should you do if you feel severe numbness?",
                options: ["Wait 6 months", "Seek medical advice immediately", "Use more N2O", "Ignore it"],
                correct: 1
            },
            {
                q: "Does health literacy help recovery?",
                options: ["Yes, it leads to informed decisions", "No, it makes it worse", "It doesn't matter", "Facts are boring"],
                correct: 0
            },
            {
                q: "What is a 'trigger'?",
                options: ["A type of food", "A situation that makes you want to use", "A medical tool", "A part of the app"],
                correct: 1
            }
        ]
    },
    {
        day: 7,
        title: "Day 7: The Future",
        intro: "You are now equipped with the knowledge to protect your body and make informed choices.",
        questions: [
            {
                q: "Can nerve damage from heavy N2O use be permanent?",
                options: ["No, heals in an hour", "Yes, if left untreated", "It's a myth", "Only for seniors"],
                correct: 1
            },
            {
                q: "Best way to keep your B12 reservoir full?",
                options: ["Regular breaks and informed choices", "Daily N2O use", "Not eating", "Less sleep"],
                correct: 0
            },
            {
                q: "What have you gained this week?",
                options: ["Nothing", "Body awareness and literacy", "A new balloon", "A headache"],
                correct: 1
            },
            {
                q: "Are you ready to claim your B-AWARE prize?",
                options: ["Yes!", "Not yet", "Maybe", "No"],
                correct: 0
            }
        ]
    }
];