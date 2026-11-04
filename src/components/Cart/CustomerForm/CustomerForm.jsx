import { useState, useEffect } from 'react';
import './CustomerForm.css';

function CustomerForm({
  customerData,
  onCustomerDataChange,
  registerValidation,
}) {
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
  });

  const validateName = (value) => {
    const words = value.trim().split(/\s+/);

    if (
      words.length < 3 ||
      words.some((word) => word.length < 2)
    ) {
      return 'اكتب الاسم ثلاثياً (ثلاث كلمات على الأقل)';
    }

    return '';
  };

  const normalizePhone = (value) => {
    const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';

    return value
      .replace(/[٠-٩]/g, (digit) =>
        arabicDigits.indexOf(digit)
      )
      .replace(/[۰-۹]/g, (digit) =>
        persianDigits.indexOf(digit)
      )
      .replace(/[\s-]/g, '');
  };

  const validatePhone = (value) => {
    const phone = normalizePhone(value);
    const phoneRegex = /^01[0125]\d{8}$/;

    if (!phoneRegex.test(phone)) {
      return 'اكتب رقم موبايل مصري صحيح من 11 رقم يبدأ بـ 01';
    }

    return '';
  };

  const validateCustomerData = () => {
    const nameError = validateName(customerData.name);
    const phoneError = validatePhone(customerData.phone);

    setErrors({
      name: nameError,
      phone: phoneError,
    });

    return !nameError && !phoneError;
  };

  useEffect(() => {
    registerValidation(validateCustomerData);
  }, [registerValidation, customerData]);

  const handleNameChange = (event) => {
    const value = event.target.value;

    onCustomerDataChange({
      ...customerData,
      name: value,
    });

    setErrors((current) => ({
      ...current,
      name: current.name ? validateName(value) : '',
    }));
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;

    onCustomerDataChange({
      ...customerData,
      phone: value,
    });

    setErrors((current) => ({
      ...current,
      phone: current.phone ? validatePhone(value) : '',
    }));
  };

  const handleNameBlur = () => {
    setErrors((current) => ({
      ...current,
      name: validateName(customerData.name),
    }));
  };

  const handlePhoneBlur = () => {
    setErrors((current) => ({
      ...current,
      phone: validatePhone(customerData.phone),
    }));
  };

  return (
    <section className="cart-panel customer-form-panel">
      <h2 className="cart-panel-title">بياناتك</h2>

      <div className="customer-form-fields">
        <div className="customer-field">
          <label htmlFor="customer-name">
            الاسم بالكامل
          </label>

          <input
            id="customer-name"
            type="text"
            value={customerData.name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            placeholder="مثال: أحمد محمد علي"
            className={errors.name ? 'input-error' : ''}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name ? 'customer-name-error' : undefined
            }
          />

          {errors.name && (
            <span
              className="customer-error-message"
              id="customer-name-error"
            >
              {errors.name}
            </span>
          )}
        </div>

        <div className="customer-field">
          <label htmlFor="customer-phone">
            رقم الموبايل
          </label>

          <input
            id="customer-phone"
            type="tel"
            inputMode="tel"
            value={customerData.phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            placeholder="01xxxxxxxxx"
            className={errors.phone ? 'input-error' : ''}
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={
              errors.phone ? 'customer-phone-error' : undefined
            }
          />

          {errors.phone && (
            <span
              className="customer-error-message"
              id="customer-phone-error"
            >
              {errors.phone}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default CustomerForm;