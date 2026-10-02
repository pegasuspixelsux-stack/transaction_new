'use client';

import { useState } from 'react';
import { ChevronRight, Phone } from 'lucide-react';
import { type Locale } from '@/lib/translations';
import { dashboardConfig } from '@/config/dashboardConfig';

interface ContactAndListingTabsProps {
  locale: Locale;
  dict: {
    tabs: {
      title: string;
      generalContact: string;
      publishProperty: string;
    };
    contactForm: {
      name: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      sending: string;
    };
    advisory: {
      title: string;
      subtitle: string;
      points: string[];
      form: {
        name: string;
        phone: string;
        operationType: string;
        description: string;
        sell: string;
        rent: string;
        submit: string;
        sending: string;
      };
    };
  };
}

export function ContactAndListingTabs({ locale, dict }: ContactAndListingTabsProps) {
  const [activeTab, setActiveTab] = useState<'contact' | 'listing'>('contact');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [listingForm, setListingForm] = useState({
    name: '',
    phone: '',
    operationType: 'sell',
    description: '',
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [listingSubmitting, setListingSubmitting] = useState(false);
  const { contact } = dashboardConfig;

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleListingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setListingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          message: contactForm.message,
          source: 'general-contact',
          locale,
        }),
      });

      if (response.ok) {
        setContactForm({ name: '', email: '', phone: '', message: '' });
        alert('Gracias! Nos pondremos en contacto pronto.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleListingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setListingSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: listingForm.name,
          phone: listingForm.phone,
          message: `${listingForm.operationType === 'sell' ? dict.advisory.form.sell : dict.advisory.form.rent}: ${listingForm.description}`,
          source: 'property-listing',
          locale,
        }),
      });

      if (response.ok) {
        setListingForm({ name: '', phone: '', operationType: 'sell', description: '' });
        alert('Gracias! Nos pondremos en contacto pronto.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setListingSubmitting(false);
    }
  };

  return (
    <section className="scroll-mt-24 border-t border-hairline bg-surface-raised">
      <div className="container-page py-24 sm:py-32">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="font-display text-3xl font-normal tracking-tight sm:text-4xl">
            {dict.tabs.title}
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="mb-12 flex gap-4 border-b border-hairline">
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
              activeTab === 'contact'
                ? 'border-b-2 border-primary text-ink'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {dict.tabs.generalContact}
          </button>
          <button
            onClick={() => setActiveTab('listing')}
            className={`px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
              activeTab === 'listing'
                ? 'border-b-2 border-primary text-ink'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {dict.tabs.publishProperty}
          </button>
        </div>

        {/* TAB 1: General Contact */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div>
                <p className="text-base leading-relaxed text-ink-muted mb-8">
                  Ponte en contacto con nosotros para cualquier pregunta o consulta sobre nuestras propiedades y servicios.
                </p>
              </div>

              <dl className="space-y-6">
                <div>
                  <dt className="text-xs uppercase tracking-luxury text-ink-muted">Dirección</dt>
                  <dd className="mt-1 text-sm text-ink">{contact.address}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-luxury text-ink-muted">Horarios</dt>
                  <dd className="mt-1 text-sm text-ink">{contact.hours}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-luxury text-ink-muted">Teléfono</dt>
                  <dd className="mt-1 text-sm">
                    <a href={contact.phoneHref} className="text-ink hover:text-primary transition-colors">
                      {contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-luxury text-ink-muted">Email</dt>
                  <dd className="mt-1 text-sm">
                    <a href={`mailto:${contact.email}`} className="text-ink hover:text-primary transition-colors">
                      {contact.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Right: Contact Form */}
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-luxury text-ink-muted mb-2">
                  {dict.contactForm.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink placeholder-ink-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder={dict.contactForm.name}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-luxury text-ink-muted mb-2">
                  {dict.contactForm.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink placeholder-ink-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder={dict.contactForm.email}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-luxury text-ink-muted mb-2">
                  {dict.contactForm.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink placeholder-ink-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder={dict.contactForm.phone}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-luxury text-ink-muted mb-2">
                  {dict.contactForm.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink placeholder-ink-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                  placeholder={dict.contactForm.message}
                />
              </div>

              <button
                type="submit"
                disabled={contactSubmitting}
                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-ink font-semibold rounded-lg transition-colors"
              >
                {contactSubmitting ? dict.contactForm.sending : dict.contactForm.submit}
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: Publish Property */}
        {activeTab === 'listing' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Value Proposition */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-normal text-ink mb-3">{dict.advisory.title}</h3>
                <p className="text-base leading-relaxed text-ink-muted">
                  {dict.advisory.subtitle}
                </p>
              </div>

              <div className="space-y-4">
                {dict.advisory.points.map((point, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <ChevronRight className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-ink-muted">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Listing Form */}
            <form onSubmit={handleListingSubmit} className="space-y-6">
              <div>
                <label htmlFor="listing-name" className="block text-xs uppercase tracking-luxury text-ink-muted mb-2">
                  {dict.advisory.form.name}
                </label>
                <input
                  type="text"
                  id="listing-name"
                  name="name"
                  value={listingForm.name}
                  onChange={handleListingChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink placeholder-ink-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder={dict.advisory.form.name}
                />
              </div>

              <div>
                <label htmlFor="listing-phone" className="block text-xs uppercase tracking-luxury text-ink-muted mb-2">
                  {dict.advisory.form.phone}
                </label>
                <input
                  type="tel"
                  id="listing-phone"
                  name="phone"
                  value={listingForm.phone}
                  onChange={handleListingChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink placeholder-ink-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder={dict.advisory.form.phone}
                />
              </div>

              <div>
                <label htmlFor="operationType" className="block text-xs uppercase tracking-luxury text-ink-muted mb-2">
                  {dict.advisory.form.operationType}
                </label>
                <select
                  id="operationType"
                  name="operationType"
                  value={listingForm.operationType}
                  onChange={handleListingChange}
                  className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer"
                >
                  <option value="sell">{dict.advisory.form.sell}</option>
                  <option value="rent">{dict.advisory.form.rent}</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-xs uppercase tracking-luxury text-ink-muted mb-2">
                  {dict.advisory.form.description}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={listingForm.description}
                  onChange={handleListingChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-surface border border-hairline rounded-lg text-ink placeholder-ink-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                  placeholder={dict.advisory.form.description}
                />
              </div>

              <button
                type="submit"
                disabled={listingSubmitting}
                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-ink font-semibold rounded-lg transition-colors"
              >
                {listingSubmitting ? dict.advisory.form.sending : dict.advisory.form.submit}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
