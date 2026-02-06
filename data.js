// Portfolio Website Data
const portfolioData = {
    // Personal Information
    personal: {
        name: "Naveenraj",
        role: "Software Developer",
        location: "Everywhere, Internet",
        email: "naveenraj@example.com",
        phone: "+1 (234) 567-890",
        github: "https://github.com/navi-04"
    },

    // Navigation
    navigation: [
        { name: "home", href: "index.html" },
        { name: "about", href: "about.html" },
        { name: "work", href: "work.html" },
        { name: "projects", href: "projects.html" },
        { name: "contact", href: "contact.html" }
    ],

    // Hero Section
    hero: {
        greeting: "Hi, my name is",
        title: "Naveenraj.",
        subtitle: "I build open source things",
        description: "I'm a software developer specializing in building exceptional digital experiences. Currently focused on creating accessible, human-centered products with cutting-edge technologies.",
        cta: {
            text: "Check out my work!",
            link: "https://github.com/navi-04"
        },
        terminal: {
            title: "Developer.js",
            code: `// Developer.js
const developer = {
  name: 'Naveenraj',
  skills: ['JavaScript', 'React',
           'Node.js', 'Python'],
  passion: 'building cool stuff',
  coffee: Infinity,
  status: 'coding...'
};

// Always learning
while (true) {
  developer.learn();
  developer.build();
  developer.improve();
}`
        }
    },

    // About Section
    about: {
        title: "About Me",
        paragraphs: [
            "Hello! I'm <strong>Naveenraj</strong>, a passionate software developer who loves turning ideas into elegant digital solutions. My journey in web development started with a curiosity about how things work on the internet, and it has evolved into a full-blown passion for creating beautiful, functional applications.",
            "I specialize in building modern web applications using cutting-edge technologies. Whether it's crafting responsive user interfaces, developing robust backend systems, or optimizing performance, I enjoy every aspect of the development process.",
            "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while brainstorming new ideas."
        ],
        skills: [
            "JavaScript (ES6+)",
            "Python",
            "React.js",
            "Node.js",
            "HTML & CSS",
            "Git & GitHub",
            "MongoDB",
            "Express.js"
        ],
        terminal: {
            title: "about-me.json",
            data: {
                name: "Naveenraj",
                role: "Software Developer",
                location: "Everywhere",
                education: {
                    degree: "Computer Science",
                    status: "Continuous Learning"
                },
                interests: [
                    "Web Development",
                    "Open Source",
                    "Problem Solving",
                    "UI/UX Design"
                ],
                currentlyLearning: [
                    "Advanced React Patterns",
                    "System Design",
                    "Cloud Architecture"
                ],
                funFact: "I debug with console.log()"
            }
        }
    },

    // Experience Section
    experience: [
        {
            title: "Full Stack Developer",
            company: "Personal Projects",
            period: "2022 - Present",
            description: "Building and maintaining various web applications using modern technologies. Focused on creating responsive, user-friendly interfaces and scalable backend systems."
        },
        {
            title: "Open Source Contributor",
            company: "GitHub Community",
            period: "2021 - Present",
            description: "Contributing to open-source projects, fixing bugs, adding features, and helping maintain documentation. Active in code reviews and community discussions."
        }
    ],

    // Work Experience
    work: [
        {
            title: "Full Stack Developer",
            company: "Tech Solutions Inc.",
            period: "Jan 2023 - Present",
            type: "Full-time",
            description: "Led development of scalable web applications and collaborated with cross-functional teams to deliver high-quality software solutions.",
            highlights: [
                "Developed and maintained multiple client-facing web applications using React and Node.js",
                "Improved application performance by 40% through code optimization and caching strategies",
                "Mentored junior developers and conducted code reviews",
                "Implemented CI/CD pipelines reducing deployment time by 60%"
            ],
            technologies: ["React.js", "Node.js", "Express", "MongoDB", "AWS", "Docker"]
        },
        {
            title: "Frontend Developer",
            company: "Creative Agency",
            period: "Jun 2022 - Dec 2022",
            type: "Contract",
            description: "Built responsive and interactive user interfaces for various client projects, focusing on user experience and accessibility.",
            highlights: [
                "Created pixel-perfect responsive designs for 10+ client websites",
                "Implemented modern UI/UX best practices and accessibility standards (WCAG 2.1)",
                "Collaborated with designers using Figma for seamless design-to-code workflow",
                "Reduced page load times by 50% through performance optimization"
            ],
            technologies: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Figma"]
        },
        {
            title: "Software Developer Intern",
            company: "StartUp Co.",
            period: "Jan 2022 - May 2022",
            type: "Internship",
            description: "Contributed to the development of a real-time collaboration platform, gaining hands-on experience with modern web technologies.",
            highlights: [
                "Developed features for real-time collaborative editing using WebSockets",
                "Fixed 50+ bugs and implemented unit tests achieving 85% code coverage",
                "Participated in agile ceremonies and sprint planning",
                "Documented APIs and created technical documentation"
            ],
            technologies: ["JavaScript", "Node.js", "Socket.io", "PostgreSQL", "Jest"]
        },
        {
            title: "Freelance Developer",
            company: "Self-Employed",
            period: "2021 - 2022",
            type: "Freelance",
            description: "Provided web development services to small businesses and startups, delivering custom solutions tailored to client needs.",
            highlights: [
                "Built and deployed 15+ websites for various clients",
                "Managed entire project lifecycle from requirements gathering to deployment",
                "Provided ongoing maintenance and support",
                "Achieved 100% client satisfaction rate"
            ],
            technologies: ["WordPress", "PHP", "JavaScript", "MySQL", "cPanel"]
        }
    ],

    // Projects
    projects: [
        {
            title: "E-Commerce Platform",
            type: "Web App",
            icon: "💻",
            featured: true,
            description: "A full-featured e-commerce platform with user authentication, product management, shopping cart, payment integration, and admin dashboard. Built with modern technologies for optimal performance and scalability.",
            technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
            links: {
                demo: "#",
                github: "#"
            }
        },
        {
            title: "Task Management App",
            type: "Mobile",
            icon: "📱",
            featured: false,
            description: "A collaborative task management application with real-time updates, team workspaces, drag-and-drop functionality, and deadline tracking. Designed for productivity and seamless team collaboration.",
            technologies: ["React Native", "Firebase", "Socket.io", "Redux"],
            links: {
                demo: "#",
                github: "#"
            }
        },
        {
            title: "Portfolio Builder",
            type: "Web App",
            icon: "🎨",
            featured: true,
            description: "An intuitive drag-and-drop portfolio builder that allows users to create beautiful portfolio websites without coding. Features multiple templates, custom domains, and analytics integration.",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
            links: {
                demo: "#",
                github: "#"
            }
        },
        {
            title: "Authentication API",
            type: "Backend",
            icon: "🔐",
            featured: false,
            description: "A robust authentication and authorization API with JWT tokens, OAuth integration, two-factor authentication, and role-based access control. RESTful design with comprehensive documentation.",
            technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "OAuth"],
            links: {
                demo: "#",
                github: "#",
                label: "Documentation"
            }
        },
        {
            title: "Analytics Dashboard",
            type: "Web App",
            icon: "📊",
            featured: false,
            description: "A real-time analytics dashboard with interactive charts, data visualization, and custom reporting. Features export functionality, scheduled reports, and multi-user support with role permissions.",
            technologies: ["React", "D3.js", "Python", "Flask", "MySQL"],
            links: {
                demo: "#",
                github: "#"
            }
        },
        {
            title: "AI Chatbot",
            type: "AI/ML",
            icon: "🤖",
            featured: false,
            description: "An intelligent chatbot powered by natural language processing that provides customer support, answers queries, and learns from interactions. Integrates with popular messaging platforms.",
            technologies: ["Python", "TensorFlow", "NLP", "FastAPI", "Docker"],
            links: {
                demo: "#",
                github: "#"
            }
        }
    ],

    // Contact Information
    contact: {
        title: "Get In Touch",
        subtitle: "Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new opportunities and collaborations.",
        info: [
            {
                icon: "📧",
                title: "Email",
                detail: "naveenraj@example.com",
                link: "mailto:naveenraj@example.com"
            },
            {
                icon: "📱",
                title: "Phone",
                detail: "+1 (234) 567-890",
                link: "tel:+1234567890"
            },
            {
                icon: "📍",
                title: "Location",
                detail: "Everywhere, Internet",
                link: null
            }
        ],
        social: [
            {
                name: "GitHub",
                icon: "G",
                link: "https://github.com/navi-04"
            },
            {
                name: "LinkedIn",
                icon: "in",
                link: "#"
            },
            {
                name: "Twitter",
                icon: "X",
                link: "#"
            },
            {
                name: "Dev.to",
                icon: "D",
                link: "#"
            }
        ],
        terminal: {
            code: `// Quick response
const responseTime = {
  email: "24 hours",
  message: "2-3 days",
  availability: "open"
};`
        }
    },

    // Images/Icons (can be extended with actual image paths)
    images: {
        logo: null, // Add logo path if available
        avatar: null, // Add avatar path if available
        projectImages: {} // Can add project-specific images
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}
