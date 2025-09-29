import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Complaint, STATUS_OPTIONS, PRIORITY_OPTIONS, ComplaintStatus } from '@/types/complaint';
import { Calendar, User, MapPin, Clock, MessageSquare, Loader2 } from 'lucide-react';

interface ComplaintDetailsModalProps {
  complaint: Complaint | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ComplaintDetailsModal: React.FC<ComplaintDetailsModalProps> = ({ 
  complaint, 
  open, 
  onOpenChange 
}) => {
  const { toast } = useToast();
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('pending');
  const [adminReply, setAdminReply] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (complaint) {
      setNewStatus(complaint.status);
      setAdminReply(complaint.adminReply || '');
    }
  }, [complaint]);

  if (!complaint) return null;

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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Complaint updated successfully",
        description: "The complaint status and response have been updated.",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating the complaint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = newStatus !== complaint.status || adminReply !== (complaint.adminReply || '');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{complaint.title}</DialogTitle>
          <DialogDescription>
            Complaint ID: {complaint.id} • Review and manage this complaint
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center gap-4">
            {getStatusBadge(complaint.status)}
            {getPriorityBadge(complaint.priority)}
            <Badge variant="outline" className="capitalize">
              {complaint.category}
            </Badge>
          </div>

          {/* Student Information */}
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-lg mb-3">Student Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span><strong>Name:</strong> {complaint.submittedBy.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span><strong>Department:</strong> {complaint.submittedBy.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span><strong>Submitted:</strong> {formatDate(complaint.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span><strong>Last Updated:</strong> {formatDate(complaint.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Complaint Description */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Complaint Details</h3>
            <div className="bg-card border rounded-lg p-4">
              <p className="text-sm leading-relaxed">{complaint.description}</p>
            </div>
          </div>

          <Separator />

          {/* Admin Actions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Admin Actions</h3>
            
            <div className="space-y-2">
              <Label htmlFor="status">Update Status</Label>
              <Select 
                value={newStatus} 
                onValueChange={(value: ComplaintStatus) => setNewStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminReply">Admin Response</Label>
              <Textarea
                id="adminReply"
                placeholder="Provide a response to the student about this complaint..."
                value={adminReply}
                onChange={(e) => setAdminReply(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                This response will be visible to the student
              </p>
            </div>
          </div>

          {/* Current Admin Reply */}
          {complaint.adminReply && (
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Current Admin Response:
              </h4>
              <div className="bg-accent p-3 rounded-md text-sm">
                {complaint.adminReply}
              </div>
            </div>
          )}

          {/* Resolution Date */}
          {complaint.resolvedAt && (
            <div className="text-sm text-muted-foreground">
              <strong>Resolved on:</strong> {formatDate(complaint.resolvedAt)}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Close
          </Button>
          <Button 
            onClick={handleUpdate}
            disabled={!hasChanges || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Complaint'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComplaintDetailsModal;