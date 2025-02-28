'use client';

import Breadcrumbs from '@/components/dashboard/breadcrumbs';
import Cart from '@/components/dashboard/cart/Cart';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const params = useParams();

  const cartId = params.id;

  const [cartData, setCartData] = useState({
    message: 'Talent cart found',
    data: [
      {
        id: '025da3a1-3a04-46eb-bb88-4d90c8e9e926',
        clientId: 'eed13984-b783-4275-bd5e-99c0643a6234',
        status: 'active',
        name: 'Junior developer',
        createdAt: '2025-02-27T21:53:10.493Z',
        updatedAt: '2025-02-27T21:53:10.493Z',
        items: [
          {
            id: 'f870b558-6429-4f92-846d-d3a734f29eec',
            cartId: '025da3a1-3a04-46eb-bb88-4d90c8e9e926',
            talentId: '6dec552d-f859-447e-aaf0-ba345527e9bf',
            talentSnapshot: null,
            createdAt: '2025-02-27T21:53:10.683Z',
            updatedAt: '2025-02-27T21:53:10.683Z',
            talent: {
              id: '6dec552d-f859-447e-aaf0-ba345527e9bf',
              firstName: 'John ',
              secondName: 'carter',
              skills: ['javascript', 'node.js', 'typescript'],
              mainTitle: 'Senior dev',
              yearsOfExperience: 3,
            },
          },
          {
            id: '7cd5aef4-5859-4415-a2b5-f352cb493969',
            cartId: '025da3a1-3a04-46eb-bb88-4d90c8e9e926',
            talentId: '660e8400-e29b-41d4-a716-446655440000',
            talentSnapshot: null,
            createdAt: '2025-02-27T22:12:03.308Z',
            updatedAt: '2025-02-27T22:12:03.308Z',
            talent: {
              id: '660e8400-e29b-41d4-a716-446655440000',
              firstName: 'John',
              secondName: 'Doe',
              skills: ['JavaScript', 'React', 'Node.js'],
              mainTitle: 'Full Stack Developer',
              yearsOfExperience: 5,
            },
          },
          {
            id: '6013d77c-7301-481d-bad1-734c49c24322',
            cartId: '025da3a1-3a04-46eb-bb88-4d90c8e9e926',
            talentId: '660e8400-e29b-41d4-a716-446655440002',
            talentSnapshot: null,
            createdAt: '2025-02-27T22:13:12.270Z',
            updatedAt: '2025-02-27T22:13:12.270Z',
            talent: {
              id: '660e8400-e29b-41d4-a716-446655440002',
              firstName: 'Alice',
              secondName: 'Johnson',
              skills: ['Node.js', 'Python', 'Django'],
              mainTitle: 'Backend Developer',
              yearsOfExperience: 4,
            },
          },
        ],
      },
    ],
  });

  const cart = cartData.data[0];

  const handleRemoveTalent = (itemId) => {
    const updatedItems = cart.items.filter((item) => item.id !== itemId);
    setCartData({
      ...cartData,
      data: [
        {
          ...cart,
          items: updatedItems,
        },
      ],
    });
  };

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Carts', href: '/dashboard/carts' },
          {
            label: 'Edit Cart',
            href: `/dashboard/carts/${cartId}`,
            active: true,
          },
        ]}
      />
      {cart ? (
        <Cart cart={cart} onRemoveTalent={handleRemoveTalent} />
      ) : (
        <p className="text-center text-gray-500">Cart not found.</p>
      )}
    </main>
  );
}
