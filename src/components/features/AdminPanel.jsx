import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { CONFIG } from '../../constants/config';

export const AdminPanel = ({ translations }) => {
  const [comments, setComments] = useState([]);
  const [password, setPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [replyText, setReplyText] = useState({});
  const [selectedComment, setSelectedComment] = useState(null);
  const [error, setError] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchComments();
    }
  }, [isAuthenticated]);

  const fetchComments = async () => {
    try {
      const data = await api.getComments();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === CONFIG.ADMIN_PASSWORD && adminName) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password or name');
    }
  };

  const handleReply = async (commentId) => {
    const reply = replyText[commentId];
    if (!reply) return;

    try {
      await api.replyToComment(commentId, {
        reply,
        admin_name: adminName,
        admin_password: password
      });
      setReplyText({ ...replyText, [commentId]: '' });
      setSelectedComment(null);
      fetchComments();
    } catch (error) {
      console.error('Error replying to comment:', error);
      setError(error.message || 'Failed to reply');
    }
  };

  const handleDelete = async (commentId) => {
    setDeleteConfirmation(commentId);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;

    try {
      await api.deleteComment(deleteConfirmation);
      setDeleteConfirmation(null);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError(error.message || 'Failed to delete comment');
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-8 px-3">
        <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--primary-color)', fontFamily: 'TT Firs Neue, sans-serif' }}>
            {translations.adminLogin}
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2 font-medium" style={{ color: 'var(--text-dark)' }}>{translations.adminName}</label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--bg-light)',
                  borderColor: 'var(--secondary-color)',
                  color: 'var(--text-dark)'
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium" style={{ color: 'var(--text-dark)' }}>{translations.adminPassword}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--bg-light)',
                  borderColor: 'var(--secondary-color)',
                  color: 'var(--text-dark)'
                }}
                required
              />
            </div>
            {error && (
              <div className="mb-4 text-sm p-2 rounded-lg" style={{ backgroundColor: '#FF6B6B', color: 'white' }}>{error}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              {translations.loginButton}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--primary-color)', fontFamily: 'TT Firs Neue, sans-serif' }}>
          {translations.adminPanel}
        </h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 sm:flex-none px-3 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            style={{ backgroundColor: 'var(--secondary-color)', color: '#303030' }}
          >
            {translations.backToSite}
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex-1 sm:flex-none px-3 py-2 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            style={{ backgroundColor: '#FF6B6B' }}
          >
            {translations.logout}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 rounded-2xl" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--secondary-color)' }}>
            <p className="text-lg" style={{ color: 'var(--text-dark)' }}>{translations.noComments}</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:scale-[1.02]" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--secondary-color)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg font-bold" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base" style={{ color: 'var(--text-dark)' }}>{comment.name}</h4>
                      <div className="text-lg sm:text-xl" style={{ color: 'var(--primary-color)' }}>{renderStars(comment.rating)}</div>
                    </div>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--text-dark)', opacity: 0.6 }}>
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="px-3 py-1 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: '#FF6B6B', color: 'white' }}
                >
                  Delete
                </button>
              </div>
              <p className="text-base mb-3" style={{ color: 'var(--text-dark)' }}>{comment.comment}</p>

              {comment.reply ? (
                <div className="mt-3 p-2 rounded-xl" style={{ backgroundColor: 'var(--secondary-color)', borderLeft: '4px solid var(--border-color)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                      {comment.admin_name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-sm" style={{ color: 'var(--text-dark)' }}>{comment.admin_name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                      {translations.adminBadge}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-dark)', opacity: 0.6 }}>
                      {new Date(comment.replied_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="italic text-sm" style={{ color: 'var(--text-dark)' }}>{comment.reply}</p>
                </div>
              ) : (
                <div className="mt-3">
                  {selectedComment === comment.id ? (
                    <div>
                      <textarea
                        value={replyText[comment.id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-300 resize-none mb-2"
                        style={{ 
                          backgroundColor: 'var(--bg-light)',
                          borderColor: 'var(--secondary-color)',
                          color: 'var(--text-dark)',
                          minHeight: '80px'
                        }}
                        placeholder={translations.replyPlaceholder}
                      />
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleReply(comment.id)}
                          className="px-4 py-2 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                          style={{ backgroundColor: 'var(--primary-color)' }}
                        >
                          {translations.sendReply}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedComment(null);
                            setReplyText({ ...replyText, [comment.id]: '' });
                          }}
                          className="px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                          style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--text-dark)' }}
                        >
                          {translations.cancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedComment(comment.id)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                      style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                      {translations.replyButton}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Custom Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-2xl p-6 max-w-md w-full mx-4" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
              Confirm Deletion
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-dark)' }}>
              Are you sure you want to delete this comment? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'var(--secondary-color)', color: '#303030' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#FF6B6B' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
