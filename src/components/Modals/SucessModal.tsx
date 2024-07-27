import React from "react";

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({isVisible, onClose}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      id='success-modal'
      className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='relative p-4 w-full max-w-2xl max-h-full'
        onClick={e => e.stopPropagation()}
      >
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              Success
            </h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              onClick={onClose}
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <div className='p-4 space-y-4'>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              Success, your data is secured thanks to Midnight integration to
              ChatPay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
