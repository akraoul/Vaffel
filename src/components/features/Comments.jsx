import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const Comments = ({ translations }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedComments, setLikedComments] = useState({});
  const [commentLikes, setCommentLikes] = useState({});

  useEffect(() => {
    fetchComments();
    try {
      const savedLikedComments = localStorage.getItem('likedComments');
      const savedCommentLikes = localStorage.getItem('commentLikes');
      if (savedLikedComments) setLikedComments(JSON.parse(savedLikedComments));
      if (savedCommentLikes) setCommentLikes(JSON.parse(savedCommentLikes));
    } catch (error) {
      console.error('Error loading likes from localStorage:', error);
    }
  }, []);

  const fetchComments = async () => {
    try {
      const data = await api.getComments();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    setIsSubmitting(true);
    try {
      await api.createComment({ name, comment, rating });
      setName('');
      setComment('');
      setRating(5);
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleLike = (commentId) => {
    const newLikedComments = { ...likedComments, [commentId]: true };
    const newCommentLikes = { ...commentLikes, [commentId]: (commentLikes[commentId] || 0) + 1 };
    setLikedComments(newLikedComments);
    setCommentLikes(newCommentLikes);
    try {
      localStorage.setItem('likedComments', JSON.stringify(newLikedComments));
      localStorage.setItem('commentLikes', JSON.stringify(newCommentLikes));
    } catch (error) {
      console.error('Error saving likes to localStorage:', error);
    }
  };

  const handleUnlike = (commentId) => {
    const newLikedComments = { ...likedComments, [commentId]: false };
    const newCommentLikes = { ...commentLikes, [commentId]: Math.max(0, (commentLikes[commentId] || 0) - 1) };
    setLikedComments(newLikedComments);
    setCommentLikes(newCommentLikes);
    try {
      localStorage.setItem('likedComments', JSON.stringify(newLikedComments));
      localStorage.setItem('commentLikes', JSON.stringify(newCommentLikes));
    } catch (error) {
      console.error('Error saving likes to localStorage:', error);
    }
  };

  return (
    <div className="mt-8 px-3">
      <h2 className="text-4xl font-bold mb-6 text-center" style={{ color: 'var(--primary-color)', fontFamily: 'TT Firs Neue, sans-serif' }}>
        {translations.title}
      </h2>

      {/* Comment Form */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--primary-color)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-medium" style={{ color: 'var(--text-dark)' }}>{translations.nameLabel}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--bg-light)',
                  borderColor: 'var(--secondary-color)',
                  color: 'var(--text-dark)',
                  focusBorderColor: 'var(--primary-color)'
                }}
                required
                placeholder={translations.nameLabel}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" style={{ color: 'var(--text-dark)' }}>{translations.ratingLabel}</label>
              <div className="px-4 py-2 rounded-xl transition-all duration-300 flex gap-1" style={{ backgroundColor: 'var(--secondary-color)', border: '2px solid var(--primary-color)', minWidth: '200px' }}>
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <button
                    key={starIndex}
                    type="button"
                    onClick={() => setRating(starIndex)}
                    className="text-2xl transition-all duration-200 hover:scale-110"
                    style={{
                      color: starIndex <= rating ? '#FF9400' : '#303030',
                      WebkitTextStroke: starIndex <= rating ? '0' : '1px #303030',
                      WebkitTextFillColor: starIndex <= rating ? '#FF9400' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" style={{ color: 'var(--text-dark)' }}>{translations.commentLabel}</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-300 resize-none"
                style={{ 
                  backgroundColor: 'var(--bg-light)',
                  borderColor: 'var(--secondary-color)',
                  color: 'var(--text-dark)',
                  focusBorderColor: 'var(--primary-color)',
                  minHeight: '100px'
                }}
                required
                placeholder={translations.commentLabel}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              {isSubmitting ? translations.sending : translations.submitButton}
            </button>
          </form>
        </div>
      </div>

      {/* Comments List */}
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-dark)', fontFamily: 'TT Firs Neue, sans-serif' }}>
          {translations.recentComments}
        </h3>
        
        {comments.length === 0 ? (
          <div className="text-center py-8 rounded-2xl" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--secondary-color)' }}>
            <p className="text-lg" style={{ color: 'var(--text-dark)' }}>{translations.noComments}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--secondary-color)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-base" style={{ color: 'var(--text-dark)' }}>{comment.name}</h4>
                        <div className="text-xl" style={{ color: 'var(--primary-color)' }}>{renderStars(comment.rating)}</div>
                      </div>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--text-dark)', opacity: 0.6 }}>
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={() => likedComments[comment.id] ? handleUnlike(comment.id) : handleLike(comment.id)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: likedComments[comment.id] ? 'var(--primary-color)' : 'var(--secondary-color)', color: likedComments[comment.id] ? 'white' : '#303030' }}
                  >
                    <span>{likedComments[comment.id] ? '❤️' : '🤍'}</span>
                    <span className="text-xs font-medium">{commentLikes[comment.id] || 0}</span>
                  </button>
                </div>
                <p className="text-base mb-3" style={{ color: 'var(--text-dark)' }}>{comment.comment}</p>
                
                {comment.reply && (
                  <div className="mt-3 p-2 rounded-xl" style={{ backgroundColor: 'var(--secondary-color)', borderLeft: '4px solid var(--primary-color)' }}>
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
                    <p className="italic text-sm" style={{ color: '#303030' }}>{comment.reply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
