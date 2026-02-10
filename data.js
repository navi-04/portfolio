// Portfolio Website Data
const portfolioData = {
    // Personal Information
    personal: {
        name: "Naveenraj Thiyagarajan",
        role: "Software Developer",
        location: "Karur, India",
        email: "naveenrajthiyagarajan6@gmail.com",
        phone: "+91 8122118540",
        github: "https://github.com/navi-04",
        linkedin: "#", // Update if provided
        site: "nraj.me"
    },

    // Navigation (Single Page)
    navigation: [
        { name: "Start", href: "#hero" },
        { name: "Story", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Creation", href: "#projects" },
        { name: "Contact", href: "#contact" }
    ],

    // Hero Section
    hero: {
        greeting: "Hello, world. I am",
        title: "Naveenraj.",
        subtitle: "I architect digital realities.",
        description: "Passionate Software Developer skilled in Python, JavaScript, and automation. I build efficient, innovative solutions that bridge the gap between complex problems and elegant experiences.",
        cta: {
            text: "View My Journey",
            link: "#about"
        },
        terminal: {
            title: "status.log",
            code: `> Initializing developer profile...
> Loading skills... [Python, JS, AI]
> Loading experience... [Innoov, Fewinfos]
> Status: Ready to build.
> Current Mission: Innovation.`
        }
    },

    // About Section
    about: {
        title: "My Story",
        paragraphs: [
            "I'm a **Software Developer** based in Karur, passionate about automation, agile development, and digital product design. My journey is defined by a relentless pursuit of efficiency and innovation.",
            "With a strong foundation in **Python** and **JavaScript**, I specialize in building systems that not only work but excel. From cross-cultural collaboration at **Innoov** in Japan to leading open-source initiatives at **Fewinfos**, I thrive in dynamic environments.",
            "I believe in the power of **leadership** and **collaboration** to drive technical success. When I'm not coding, I'm analyzing data structures or exploring the frontiers of AI modeling."
        ],
        skills: [
            "Python", "JavaScript", "React", "CI/CD", 
            "Data Structures", "AI Modeling", "Automation",
            "Jira Admin", "Agile", "Leadership"
        ],
        terminal: {
            title: "skills.json",
            data: {
                languages: ["Tamil", "English", "Japanese (JLPT N3)"],
                certifications: ["ACP-620", "ACP-120", "ACA-900"],
                core: ["Critical Thinking", "Time Management", "Agility"],
                education: "B.E. CSE (CGPA 8.0)"
            }
        }
    },

    // Experience Section
    experience: [
        {
            title: "Software Developer Internship",
            company: "Innoov (Japan)",
            period: "Jan 2025 - Present",
            description: "Developing automation systems and add-on apps for Jira, Confluence, and JSM.",
            highlights: [
                "Certified Jira Project Admin (ACP-620) & Jira Admin (ACP-120).",
                "Gained exposure to cross-cultural agile development environments.",
                "Built automation solutions to streamline enterprise workflows.",
                "Collaborated with international teams to deliver robust software."
            ],
            technologies: ["Jira", "Confluence", "Automation", "Agile"]
        },
        {
            title: "Founder & Lead",
            company: "Fewinfos",
            period: "Nov 2024 - Present",
            description: "Leading open-source software development and managing client projects.",
            highlights: [
                "Focused on open source software development with 10+ active members.",
                "Generated 10k+ monthly revenue through strategic client support.",
                "Managed 2+ major clients for open source development support.",
                " fostered a collaborative community of developers."
            ],
            technologies: ["Open Source", "Leadership", "Freelancing"]
        }
    ],

    // Projects Section
    projects: [
        {
            title: "LayerLens",
            type: "Open Source Package",
            icon: "📦",
            featured: true,
            description: "A Python package for explaining layers in ML models, helping developers understand model architecture better.",
            technologies: ["Python", "Git", "Algorithmic Structuring", "ML"],
            links: {
                demo: "https://pypi.org/project/layerlens/",
                github: "#"
            }
        },
        {
            title: "Problem2project",
            type: "Collaborative Platform",
            icon: "🤝",
            featured: true,
            description: "A collaborative area where real-world problems are shared and discussed to find technical solutions.",
            technologies: ["React", "Python", "HTML/CSS", "Render"],
            links: {
                demo: "https://problem2project.site",
                github: "#"
            }
        }
    ],

    // Contact Information
    contact: {
        title: "Connect",
        subtitle: "Let's build something incredible together.",
        info: [
            {
                icon: "📧",
                title: "Email",
                detail: "naveenrajthiyagarajan6@gmail.com",
                link: "mailto:naveenrajthiyagarajan6@gmail.com"
            },
            {
                icon: "📱",
                title: "Phone",
                detail: "+91 8122118540",
                link: "tel:+918122118540"
            },
            {
                icon: "🌍",
                title: "Location",
                detail: "Karur, India",
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
                link: "#" // Add actual link if known
            }
        ],
        terminal: {
            code: `// Contact status
const contact = {
  availability: "Open to opportunities",
  preferred: ["Email", "LinkedIn"],
  response: "Typically within 24h"
};`
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}
