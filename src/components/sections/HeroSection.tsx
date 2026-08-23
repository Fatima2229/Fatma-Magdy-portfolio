import React, { useState } from 'react';
import {
  ArrowDown,
  Mail,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  CalendarCheck,
  CheckCircle2,
  Flame,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, TikTokIcon, LinkedInIcon } from '../ui/SocialIcons';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'post' | 'metrics' | 'calendar'>('post');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1420);

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    } else {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden mesh-gradient-clean">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: Social Profile Details & Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-start flex flex-col items-center lg:items-start space-y-6">
            {/* Tagline Pill + Live Status */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-pink-200 text-pink-700 text-xs font-bold tracking-wider shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                <span>{t('hero.badge')}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{t('hero.availableBadge')}</span>
              </div>
            </div>

            {/* Headline with Verified Badge */}
            <div className="space-y-2">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0f172a] font-editorial leading-[1.15]">
                  {t('hero.name')}
                </h1>
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-pink-500/20"
                  title={t('hero.verifiedCreator')}
                >
                  <CheckCircle2 size={18} className="stroke-[2.5]" />
                </div>
              </div>

              <p className="text-base sm:text-xl md:text-2xl font-semibold text-pink-600 flex items-center justify-center lg:justify-start gap-2">
                <span>{t('hero.title')}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200 font-mono">
                  {t('hero.handle')}
                </span>
              </p>
            </div>

            {/* Bio statement */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              {t('hero.description')}
            </p>

            {/* Core Social Stats Bar */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 w-full max-w-lg pt-1">
              <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-start">
                <span className="text-base sm:text-xl font-extrabold text-[#0f172a] block">
                  {t('hero.stats.postsManaged')}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-0.5 block truncate">
                  {t('hero.stats.postsManagedLabel')}
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-start">
                <span className="text-base sm:text-xl font-extrabold text-pink-600 block">
                  {t('hero.stats.engagementRate')}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-0.5 block truncate">
                  {t('hero.stats.engagementRateLabel')}
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-start">
                <span className="text-base sm:text-xl font-extrabold text-emerald-600 block">
                  {t('hero.stats.satisfaction')}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-0.5 block truncate">
                  {t('hero.stats.satisfactionLabel')}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Button
                as="a"
                href="#projects"
                variant="primary"
                size="md"
                className="font-bold px-6 shadow-md shadow-pink-500/10"
                icon={<ArrowDown size={15} />}
                iconPosition="right"
              >
                {t('hero.viewWork')}
              </Button>

              <Button
                as="a"
                href="#contact"
                variant="secondary"
                size="md"
                className="font-bold px-6"
                icon={<Mail size={15} />}
                iconPosition="left"
              >
                {t('hero.letsConnect')}
              </Button>
            </div>
          </div>

          {/* Right: Live Interactive Social Feed & Creator Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200/90 transition-all duration-300">
              {/* Creator Header with platform icons */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-pink-400 bg-slate-50 p-0.5 shadow-2xs">
                      <img src="/logo.png" alt="Fatma Magdy" className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute bottom-0 end-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div className="text-start">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-[#0f172a]">Fatma Magdy</h4>
                      <span className="w-3.5 h-3.5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[9px] font-black">
                        ✓
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">@fatma.content</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <InstagramIcon size={15} className="text-pink-500" />
                  <FacebookIcon size={15} className="text-blue-600" />
                  <TikTokIcon size={15} className="text-slate-800" />
                  <LinkedInIcon size={15} className="text-[#0A66C2]" />
                </div>
              </div>

              {/* Interactive Tabs: Post / Metrics / Calendar */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl my-3 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('post')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    activeTab === 'post'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t('hero.previewCard.tabPost')}
                </button>
                <button
                  onClick={() => setActiveTab('metrics')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    activeTab === 'metrics'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t('hero.previewCard.tabMetrics')}
                </button>
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    activeTab === 'calendar'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t('hero.previewCard.tabCalendar')}
                </button>
              </div>

              {/* Tab 1: Live Post Preview */}
              {activeTab === 'post' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1a233a] to-[#0c1322] p-5 text-white relative overflow-hidden shadow-inner text-start">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-pink-300 flex items-center gap-1">
                        <Flame size={12} className="text-pink-400" />
                        {isRtl ? 'استراتيجية المحتوى والـ Hooks' : 'Content Strategy & Hooks'}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/30">
                        {isRtl ? 'كاروسيل تعليمي' : 'Value Carousel'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium font-editorial leading-relaxed text-slate-100">
                      {t('hero.previewCard.postCaption')}
                    </p>

                    <div className="flex items-center gap-2 mt-4 text-[10px] text-pink-200 font-mono">
                      <span>#SocialGrowth</span>
                      <span>#ContentFunnels</span>
                      <span>#ViralHooks</span>
                    </div>
                  </div>

                  {/* Engagement Bar */}
                  <div className="flex items-center justify-between pt-1 text-slate-600 text-xs font-semibold">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleLike}
                        className="inline-flex items-center gap-1.5 focus:outline-none transition-transform active:scale-90"
                      >
                        <Heart
                          size={16}
                          className={`transition-colors ${
                            isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-600 hover:text-rose-500'
                          }`}
                        />
                        <span className={isLiked ? 'text-rose-600 font-bold' : 'text-slate-700'}>
                          {likeCount.toLocaleString()}
                        </span>
                      </button>
                      <span className="inline-flex items-center gap-1.5 text-slate-600">
                        <MessageCircle size={16} />
                        <span>128</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-slate-600">
                        <Share2 size={16} />
                        <span>340</span>
                      </span>
                    </div>

                    <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {t('hero.previewCard.reachTag')}
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 2: Performance Metrics */}
              {activeTab === 'metrics' && (
                <div className="space-y-3 py-1 text-start animate-fadeIn">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-700">
                        {isRtl ? 'معدل التفاعل العضوي' : 'Organic Engagement'}
                      </span>
                      <span className="text-xs font-extrabold text-pink-600">+185%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-full w-[85%] rounded-full" />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-700">
                        {isRtl ? 'نسبة إكمال مشاهدة الريلز' : 'Reel Video Retention'}
                      </span>
                      <span className="text-xs font-extrabold text-indigo-600">82%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full w-[82%] rounded-full" />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-700">
                        {isRtl ? 'الالتزام بمواعيد النشر' : 'Schedule Accuracy'}
                      </span>
                      <span className="text-xs font-extrabold text-emerald-600">100%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[100%] rounded-full" />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Content Calendar Matrix */}
              {activeTab === 'calendar' && (
                <div className="space-y-2 py-1 text-start animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                    <span>{isRtl ? 'الخطة الأسبوعية النموذجية' : 'Sample Weekly Matrix'}</span>
                    <span className="text-pink-600 font-mono">30-Day Plan</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="p-2 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-pink-500" />
                        <span className="font-bold text-slate-800">{isRtl ? 'الأحد: ريلز سريع (Viral Hook)' : 'Sun: Viral Reel Hook'}</span>
                      </div>
                      <span className="text-[10px] text-pink-700 font-semibold">{isRtl ? 'وصول' : 'Reach'}</span>
                    </div>

                    <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="font-bold text-slate-800">{isRtl ? 'الثلاثاء: كاروسيل تعليمي (Value)' : 'Tue: Value Carousel'}</span>
                      </div>
                      <span className="text-[10px] text-blue-700 font-semibold">{isRtl ? 'حفظ' : 'Saves'}</span>
                    </div>

                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-bold text-slate-800">{isRtl ? 'الخميس: ستوريز تفاعلية وعرض' : 'Thu: DM Offer Stories'}</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold">{isRtl ? 'مبيعات' : 'Leads'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Satellite 1: Top Floating Pill */}
            <div className="absolute -top-4 -end-3 glass-panel rounded-2xl p-2.5 sm:p-3 shadow-md border border-slate-200 hidden sm:flex items-center gap-2.5 bg-white/95">
              <div className="p-1.5 rounded-xl bg-pink-50 text-pink-600">
                <CalendarCheck size={16} />
              </div>
              <div className="text-start">
                <span className="text-[10px] text-slate-400 font-medium block">
                  {isRtl ? 'خطة المحتوى' : 'Content Matrix'}
                </span>
                <span className="text-xs font-bold text-[#0f172a]">
                  {isRtl ? 'جدول شهري منظم' : '30-Day Plan'}
                </span>
              </div>
            </div>

            {/* Satellite 2: Bottom Floating Pill */}
            <div className="absolute -bottom-4 -start-3 glass-panel rounded-2xl p-2.5 sm:p-3 shadow-md border border-slate-200 hidden sm:flex items-center gap-2.5 bg-white/95">
              <div className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600">
                <TrendingUp size={16} />
              </div>
              <div className="text-start">
                <span className="text-[10px] text-slate-400 font-medium block">
                  {isRtl ? 'مؤشر الأداء' : 'Performance'}
                </span>
                <span className="text-xs font-bold text-[#0f172a]">
                  {isRtl ? 'نمو عضوي وتفاعل' : 'Organic Lift'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
