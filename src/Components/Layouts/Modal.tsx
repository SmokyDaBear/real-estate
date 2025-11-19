export function Modal({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
}) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <span onClick={closeModal} className="close-modal">
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}
