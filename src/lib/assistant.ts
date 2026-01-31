export interface AssistantResponse {
  message: string;
  suggestions?: string[];
}

const KEYWORDS = {
  greeting: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
  courses: ['course', 'courses', 'program', 'programs', 'training', 'skill', 'skills', 'learn'],
  internship: ['internship', 'intern', 'internships', 'work experience', 'practical'],
  placement: ['placement', 'job', 'jobs', 'career', 'employment', 'hire', 'hiring'],
  fees: ['fee', 'fees', 'cost', 'price', 'pricing', 'payment', 'pay'],
  enrollment: ['enroll', 'enrollment', 'join', 'register', 'registration', 'signup', 'sign up', 'apply', 'application'],
  mentorship: ['mentor', 'mentorship', 'guidance', 'guide', 'support'],
  roadmap: ['roadmap', 'path', 'journey', 'plan', 'steps'],
  help: ['help', 'support', 'assist', 'assistance'],
};

function detectIntent(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const intents: string[] = [];

  for (const [intent, keywords] of Object.entries(KEYWORDS)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      intents.push(intent);
    }
  }

  return intents;
}

export function getAssistantResponse(userMessage: string, isFirstMessage: boolean): AssistantResponse {
  if (isFirstMessage) {
    return {
      message: "Hello! I'm the Iron Lady AI Assistant. I'm here to help you with skill training, mentorship, internships, placement assistance, and career guidance. How can I help you today?",
      suggestions: [
        "Tell me about your courses",
        "How do I enroll?",
        "Internship opportunities",
        "Placement assistance details"
      ]
    };
  }

  const intents = detectIntent(userMessage);

  if (intents.includes('greeting')) {
    return {
      message: "Hello! Great to connect with you. I'm here to help you explore Iron Lady's programs and guide you in your career journey. What would you like to know more about?",
      suggestions: [
        "Available courses",
        "Enrollment process",
        "Career guidance",
        "Fee structure"
      ]
    };
  }

  if (intents.includes('courses') || intents.includes('roadmap')) {
    return {
      message: "Iron Lady offers comprehensive skill training programs designed to make you industry-ready. Our programs include:\n\n• Technical Skills Training (Web Development, Data Science, AI/ML, etc.)\n• Soft Skills Development\n• Industry-specific Certifications\n• Hands-on Project Work\n• Live Industry Projects\n\nEach program is tailored to current market demands and includes mentorship from industry experts. Which area are you most interested in?",
      suggestions: [
        "Web Development courses",
        "Data Science programs",
        "Duration and schedule",
        "Enrollment process"
      ]
    };
  }

  if (intents.includes('internship')) {
    return {
      message: "Our internship program is designed to give you real-world experience! Here's what we offer:\n\n• Industry Partner Internships\n• 3-6 month duration programs\n• Work on live projects\n• Mentorship throughout your internship\n• Internship completion certificates\n• Potential for full-time conversion\n\nWe connect talented learners with our partner companies across various domains. Would you like to know about specific internship domains or the application process?",
      suggestions: [
        "Available domains",
        "Application process",
        "Internship duration",
        "Eligibility criteria"
      ]
    };
  }

  if (intents.includes('placement')) {
    return {
      message: "Iron Lady provides dedicated placement assistance to help kickstart your career:\n\n• Resume Building & Review\n• Interview Preparation\n• Mock Interviews\n• Direct Company Connections\n• Job Portal Access\n• Career Counseling\n• Ongoing Support\n\nWe work with 100+ hiring partners across industries. While we provide extensive support, actual placements depend on your skills, performance, and market conditions. What specific aspect would you like to know more about?",
      suggestions: [
        "Interview preparation",
        "Partner companies",
        "Success stories",
        "Eligibility requirements"
      ]
    };
  }

  if (intents.includes('fees')) {
    return {
      message: "Our fee structure is designed to be accessible and flexible:\n\n• Course fees vary by program and duration\n• Flexible payment plans available\n• Scholarships for deserving candidates\n• EMI options for eligible students\n• No hidden charges\n\nFor specific fee details and payment options for a particular course, I'd recommend connecting with our admissions team. They can provide you with a detailed breakdown based on your chosen program.\n\nWould you like to know about a specific course, or shall I help you with the enrollment process?",
      suggestions: [
        "Payment plans",
        "Scholarship details",
        "Course recommendations",
        "Talk to admissions"
      ]
    };
  }

  if (intents.includes('enrollment') || intents.includes('help')) {
    return {
      message: "Enrolling with Iron Lady is simple! Here's the process:\n\n1. **Explore Programs**: Browse our courses and choose what fits your goals\n2. **Initial Consultation**: Connect with our counselors for guidance\n3. **Application**: Fill out a simple application form\n4. **Assessment**: Quick skill assessment (for some programs)\n5. **Confirmation**: Choose your payment plan and confirm enrollment\n6. **Get Started**: Access your learning materials and begin!\n\nThe entire process typically takes 24-48 hours. Would you like me to guide you through any specific step?",
      suggestions: [
        "Start application",
        "Book a consultation",
        "Course details first",
        "Fee information"
      ]
    };
  }

  if (intents.includes('mentorship')) {
    return {
      message: "Mentorship is at the heart of Iron Lady! Here's what you get:\n\n• One-on-one mentorship sessions\n• Industry expert mentors\n• Personalized career guidance\n• Technical doubt solving\n• Project review and feedback\n• Career path planning\n• Regular progress tracking\n\nOur mentors are experienced professionals from top companies who are dedicated to your success. You'll have scheduled mentor sessions throughout your learning journey. What aspect of mentorship interests you most?",
      suggestions: [
        "Mentor backgrounds",
        "Session frequency",
        "How to connect with mentors",
        "Career guidance details"
      ]
    };
  }

  return {
    message: "I'd be happy to help you with that! As your Iron Lady assistant, I can provide information about:\n\n• Course programs and skill training\n• Internship opportunities\n• Placement assistance\n• Fee structure and payment options\n• Enrollment process\n• Mentorship programs\n• Learning roadmaps and career guidance\n\nCould you please tell me more about what you're looking for? What are your career goals or areas of interest?",
    suggestions: [
      "Show me all courses",
      "How to get started",
      "Career guidance",
      "Speak to a counselor"
    ]
  };
}
