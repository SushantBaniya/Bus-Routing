// components/Contributors.tsx

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const contributors = [
  {
    name: 'Sushant Baniya',
    role: 'Backend Developer',
    image: '/images/sushant.jpg', // Replace with actual image path
    initials: 'SB',
    github: '#', // Add actual GitHub URL
    linkedin: '#', // Add actual LinkedIn URL
    email: 'sushant@safeyatra.com', // Add actual email
  },
  {
    name: 'Milan Thapa',
    role: 'Frontend Developer',
    image: '/images/milan.jpg', // Replace with actual image path
    initials: 'MT',
    github: '#',
    linkedin: '#',
    email: 'milan@safeyatra.com',
  },
  {
    name: 'Ayush Puri',
    role: 'UI/UX Designer',
    image: '/images/ayush.jpg', // Replace with actual image path
    initials: 'AP',
    github: '#',
    linkedin: '#',
    email: 'ayush@safeyatra.com',
  },
];

export default function Contributors() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            The talented individuals behind Safe Yatra
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {contributors.map((contributor, index) => (
            <div
              key={index}
              className="flex flex-col items-center group"
            >
              {/* Avatar/Image Container */}
              <div className="relative mb-6">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  {/* Replace this div with <img> when you have actual photos */}
                  {/* <img 
                    src={contributor.image} 
                    alt={contributor.name}
                    className="w-full h-full object-cover"
                  /> */}
                  
                  {/* Placeholder Initials (Remove when adding real images) */}
                  <span className="text-4xl font-bold text-white">
                    {contributor.initials}
                  </span>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {contributor.name}
              </h3>
              <p className="text-sm font-medium text-white mb-4">
                {contributor.role}
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href={contributor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label={`${contributor.name}'s GitHub`}
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={contributor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label={`${contributor.name}'s LinkedIn`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${contributor.email}`}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                  aria-label={`Email ${contributor.name}`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}