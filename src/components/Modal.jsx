const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="p-8 rounded-lg max-w-3xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
