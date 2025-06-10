'use client';
import Home from '../../page';
import React from 'react';

export default function CategoryPage({ params }) {
  const { slug } = React.use(params);

  return <Home slug={slug} />;
}
