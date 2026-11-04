import { useState, useEffect } from 'react';
import './DeliveryForm.css';

import { deliveryLocations } from '../../../data/orderConfig';

function DeliveryForm({
  deliveryMethod,
  onDeliveryMethodChange,
  selectedLocation,
  onSelectedLocationChange,
  address,
  onAddressChange,
  registerValidation,
}) {
  const [locationError, setLocationError] = useState('');
  const [addressError, setAddressError] = useState('');

  const selectedPlace = [
    ...deliveryLocations.cities,
    ...deliveryLocations.villages,
  ].find((location) => location.id === selectedLocation);

  const validateAddress = (value) => {
    if (value.trim().length < 8) {
      return 'اكتب العنوان بالتفصيل (8 حروف على الأقل)';
    }

    return '';
  };

  const validateDeliveryData = () => {
    if (deliveryMethod === 'pickup') {
      setLocationError('');
      setAddressError('');
      return true;
    }

    const placeError = selectedPlace
      ? ''
      : 'اختر المدينة أو القرية';

    const addressValidationError = validateAddress(address);

    setLocationError(placeError);
    setAddressError(addressValidationError);

    return !placeError && !addressValidationError;
  };

  useEffect(() => {
    registerValidation(validateDeliveryData);
  }, [registerValidation, deliveryMethod, selectedLocation, address]);

  const handleMethodChange = (method) => {
    onDeliveryMethodChange(method);

    if (method === 'pickup') {
      setLocationError('');
      setAddressError('');
    }
  };

  const handleLocationChange = (event) => {
    onSelectedLocationChange(event.target.value);
    setLocationError('');
  };

  const handleAddressChange = (event) => {
    const value = event.target.value;

    onAddressChange(value);

    if (addressError) {
      setAddressError(validateAddress(value));
    }
  };

  return (
    <section className="cart-panel delivery-method-panel">
      <h2 className="cart-panel-title">طريقة الاستلام</h2>

      <div className="delivery-method-options">
        <button
          type="button"
          className={`delivery-method-button ${
            deliveryMethod === 'pickup' ? 'selected' : ''
          }`}
          onClick={() => handleMethodChange('pickup')}
          aria-pressed={deliveryMethod === 'pickup'}
        >
          استلام من المطعم
        </button>

        <button
          type="button"
          className={`delivery-method-button ${
            deliveryMethod === 'delivery' ? 'selected' : ''
          }`}
          onClick={() => handleMethodChange('delivery')}
          aria-pressed={deliveryMethod === 'delivery'}
        >
          توصيل للمنزل
        </button>
      </div>

      {deliveryMethod === 'delivery' && (
        <div className="delivery-fields">
          <div className="delivery-field">
            <label htmlFor="delivery-location">
              المدينة أو القرية
            </label>

            <select
              id="delivery-location"
              value={selectedLocation}
              onChange={handleLocationChange}
              onBlur={() => {
                if (!selectedLocation) {
                  setLocationError('اختر المدينة أو القرية');
                }
              }}
              className={locationError ? 'input-error' : ''}
              aria-invalid={Boolean(locationError)}
            >
              <option value="">اختر المدينة أو القرية</option>

              <optgroup label="المدن">
                {deliveryLocations.cities.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </optgroup>

              <optgroup label="القرى">
                {deliveryLocations.villages.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </optgroup>
            </select>

            {locationError && (
              <span className="delivery-error-message">
                {locationError}
              </span>
            )}
          </div>

          <div className="delivery-fee-box">
            {selectedPlace ? (
              <span>
                رسوم التوصيل إلى {selectedPlace.name}:{' '}
                <strong>{selectedPlace.fee} جنيه</strong>
              </span>
            ) : (
              <span>
                سيتم تحديد رسوم التوصيل بعد اختيار القرية
              </span>
            )}
          </div>

          <div className="delivery-field">
            <label htmlFor="delivery-address">
              العنوان بالتفصيل
            </label>

            <textarea
              id="delivery-address"
              rows="3"
              value={address}
              onChange={handleAddressChange}
              onBlur={() => {
                setAddressError(validateAddress(address));
              }}
              placeholder="اكتب عنواناً دقيقاً: الشارع، علامة مميزة، رقم المنزل..."
              className={addressError ? 'input-error' : ''}
              aria-invalid={Boolean(addressError)}
            />

            {addressError && (
              <span className="delivery-error-message">
                {addressError}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default DeliveryForm;