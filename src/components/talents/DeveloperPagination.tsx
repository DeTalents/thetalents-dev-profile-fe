import { Pagination } from 'antd';
import { motion } from 'framer-motion';

interface DeveloperPaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export const DeveloperPagination = ({
  current,
  total,
  pageSize,
  onChange,
}: DeveloperPaginationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center mt-12 mb-8"
    >
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
        className="custom-pagination" // Add this class for custom styling
      />
    </motion.div>
  );
};
