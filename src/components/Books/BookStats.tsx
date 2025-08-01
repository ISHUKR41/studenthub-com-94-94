import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Award, Star, Download, Calendar, Users } from 'lucide-react';
import { Book } from './BookData';

interface BookStatsProps {
  books: Book[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export const BookStats: React.FC<BookStatsProps> = ({ books }) => {
  // Calculate statistics
  const totalDownloads = books.reduce((sum, book) => sum + book.downloadCount, 0);
  const avgRating = books.reduce((sum, book) => sum + book.rating, 0) / books.length;
  const categories = books.reduce((acc, book) => {
    acc[book.category] = (acc[book.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categories).map(([name, value]) => ({
    name,
    value,
    count: value
  }));

  const yearlyData = books.reduce((acc, book) => {
    acc[book.year] = (acc[book.year] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const yearData = Object.entries(yearlyData)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => Number(a.year) - Number(b.year));

  const topRatedBooks = [...books]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const mostDownloadedBooks = [...books]
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            Library Analytics
          </h2>
          <p className="text-foreground-secondary text-lg">Insights into our digital book collection</p>
        </div>

        {/* Key Statistics */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            { 
              icon: Download, 
              label: "Total Downloads", 
              value: totalDownloads.toLocaleString(),
              color: "text-blue-500"
            },
            { 
              icon: Star, 
              label: "Average Rating", 
              value: avgRating.toFixed(1),
              color: "text-yellow-500"
            },
            { 
              icon: Users, 
              label: "Categories", 
              value: Object.keys(categories).length,
              color: "text-green-500"
            },
            { 
              icon: Calendar, 
              label: "Publication Years", 
              value: Object.keys(yearlyData).length,
              color: "text-purple-500"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass p-6 rounded-xl text-center hover:bg-primary/5 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <stat.icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-foreground-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Distribution */}
          <motion.div
            className="glass p-6 rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Books by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Publication Years */}
          <motion.div
            className="glass p-6 rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Publications by Year
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Top Books Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Rated Books */}
          <motion.div
            className="glass p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Top Rated Books
            </h3>
            <div className="space-y-4">
              {topRatedBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{book.title}</h4>
                    <p className="text-sm text-foreground-secondary truncate">{book.author}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{book.rating}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Most Downloaded Books */}
          <motion.div
            className="glass p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Download className="w-5 h-5 text-green-500" />
              Most Downloaded Books
            </h3>
            <div className="space-y-4">
              {mostDownloadedBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-sm font-bold text-green-500">
                    {index + 1}
                  </div>
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{book.title}</h4>
                    <p className="text-sm text-foreground-secondary truncate">{book.author}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">{book.downloadCount.toLocaleString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};