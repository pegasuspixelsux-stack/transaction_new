'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { type Locale } from '@/lib/translations';

interface PropertyAdvisorySectionProps {
  locale: Locale;
  dict: {
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
    };
  };
}

export function PropertyAdvisorySection({ locale, dict }: PropertyAdvisorySectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    operationType: 'sell',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: `${formData.operationType === 'sell' ? dict.sell : dict.rent}: ${formData.description}`,
          source: 'property-advisory',
          locale,
        }),
      });

      if (response.ok) {
        setFormData({ name: '', phone: '', operationType: 'sell', description: '' });
        alert('Thank you! We will contact you soon.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Text & Key Points */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-light text-white mb-4">
                {dict.title}
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed">
                {dict.subtitle}
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4">
              {dict.points.map((point, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ChevronRight className="w-5 h-5 text-sky-600" />
                  </div>
                  <p className="text-neutral-300">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-600/10 to-transparent rounded-2xl blur-3xl -z-10" />
            <div className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                    {dict.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600/50 transition-all"
                    placeholder={dict.form.name}
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-2">
                    {dict.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600/50 transition-all"
                    placeholder={dict.form.phone}
                  />
                </div>

                {/* Operation Type */}
                <div>
                  <label htmlFor="operationType" className="block text-sm font-medium text-neutral-300 mb-2">
                    {dict.form.operationType}
                  </label>
                  <select
                    id="operationType"
                    name="operationType"
                    value={formData.operationType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600/50 transition-all cursor-pointer"
                  >
                    <option value="sell" className="bg-neutral-900">{dict.form.sell}</option>
                    <option value="rent" className="bg-neutral-900">{dict.form.rent}</option>
                  </select>
                </div>

                {/* Description Field */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-2">
                    {dict.form.description}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600/50 transition-all resize-none"
                    placeholder={dict.form.description}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Enviando...' : dict.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
