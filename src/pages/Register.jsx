import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineLockClosed,
  HiOutlineArrowLeft,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import Button from '../components/common/Button';
import { sendRegistrationOtp, verifyRegistrationOtp, registerCustomer } from '../services/api';

export default function Register() {
  const navigate = useNavigate();

  // Registration step: 'form' | 'otp'
  const [step, setStep] = useState('form');

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  // 6-digit OTP state
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpInputsRef = useRef([]);

  // Resend Timer (30 seconds)
  const [resendCooldown, setResendCooldown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Status & Loading states
  const [errorMessage, setErrorMessage] = useState('');
  const [devNotice, setDevNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle countdown timer when on OTP step
  useEffect(() => {
    let timer;
    if (step === 'otp' && resendCooldown > 0) {
      setCanResend(false);
      timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step, resendCooldown]);

  // Focus the first OTP box when entering OTP step
  useEffect(() => {
    if (step === 'otp' && otpInputsRef.current[0]) {
      otpInputsRef.current[0].focus();
    }
  }, [step]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage('');
  };

  // Validation function
  const validateForm = () => {
    const { fullName, username, phoneNumber, password, confirmPassword } = formData;

    if (!fullName.trim()) {
      return 'Please enter your full name.';
    }
    if (fullName.trim().length < 2) {
      return 'Full name must be at least 2 characters long.';
    }

    if (!username.trim()) {
      return 'Please enter a username.';
    }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username.trim())) {
      return 'Username must be 3-20 characters long and contain only letters, numbers, and underscores.';
    }

    // Phone validation: strip formatting, require 10-15 digits, reject all-identical digits
    const digitsOnly = phoneNumber.replace(/[\s\-\(\)\+]/g, '');
    if (!phoneNumber.trim() || digitsOnly.length < 10 || digitsOnly.length > 15 || !/^\d+$/.test(digitsOnly)) {
      return 'Please enter a valid phone number (e.g. +91 98765 43210 or 10-digit mobile).';
    }
    if (/^(\d)\1+$/.test(digitsOnly)) {
      return 'Please enter a valid, non-repeating phone number.';
    }

    if (!password) {
      return 'Please enter a password.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    if (!confirmPassword) {
      return 'Please confirm your password.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }

    return null;
  };

  // Step 1: Send OTP handler
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setDevNotice('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await sendRegistrationOtp(formData.phoneNumber.trim());
      setStep('otp');
      setResendCooldown(30);
      setCanResend(false);
      setOtpDigits(['', '', '', '', '', '']);
    } catch (err) {
      // Backend endpoint missing or returned error
      console.warn('Backend sendRegistrationOtp error:', err);
      setDevNotice(
        'Backend OTP API (POST /api/auth/register/send-otp) is not available on the server yet. OTP verification interface is shown in development preview mode.'
      );
      setStep('otp');
      setResendCooldown(30);
      setCanResend(false);
      setOtpDigits(['', '', '', '', '', '']);
    } finally {
      setIsSubmitting(false);
    }
  };

  // OTP Box Inputs Handlers
  const handleOtpChange = (index, value) => {
    // Only accept numeric input
    if (value && !/^\d+$/.test(value)) return;

    const newDigits = [...otpDigits];
    // If user typed/pasted multiple digits
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, '').slice(0, 6).split('');
      pasted.forEach((d, idx) => {
        if (idx < 6) newDigits[idx] = d;
      });
      setOtpDigits(newDigits);
      const nextIndex = Math.min(pasted.length, 5);
      if (otpInputsRef.current[nextIndex]) {
        otpInputsRef.current[nextIndex].focus();
      }
      return;
    }

    newDigits[index] = value;
    setOtpDigits(newDigits);
    if (errorMessage) setErrorMessage('');

    // Advance to next box if character entered
    if (value && index < 5 && otpInputsRef.current[index + 1]) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace navigation
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0 && otpInputsRef.current[index - 1]) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasteData) return;

    const newDigits = [...otpDigits];
    pasteData.split('').forEach((char, idx) => {
      newDigits[idx] = char;
    });
    setOtpDigits(newDigits);
    const focusIndex = Math.min(pasteData.length, 5);
    if (otpInputsRef.current[focusIndex]) {
      otpInputsRef.current[focusIndex].focus();
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (!canResend || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await sendRegistrationOtp(formData.phoneNumber.trim());
      setResendCooldown(30);
      setCanResend(false);
      setOtpDigits(['', '', '', '', '', '']);
    } catch (err) {
      console.warn('Backend resend OTP error:', err);
      setResendCooldown(30);
      setCanResend(false);
      setDevNotice(
        'Backend OTP API (POST /api/auth/register/send-otp) returned an error or is not implemented yet. Timer reset for testing.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify OTP and complete registration
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const otpCode = otpDigits.join('');
    if (otpCode.length < 6) {
      setErrorMessage('Please enter the complete 6-digit OTP.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Verify OTP with backend
      await verifyRegistrationOtp(formData.phoneNumber.trim(), otpCode);

      // 2. Complete customer registration
      await registerCustomer({
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        password: formData.password,
      });

      // Clear password from state for security
      setFormData({
        fullName: '',
        username: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      });

      // 3. Navigate to login with success flash message
      navigate('/login', {
        state: { message: 'Account created successfully. Please log in.' },
      });
    } catch (err) {
      console.error('Registration/OTP error:', err);
      setErrorMessage(
        err.message ||
          'Verification failed: Backend OTP endpoint (POST /api/auth/register/verify-otp) returned an error or is not implemented yet. Cannot complete registration without real backend response.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="container" style={{ padding: '4.5rem var(--container-padding)' }}>
        <div className="card" style={{ maxWidth: '480px', margin: '0 auto', padding: '3rem 2.5rem' }}>
          {step === 'form' ? (
            /* ===================================================
               STEP 1: REGISTRATION DETAILS FORM
            =================================================== */
            <>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span className="section-tag" style={{ marginBottom: '0.75rem' }}>
                  Join the Flavor Club
                </span>
                <h1 style={{ fontSize: '1.85rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                  Create an Account
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                  Enjoy faster checkout, saved customized bowls, and exclusive offers.
                </p>
              </div>

              {/* Inline Error Message */}
              {errorMessage && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#FEE2E2',
                    border: '1px solid #FECACA',
                    color: '#B91C1C',
                    fontSize: '0.88rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <HiOutlineExclamationCircle style={{ fontSize: '1.25rem', flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                {/* Full Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      marginBottom: '0.4rem',
                      color: 'var(--color-text)',
                    }}
                  >
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Carlos Mendoza"
                      value={formData.fullName}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg)',
                        fontSize: '0.92rem',
                      }}
                    />
                    <HiOutlineUser
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-text-muted)',
                        fontSize: '1.2rem',
                      }}
                    />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      marginBottom: '0.4rem',
                      color: 'var(--color-text)',
                    }}
                  >
                    Username
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="username"
                      placeholder="e.g. carlos_m"
                      value={formData.username}
                      onChange={handleChange}
                      autoCapitalize="none"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg)',
                        fontSize: '0.92rem',
                      }}
                    />
                    <HiOutlineUser
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-text-muted)',
                        fontSize: '1.2rem',
                      }}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      marginBottom: '0.4rem',
                      color: 'var(--color-text)',
                    }}
                  >
                    Phone Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="+91 98765 43210"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg)',
                        fontSize: '0.92rem',
                      }}
                    />
                    <HiOutlinePhone
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-text-muted)',
                        fontSize: '1.2rem',
                      }}
                    />
                  </div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    Required for 6-digit OTP SMS verification
                  </span>
                </div>

                {/* Password */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      marginBottom: '0.4rem',
                      color: 'var(--color-text)',
                    }}
                  >
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg)',
                        fontSize: '0.92rem',
                      }}
                    />
                    <HiOutlineLockClosed
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-text-muted)',
                        fontSize: '1.2rem',
                      }}
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      marginBottom: '0.4rem',
                      color: 'var(--color-text)',
                    }}
                  >
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg)',
                        fontSize: '0.92rem',
                      }}
                    />
                    <HiOutlineLockClosed
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-text-muted)',
                        fontSize: '1.2rem',
                      }}
                    />
                  </div>
                </div>

                {/* Send OTP Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  style={{ width: '100%', marginTop: '0.65rem' }}
                >
                  {isSubmitting ? 'Sending OTP...' : 'SEND OTP'}
                </Button>

                {/* Login Link */}
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '1rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--color-border-subtle)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>
                    Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            /* ===================================================
               STEP 2: VERIFY PHONE NUMBER (OTP STEP)
            =================================================== */
            <>
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <span className="section-tag secondary" style={{ marginBottom: '0.75rem' }}>
                  Phone Verification
                </span>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                  Verify Phone Number
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', margin: 0 }}>
                  OTP sent to your registered phone number:
                </p>
                <div
                  style={{
                    fontWeight: '800',
                    color: 'var(--color-text)',
                    fontSize: '1.05rem',
                    marginTop: '0.35rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {formData.phoneNumber}
                </div>
              </div>

              {/* Dev notice banner if backend is not yet connected */}
              {devNotice && (
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#FEF3C7',
                    border: '1px solid #FDE68A',
                    color: '#92400E',
                    fontSize: '0.82rem',
                    marginBottom: '1.25rem',
                    lineHeight: '1.4',
                  }}
                >
                  <strong>Development Notice:</strong> {devNotice}
                </div>
              )}

              {/* Inline Error Message */}
              {errorMessage && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#FEE2E2',
                    border: '1px solid #FECACA',
                    color: '#B91C1C',
                    fontSize: '0.88rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <HiOutlineExclamationCircle style={{ fontSize: '1.25rem', flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      textAlign: 'center',
                      marginBottom: '0.75rem',
                      color: 'var(--color-text)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Enter 6-Digit OTP
                  </label>

                  {/* 6 Digit Input Boxes */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      maxWidth: '100%',
                    }}
                    onPaste={handleOtpPaste}
                  >
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputsRef.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        aria-label={`Digit ${index + 1} of OTP`}
                        style={{
                          width: '44px',
                          height: '52px',
                          textAlign: 'center',
                          fontSize: '1.35rem',
                          fontWeight: '800',
                          borderRadius: 'var(--radius-md)',
                          border: digit ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                          backgroundColor: digit ? 'var(--color-surface)' : 'var(--color-bg)',
                          color: 'var(--color-text)',
                          outline: 'none',
                          transition: 'border-color 0.15s ease',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Resend OTP Block */}
                <div style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  <span>Didn't receive OTP? </span>
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isSubmitting}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontWeight: '700',
                        cursor: 'pointer',
                        padding: 0,
                        textDecoration: 'underline',
                      }}
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <span style={{ fontWeight: '600', color: 'var(--color-text-muted)' }}>
                      Resend OTP in {resendCooldown}s
                    </span>
                  )}
                </div>

                {/* Verify OTP Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {isSubmitting ? 'Verifying OTP...' : 'VERIFY OTP'}
                </Button>

                {/* Back to Edit Registration Details */}
                <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('form');
                      setErrorMessage('');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-muted)',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <HiOutlineArrowLeft />
                    <span>Change registration details</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
