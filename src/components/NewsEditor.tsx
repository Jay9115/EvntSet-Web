import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';

const NewsEditor = () => {
  const [news, setNews] = useState([
    {
      id: 1,
      title: "New Event Management System Launch",
      content: "We're excited to announce the launch of our new event management system.",
      date: "2024-03-01",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Spring Festival Registration Open",
      content: "Registration for the annual Spring Festival is now open.",
      date: "2024-03-05",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80"
    }
  ]);

  const [editingNews, setEditingNews] = useState<any>(null);

  const handleEdit = (newsItem: any) => {
    setEditingNews(newsItem);
  };

  const handleDelete = (id: number) => {
    setNews(news.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews) {
      setNews(news.map(item => 
        item.id === editingNews.id ? editingNews : item
      ));
      setEditingNews(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage News</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add News
        </button>
      </div>

      {editingNews ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editingNews.title}
                onChange={e => setEditingNews({...editingNews, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={editingNews.content}
                onChange={e => setEditingNews({...editingNews, content: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={editingNews.image}
                onChange={e => setEditingNews({...editingNews, image: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setEditingNews(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      ) : null}

      <div className="space-y-6">
        {news.map(item => (
          <div key={item.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.content}</p>
                  <p className="text-sm text-gray-500 mt-2">{item.date}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsEditor;