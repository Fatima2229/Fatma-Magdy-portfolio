import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useContactForm } from '../../hooks/useContactForm';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { CustomDropdown, DropdownOption } from '../ui/CustomDropdown';

export const ContactSection: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    onSubmit,
    errors,
    isSubmitting,
    isSubmitted,
    copiedField,
    copyToClipboard,
  } = useContactForm();

  const selectedService = watch('serviceInterest');

  const serviceOptions: DropdownOption[] = [
    { value: 'Social Media Management', label: t('contact.services.management') },
    { value: 'Content Strategy & Calendars', label: t('contact.services.strategy') },
    { value: 'Copywriting & Captions', label: t('contact.services.copywriting') },
    { value: 'Brand Identity & Funnels', label: t('contact.services.branding') },
    { value: 'Consultation & Other', label: t('contact.services.consultation') },
  ];

  const handleChipClick = (serviceValue: string) => {
    setValue('serviceInterest', serviceValue, { shouldValidate: true });
    trigger('serviceInterest');
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-[#faf9fc] overflow-hidden scroll-mt-20">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-tr from-[#8c52ff]/15 via-indigo-200/10 to-[#0e1a36]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t('contact.badge')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left / Direct Social DM Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* WhatsApp Quick Chat Card */}
            <GlassCard className="bg-white/90 p-6 space-y-3 border border-[#8c52ff]/15 shadow-md">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                  <Phone size={22} />
                </div>
                <a
                  href="https://wa.me/201154328884?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%81%D8%A7%D8%B7%D9%85%D8%A9%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20%D8%A7%D9%84%D8%B3%D9%88%D8%B4%D9%8A%D8%A7%D9%84%20%D9%85%D9%8A%D8%AF%D9%8A%D8%A7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                >
                  <MessageCircle size={13} />
                  <span>WhatsApp DM</span>
                </a>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t('contact.phone')}
                </span>
                <a
                  href="tel:+201154328884"
                  dir="ltr"
                  className="text-base sm:text-lg font-bold text-[#0e1a36] hover:text-emerald-600 block transition-colors mt-0.5 text-start font-mono"
                >
                  +20 115 432 8884
                </a>
              </div>
            </GlassCard>

            {/* Direct Email Card */}
            <GlassCard className="bg-white/90 p-6 space-y-3 border border-[#8c52ff]/15 shadow-md">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-[#f6f0fc] text-[#8c52ff]">
                  <Mail size={22} />
                </div>
                <button
                  onClick={() =>
                    copyToClipboard('fatimamagdy.8884@gmail.com', 'email')
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#faf9fc] hover:bg-[#f6f0fc] text-slate-700 hover:text-[#8c52ff] border border-slate-200 transition-colors cursor-pointer"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check size={12} className="text-emerald-600" />
                      <span>{t('contact.copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>{t('contact.copyEmail')}</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t('contact.directEmail')}
                </span>
                <a
                  href="mailto:fatimamagdy.8884@gmail.com"
                  className="text-base sm:text-lg font-bold text-[#0e1a36] hover:text-[#8c52ff] block transition-colors mt-0.5 truncate font-mono"
                >
                  fatimamagdy.8884@gmail.com
                </a>
              </div>
            </GlassCard>

            {/* Location & Remote Availability */}
            <GlassCard className="bg-white/90 p-6 space-y-3 border border-[#8c52ff]/15 shadow-md">
              <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 w-fit">
                <MapPin size={22} />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t('contact.location')}
                </span>
                <p className="text-base sm:text-lg font-bold text-[#0e1a36] mt-0.5">
                  {t('contact.locationValue')}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {isRtl
                    ? 'متاحة للعمل عن بُعد وإدارة الحملات للمشاريع الإقليمية والدولية.'
                    : 'Available for remote collaborations across Egypt & internationally.'}
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Right / Validated DM Form */}
          <div className="lg:col-span-7">
            <GlassCard className="bg-white/95 p-6 sm:p-10 shadow-xl border border-[#8c52ff]/20">
              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900 font-editorial">
                    {isRtl ? 'تم إرسال رسالتك بنجاح!' : 'Message Prepared!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
                    {t('contact.success')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                  {/* Quick Service Selection Chips */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t('contact.quickPillLabel')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleChipClick(opt.value)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            selectedService === opt.value
                              ? 'bg-[#0e1a36] text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-[#f6f0fc] text-slate-700 hover:text-[#8c52ff] border border-slate-200/80'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                      >
                        {t('contact.nameLabel')} *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder={t('contact.namePlaceholder')}
                        {...register('fullName')}
                        className={`w-full px-4 py-3 rounded-xl bg-[#faf9fc] border text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8c52ff]/30 focus:border-[#8c52ff] transition-all ${
                          errors.fullName ? 'border-rose-400 ring-rose-200' : 'border-slate-200/80'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                      >
                        {t('contact.emailLabel')} *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder={t('contact.emailPlaceholder')}
                        {...register('email')}
                        className={`w-full px-4 py-3 rounded-xl bg-[#faf9fc] border text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8c52ff]/30 focus:border-[#8c52ff] transition-all ${
                          errors.email ? 'border-rose-400 ring-rose-200' : 'border-slate-200/80'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject and Service Dropdown Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                      >
                        {t('contact.subjectLabel')} *
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder={t('contact.subjectPlaceholder')}
                        {...register('subject')}
                        className={`w-full px-4 py-3 rounded-xl bg-[#faf9fc] border text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8c52ff]/30 focus:border-[#8c52ff] transition-all ${
                          errors.subject ? 'border-rose-400 ring-rose-200' : 'border-slate-200/80'
                        }`}
                      />
                      {errors.subject && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="serviceInterest"
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                      >
                        {t('contact.serviceLabel')} *
                      </label>
                      <CustomDropdown
                        options={serviceOptions}
                        value={selectedService || ''}
                        onChange={(val) => {
                          setValue('serviceInterest', val, { shouldValidate: true });
                          trigger('serviceInterest');
                        }}
                        placeholder={t('contact.serviceSelect')}
                        hasError={!!errors.serviceInterest}
                      />
                      {errors.serviceInterest && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">
                          {errors.serviceInterest.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Area */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      {t('contact.messageLabel')} *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder={t('contact.messagePlaceholder')}
                      {...register('message')}
                      className={`w-full px-4 py-3 rounded-xl bg-[#faf9fc] border text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8c52ff]/30 focus:border-[#8c52ff] transition-all ${
                        errors.message ? 'border-rose-400 ring-rose-200' : 'border-slate-200/80'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full font-bold shadow-md shadow-[#0e1a36]/15"
                      disabled={isSubmitting}
                      icon={isSubmitting ? <Sparkles size={16} className="animate-spin" /> : <Send size={16} />}
                      iconPosition="right"
                    >
                      {isSubmitting ? t('contact.submitting') : t('contact.submit')}
                    </Button>
                  </div>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
