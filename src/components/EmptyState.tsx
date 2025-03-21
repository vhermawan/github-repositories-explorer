import { motion } from 'framer-motion'

interface EmptyStateProps {
  text: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="flex m-auto text-center px-4 py-8 mt-4 text-muted-foreground justify-center"
    >
      {text}
    </motion.div>
  )
}

export default EmptyState
