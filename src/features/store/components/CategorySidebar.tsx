import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Layers, LayoutGrid } from 'lucide-react';
import { Category } from '../../../types/types';

interface Props {
  categories: Category[];
  selected: string | 'All';
  onSelect: (id: string | 'All') => void;
}

interface TreeNode {
  cat: Category;
  children: TreeNode[];
}

function buildTree(categories: Category[]): TreeNode[] {
  const roots = categories.filter(c => !c.parentId && !c.parent_id || c.parentId === 'null' || c.parent_id === 'null');
  const build = (parent: Category): TreeNode => ({
    cat: parent,
    children: categories
      .filter(c => c.parentId === parent.id || c.parent_id === parent.id)
      .map(build),
  });
  return roots.map(build);
}

function CategoryNode({
  node,
  selected,
  onSelect,
  depth = 0,
}: {
  node: TreeNode;
  selected: string | 'All';
  onSelect: (id: string | 'All') => void;
  depth?: number;
}) {
  const isAncestorOrSelf = (n: TreeNode, id: string): boolean =>
    n.cat.id === id || n.children.some(child => isAncestorOrSelf(child, id));

  const defaultOpen = selected !== 'All' && isAncestorOrSelf(node, selected as string);
  const [open, setOpen] = useState(defaultOpen);

  const hasChildren = node.children.length > 0;
  const isSelected = selected === node.cat.id;
  const label = node.cat.title || node.cat.name;

  return (
    <li>
      <div
        className={`flex items-center gap-1.5 rounded-xl px-3 py-2 cursor-pointer select-none transition-all group
          ${isSelected
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        style={{ paddingLeft: `${12 + depth * 14}px` }}
        onClick={() => {
          onSelect(node.cat.id);
          if (hasChildren) setOpen(o => !o);
        }}
      >
        {hasChildren ? (
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.18 }}
            className="shrink-0"
          >
            <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-indigo-500'}`} />
          </motion.span>
        ) : (
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ml-1 mr-0.5 ${isSelected ? 'bg-white' : 'bg-gray-300 dark:bg-slate-600'}`} />
        )}
        <span className={`text-xs font-semibold truncate flex-1 ${isSelected ? '' : 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
          {label}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && open && (
          <motion.ul
            key="children"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children.map(child => (
              <CategoryNode key={child.cat.id} node={child} selected={selected} onSelect={onSelect} depth={depth + 1} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Bare tree — use inside any container (e.g. mobile bottom sheet) */
export function CategoryTree({ categories, selected, onSelect }: Props) {
  const tree = useMemo(() => buildTree(categories), [categories]);
  return (
    <ul className="space-y-0.5">
      <li>
        <div
          onClick={() => onSelect('All')}
          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all text-sm font-semibold
            ${selected === 'All'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
        >
          <LayoutGrid className={`w-4 h-4 shrink-0 ${selected === 'All' ? 'text-white' : 'text-gray-400'}`} />
          All Products
        </div>
      </li>
      {tree.map(node => (
        <CategoryNode key={node.cat.id} node={node} selected={selected} onSelect={onSelect} />
      ))}
    </ul>
  );
}

/** Desktop sidebar — sticky left panel, hidden on mobile */
export function CategorySidebar({ categories, selected, onSelect }: Props) {
  const tree = useMemo(() => buildTree(categories), [categories]);

  return (
    <aside className="w-56 shrink-0 hidden lg:flex flex-col sticky top-[73px] self-start max-h-[calc(100vh-90px)] overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-3 shadow-sm">
        <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500">Categories</span>
        </div>
        <ul className="space-y-0.5">
          <li>
            <div
              onClick={() => onSelect('All')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all text-xs font-semibold
                ${selected === 'All'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
            >
              <LayoutGrid className={`w-3.5 h-3.5 shrink-0 ${selected === 'All' ? 'text-white' : 'text-gray-400'}`} />
              All Products
            </div>
          </li>
          {tree.map(node => (
            <CategoryNode key={node.cat.id} node={node} selected={selected} onSelect={onSelect} />
          ))}
        </ul>
      </div>
    </aside>
  );
}

