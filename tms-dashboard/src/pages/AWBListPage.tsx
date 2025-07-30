import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAwbs } from '@/api';
import { useUserStore } from '@/store/userStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { AWB } from '@/types';

export default function AWBListPage() {
  const { user } = useUserStore();

  const { data: awbs, isLoading, isError, error } = useQuery<AWB[], Error>({
    queryKey: ['awbs', user?.id],
    queryFn: () => fetchAwbs(user!),
    enabled: !!user,
  });

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Your Air Way Bills</h1>
      <Card>
        <CardHeader>
          <CardTitle>Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading shipments...</p>}
          {isError && <p className="text-destructive">Error fetching data: {error.message}</p>}
          {awbs && awbs.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>AWB Number</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Relevant HAWBs</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {awbs.map((awb: AWB) => (
                  <TableRow key={awb.id}>
                    <TableCell className="font-medium">{awb.id}</TableCell>
                    <TableCell>{awb.origin}</TableCell>
                    <TableCell>{awb.destination}</TableCell>
                    <TableCell>{awb.status}</TableCell>
                    <TableCell>{awb.hawbs.length}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline">
                        <Link to={`/awbs/${awb.id}`}>View Details</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          ) : (
            !isLoading && <p>No shipments found for your account.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

