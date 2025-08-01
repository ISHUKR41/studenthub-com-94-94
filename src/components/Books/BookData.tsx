// Sample book data - in a real app this would come from an API
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  subject: string;
  language: string;
  year: number;
  fileSize: string;
  rating: number;
  downloadCount: number;
  coverImage: string;
  downloadLink: string;
  previewPages: number;
  isbn: string;
  publisher: string;
}

export const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'Advanced Mathematics for Engineers',
    author: 'Dr. Sarah Johnson',
    description: 'Comprehensive guide covering differential equations, linear algebra, and complex analysis specifically designed for engineering students.',
    category: 'Academic',
    subject: 'Mathematics',
    language: 'English',
    year: 2023,
    fileSize: '15.2 MB',
    rating: 4.8,
    downloadCount: 12450,
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop',
    downloadLink: 'https://drive.google.com/file/d/1abc123/view?usp=sharing',
    previewPages: 25,
    isbn: '978-0-123456-78-9',
    publisher: 'Academic Press'
  },
  {
    id: '2',
    title: 'Data Structures and Algorithms',
    author: 'Prof. Michael Chen',
    description: 'Essential data structures and algorithms for computer science students with practical examples and coding exercises.',
    category: 'Technical',
    subject: 'Computer Science',
    language: 'English',
    year: 2023,
    fileSize: '22.8 MB',
    rating: 4.9,
    downloadCount: 18960,
    coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=600&fit=crop',
    downloadLink: 'https://drive.google.com/file/d/1def456/view?usp=sharing',
    previewPages: 30,
    isbn: '978-0-987654-32-1',
    publisher: 'Tech Publications'
  },
  {
    id: '3',
    title: 'Organic Chemistry Fundamentals',
    author: 'Dr. Emily Rodriguez',
    description: 'Complete guide to organic chemistry with detailed reaction mechanisms and synthesis pathways.',
    category: 'Academic',
    subject: 'Chemistry',
    language: 'English',
    year: 2022,
    fileSize: '28.5 MB',
    rating: 4.7,
    downloadCount: 9876,
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=600&fit=crop',
    downloadLink: 'https://drive.google.com/file/d/1ghi789/view?usp=sharing',
    previewPages: 35,
    isbn: '978-0-456789-01-2',
    publisher: 'Science Books Ltd'
  },
  {
    id: '4',
    title: 'Modern Physics Concepts',
    author: 'Prof. David Wilson',
    description: 'Contemporary approach to quantum mechanics, relativity, and particle physics with real-world applications.',
    category: 'Academic',
    subject: 'Physics',
    language: 'English',
    year: 2023,
    fileSize: '19.7 MB',
    rating: 4.6,
    downloadCount: 7654,
    coverImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop',
    downloadLink: 'https://drive.google.com/file/d/1jkl012/view?usp=sharing',
    previewPages: 28,
    isbn: '978-0-234567-89-0',
    publisher: 'Physics Today Press'
  },
  {
    id: '5',
    title: 'Digital Marketing Mastery',
    author: 'Lisa Thompson',
    description: 'Complete guide to digital marketing strategies, SEO, social media marketing, and content creation.',
    category: 'Business',
    subject: 'Marketing',
    language: 'English',
    year: 2023,
    fileSize: '16.3 MB',
    rating: 4.5,
    downloadCount: 15420,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop',
    downloadLink: 'https://drive.google.com/file/d/1mno345/view?usp=sharing',
    previewPages: 22,
    isbn: '978-0-345678-90-1',
    publisher: 'Business Excellence'
  },
  {
    id: '6',
    title: 'Introduction to Machine Learning',
    author: 'Dr. Alex Kumar',
    description: 'Beginner-friendly introduction to machine learning algorithms, neural networks, and practical implementations.',
    category: 'Technical',
    subject: 'Artificial Intelligence',
    language: 'English',
    year: 2023,
    fileSize: '25.1 MB',
    rating: 4.9,
    downloadCount: 23450,
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=600&fit=crop',
    downloadLink: 'https://drive.google.com/file/d/1pqr678/view?usp=sharing',
    previewPages: 32,
    isbn: '978-0-567890-12-3',
    publisher: 'AI Learning Press'
  },
  {
    id: '7',
    title: 'Environmental Science Today',
    author: 'Dr. Maria Garcia',
    description: 'Current environmental challenges, climate change, sustainable development, and conservation strategies.',
    category: 'Academic',
    subject: 'Environmental Science',
    language: 'English',
    year: 2023,
    fileSize: '21.4 MB',
    rating: 4.4,
    downloadCount: 6789,
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
    downloadLink: 'https://drive.google.com/file/d/1stu901/view?usp=sharing',
    previewPages: 26,
    isbn: '978-0-678901-23-4',
    publisher: 'Green Earth Publications'
  },
  {
    id: '8',
    title: 'Financial Markets Analysis',
    author: 'Robert Kim',
    description: 'Comprehensive analysis of financial markets, investment strategies, and risk management techniques.',
    category: 'Business',
    subject: 'Finance',
    language: 'English',
    year: 2022,
    fileSize: '18.9 MB',
    rating: 4.6,
    downloadCount: 11230,
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=600&fit=crop',
    downloadLink: 'https://drive.google.com/file/d/1vwx234/view?usp=sharing',
    previewPages: 24,
    isbn: '978-0-789012-34-5',
    publisher: 'Financial Insights'
  },
  {
    id: '9',
    title: 'Web Development Bootcamp',
    author: 'James Park',
    description: 'Full-stack web development using modern technologies including React, Node.js, and database management.',
    category: 'Technical',
    subject: 'Web Development',
    language: 'English',
    year: 2023,
    fileSize: '31.7 MB',
    rating: 4.8,
    downloadCount: 19870,
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop',
    downloadLink: 'https://drive.google.com/file/d/1yzab567/view?usp=sharing',
    previewPages: 40,
    isbn: '978-0-890123-45-6',
    publisher: 'Web Masters'
  },
  {
    id: '10',
    title: 'Psychology and Human Behavior',
    author: 'Dr. Amanda White',
    description: 'Understanding human psychology, cognitive processes, and behavioral patterns in modern society.',
    category: 'Academic',
    subject: 'Psychology',
    language: 'English',
    year: 2023,
    fileSize: '17.6 MB',
    rating: 4.5,
    downloadCount: 8945,
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    downloadLink: 'https://drive.google.com/file/d/1cdef890/view?usp=sharing',
    previewPages: 29,
    isbn: '978-0-901234-56-7',
    publisher: 'Mind Sciences'
  },
  {
    id: '11',
    title: 'Blockchain Technology Guide',
    author: 'Chris Anderson',
    description: 'Complete guide to blockchain technology, cryptocurrencies, smart contracts, and decentralized applications.',
    category: 'Technical',
    subject: 'Blockchain',
    language: 'English',
    year: 2023,
    fileSize: '23.2 MB',
    rating: 4.7,
    downloadCount: 14560,
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=600&fit=crop',
    downloadLink: 'https://drive.google.com/file/d/1ghij123/view?usp=sharing',
    previewPages: 33,
    isbn: '978-0-012345-67-8',
    publisher: 'Crypto Learning'
  },
  {
    id: '12',
    title: 'Creative Writing Workshop',
    author: 'Sophie Turner',
    description: 'Develop your creative writing skills with practical exercises, storytelling techniques, and genre exploration.',
    category: 'Literature',
    subject: 'Creative Writing',
    language: 'English',
    year: 2022,
    fileSize: '12.8 MB',
    rating: 4.3,
    downloadCount: 5432,
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=600&fit=crop',
    downloadLink: 'https://drive.google.com/file/d/1klmn456/view?usp=sharing',
    previewPages: 20,
    isbn: '978-0-123456-78-9',
    publisher: 'Writers Guild'
  }
];

export const categories = ['All', 'Academic', 'Technical', 'Business', 'Literature'];
export const subjects = [
  'All', 'Mathematics', 'Computer Science', 'Chemistry', 'Physics', 
  'Marketing', 'Artificial Intelligence', 'Environmental Science', 'Finance', 
  'Web Development', 'Psychology', 'Blockchain', 'Creative Writing'
];
export const languages = ['All', 'English', 'Hindi', 'Spanish', 'French'];