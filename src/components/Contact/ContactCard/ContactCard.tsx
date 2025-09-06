'use client';

import { useState } from 'react';
import styles from './ContactCard.module.css';

interface ContactCardProps {
  onBack?: () => void;
}

export default function ContactCard({ onBack }: ContactCardProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.wrap}>
      <div className={styles.card}>
        <h2 className={styles.title}>Get in Touch</h2>
        <p className={styles.subtitle}>Have a project or collaboration in mind? Let&apos;s talk.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            className={styles.textarea}
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button className={styles.submit} type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {status === 'success' && <p className={styles.success}>✅ Email sent successfully!</p>}
        {status === 'error' && <p className={styles.error}>❌ Failed to send email.</p>}

        {onBack && (
          <button className={styles.back} onClick={onBack}>
            Back to Home
          </button>
        )}
      </div>
    </section>
  );
}