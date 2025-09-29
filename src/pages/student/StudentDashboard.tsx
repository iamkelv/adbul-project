import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, MessageSquare, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { Complaint, STATUS_OPTIONS, PRIORITY_OPTIONS } from '@/types/complaint';
import CreateComplaintModal from '@/components/complaints/CreateComplaintModal';

// Mock data for demo
const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Broken projector in Room 301',
    description: 'The projector has been malfunctioning for a week, affecting lectures.',
    category: 'facility',
    priority: 'high',
    status: 'in_progress',
    submittedBy: {
      id: '2',
      name: 'John Doe',
      email: 'john@mau.edu.ng',
      department: 'Computer Science',
      studentId: 'ST001'
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
    adminReply: 'We have contacted the maintenance team. They will fix it by Friday.'
  },
  {
    id: '2',
    title: 'Poor WiFi connectivity in library',
    description: 'Internet connection keeps dropping every few minutes.',
    category: 'technology',
    priority: 'medium',
    status: 'pending',
    submittedBy: {
      id: '2',
      name: 'John Doe',
      email: 'john@mau.edu.ng',
      department: 'Computer Science',
      studentId: 'ST001'
    },
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T09:15:00Z'
  },
  {
    id: '3',
    title: 'Late assignment feedback',
    description: 'Still waiting for feedback on assignment submitted 3 weeks ago.',
    category: 'academic',
    priority: 'low',
    status: 'resolved',
    submittedBy: {
      id: '2',
      name: 'John Doe',
      email: 'john@mau.edu.ng',
      department: 'Computer Science',
      studentId: 'ST001'
    },
    createdAt: '2024-01-10T11:45:00Z',
    updatedAt: '2024-01-13T16:30:00Z',
    resolvedAt: '2024-01-13T16:30:00Z',
    adminReply: 'Professor has uploaded the feedback. Check your portal.'
  }
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [complaints] = useState<Complaint[]>(mockComplaints);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = STATUS_OPTIONS.find(s => s.value === status);
    return statusConfig ? (
      <Badge className={statusConfig.color}>
        {getStatusIcon(status)}
        <span className="ml-1">{statusConfig.label}</span>
      </Badge>
    ) : null;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = PRIORITY_OPTIONS.find(p => p.value === priority);
    return priorityConfig ? (
      <Badge variant="outline" className={priorityConfig.color}>
        {priorityConfig.label}
      </Badge>
    ) : null;
  };

  const pendingComplaints = complaints.filter(c => c.status === 'pending');
  const inProgressComplaints = complaints.filter(c => c.status === 'in_progress');
  const resolvedComplaints = complaints.filter(c => c.status === 'resolved');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">Manage your complaints and track their progress</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Complaint
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Complaints</p>
                <p className="text-2xl font-bold">{complaints.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{pendingComplaints.length}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-info">{inProgressComplaints.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-success">{resolvedComplaints.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complaints List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Complaints</CardTitle>
          <CardDescription>Track the status of all your submitted complaints</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {complaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {pendingComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </TabsContent>

            <TabsContent value="in-progress" className="space-y-4">
              {inProgressComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4">
              {resolvedComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <CreateComplaintModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
};

const ComplaintCard: React.FC<{ complaint: Complaint }> = ({ complaint }) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = STATUS_OPTIONS.find(s => s.value === status);
    return statusConfig ? (
      <Badge className={statusConfig.color}>
        {statusConfig.label}
      </Badge>
    ) : null;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = PRIORITY_OPTIONS.find(p => p.value === priority);
    return priorityConfig ? (
      <Badge variant="outline" className={priorityConfig.color}>
        {priorityConfig.label}
      </Badge>
    ) : null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{complaint.title}</h3>
            <p className="text-muted-foreground mb-3">{complaint.description}</p>
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge(complaint.status)}
              {getPriorityBadge(complaint.priority)}
              <Badge variant="outline" className="capitalize">
                {complaint.category}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Created: {formatDate(complaint.createdAt)}</span>
          </div>
          <span>Updated: {formatDate(complaint.updatedAt)}</span>
        </div>

        {complaint.adminReply && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <p className="text-sm font-medium mb-1">Admin Response:</p>
            <p className="text-sm text-muted-foreground">{complaint.adminReply}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentDashboard;