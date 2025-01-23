"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Table from '../../../components/ui/Table';

const ContactRequest = () => {
  const [data, setData] = useState({ ContactRequests: [] });

  useEffect(() => {
    fetch('/api/get-contact-request')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
    ],
    []
  );

  const onDelete = (row) => {
    fetch('/api/delete-contact-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: row.id }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setData({ ContactRequests: data.ContactRequests });
        }
      })
      .catch(error => {
        console.error('Failed to delete data:', error);
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table columns={columns} data={data.ContactRequests} clickAction={onDelete} buttonWord='Delete' />
      </CardContent>
    </Card>
  );
}

export default ContactRequest;