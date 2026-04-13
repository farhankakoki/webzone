// ============================================================
// DATA.JS — Webzone Service Hub
// All services with WhatsApp integration
// ============================================================

const WA_NUMBER = '919048532576'; // Replace with real number

const services = [
  {
    id: 'S15',
    cat: 'other',
    featured: true,
    icon: 'fa-solid fa-photo-film',
    title: { en: 'Print & Photocopy', ml: 'പ്രിന്റ് & ഫോട്ടോകോപ്പി', hi: 'प्रिंट और फोटोकॉपी' },
    desc: { en: 'Color & B/W printing, photocopying, and document scanning services.', ml: 'കളർ, B/W പ്രിന്റ്, ഫോട്ടോകോപ്പി, സ്കാൻ.', hi: 'कलर, B/W प्रिंट, फोटोकॉपी, स्कैन।' },
    docs: { en: 'Document file or original', ml: 'ഡോക്യുമെന്റ് ഫയൽ അല്ലെങ്കിൽ ഒറിജിനൽ', hi: 'दस्तावेज़ फ़ाइल या ओरिजिनल' }
  },
  // ---- GOVERNMENT ----
  {
    id: 'S02',
    cat: 'gov',
    featured: true,
    icon: 'fa-solid fa-passport',
    title: { en: 'Passport Application', ml: 'പാസ്പോർട്ട് അപേക്ഷ', hi: 'पासपोर्ट आवेदन' },
    desc: { en: 'New passport issuance, renewal, and Tatkal applications. Fast assistance near Areekode and Kizhisseri.', ml: 'പുതിയ പാസ്പോർട്ട്, പുതുക്കൽ, തൽക്കാൽ.', hi: 'नया पासपोर्ट, नवीनीकरण और तत्काल।' },
    docs: { en: 'ID Proof, SSLC, Passport Photo', ml: 'തിരിച്ചറിയൽ രേഖ, SSLC, ഫോട്ടോ', hi: 'आईडी प्रमाण, एसएसएलसी, फोटो' }
  },
  {
    id: 'S03',
    cat: 'gov',
    featured: true,
    icon: 'fa-regular fa-id-card',
    title: { en: 'PAN Card', ml: 'പാൻ കാർഡ്', hi: 'पैन कार्ड' },
    desc: { en: 'New PAN card registration and corrections via NSDL. Available near Kadungalloor and Velleri.', ml: 'പുതിയ പാൻ കാർഡ്, തിരുത്തൽ, NSDL.', hi: 'नया पैन, सुधार, NSDL सेवाएं।' },
    docs: { en: 'ID Proof, Passport Photo', ml: 'തിരിച്ചറിയൽ രേഖ, ഫോട്ടോ', hi: 'आईडी प्रमाण, पासपोर्ट फोटो' }
  },
  {
    id: 'S04',
    cat: 'gov',
    icon: 'fa-regular fa-file',
    title: { en: 'Income Certificate', ml: 'വരുമാന സർട്ടിഫിക്കറ്റ്', hi: 'आय प्रमाण पत्र' },
    desc: { en: 'Official income certificates for scholarships and government schemes.', ml: 'സ്കോളർഷിപ്പ്, പദ്ധതികൾക്കുള്ള വരുമാന സർട്ടിഫിക്കറ്റ്.', hi: 'छात्रवृत्ति के लिए आय प्रमाण पत्र।' },
    docs: { en: 'ID Proof, Ration Card', ml: 'തിരിച്ചറിയൽ രേഖ, റേഷൻ കാർഡ്', hi: 'आईडी प्रमाण, राशन कार्ड' }
  },
  {
    id: 'S05',
    cat: 'gov',
    icon: 'fa-solid fa-person-booth',
    title: { en: 'Voter ID Services', ml: 'വോട്ടർ ഐഡി', hi: 'वोटर आईडी' },
    desc: { en: 'New enrollment, address changes, and corrections to voter ID card.', ml: 'പുതിയ ചേർക്കൽ, വിലാസ മാറ്റം, തിരുത്തൽ.', hi: 'नया नामांकन, पते में बदलाव।' },
    docs: { en: 'ID Proof, Address Proof, Photo', ml: 'തിരിച്ചറിയൽ രേഖ, വിലാസ തെളിവ്, ഫോട്ടോ', hi: 'आईडी प्रमाण, पते का प्रमाण, फोटो' }
  },
  {
    id: 'S06',
    cat: 'gov',
    icon: 'fa-solid fa-file-lines',
    title: { en: 'Caste/Community Certificate', ml: 'ജാതി / കമ്മ്യൂണിറ്റി സർട്ടിഫിക്കറ്റ്', hi: 'जाति/समुदाय प्रमाण पत्र' },
    desc: { en: 'Caste, community, and nativity certificates for official use.', ml: 'ഒൗദ്യോഗിക ആവശ്യങ്ങൾക്കുള്ള ജാതി, കമ്മ്യൂണിറ്റി സർട്ടിഫിക്കറ്റ്.', hi: 'जाति, समुदाय प्रमाण पत्र।' },
    docs: { en: 'ID Proof, Ration Card, Old Certificate', ml: 'തിരിച്ചറിയൽ രേഖ, റേഷൻ കാർഡ്, പഴയ സർട്ടിഫിക്കറ്റ്', hi: 'आईडी प्रमाण, राशन कार्ड, पुराना प्रमाण पत्र' }
  },
  {
    id: 'S16',
    cat: 'gov',
    icon: 'fa-solid fa-address-card',
    title: { en: 'Ration Card Services', ml: 'റേഷൻ കാർഡ്', hi: 'राशन कार्ड' },
    desc: { en: 'New ration card, member addition, splitting, and address change.', ml: 'പുതിയ റേഷൻ കാർഡ്, പേര് ചേർക്കൽ, വിഭജനം.', hi: 'नया राशन कार्ड, सदस्य जोड़ना।' },
    docs: { en: 'ID Proof, Old Card, Income Proof', ml: 'തിരിച്ചറിയൽ രേഖ, പഴയ കാർഡ്, വരുമാന തെളിവ്', hi: 'आईडी, पुराना कार्ड' }
  },
  {
    id: 'S17',
    cat: 'gov',
    icon: 'fa-solid fa-building-shield',
    title: { en: 'Police Clearance (PCC)', ml: 'പോലീസ് ക്ലിയറൻസ് (PCC)', hi: 'पुलिस क्लीयरेंस' },
    desc: { en: 'PCC application for job, passport, and visa purposes.', ml: 'ജോലി, പാസ്പോർട്ട് ആവശ്യങ്ങൾക്കുള്ള പോലിസ് ക്ലിയറൻസ്.', hi: 'नौकरी, पासपोर्ट के लिए पुलिस क्लीयरेंस।' },
    docs: { en: 'Passport, ID Proof, Photo', ml: 'പാസ്പോർട്ട്, തിരിച്ചറിയൽ രേഖ, ഫോട്ടോ', hi: 'पासपोर्ट, आईडी, फोटो' }
  },
  {
    id: 'S18',
    cat: 'gov',
    icon: 'fa-solid fa-landmark',
    title: { en: 'Land Tax Payment', ml: 'ഭൂനികുതി', hi: 'भूमि कर' },
    desc: { en: 'Pay your land and building tax (Village/Panchayat) online.', ml: 'ഭൂനികുതിയും കെട്ടിട നികുതിയും ഓൺലൈനായി അടക്കുക.', hi: 'भूमि और भवन कर ऑनलाइन चुकाएं।' },
    docs: { en: 'Old tax receipt, Thandaper number', ml: 'പഴയ നികുതി രസീത്, തണ്ടപ്പേർ നമ്പർ', hi: 'पुरानी रसीद, थंडापेर नंबर' }
  },
  {
    id: 'S19',
    cat: 'gov',
    icon: 'fa-solid fa-briefcase',
    title: { en: 'Employment Registry', ml: 'എംപ്ലോയ്മെന്റ് രജിസ്ട്രേഷൻ', hi: 'रोजगार पंजीकरण' },
    desc: { en: 'New employment registration and renewal of registry.', ml: 'പുതിയ എംപ്ലോയ്മെന്റ് രജിസ്ട്രേഷൻ, പുതുക്കൽ.', hi: 'नया रोजगार पंजीकरण, नवीनीकरण।' },
    docs: { en: 'SSLC, Educational Certificates, ID', ml: 'SSLC, വിദ്യഭ്യാസ രേഖകൾ, തിരിച്ചറിയൽ രേഖ', hi: 'एसएसएलसी, शैक्षिक प्रमाण पत्र' }
  },
  {
    id: 'S20',
    cat: 'gov',
    icon: 'fa-solid fa-scroll',
    title: { en: 'Encumbrance Certificate', ml: 'ആധാര സർട്ടിഫിക്കറ്റ് (EC)', hi: 'भार प्रमाण पत्र' },
    desc: { en: 'Apply for Encumbrance Certificate for land transactions.', ml: 'ഭൂമി ഇടപാടുകൾക്കുള്ള ഇ.സി (EC) അപേക്ഷിക്കുക.', hi: 'भूमि के लिए भार प्रमाण पत्र (EC)।' },
    docs: { en: 'Old deeds, Tax receipt', ml: 'പഴയ ആധാരം, നികുതി രസീത്', hi: 'पुराने दस्तावेज, कर रसीद' }
  },
  {
    id: 'S22',
    cat: 'gov',
    icon: 'fa-solid fa-car',
    title: { en: 'RTO & Driving License', ml: 'ഡ്രൈവിംഗ് ലൈസൻസ് / RTO', hi: 'आरटीओ और ड्राइविंग लाइसेंस' },
    desc: { en: 'Learning license, driving license renewal, and vehicle related services.', ml: 'ലേണേഴ്സ്, ഡ്രൈവിംഗ് ലൈസൻസ് പുതുക്കൽ, വാഹന സേവനങ്ങൾ.', hi: 'लर्निंग लाइसेंस, नवीनीकरण और वाहन सेवाएं।' },
    docs: { en: 'ID Proof, Photo, Old License', ml: 'തിരിച്ചറിയൽ രേഖ, ഫോട്ടോ, പഴയ ലൈസൻസ്', hi: 'आईडी प्रमाण, फोटो, पुराना लाइसेंस' }
  },
  {
    id: 'S21',
    cat: 'gov',
    icon: 'fa-solid fa-id-badge',
    title: { en: 'Nativity Certificate', ml: 'നേറ്റിവിറ്റി സർട്ടിഫിക്കറ്റ്', hi: 'मूल निवास प्रमाण पत्र' },
    desc: { en: 'Nativity and Residence certificates for education and jobs.', ml: 'വിദ്യാഭ്യാസ, ജോലി ആവശ്യങ്ങൾക്കുള്ള നേറ്റിവിറ്റി സർട്ടിഫിക്കറ്റ്.', hi: 'शिक्षा, नौकरी के लिए मूल निवास प्रमाण।' },
    docs: { en: 'ID Proof, Birth Certificate', ml: 'തിരിച്ചറിയൽ രേഖ, ജനന സർട്ടിഫിക്കറ്റ്', hi: 'आईडी प्रमाण, जन्म प्रमाण पत्र' }
  },

  // ---- UTILITY ----
  {
    id: 'S07',
    cat: 'utility',
    icon: 'fa-solid fa-bolt',
    title: { en: 'Electricity Bill Pay', ml: 'വൈദ്യുതി ബിൽ', hi: 'बिजली बिल' },
    desc: { en: 'Pay KSEB electricity bills online quickly and securely.', ml: 'KSEB ബിൽ ഓൺലൈനായി അടക്കുക.', hi: 'KSEB बिजली बिल ऑनलाइन चुकाएं।' },
    docs: { en: 'Consumer Number', ml: 'കൺസ്യൂമർ നമ്പർ', hi: 'उपभोक्ता नंबर' }
  },
  {
    id: 'S08',
    cat: 'utility',
    icon: 'fa-solid fa-droplet',
    title: { en: 'Water Bill Payment', ml: 'വാട്ടർ ബിൽ', hi: 'पानी बिल' },
    desc: { en: 'Pay Kerala Water Authority bills online.', ml: 'കേരള ജലഅതോറിറ്റി ബിൽ ഓൺലൈനായി.', hi: 'केरल जल प्राधिकरण बिल ऑनलाइन।' },
    docs: { en: 'Consumer ID, Bill Copy', ml: 'കൺസ്യൂമർ ID, ബിൽ', hi: 'उपभोक्ता ID, बिल कॉपी' }
  },
  {
    id: 'S09',
    cat: 'utility',
    icon: 'fa-solid fa-mobile-screen-button',
    title: { en: 'Mobile Recharge', ml: 'മൊബൈൽ റീചാർജ്', hi: 'मोबाइल रिचार्ज' },
    desc: { en: 'All networks — Jio, Airtel, BSNL, Vi. Postpaid & Prepaid.', ml: 'Jio, Airtel, BSNL, Vi. Postpaid & Prepaid.', hi: 'Jio, Airtel, BSNL, Vi. पोस्टपेड & प्रीपेड।' },
    docs: { en: 'Mobile Number, Amount', ml: 'മൊബൈൽ നമ്പർ, തുക', hi: 'मोबाइल नंबर, राशि' }
  },

  // ---- FINANCIAL ----
  {
    id: 'S10',
    cat: 'financial',
    icon: 'fa-solid fa-shield-halved',
    title: { en: 'Insurance Services', ml: 'ഇൻഷ്വറൻസ്', hi: 'बीमा सेवाएं' },
    desc: { en: 'Pradhan Mantri life, health, accident insurance enrollment.', ml: 'PM ജീവൻ ജ്യോതി, ആരോഗ്യ ഇൻഷ്വറൻസ്.', hi: 'PM जीवन ज्योति, स्वास्थ्य बीमा।' },
    docs: { en: 'ID Proof, Bank Passbook, Photo', ml: 'തിരിച്ചറിയൽ രേഖ, ബാങ്ക് പാസ്ബുക്ക്, ഫോട്ടോ', hi: 'आईडी प्रमाण, बैंक पासबुक, फोटो' }
  },
  {
    id: 'S11',
    cat: 'financial',
    icon: 'fa-solid fa-building-columns',
    title: { en: 'Banking Services', ml: 'ബാങ്കിംഗ് സേവനങ്ങൾ', hi: 'बैंकिंग सेवाएं' },
    desc: { en: 'PMJDY account opening, bank transfers, and account linking.', ml: 'PMJDY, ബാങ്ക് ട്രാൻസ്ഫർ, ലിങ്കിംഗ്.', hi: 'PMJDY खाता खोलना, ट्रांसफर।' },
    docs: { en: 'ID Proof, Photo, Address Proof', ml: 'തിരിച്ചറിയൽ രേഖ, ഫോട്ടോ, വിലാസ തെളിവ്', hi: 'आईडी प्रमाण, फोटो, पते का प्रमाण' }
  },

  // ---- OTHERS ----
  {
    id: 'S12',
    cat: 'other',
    icon: 'fa-solid fa-train',
    title: { en: 'Train / Bus Ticket', ml: 'ടിക്കറ്റ് ബുക്കിംഗ്', hi: 'यात्रा टिकट' },
    desc: { en: 'IRCTC train tickets and KSRTC bus ticket booking service.', ml: 'IRCTC ട്രെയിൻ, KSRTC ബസ് ടിക്കറ്റ്.', hi: 'IRCTC ट्रेन, KSRTC बस टिकट।' },
    docs: { en: 'Journey details, ID proof', ml: 'യാത്ര വിവരങ്ങൾ, തിരിച്ചറിയൽ രേഖ', hi: 'यात्रा विवरण, आईडी प्रमाण' }
  },
  {
    id: 'S13',
    cat: 'other',
    icon: 'fa-solid fa-graduation-cap',
    title: { en: 'Scholarship Application', ml: 'സ്കോളർഷിപ്പ്', hi: 'छात्रवृत्ति' },
    desc: { en: 'NSP, State scholarships, and minority scholarships assistance.', ml: 'NSP, സ്റ്റേറ്റ്, ന്യൂനപക്ഷ സ്കോളർഷിപ്പ്.', hi: 'NSP, राज्य, अल्पसंख्यक छात्रवृत्ति।' },
    docs: { en: 'ID Proof, Marklist, Bank details', ml: 'തിരിച്ചറിയൽ രേഖ, മാർക്ക് ലിസ്റ്റ്, ബാങ്ക് വിവരം', hi: 'आईडी प्रमाण, मार्कशीट, बैंक विवरण' }
  },
  {
    id: 'S14',
    cat: 'other',
    icon: 'fa-solid fa-store',
    title: { en: 'Trade License', ml: 'വ്യാപാര ലൈസൻസ്', hi: 'व्यापार लाइसेंस' },
    desc: { en: 'Panchayat and municipal trade license registration and renewal.', ml: 'പഞ്ചായത്ത്, മുൻസിപ്പൽ വ്യാപാര ലൈസൻസ്.', hi: 'पंचायत, नगरपालिका व्यापार लाइसेंस।' },
    docs: { en: 'Rent Agreement, Tax Receipt, ID', ml: 'വാടക കരാർ, നികുതി രസീത്, തിരിച്ചറിയൽ രേഖ', hi: 'किराया समझौता, कर रसीद, आईडी' }
  }
];

// FAQ Data
const faqs = [
  {
    q: { en: 'How do I apply for a service?', ml: 'ഒരു സേവനം എങ്ങനെ അപേക്ഷിക്കാം?', hi: 'सेवा के लिए आवेदन कैसे करें?' },
    a: { en: 'Simply click on the "Apply via WhatsApp" button on any service card. WhatsApp will open with a pre-filled message. Just send and our team will contact you.', ml: 'ഏതെങ്കിലും സർവീസ് കാർഡിലെ "WhatsApp വഴി അപേക്ഷിക്കുക" ബട്ടൺ ക്ലിക്ക് ചെയ്യൂ. WhatsApp ഓട്ടോ-ഫിൽ ആകും.', hi: '"WhatsApp से आवेदन करें" बटन पर क्लिक करें। WhatsApp खुलेगा और आपका संदेश पहले से भरा होगा।' }
  },
  {
    q: { en: 'Do I need to create an account?', ml: 'അക്കൗണ്ട് ഉണ്ടാക്കണോ?', hi: 'क्या मुझे खाता बनाना होगा?' },
    a: { en: 'No! We have zero login, zero registration. Just click, WhatsApp, and done. We keep it simple for everyone.', ml: 'ഇല്ല! ലോഗിൻ ഇല്ല, രജിസ്ട്രേഷൻ ഇല്ല. ക്ലിക്ക് → WhatsApp → Done!', hi: 'नहीं! कोई लॉगिन नहीं, कोई रजिस्ट्रेशन नहीं। बस क्लिक करें और WhatsApp करें।' }
  },
  {
    q: { en: 'How long does it take to complete a service?', ml: 'ഒരു സേവനം പൂർത്തിയാകാൻ എത്ര സമയം?', hi: 'सेवा पूरी होने में कितना समय लगता है?' },
    a: { en: 'Most utility services are same-day. Government certificates typically take 3–7 working days depending on the department. We always keep you updated via WhatsApp.', ml: 'യൂട്ടിലിറ്റി സേവനങ്ങൾ അന്നത്തെ ദിവസം. ഗവൺമെന്റ് സർട്ടിഫിക്കറ്റ് 3–7 ദിവസം.', hi: 'यूटिलिटी सेवाएं उसी दिन। सरकारी प्रमाण पत्र 3–7 कार्य दिवसों में।' }
  },
  {
    q: { en: 'Is there any service fee?', ml: 'സേവന ഫീസ് ഉണ്ടോ?', hi: 'क्या कोई सेवा शुल्क है?' },
    a: { en: 'Some services have government-mandated fees. We charge a small facilitation fee for complex services. All fees are disclosed upfront before you proceed.', ml: 'ചിലതിന് ഗവൺമെന്റ് ഫീസ് ഉണ്ട്. സങ്കീർണ സേവനങ്ങൾക്ക് ചെറിയ ഫെസിലിറ്റേഷൻ ഫീ.', hi: 'कुछ सेवाओं में सरकारी शुल्क है। जटिल सेवाओं के लिए छोटा सुविधा शुल्क।' }
  },
  {
    q: { en: 'Can I apply for services in Malayalam or Hindi?', ml: 'മലയാളത്തിൽ അപേഷിക്കാമോ?', hi: 'क्या मैं हिंदी में आवेदन कर सकता हूं?' },
    a: { en: 'Yes! Our platform is fully multilingual. You can switch between English, Malayalam, and Hindi using the language switcher at the top right.', ml: 'ഹ്യ! മലയാളം, ഹിന്ദി, ഇംഗ്ലീഷ് — മൂന്ന് ഭാഷകൾ ലഭ്യമാണ്.', hi: 'हां! हमारा प्लेटफॉर्म पूरी तरह बहुभाषी है। ऊपर दाईं ओर भाषा स्विच करें।' }
  }
];
