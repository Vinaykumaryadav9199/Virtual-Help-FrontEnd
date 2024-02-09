import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard'; // Assume you have a BlogCard component

const AutoSlideBlog = ({ blogData, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogData.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, blogData.length]);

  return (
    <div className="auto-slide-blog">
      {blogData.map((blog, index) => (
        <div key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
          <BlogCard title={blog.title} content={blog.content} imageUrl={blog.imageUrl} />
        </div>
      ))}
    </div>
  );
};

// Example usage:
const BlogSlider = () => {
  const blogs = [
    {
      title: 'Blog 1',
      content: 'This is the content of Blog 1.',
      imageUrl: 'https://example.com/blog1.jpg',
    },
    {
      title: 'Blog 2',
      content: 'This is the content of Blog 2.',
      imageUrl: 'https://example.com/blog2.jpg',
    },
    // Add more blog data as needed
  ];

  return <AutoSlideBlog blogData={blogs} />;
};

export default BlogSlider;
