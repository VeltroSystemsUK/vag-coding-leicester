import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        services: 'Services',
        showcase: 'Showcase',
        contact: 'Contact',
        shop: 'Shop',
        bookNow: 'Book Now',
      },
      hero: {
        slogan: 'VAG Specialists • Leicester • OEM Finish',
        title: 'VAG Retrofit & Coding Specialist',
        subtitle: 'OEM style upgrades for Volkswagen, Audi, SEAT and Skoda vehicles. CarPlay, Android Auto, screen upgrades, virtual cockpit and coding activations.',
        cta: 'Check Compatibility',
        secondaryCta: 'Our Main Services',
      },
      stats: {
        activations: 'Activations',
        experience: 'Years Experience',
        satisfaction: 'Client Satisfaction',
        warranty: 'Lifetime Warranty',
      },
    },
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        services: 'الخدمات',
        showcase: 'المعرض',
        contact: 'اتصل بنا',
        shop: 'المتجر',
        bookNow: 'احجز الآن',
      },
      hero: {
        slogan: 'متخصصو VAG • ليستر • تشطيب OEM',
        title: 'متخصص VAG في التحديث والبرمجة',
        subtitle: 'ترقيات بنمط OEM لسيارات فولكس فاجن وأودي وسيات وسكودا. CarPlay و Android Auto وترقيات الشاشة وقمرة القيادة الافتراضية وتنشيط البرمجة.',
        cta: 'تحقق من التوافق',
        secondaryCta: 'خدماتنا الرئيسية',
      },
      stats: {
        activations: 'تنشيطات',
        experience: 'سنوات خبرة',
        satisfaction: 'رضا العملاء',
        warranty: 'ضمان مدى الحياة',
      },
    },
  },
  hi: {
    translation: {
      nav: {
        home: 'होम',
        services: 'सेवाएं',
        showcase: 'शोकेस',
        contact: 'संपर्क',
        shop: 'शॉप',
        bookNow: 'अभी बुक करें',
      },
      hero: {
        slogan: 'VAG विशेषज्ञ • लीसेस्टर • OEM फिनिश',
        title: 'VAG रेट्रोफिट और कोडिंग विशेषज्ञ',
        subtitle: 'वोक्सवैगन, ऑडी, सीट और स्कोडा वाहनों के लिए OEM शैली अपग्रेड। कारप्ले, एंड्रॉइड ऑटो, स्क्रीन अपग्रेड, वर्चुअल कॉकपिट और कोडिंग सक्रियण।',
        cta: 'अनुकूलता की जाँच करें',
        secondaryCta: 'हमारी मुख्य सेवाएं',
      },
      stats: {
        activations: 'सक्रियण',
        experience: 'वर्षों का अनुभव',
        satisfaction: 'ग्राहक संतुष्टि',
        warranty: 'आजीवन वारंटी',
      },
    },
  },
  pl: {
    translation: {
      nav: {
        home: 'Główna',
        services: 'Usługi',
        showcase: 'Galeria',
        contact: 'Kontakt',
        shop: 'Sklep',
        bookNow: 'Zarezerwuj',
      },
      hero: {
        slogan: 'Specjaliści VAG • Leicester • Wykończenie OEM',
        title: 'Specjalista Retrofit i Kodowania VAG',
        subtitle: 'Ulepszenia w stylu OEM dla pojazdów Volkswagen, Audi, SEAT i Skoda. CarPlay, Android Auto, ulepszenia ekranu, wirtualny kokpit i aktywacje kodowania.',
        cta: 'Sprawdź kompatybilność',
        secondaryCta: 'Nasze główne usługi',
      },
      stats: {
        activations: 'Aktywacje',
        experience: 'Lat doświadczenia',
        satisfaction: 'Satysfakcja klienta',
        warranty: 'Dożywotnia gwarancja',
      },
    },
  },
  ro: {
    translation: {
      nav: {
        home: 'Acasă',
        services: 'Servicii',
        showcase: 'Portofoliu',
        contact: 'Contact',
        shop: 'Magazin',
        bookNow: 'Rezervă acum',
      },
      hero: {
        slogan: 'Specialiști VAG • Leicester • Finisaj OEM',
        title: 'Specialist Retrofit și Codare VAG',
        subtitle: 'Upgrade-uri în stil OEM pentru vehicule Volkswagen, Audi, SEAT și Skoda. CarPlay, Android Auto, upgrade-uri de ecran, cockpit virtual și activări de codare.',
        cta: 'Verifică compatibilitatea',
        secondaryCta: 'Serviciile noastre principale',
      },
      stats: {
        activations: 'Activări',
        experience: 'Ani de experiență',
        satisfaction: 'Satisfacția clienților',
        warranty: 'Garanție pe viață',
      },
    },
  },
  ur: {
    translation: {
      nav: {
        home: 'ہوم',
        services: 'خدمات',
        showcase: 'شو کیس',
        contact: 'رابطہ',
        shop: 'شاپ',
        bookNow: 'ابھی بک کریں',
      },
      hero: {
        slogan: 'VAG ماہرین • لیسٹر • OEM فنش',
        title: 'VAG ریٹروفٹ اور کوڈنگ ماہر',
        subtitle: 'ووکس ویگن، آڈی، سیٹ اور اسکوڈا گاڑیوں کے لیے OEM اسٹائل اپ گریڈ۔ کار پلے، اینڈرائیڈ آٹو، اسکرین اپ گریڈ، ورچوئل کاک پٹ اور کوڈنگ ایکٹیویشن۔',
        cta: 'مطابقت چیک کریں',
        secondaryCta: 'ہماری اہم خدمات',
      },
      stats: {
        activations: 'ایکٹیویشنز',
        experience: 'سالوں کا تجربہ',
        satisfaction: 'کلائنٹ کا اطمینان',
        warranty: 'تاحیات وارنٹی',
      },
    },
  },
  ru: {
    translation: {
      nav: {
        home: 'Главная',
        services: 'Услуги',
        showcase: 'Галерея',
        contact: 'Контакт',
        shop: 'Магазин',
        bookNow: 'Забронировать',
      },
      hero: {
        slogan: 'Специалисты VAG • Лестер • OEM отделка',
        title: 'Специалист по дооснащению и кодированию VAG',
        subtitle: 'Обновления в стиле OEM для автомобилей Volkswagen, Audi, SEAT и Skoda. CarPlay, Android Auto, обновление экранов, виртуальная панель приборов и активация кодировок.',
        cta: 'Проверить совместимость',
        secondaryCta: 'Наши основные услуги',
      },
      stats: {
        activations: 'Активаций',
        experience: 'Лет опыта',
        satisfaction: 'Удовлетворенность',
        warranty: 'Пожизненная гарантия',
      },
    },
  },
  tr: {
    translation: {
      nav: {
        home: 'Anasayfa',
        services: 'Hizmetler',
        showcase: 'Galeri',
        contact: 'İletişim',
        shop: 'Mağaza',
        bookNow: 'Randevu Al',
      },
      hero: {
        slogan: 'VAG Uzmanları • Leicester • OEM Bitiş',
        title: 'VAG Retrofit & Kodlama Uzmanı',
        subtitle: 'Volkswagen, Audi, SEAT ve Skoda araçları için OEM tarzı yükseltmeler. CarPlay, Android Auto, ekran yükseltmeleri, hayalet gösterge ve kodlama aktivasyonları.',
        cta: 'Uyumluluğu Kontrol Et',
        secondaryCta: 'Ana Hizmetlerimiz',
      },
      stats: {
        activations: 'Aktivasyon',
        experience: 'Yıllık Deneyim',
        satisfaction: 'Müşteri Memnuniyeti',
        warranty: 'Ömür Boyu Garanti',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
