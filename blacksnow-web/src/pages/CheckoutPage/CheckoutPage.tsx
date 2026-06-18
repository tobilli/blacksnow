import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CheckoutPage.scss';

type Step = 'information' | 'shipping' | 'payment';
type PaymentMethod = 'card' | 'applepay' | 'paypal';
type BillingOption = 'same' | 'different';

const sym = (currency: string) => {
  const map: Record<string, string> = { GBP: '£', USD: '$', EUR: '€' };
  return map[currency] ?? currency;
};

const STEPS: Step[] = ['information', 'shipping', 'payment'];
const STEP_LABELS: Record<Step, string> = {
  information: 'Information',
  shipping: 'Shipping',
  payment: 'Payment',
};

const CheckoutPage = () => {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();
  const currency = items[0]?.product.currency ?? 'GBP';
  const s = sym(currency);

  const [step, setStep] = useState<Step>('information');
  const [summaryOpen, setSummaryOpen] = useState(false);

  // Information
  const [email, setEmail] = useState('');
  const [emailOffers, setEmailOffers] = useState(true);
  const [country, setCountry] = useState('United Kingdom');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phone, setPhone] = useState('');

  // Payment
  const [payMethod, setPayMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [billing, setBilling] = useState<BillingOption>('same');
  const [saveInfo, setSaveInfo] = useState(false);

  const stepIndex = STEPS.indexOf(step);
  const shipTo = [firstName, lastName].filter(Boolean).join(' ') +
    (address ? `, ${address}` : '') +
    (city ? `, ${city}` : '') +
    (postcode ? ` ${postcode}` : '') +
    (country ? `, ${country}` : '');

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (val: string) => {
    const d = val.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
  };

  return (
    <main className="co-page">
      {/* ── Header ── */}
      <header className="co-header">
        <button className="co-summary-toggle" onClick={() => setSummaryOpen(o => !o)}>
          Order summary {summaryOpen ? '▲' : '▼'}
        </button>
        <Link to="/" className="co-logo">BLACKSNOW™</Link>
        <span className="co-header-price">{s}{totalPrice.toFixed(2)}</span>
      </header>

      {/* ── Order summary dropdown ── */}
      {summaryOpen && (
        <div className="co-summary-dropdown">
          {items.map((item, idx) => (
            <div key={idx} className="co-summary-item">
              <div className="co-summary-img-wrap">
                <img src={item.product.images[0]?.url} alt={item.product.name} />
                <span className="co-summary-qty">{item.quantity}</span>
              </div>
              <div className="co-summary-info">
                <span className="co-summary-name">{item.product.name}</span>
                <span className="co-summary-variant">{item.selectedColor} / {item.selectedSize}</span>
              </div>
              <span className="co-summary-price">
                {s}{(item.product.finalPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="co-summary-total">
            <span>Total</span>
            <span>{s}{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* ── Breadcrumb ── */}
      <nav className="co-breadcrumb">
        <button
          className="co-bc-item co-bc-link"
          onClick={() => navigate('/shop')}
        >
          Cart
        </button>
        {STEPS.map((s, i) => (
          <span key={s} className="co-bc-group">
            <span className="co-bc-sep">›</span>
            <span
              className={`co-bc-item${step === s ? ' active' : ''}${i < stepIndex ? ' co-bc-link' : ''}`}
              onClick={() => i < stepIndex && setStep(s)}
              style={{ cursor: i < stepIndex ? 'pointer' : 'default' }}
            >
              {STEP_LABELS[s]}
            </span>
          </span>
        ))}
      </nav>

      {/* ── Main content ── */}
      <div className="co-content">

        {/* ── INFORMATION ── */}
        {step === 'information' && (
          <div className="co-form-block">
            <section className="co-section">
              <div className="co-section-header">
                <h2 className="co-section-title">Contact</h2>
                <span className="co-section-link">Sign in</span>
              </div>
              <div className="co-field-group">
                <input
                  type="email"
                  placeholder="Email"
                  className="co-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <label className="co-checkbox-label">
                <input
                  type="checkbox"
                  checked={emailOffers}
                  onChange={e => setEmailOffers(e.target.checked)}
                />
                Email me with news and offers
              </label>
            </section>

            <section className="co-section">
              <h2 className="co-section-title">Shipping address</h2>
              <div className="co-field-group">
                <select
                  className="co-input co-select"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                >
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Nigeria</option>
                  <option>France</option>
                  <option>Germany</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>
              <div className="co-row">
                <input
                  type="text"
                  placeholder="First name"
                  className="co-input"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="co-input"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
              <div className="co-field-group">
                <input
                  type="text"
                  placeholder="Address"
                  className="co-input"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  className="co-input"
                  value={address2}
                  onChange={e => setAddress2(e.target.value)}
                />
              </div>
              <div className="co-row co-row-3">
                <input
                  type="text"
                  placeholder="City"
                  className="co-input"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Postcode"
                  className="co-input"
                  value={postcode}
                  onChange={e => setPostcode(e.target.value)}
                />
              </div>
              <div className="co-field-group">
                <input
                  type="tel"
                  placeholder="Phone"
                  className="co-input"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </section>

            <div className="co-actions">
              <button className="co-back-link" onClick={() => navigate('/shop')}>
                ‹ Return to cart
              </button>
              <button
                className="co-primary-btn"
                onClick={() => setStep('shipping')}
              >
                Continue to shipping
              </button>
            </div>
          </div>
        )}

        {/* ── SHIPPING ── */}
        {step === 'shipping' && (
          <div className="co-form-block">
            <div className="co-summary-card">
              <div className="co-summary-row">
                <span className="co-summary-key">Contact</span>
                <span className="co-summary-val">{email || '—'}</span>
                <button className="co-change-btn" onClick={() => setStep('information')}>Change</button>
              </div>
              <div className="co-summary-row">
                <span className="co-summary-key">Ship to</span>
                <span className="co-summary-val">{shipTo || '—'}</span>
                <button className="co-change-btn" onClick={() => setStep('information')}>Change</button>
              </div>
            </div>

            <section className="co-section">
              <h2 className="co-section-title">Shipping method</h2>
              <div className="co-shipping-option selected">
                <div className="co-shipping-left">
                  <span className="co-radio-dot selected" />
                  <span className="co-shipping-label">STANDARD INTERNATIONAL SHIPPING</span>
                </div>
                <div className="co-shipping-right">
                  <span className="co-shipping-original">£25.00</span>
                  <span className="co-shipping-free">FREE</span>
                </div>
              </div>
            </section>

            <div className="co-actions">
              <button className="co-back-link" onClick={() => setStep('information')}>
                ‹ Return to information
              </button>
              <button className="co-primary-btn" onClick={() => setStep('payment')}>
                Continue to payment
              </button>
            </div>
          </div>
        )}

        {/* ── PAYMENT ── */}
        {step === 'payment' && (
          <div className="co-form-block">
            <div className="co-summary-card">
              <div className="co-summary-row">
                <span className="co-summary-key">Contact</span>
                <span className="co-summary-val">{email || '—'}</span>
                <button className="co-change-btn" onClick={() => setStep('information')}>Change</button>
              </div>
              <div className="co-summary-row">
                <span className="co-summary-key">Ship to</span>
                <span className="co-summary-val">{shipTo || '—'}</span>
                <button className="co-change-btn" onClick={() => setStep('information')}>Change</button>
              </div>
              <div className="co-summary-row no-border">
                <span className="co-summary-key">Shipping</span>
                <span className="co-summary-val">Standard International Shipping · FREE</span>
                <button className="co-change-btn" onClick={() => setStep('shipping')}>Change</button>
              </div>
            </div>

            <section className="co-section">
              <h2 className="co-section-title">Payment</h2>
              <p className="co-section-subtitle">All transactions are secure and encrypted.</p>

              <div className="co-payment-options">
                {/* Credit card */}
                <div
                  className={`co-pay-option${payMethod === 'card' ? ' selected' : ''}`}
                  onClick={() => setPayMethod('card')}
                >
                  <div className="co-pay-option-header">
                    <span className={`co-radio${payMethod === 'card' ? ' selected' : ''}`} />
                    <span className="co-pay-label">Credit card</span>
                    <div className="co-card-icons">
                      <span className="co-card-icon visa">VISA</span>
                      <span className="co-card-icon mc">MC</span>
                      <span className="co-card-icon amex">AMEX</span>
                    </div>
                  </div>
                  {payMethod === 'card' && (
                    <div className="co-card-fields">
                      <div className="co-input-icon-wrap">
                        <input
                          type="text"
                          placeholder="Card number"
                          className="co-input co-input-light"
                          value={cardNumber}
                          onChange={e => setCardNumber(formatCard(e.target.value))}
                          maxLength={19}
                        />
                        <span className="co-input-icon">🔒</span>
                      </div>
                      <div className="co-row">
                        <input
                          type="text"
                          placeholder="Expiration date (MM / YY)"
                          className="co-input co-input-light"
                          value={expiry}
                          onChange={e => setExpiry(formatExpiry(e.target.value))}
                          maxLength={7}
                        />
                        <div className="co-input-icon-wrap">
                          <input
                            type="text"
                            placeholder="Security code"
                            className="co-input co-input-light"
                            value={cvv}
                            onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            maxLength={4}
                          />
                          <span className="co-input-icon">?</span>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Name on card"
                        className="co-input co-input-light"
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* Apple Pay */}
                <div
                  className={`co-pay-option${payMethod === 'applepay' ? ' selected' : ''}`}
                  onClick={() => setPayMethod('applepay')}
                >
                  <div className="co-pay-option-header">
                    <span className={`co-radio${payMethod === 'applepay' ? ' selected' : ''}`} />
                    <span className="co-pay-label">Apple Pay</span>
                    <span className="co-applepay-badge">⬛ Pay</span>
                  </div>
                </div>

                {/* PayPal */}
                <div
                  className={`co-pay-option${payMethod === 'paypal' ? ' selected' : ''}`}
                  onClick={() => setPayMethod('paypal')}
                >
                  <div className="co-pay-option-header">
                    <span className={`co-radio${payMethod === 'paypal' ? ' selected' : ''}`} />
                    <span className="co-pay-label">PayPal</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="co-section">
              <h2 className="co-section-title">Billing address</h2>
              <p className="co-section-subtitle">Select the address that matches your card or payment method.</p>
              <div className="co-billing-options">
                <div
                  className={`co-billing-option${billing === 'same' ? ' selected' : ''}`}
                  onClick={() => setBilling('same')}
                >
                  <span className={`co-radio${billing === 'same' ? ' selected' : ''}`} />
                  Same as shipping address
                </div>
                <div
                  className={`co-billing-option${billing === 'different' ? ' selected' : ''}`}
                  onClick={() => setBilling('different')}
                >
                  <span className={`co-radio${billing === 'different' ? ' selected' : ''}`} />
                  Use a different billing address
                </div>
              </div>
            </section>

            <label className="co-save-info">
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={e => setSaveInfo(e.target.checked)}
              />
              <div>
                <p className="co-save-title">Save my information for a faster checkout</p>
                <p className="co-save-sub">
                  By paying, you agree to create a Blacksnow account subject to our{' '}
                  <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
                </p>
              </div>
            </label>

            <div className="co-actions">
              <button className="co-back-link" onClick={() => setStep('shipping')}>
                ‹ Return to shipping
              </button>
              <button className="co-primary-btn">
                Pay now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer className="co-footer">
        <a href="#">Refund policy</a>
        <a href="#">Shipping</a>
        <a href="#">Privacy policy</a>
        <a href="#">Terms of service</a>
        <a href="#">Contact</a>
      </footer>
    </main>
  );
};

export default CheckoutPage;
