import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAwbById } from '@/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge'; // Assuming Badge component exists or will be created

export default function AWBDetailPage() {
  const { awbId } = useParams<{ awbId: string }>();

  const { data: awb, isLoading, isError, error } = useQuery({
    queryKey: ['awb', awbId],
    queryFn: () => fetchAwbById(awbId!),
    enabled: !!awbId, // Only run the query if awbId is present
  });

  if (isLoading) return <div className="p-4 md:p-8">Loading AWB details...</div>;
  if (isError) return <div className="p-4 md:p-8 text-destructive">Error: {error.message}</div>;
  if (!awb) return <div className="p-4 md:p-8">AWB not found.</div>;

  return (
    <div className="p-4 md:p-8">
      <Link to="/awbs" className="text-primary hover:underline mb-6 block">&larr; Back to All Shipments</Link>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">AWB: {awb.id}</CardTitle>
              <CardDescription>From {awb.origin} to {awb.destination}</CardDescription>
            </div>
            <Badge>{awb.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p><strong>Arrival Time:</strong> {new Date(awb.arrivalDateTime).toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>House Air Way Bills ({awb.hawbs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>HAWB Number</TableHead>
                <TableHead>Freight Company</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Weight (kg)</TableHead>
                <TableHead>Pieces</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {awb.hawbs.map((hawb) => (
                <TableRow key={hawb.id}>
                  <TableCell className="font-medium">{hawb.id}</TableCell>
                  <TableCell>{hawb.freightCompany}</TableCell>
                  <TableCell>{hawb.recipient.name}</TableCell>
                  <TableCell>{hawb.weightKg}</TableCell>
                  <TableCell>{hawb.pieces}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

