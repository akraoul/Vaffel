import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getComments();
      setComments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (commentData) => {
    setLoading(true);
    setError(null);
    try {
      await api.createComment(commentData);
      await fetchComments();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.deleteComment(id);
      await fetchComments();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return {
    comments,
    loading,
    error,
    fetchComments,
    createComment,
    deleteComment,
  };
};
