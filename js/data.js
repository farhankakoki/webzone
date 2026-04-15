// ============================================================
// DATA.JS — Webzone Service Hub
// All services with WhatsApp integration
// ============================================================

const WA_NUMBER = '919048532576'; // Replace with real number

const services = [
  {
    id: 'S01', cat: 'gov', featured: true, icon: '🛂',
    title: { en: 'Passport Services', ml: 'പാസ്പോർട്ട് സേവനങ്ങൾ', hi: 'पासपोर्ट सेवाएं' },
    desc: { en: 'New passport applications and renewals.', ml: 'പുതിയ പാസ്പോർട്ട്, പുതുക്കൽ.', hi: 'नया पासपोर्ट और नवीनीकरण।' },
    docs: { en: 'New: SSLC Book, Aadhaar | Renewal: Old Passport, Aadhaar', ml: 'പുതിയത്: SSLC, ആധാർ | പുതുക്കാൻ: പഴയ പാസ്പോർട്ട്, ആധാർ', hi: 'नया: एसएसएलसी, आधार | नवीनीकरण: पुराना पासपोर्ट, आधार' }
  },
  {
    id: 'S02', cat: 'gov', featured: true, icon: '🪪',
    title: { en: 'PAN Card Services', ml: 'പാൻ കാർഡ് സേവനങ്ങൾ', hi: 'पैन कार्ड सेवाएं' },
    desc: { en: 'New PAN card applications and corrections.', ml: 'പുതിയ పാൻ കാർഡ്, തിരുത്തലുകൾ.', hi: 'नया पैन कार्ड और सुधार।' },
    docs: { en: 'Aadhaar Card, 2 Passport Photos, Age Proof', ml: 'ആധാർ കാർഡ്, 2 പാസ്പോർട്ട് ഫോട്ടോ, വയസ്സ് തെളിയിക്കുന്ന രേഖ', hi: 'आधार कार्ड, 2 पासपोर्ट फोटो, आयु प्रमाण' }
  },
  {
    id: 'S03', cat: 'gov', icon: '📄',
    title: { en: 'Income Certificate', ml: 'വരുമാന സർട്ടിഫിക്കറ്റ്', hi: 'आय प्रमाण पत्र' },
    desc: { en: 'Official income certificates for scholarships and schemes.', ml: 'വരുമാന സർട്ടിഫിക്കറ്റ് അപേക്ഷകൾ.', hi: 'आय प्रमाण पत्र आवेदन।' },
    docs: { en: 'Land Tax Receipt, Ration Card, Aadhaar Card', ml: 'കരമടച്ച രസീത്, റേഷൻ കാർഡ്, ആധാർ കാർഡ്', hi: 'भूमि कर रसीद, राशन कार्ड, आधार कार्ड' }
  },
  {
    id: 'S04', cat: 'gov', icon: '📜',
    title: { en: 'Caste Certificate', ml: 'ജാതി സർട്ടിഫിക്കറ്റ്', hi: 'जाति प्रमाण पत्र' },
    desc: { en: 'Official caste and community certificates.', ml: 'ജാതി / കമ്മ്യൂണിറ്റി സർട്ടിഫിക്കറ്റ്.', hi: 'जाति और समुदाय प्रमाण पत्र।' },
    docs: { en: 'School Certificate, Ration Card, Parent’s School Certificate', ml: 'സ്കൂൾ സർട്ടിഫിക്കറ്റ്, റേഷൻ കാർഡ്, രക്ഷിതാവിന്റെ സ്കൂൾ സർട്ടിഫിക്കറ്റ്', hi: 'स्कूल प्रमाण पत्र, राशन कार्ड, माता-पिता का स्कूल प्रमाण पत्र' }
  },
  {
    id: 'S05', cat: 'gov', icon: '🗳️',
    title: { en: 'Voter ID Services', ml: 'വോട്ടർ ഐഡി', hi: 'वोटर आईडी' },
    desc: { en: 'New enrollment, address changes, and corrections.', ml: 'പുതിയ എൻറോൾമെന്റ്, തിരുത്തലുകൾ.', hi: 'नया नामांकन और सुधार।' },
    docs: { en: 'Age Proof, Aadhaar Card, Photo, Parent’s SIR', ml: 'വയസ്സ് തെളിയിക്കുന്ന രേഖ, ആധാർ കാർഡ്, ഫോട്ടോ, രക്ഷിതാവിന്റെ SIR', hi: 'आयु प्रमाण, आधार कार्ड, फोटो, माता-पिता का SIR' }
  },
  {
    id: 'S06', cat: 'gov', icon: '🎫',
    title: { en: 'Ration Card Services', ml: 'റേഷൻ കാർഡ്', hi: 'राशन कार्ड' },
    desc: { en: 'New card, member addition, splitting, and address change.', ml: 'പുതിയ റേഷൻ കാർഡ്, പേര് ചേർക്കൽ, തിരുത്തൽ.', hi: 'नया कार्ड, सदस्य जोड़ना, सुधार।' },
    docs: { en: 'Income Certificate, Building Certificate, Card Owner Photo, Aadhaar', ml: 'വരുമാന സർട്ടിഫിക്കറ്റ്, ബിൽഡിംഗ് സർട്ടിഫിക്കറ്റ്, ഫോട്ടോ, ആധാർ കാർഡ്', hi: 'आय प्रमाण, भवन प्रमाण, फोटो, आधार कार्ड' }
  },
  {
    id: 'S07', cat: 'gov', icon: '👮',
    title: { en: 'PCC (Police Clearance)', ml: 'പോലീസ് ക്ലിയറൻസ് (PCC)', hi: 'पुलिस क्लीयरेंस (PCC)' },
    desc: { en: 'Police clearance certificate for job and visa purposes.', ml: 'PCC അപേക്ഷകൾ.', hi: 'PCC आवेदन।' },
    docs: { en: 'Passport, Photo', ml: 'പാസ്പോർട്ട്, ഫോട്ടോ', hi: 'पासपोर्ट, फोटो' }
  },
  {
    id: 'S08', cat: 'gov', icon: '🌱',
    title: { en: 'Land Tax Payment', ml: 'ഭൂനികുതി', hi: 'भूमि कर' },
    desc: { en: 'Pay your land tax securely online.', ml: 'ഭൂനികുതി ഓൺലൈനായി അടക്കുക.', hi: 'भूमि कर का ऑनलाइन भुगतान करें।' },
    docs: { en: 'Old Land Tax Receipt', ml: 'പഴയ ഭൂനികുതി രസീത്', hi: 'पुरानी भूमि कर रसीद' }
  },
  {
    id: 'S09', cat: 'gov', icon: '💼',
    title: { en: 'Employment Registration', ml: 'എംപ്ലോയ്മെന്റ് രജിസ്ട്രേഷൻ', hi: 'रोजगार पंजीकरण' },
    desc: { en: 'New employment registration and renewal.', ml: 'പുതിയ രജിസ്ട്രേഷൻ, പുതുക്കൽ.', hi: 'नया पंजीकरण और नवीनीकरण।' },
    docs: { en: 'SSLC Book, Educational Certificates, ID Proof, Photo', ml: 'SSLC ബുക്ക്, വിദ്യാഭ്യാസ രേഖകൾ, തിരിച്ചറിയൽ രേഖ, ഫോട്ടോ', hi: 'एसएसएलसी बुक, शैक्षिक प्रमाण पत्र, आईडी, फोटो' }
  },
  {
    id: 'S10', cat: 'gov', icon: '📑',
    title: { en: 'Encumbrance Certificate', ml: 'ആധാര സർട്ടിഫിക്കറ്റ് (EC)', hi: 'भार प्रमाण पत्र (EC)' },
    desc: { en: 'Apply for Encumbrance Certificate for land transactions.', ml: 'EC സർട്ടിഫിക്കറ്റ് അപേക്ഷകൾ.', hi: 'ईसी प्रमाणपत्र आवेदन।' },
    docs: { en: 'Aadhaar, Land Tax Receipt', ml: 'ആധാർ, കരമടച്ച രസീത്', hi: 'आधार, भूमि कर रसीद' }
  },
  {
    id: 'S11', cat: 'gov', icon: '📌',
    title: { en: 'Nativity Certificate', ml: 'നേറ്റിവിറ്റി സർട്ടിഫിക്കറ്റ്', hi: 'मूल निवास प्रमाण पत्र' },
    desc: { en: 'Nativity and Residence certificates.', ml: 'നേറ്റിവിറ്റി അപേക്ഷകൾ.', hi: 'मूल निवास आवेदन।' },
    docs: { en: 'Aadhaar Card, Ration Card, Birth Certificate', ml: 'ആധാർ കാർഡ്, റേഷൻ കാർഡ്, ജനന സർട്ടിഫിക്കറ്റ്', hi: 'आधार कार्ड, राशन कार्ड, जन्म प्रमाण पत्र' }
  },
  {
    id: 'S12', cat: 'other', icon: '💳',
    title: { en: 'PVC Card Services', ml: 'PVC കാർഡ് സേവനങ്ങൾ', hi: 'पीवीसी कार्ड सेवाएं' },
    desc: { en: 'Convert all ID cards and documents to PVC format.', ml: 'എല്ലാ ഐഡി കാർഡുകളും PVC ഫോർമാറ്റിലേക്ക് മാറ്റുക.', hi: 'सभी आईडी कार्ड को पीवीसी में बदलें।' },
    docs: { en: 'Original document or file', ml: 'ഒറിജിനൽ ഡോക്യുമെന്റ് അല്ലെങ്കിൽ ഫയൽ', hi: 'मूल दस्तावेज या फाइल' }
  },
  {
    id: 'S13', cat: 'gov', featured: true, icon: '🏢',
    title: { en: 'PSC & SSC Services', ml: 'PSC & SSC സേവനങ്ങൾ', hi: 'पीएससी और एसएससी सेवाएं' },
    desc: { en: 'Profile creation and exam applications.', ml: 'പ്രൊഫൈൽ രജിസ്ട്രേഷൻ, പരീക്ഷ അപേക്ഷകൾ.', hi: 'प्रोफाइल पंजीकरण, परीक्षा आवेदन।' },
    docs: { en: 'Educational Certificates, Aadhaar Card, Photo, Signature', ml: 'വിദ്യാഭ്യാസ രേഖകൾ, ആധാർ കാർഡ്, ഫോട്ടോ, ഒപ്പ്', hi: 'शैक्षिक प्रमाण पत्र, आधार कार्ड, फोटो, हस्ताक्षर' }
  },
  {
    id: 'S14', cat: 'gov', featured: true, icon: '🏛️',
    title: { en: 'KSMART Services', ml: 'KSMART സേവനങ്ങൾ', hi: 'KSMART सेवाएं' },
    desc: { en: 'All Panchayath Services Available.', ml: 'എല്ലാ പഞ്ചായത്ത് സേവനങ്ങളും ലഭ്യമാണ്.', hi: 'सभी पंचायत सेवाएं उपलब्ध हैं।' },
    docs: { en: 'Depends on the required service', ml: 'സേവനത്തെ അടിസ്ഥാനമാക്കി മാറും', hi: 'सेवा के आधार पर बदलता है' }
  },
  {
    id: 'S15', cat: 'other', icon: '🎓',
    title: { en: 'University Services', ml: 'യൂണിവേഴ്സിറ്റി സേവനങ്ങൾ', hi: 'विश्वविद्यालय सेवाएं' },
    desc: { en: 'Admission, Fee Payment, Exam Registration.', ml: 'അഡ്മിഷൻ, ഫീസ് അടയ്ക്കൽ, പരീക്ഷ രജിസ്ട്രേഷൻ.', hi: 'प्रवेश, शुल्क भुगतान, परीक्षा पंजीकरण।' },
    docs: { en: 'Original Certificates, Details', ml: 'ഒറിജിനൽ സർട്ടിഫിക്കറ്റുകൾ, മറ്റ് വിവരങ്ങൾ', hi: 'मूल प्रमाण पत्र, अन्य विवरण' }
  },
  {
    id: 'S16', cat: 'other', icon: '🚌',
    title: { en: 'Bus Ticket Booking', ml: 'ബസ് ടിക്കറ്റ് ബുക്കിംഗ്', hi: 'बस टिकट बुकिंग' },
    desc: { en: 'Online Bus Ticket Services Available.', ml: 'ഓൺലൈൻ ബസ് ടിക്കറ്റ് ബുക്കിംഗ് ലഭ്യമാണ്.', hi: 'ऑनलाइन बस टिकट बुकिंग उपलब्ध है।' },
    docs: { en: 'Journey Details, ID Proof', ml: 'യാത്ര വിവരങ്ങൾ, തിരിച്ചറിയൽ രേഖ', hi: 'यात्रा विवरण, आईडी प्रमाण' }
  },
  {
    id: 'S17', cat: 'other', icon: '🖨️',
    title: { en: 'General Services', ml: 'ജനറൽ സേവനങ്ങൾ', hi: 'सामान्य सेवाएं' },
    desc: { en: 'Printing, Photostat, Scanning, Binding, Lamination.', ml: 'പ്രിന്റിംഗ്, ഫോട്ടോസ്റ്റാറ്റ്, സ്കാനിംഗ്, ബൈൻഡിംഗ്, ലാമിനേഷൻ.', hi: 'प्रिंटिंग, फोटोस्टेट, स्कैनिंग, बाइंडिंग, लेमिनेशन।' },
    docs: { en: 'Original Documents or Files', ml: 'ഒറിജിനൽ ഡോക്യുമെന്റുകൾ അല്ലെങ്കിൽ ഫയലുകൾ', hi: 'मूल दस्तावेज या फाइलें' }
  }
];

// FAQ Data
const faqs = [
  {
    q: { en: 'How do I apply for a service?', ml: 'ഒരു സേവനം എങ്ങനെ അപേക്ഷിക്കാം?', hi: 'सेवा के लिए आवेदन कैसे करें?' },
    a: { en: 'It\'s really simple. Tap on any service card and WhatsApp will open with your request already typed out. Just hit send. That\'s it — we take it from there and keep you updated.', ml: 'ഏതെങ്കിലും സർവീസ് കാർഡിലെ "WhatsApp വഴി അപേക്ഷിക്കുക" ബട്ടൺ ക്ലിക്ക് ചെയ്യൂ. WhatsApp ഓട്ടോ-ഫിൽ ആകും.', hi: '"WhatsApp से आवेदन करें" बटन पर क्लिक करें। WhatsApp खुलेगा और आपका संदेश पहले से भरा होगा।' }
  },
  {
    q: { en: 'Do I need to register or create an account?', ml: 'അക്കൗണ്ട് ഉണ്ടാക്കണോ?', hi: 'क्या मुझे खाता बनाना होगा?' },
    a: { en: 'No, nothing like that. No account, no login, no password. You just WhatsApp us and we get to work. We wanted it to feel like asking a friend for help — not filling out a government form.', ml: 'ഇല്ല! ലോഗിൻ ഇല്ല, രജിസ്ട്രേഷൻ ഇല്ല. ക്ലിക്ക് → WhatsApp → Done!', hi: 'नहीं! कोई लॉगिन नहीं, कोई रजिस्ट्रेशन नहीं। बस क्लिक करें और WhatsApp करें।' }
  },
  {
    q: { en: 'How long does it actually take?', ml: 'ഒരു സേവനം പൂർത്തിയാകാൻ എത്ര സമയം?', hi: 'सेवा पूरी होने में कितना समय लगता है?' },
    a: { en: 'Depends on the service. Bill payments and mobile recharges — done in minutes. Government certificates like income or community take around 3–7 working days because that\'s how long the department takes. We\'ll always tell you upfront and update you on WhatsApp as it moves.', ml: 'യൂട്ടിലിറ്റി സേവനങ്ങൾ അന്നത്തെ ദിവസം. ഗവൺമെന്റ് സർട്ടിഫിക്കറ്റ് 3–7 ദിവസം.', hi: 'यूटिलिटी सेवाएं उसी दिन। सरकारी प्रमाण पत्र 3–7 कार्य दिवसों में।' }
  },
  {
    q: { en: 'Is there a service fee?', ml: 'സേവന ഫീസ് ഉണ്ടോ?', hi: 'क्या कोई सेवा शुल्क है?' },
    a: { en: 'Some services have government fees that go to the department — we don\'t pocket those. For services that take our time and effort, we charge a small fee, and we always tell you the amount before we start. No surprise bills here.', ml: 'ചിലതിന് ഗവൺമെന്റ് ഫീസ് ഉണ്ട്. സങ്കീർണ സേവനങ്ങൾക്ക് ചെറിയ ഫെസിലിറ്റേഷൻ ഫീ.', hi: 'कुछ सेवाओं में सरकारी शुल्क है। जटिल सेवाओं के लिए छोटा सुविधा शुल्क।' }
  },
  {
    q: { en: 'Can I communicate in Malayalam?', ml: 'മലയാളത്തിൽ അപേഷിക്കാമോ?', hi: 'क्या मैं हिंदी में आवेदन कर सकता हूं?' },
    a: { en: 'Of course — malayalam is our first language too! The site works in Malayalam, Hindi, Urdu, and Tamil. And when you WhatsApp us, just type in whatever language feels natural. We understand all of them.', ml: 'ഹ്യ! മലയാളം, ഹിന്ദി, ഇംഗ്ലീഷ് — മൂന്ന് ഭാഷകൾ ലഭ്യമാണ്.', hi: 'हां! हमारा प्लेटफॉर्म पूरी तरह बहुभाषी है। ऊपर दाईं ओर भाषा स्विच करें।' }
  }
];
