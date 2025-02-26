'use client';

import { RootState } from '@/store/store';
import clsx from 'clsx';
import { ClipboardList, HomeIcon, ShoppingCart, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

type UserRole = 'client' | 'talent';

type NavLink = {
  name: string;
  href: string;
  icon: React.ComponentType;
  scope: UserRole[];
};

const navLinks: NavLink[] = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon,
    scope: ['client', 'talent'],
  },
  {
    name: 'Carts',
    href: '/dashboard/carts',
    icon: ShoppingCart,
    scope: ['client'],
  },
  {
    name: 'Orders',
    href: '/dashboard/orders',
    icon: ClipboardList,
    scope: ['client'],
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: Users,
    scope: ['talent'],
  },
  {
    name: 'Talents',
    href: '/',
    icon: Users,
    scope: ['client'],
  },
];

export default function NavLinks() {
  const pathName = usePathname();
  const userRole = useSelector(
    (state: RootState) => state.auth.role
  ) as UserRole;
  const links = navLinks.filter((link) => link.scope.includes(userRole));

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              { 'bg-sky-100 text-blue-600': pathName === link.href }
            )}
          >
            <LinkIcon />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
