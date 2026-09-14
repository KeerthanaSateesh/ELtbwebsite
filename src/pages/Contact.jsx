import React from 'react';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock } from 'react-icons/hi';
import Button from '../components/common/Button';

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="container" style={{ padding: '4rem var(--container-padding)' }}>
        <div className="section-header">
          <span className="section-tag">Get in Touch</span>
          <h1 className="section-title">We’d Love to Hear From You</h1>
          <p className="section-subtitle">
            Have questions about catering, private dining, or dietary accommodations? Reach out directly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1020px', margin: '0 auto' }}>
          {/* Contact Information Card */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Restaurant Information</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontSize: '1.25rem', flexShrink: 0 }}>
                  <HiOutlineLocationMarker />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Location</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    Restaurant address details will be updated soon.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontSize: '1.25rem', flexShrink: 0 }}>
                  <HiOutlineClock />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Operating Hours</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    Mon – Sun: Official operating hours will be announced soon.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontSize: '1.25rem', flexShrink: 0 }}>
                  <HiOutlinePhone />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Direct Line</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    Phone number will be listed upon launch.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontSize: '1.25rem', flexShrink: 0 }}>
                  <HiOutlineMail />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Email</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    contact@eltacosandburritos.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Send a Message</h3>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sofia Ramirez"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="sofia@example.com"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="How can our kitchen help you today?"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
                ></textarea>
              </div>

              <Button type="submit" variant="primary" style={{ marginTop: '0.5rem' }}>
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
