import './OrderNotes.css';

function OrderNotes({ notes, onNotesChange }) {
  return (
    <section className="cart-panel order-notes-panel">
      <h2 className="cart-panel-title">
        ملاحظات إضافية على الطلب
        <span className="order-notes-optional">(اختياري)</span>
      </h2>

      <textarea
        className="order-notes-textarea"
        rows="3"
        value={notes}
        onChange={(event) => onNotesChange(event.target.value)}
        placeholder="مثال: من غير شطة، زيادة صلصة"
      />
    </section>
  );
}

export default OrderNotes;