'use client';

import React, { useState } from 'react';

import { Button } from '@nextui-org/button';

import { Card, CardContent, CardHeader } from './ui/card';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Card className='h-44 w-72 border border-border bg-secondary shadow-md'>
      <CardHeader>
        <h1 className='text-center text-2xl'>Counter</h1>
      </CardHeader>
      <CardContent className='flex w-full items-center justify-between'>
        <Button
          className='w-10 rounded-full'
          data-testid='increase-count'
          onClick={() => setCount((previousCount) => previousCount + 1)}
        >
          + 1
        </Button>

        <h2 className='text-6xl' data-testid='count'>
          {count}
        </h2>

        <Button
          className='w-10 rounded-full'
          data-testid='decrease-count'
          onClick={() => setCount((previousCount) => previousCount - 1)}
        >
          - 1
        </Button>
      </CardContent>
    </Card>
  );
}
