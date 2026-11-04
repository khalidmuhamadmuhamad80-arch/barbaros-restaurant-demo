import { useEffect } from 'react';
import './Modal.css';

import { drinks, extras, branches } from '../../../data/menuData';
import DishCard from '../DishCard/DishCard';

const modalTitles = {
  drinks: 'المشروبات',
  extras: 'الإضافات',
  branches: 'فروعنا',
};

function Modal({ type, onClose, onAdd }) {
  useEffect(() => {
    if (!type) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [type, onClose]);

  if (!type) return null;

  const isBranches = type === 'branches';
  const items = type === 'drinks' ? drinks : extras;

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="modal-header">
          <h2 id="modal-title">{modalTitles[type]}</h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="إغلاق النافذة"
          >
            ✕
          </button>
        </header>

        <div className="modal-body">
          {isBranches ? (
            <div className="branches-list">
              {branches.map((branch) => (
                <article className="branch-card" key={branch.id}>
                  <h3>{branch.name}</h3>
                  <p>{branch.address}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="modal-items-grid">
              {items.map((item) => (
                <DishCard
                  key={item.id}
                  item={item}
                  compact
                  onAdd={onAdd}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Modal;