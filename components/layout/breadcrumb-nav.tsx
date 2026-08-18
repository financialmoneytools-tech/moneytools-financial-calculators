import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function BreadcrumbNav({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        <li className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-1 hover:text-[#3182ce] transition-colors">
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {(items ?? []).map((item: BreadcrumbItem, index: number) => (
          <li key={index} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-[#3182ce] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#1e3a5f] font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
