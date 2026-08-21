function Modal({
  title,
  children,
  onClose,
  onSave,
  saveText = "Save",
  cancelText = "Cancel",
}) {
  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <h2>{title}</h2>

        <div className="modal-content">
          {children}
        </div>

        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            {cancelText}
          </button>

          <button
            className="save-btn"
            onClick={onSave}
          >
            {saveText}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Modal;
