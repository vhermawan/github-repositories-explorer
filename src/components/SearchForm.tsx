import React, { useState, useRef, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('query', query, query.trim());
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setQuery('');
      onSearch('');
      inputRef.current?.focus();
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6"
    >
      <div className="relative flex-1">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search GitHub username..."
            aria-label="GitHub username"
            disabled={isLoading}
            className="pl-10"
          />
        </motion.div>
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        {query.trim() && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            type="button"
            data-testid="btn-clear"
            className="absolute right-2 top-2 p-0 bg-white"
            onClick={handleClear}
          >
            <X size={20} className='text-muted-foreground' />
          </motion.button>
        )}
      </div>
      <Button 
        type="submit" 
        data-testid="btn-search"
        className='bg-red-400 hover:bg-red-500'
        disabled={!query.trim() || isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
    </motion.form>
  );
};

export default SearchForm;

