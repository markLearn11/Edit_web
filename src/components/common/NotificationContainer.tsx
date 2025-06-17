import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface NotificationContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, onRemove }) => {
  // 根据通知类型获取相应的图标和颜色
  const getNotificationProps = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
          bgColor: 'bg-neo-success/10',
          borderColor: 'border-neo-success',
          textColor: 'text-neo-success'
        };
      case 'error':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
          bgColor: 'bg-neo-error/10',
          borderColor: 'border-neo-error',
          textColor: 'text-neo-error'
        };
      case 'warning':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
          bgColor: 'bg-neo-warning/10',
          borderColor: 'border-neo-warning',
          textColor: 'text-neo-warning'
        };
      case 'info':
      default:
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          bgColor: 'bg-neo-primary/10',
          borderColor: 'border-neo-primary',
          textColor: 'text-neo-primary'
        };
    }
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map(notification => {
          const { icon, bgColor, borderColor, textColor } = getNotificationProps(notification.type);
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className={`${bgColor} border-l-4 ${borderColor} p-4 rounded-r-md shadow-lg backdrop-blur-sm flex items-start`}
            >
              <div className={`flex-shrink-0 ${textColor}`}>
                {icon}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-neo-light">{notification.message}</p>
              </div>
              <button
                onClick={() => onRemove(notification.id)}
                className="flex-shrink-0 ml-2 text-neo-light/50 hover:text-neo-light"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer; 