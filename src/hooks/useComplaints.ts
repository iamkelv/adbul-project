import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Complaint } from '@/types/complaint';

export const useComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchComplaints = async () => {
    if (!user) return;

    try {
      setLoading(true);
      let query = supabase.from('complaints').select(`
        id,
        title,
        description,
        category,
        status,
        priority,
        created_at,
        updated_at,
        user_id
      `);

      // If user is not admin, only fetch their own complaints
      if (user.role !== 'admin') {
        query = query.eq('user_id', user.user_id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching complaints:', error);
        return;
      }

      // Fetch user profiles for each complaint
      const userIds = [...new Set(data.map(item => item.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, name, email, department, student_id')
        .in('user_id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

      // Transform the data to match the Complaint type
      const transformedComplaints: Complaint[] = data.map((item) => {
        const profile = profileMap.get(item.user_id);
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category as any,
          status: item.status as 'pending' | 'in_progress' | 'resolved' | 'rejected',
          priority: item.priority as 'low' | 'medium' | 'high',
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          submittedBy: {
            id: item.user_id,
            name: profile?.name || 'Unknown User',
            email: profile?.email || '',
            department: profile?.department,
            studentId: profile?.student_id,
          }
        };
      });

      setComplaints(transformedComplaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const createComplaint = async (complaintData: {
    title: string;
    description: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
  }) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('complaints')
      .insert([{
        ...complaintData,
        user_id: user.user_id,
      }])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // Refresh complaints list
    await fetchComplaints();
    return data;
  };

  const updateComplaintStatus = async (id: string, status: 'pending' | 'in_progress' | 'resolved' | 'rejected') => {
    const { error } = await supabase
      .from('complaints')
      .update({ status })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    // Refresh complaints list
    await fetchComplaints();
  };

  useEffect(() => {
    if (user) {
      fetchComplaints();
    }
  }, [user]);

  return {
    complaints,
    loading,
    fetchComplaints,
    createComplaint,
    updateComplaintStatus,
  };
};