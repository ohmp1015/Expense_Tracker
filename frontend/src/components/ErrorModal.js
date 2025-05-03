import React, { useEffect } from 'react';

function ErrorModal({ message, onClose }) {
  useEffect(() => {
    const modal = new window.bootstrap.Modal(document.getElementById('errorModal'));
    modal.show();

    const handleHidden = () => {
      onClose();
    };

    const modalElement = document.getElementById('errorModal');
    modalElement.addEventListener('hidden.bs.modal', handleHidden);

    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleHidden);
    };
  }, [onClose]);

  return (
    <div className="modal fade" id="errorModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">Error</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
