import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../stores/useThemeStore';

// RATIONALE: Hook separates i18n logic from presentation components, exposing localized strings and direction helpers.
export const useLanguage = () => {
  const { t } = useTranslation();
  const { language, direction, setLanguage, toggleLanguage } = useThemeStore();

  const isRtl = direction === 'rtl';

  return {
    t,
    language,
    direction,
    isRtl,
    setLanguage,
    toggleLanguage,
  };
};
