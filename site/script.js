/* ═══════════════════════════════════════════════════════════════
   مكتبة قراءة · Qirāʿa Library — script.js
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ───────── 0 · اختصارات ───────── */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const L  = () => state.lang === 'ar';
const pick = (o, f = '') => o[L() ? 'ar' + f : 'en' + f] ?? o.ar + f;
const LS = {
  get(k, d){ try { return JSON.parse(localStorage.getItem('qira_' + k)) ?? d; } catch { return d; } },
  set(k, v){ try { localStorage.setItem('qira_' + k, JSON.stringify(v)); } catch {} },
  del(k){ localStorage.removeItem('qira_' + k); }
};
const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───────── 1 · البيانات ───────── */
const CATS = [
  { id:'novel',   ar:'روايات',        en:'Novels',        ico:'bi-book',        tc:'#0E5A4A', n:14820, descAr:'الرواية العربية والعالمية، من الكلاسيك إلى الحاصل على جوائز هذا العام.', descEn:'Arab & world fiction, from classics to this year’s prize winners.' },
  { id:'story',   ar:'قصص قصيرة',     en:'Short Stories', ico:'bi-file-earmark-text', tc:'#B93B33', n:8340, descAr:'نصوص تُقرأ في جلسة واحدة، مختارة بعناية من أرشيف القصة القصيرة.', descEn:'One-sitting fictions, curated from the short-story archive.' },
  { id:'mag',     ar:'مجلات',         en:'Magazines',     ico:'bi-newspaper',   tc:'#B0821F', n:912,   descAr:'أعداد شهرية وفصلية أدبية وثقافية، مع أرشيف كامل قابل للبحث.', descEn:'Monthly & quarterly literary issues with a searchable archive.' },
  { id:'sci',     ar:'دوريات علمية',  en:'Journals',      ico:'bi-clipboard-data', tc:'#3A4E8C', n:2140, descAr:'بحوث محكّمة في الفيزياء والطب والذكاء الاصطناعي والعلوم الإنسانية.', descEn:'Peer-reviewed research across STEM and humanities.' },
  { id:'audio',   ar:'كتب مسموعة',    en:'Audiobooks',    ico:'bi-broadcast',   tc:'#5B3A6B', n:3610,  descAr:'أداء صوتي بمعايير الاستوديو، مع مزامنة نصية لكل فصل.', descEn:'Studio-grade narration with per-chapter text sync.' },
  { id:'kids',    ar:'ركن الناشئة',   en:'Young Readers', ico:'bi-balloon',     tc:'#1E8A6E', n:5290,  descAr:'حكايات مصوّرة، كتب حرفية، وألعاب لغوية آمنة للأطفال.', descEn:'Picture tales, early readers and safe language games.' },
  { id:'rare',    ar:'نوادر ومخطوطات',en:'Rare Books',    ico:'bi-award',       tc:'#8A5A1E', n:174,   descAr:'طبعات أولى ومخطوطات ممسوحة بدقة 1200 نقطة/بوصة.', descEn:'First editions and 1200-dpi scanned manuscripts.' },
  { id:'think',   ar:'فكر وفلسفة',    en:'Philosophy',    ico:'bi-lightbulb',   tc:'#26403B', n:4120,  descAr:'ميتافيزيقا، أخلاق، نقد ثقافي، وفكر عربي معاصر.', descEn:'Metaphysics, ethics, cultural critique, modern Arab thought.' }
];
const catName = id => { const c = CATS.find(x => x.id === id); return c ? pick(c) : id; };
const catColor = id => { const c = CATS.find(x => x.id === id); return c ? c.tc : '#0E5A4A'; };

/* id, ar, en, authorAr, authorEn, cat, year, pages, rating, votes, lang, badges, c1,c2, pat, mark, callno, absAr, absEn, excerptAr, excerptEn */
const B = (o) => o;
const BOOKS = [
B({id:1,ar:'ليلة الأوهام',en:'Night of Illusions',authorAr:'سليمان الرشيد',authorEn:'Sulaiman Al-Rashid',cat:'novel',year:2024,pages:412,rating:4.8,votes:2140,lang:'ar',badges:['new','best'],c1:'#123C5A',c2:'#04101C',pat:'moon',mark:'☾',callno:'NOC·2024',absAr:'في ليلةٍ بلا قمر، يستيقظ حرّاس مدينةٍ ساحلية ليجدوا أن كل ساكنٍ فيها يحلم الحلم ذاته. رواية عن الذاكرة الجماعية حين تتحوّل إلى تهمة.',absEn:'On a moonless night the guards of a coastal town wake to find every resident dreaming the same dream — a novel about collective memory turning into an accusation.',exAr:'استيقظت المدينة على انقطاعٍ في الكهرباء لم يتجاوز أربع دقائق، لكنها كانت كافية ليكتشف الجميع أنّ أحداً لا يتذكّر ما فعله في تلك الدقائق. بدأ الأمر بهمسٍ في المقاهي، ثم بشكوى في المخفر، ثم بقائمة أسماء تُ تداول تحت الطاولة: اثنا عشر اسماً، كلها لأشخاصٍ ناموا وحدهم.',exEn:'The city woke from a four-minute blackout — long enough for everyone to discover that no one remembered what they had done inside it. It began as a whisper in the cafés, then a complaint at the station, then a list of twelve names passed under the table: all of them people who had slept alone.'}),
B({id:2,ar:'ظلّ الذاكرة',en:'The Shadow of Memory',authorAr:'ناجية فهمي',authorEn:'Najiya Fahmy',cat:'novel',year:2021,pages:356,rating:4.6,votes:1780,lang:'ar',badges:['best'],c1:'#5B3A6B',c2:'#1E0F26',pat:'rays',mark:'✦',callno:'SHM·2021',absAr:'مترجمةٌ شابة تفقد القدرة على نسيان أي شيء، فتكتشف أن الذاكرة المطلقة ليست نعمة بل محكمةٌ لا تنام.',absEn:'A young translator loses the ability to forget anything, and discovers that total memory is not a gift but a court that never sleeps.'}),
B({id:3,ar:'رسائل إلى بحّار',en:'Letters to a Sailor',authorAr:'ياسين الحلو',authorEn:'Yasin Al-Helu',cat:'story',year:2023,pages:188,rating:4.7,votes:940,lang:'ar',badges:['new'],c1:'#0E5A4A',c2:'#04211B',pat:'lines',mark:'✉',callno:'LTS·2023',absAr:'أربع عشرة قصةً تُكتب على شكل رسائل لم يصل أغلبها. بحرٌ، ميناء، وامرأة تنتظر على الرصيف نفسه منذ عشرين عاماً.',absEn:'Fourteen stories written as letters, most never delivered. A sea, a port, and a woman waiting on the same quay for twenty years.'}),
B({id:4,ar:'مدينة الملح',en:'City of Salt',authorAr:'ريم الخوري',authorEn:'Reem Khoury',cat:'novel',year:2022,pages:498,rating:4.5,votes:1320,lang:'ar',badges:[],c1:'#B0561F',c2:'#3A1608',pat:'chev',mark:'◈',callno:'CSL·2022',absAr:'في مدينةٍ تُستخرج منها الثروة ملحاً، يصبح البكاء جريمةً اقتصادية. سردٌ عن الجسد كأخير مستعمرةٍ قابلة للمصادرة.',absEn:'In a city whose wealth is extracted as salt, crying becomes an economic crime — a narrative about the body as the last colonisable territory.'}),
B({id:5,ar:'تأمّلات في الضوء',en:'Contemplations on Light',authorAr:'أ. د. هاني سلامة',authorEn:'Prof. Hani Salama',cat:'think',year:2019,pages:276,rating:4.4,votes:610,lang:'ar',badges:['rare'],c1:'#D9AE45',c2:'#6B4A05',pat:'frame',mark:'❂',callno:'CTL·2019',absAr:'رحلة فلسفية من بصريات ابن الهيثم إلى فيزياء الكم، تسأل: هل نرى الضوء أم نرى غياب الظل؟',absEn:'A philosophical journey from Ibn al-Haytham’s optics to quantum physics, asking: do we see light, or only the absence of shadow?'}),
B({id:6,ar:'الخوارزمية الصامتة',en:'The Silent Algorithm',authorAr:'ديانا قاسم',authorEn:'Diana Qasem',cat:'tech',year:2025,pages:334,rating:4.9,votes:2860,lang:'both',badges:['new','best'],c1:'#0B3E6B',c2:'#031525',pat:'grid',mark:'⟡',callno:'SAL·2025',absAr:'كيف تفكّر الآلة حين لا يكلمها أحد؟ شرحٌ مبسّط لتعلّم الآلة، مكتوبٌ لمن يقرأ ولا يبرمج.',absEn:'How does a machine think when no one speaks to it? Machine learning explained for readers, not programmers.'}),
B({id:7,ar:'أطلس البحار الداخلية',en:'Atlas of Inner Seas',authorAr:'مروان العلي',authorEn:'Marwan Al-Ali',cat:'hist',year:2020,pages:620,rating:4.6,votes:780,lang:'ar',badges:[],c1:'#1E6E6B',c2:'#062A28',pat:'arcs',mark:'⚓',callno:'AIS·2020',absAr:'تاريخ تجاري مكتوب بالخرائط: كيف رسم التجار العرب العالم قبل كولومبوس بثلاثة قرون.',absEn:'A commercial history told in maps: how Arab traders charted the world three centuries before Columbus.'}),
B({id:8,ar:'حكايا الجدة نجلاء',en:'Grandma Najla’s Tales',authorAr:'نجلاء البرغوثي',authorEn:'Najla Al-Barghouti',cat:'kids',year:2023,pages:64,rating:4.8,votes:1510,lang:'ar',badges:['new','free'],c1:'#E2584A',c2:'#7A1D14',pat:'dots',mark:'☆',callno:'GNT·2023',absAr:'اثنتا عشرة حكايةً ما قبل النوم، مصوّرة بحروفٍ كبيرة وتشكيلٍ كامل، مع صفحة «ماذا لو؟» في نهاية كل حكاية.',absEn:'Twelve bedtime tales in large, fully vowelled type, each ending with a “What if?” page.'}),
B({id:9,ar:'صمت المحرّك',en:'Silence of the Engine',authorAr:'فارس حدّاد',authorEn:'Fares Haddad',cat:'novel',year:2018,pages:298,rating:4.2,votes:640,lang:'ar',badges:[],c1:'#3A4E8C',c2:'#101A33',pat:'lines',mark:'⚙',callno:'SEN·2018',absAr:'سائق شاحنة يعبر بلداً منهكاً في تسعين يوماً. رواية الطريق العربية، حيث المنظر أهم من الوجهة.',absEn:'A truck driver crosses an exhausted country in ninety days — the Arab road novel, where the landscape matters more than the destination.'}),
B({id:10,ar:'اقتصاديات المعرفة',en:'Economics of Knowledge',authorAr:'د. عمر نشوان',authorEn:'Dr. Omar Nashwan',cat:'biz',year:2024,pages:410,rating:4.3,votes:420,lang:'both',badges:['new'],c1:'#2E6E4E',c2:'#0B2A1C',pat:'grid',mark:'▤',callno:'EKN·2024',absAr:'لماذا لا يُسعَّر الفكر؟ تحليل اقتصادي لسلعٍ غير قابلة للنضوب، مع دراسات حالة من السوق العربية.',absEn:'Why can’t ideas be priced? An economic analysis of non-depletable goods, with Arab-market case studies.'}),
B({id:11,ar:'ديوان الندى',en:'The Dew Verses',authorAr:'سلمى الأنصاري',authorEn:'Salma Al-Ansari',cat:'poetry',year:2022,pages:142,rating:4.7,votes:880,lang:'ar',badges:['rare'],c1:'#8A1E4A',c2:'#2C0716',pat:'frame',mark:'❦',callno:'DEV·2022',absAr:'ديوانٌ في ثلاثة أبواب: الماء، الغياب، والعودة. قصائد عمودية وحرة جنباً إلى جنب، بهوامش من الشاعر نفسه.',absEn:'A diwan in three gates — water, absence, return. Odes and free verse side by side, annotated by the poet.'}),
B({id:12,ar:'مختبرات الغد',en:'Laboratories of Tomorrow',authorAr:'هيئة التحرير',authorEn:'Editorial Board',cat:'sci',year:2026,pages:96,rating:4.5,votes:310,lang:'both',badges:['new','free'],c1:'#0B6B7A',c2:'#032227',pat:'grid',mark:'⬡',callno:'LOT·2026',absAr:'دورية فصلية محكّمة: تقنية حيوية، مواد ذاتية الإصلاح، وأخلاقيات التعديل الجيني.',absEn:'A quarterly peer-reviewed journal: biotech, self-healing materials, and the ethics of gene editing.'}),
B({id:13,ar:'الرحلة ٤٠٤',en:'Flight 404',authorAr:'كريم البساط',authorEn:'Karim Bassat',cat:'sf',year:2025,pages:372,rating:4.6,votes:1940,lang:'ar',badges:['new','best'],c1:'#1F2A44',c2:'#070B14',pat:'rays',mark:'✈',callno:'FLT404',absAr:'طائرةٌ تختفي من الرادار ثم تظهر بعد ثلاثين سنة بنفس الركاب، ولم يشيخ أحد. ماذا حدث في الفارق الزمني؟',absEn:'A plane vanishes from radar and reappears thirty years later with the same passengers, none of them a day older. What happened in the gap?'}),
B({id:14,ar:'سيّدة الياسمين',en:'The Jasmine Lady',authorAr:'هدى درويش',authorEn:'Huda Darwish',cat:'rom',year:2021,pages:264,rating:4.1,votes:1120,lang:'ar',badges:[],c1:'#C2437A',c2:'#4A0F2A',pat:'arcs',mark:'❀',callno:'JLM·2021',absAr:'حبٌّ يحدث في بيتٍ قديم يُرمَّم حجراً حجراً. الرواية التي قرأها ٤٠ ألف مرة في قسم النساء.',absEn:'A love that happens while an old house is restored stone by stone — read 40,000 times in our lending records.'}),
B({id:15,ar:'تراث الحكماء',en:'Heritage of the Sages',authorAr:'تحقيق: د. سامي طبّارة',authorEn:'ed. Dr. Sami Tabbara',cat:'rare',year:1897,pages:512,rating:4.9,votes:260,lang:'ar',badges:['rare'],c1:'#7A5A1E',c2:'#2A1D05',pat:'frame',mark:'۞',callno:'HGS·1897',absAr:'طبعة ١٨٩٧ الممسوحة من «فصول الحكم» — نصّ مؤسَّس على أربع مخطوطات، بمقدمة تحقيقٍ من ٦٠ صفحة.',absEn:'The scanned 1897 edition of “Chapters of Rule”, established on four manuscripts, with a 60-page editorial introduction.'}),
B({id:16,ar:'الكوكب الأخير',en:'The Last Planet',authorAr:'لينا مرعي',authorEn:'Lina Mar’i',cat:'sf',year:2023,pages:440,rating:4.4,votes:1030,lang:'ar',badges:['audio'],c1:'#4A2A6B',c2:'#150A22',pat:'moon',mark:'♄',callno:'LPL·2023',absAr:'مستعمرةٌ بشرية على كوكبٍ يلفظ أنفاسه، ومدوّنةٌ صغيرة تُقرّر أن تكتب الحقيقة بدل التقرير الرسمي.',absEn:'A human colony on a dying planet, and a junior archivist who decides to write the truth instead of the official report.'}),
B({id:17,ar:'دليل القارئ المتجوّل',en:'The Wandering Reader',authorAr:'طارق سمعان',authorEn:'Tariq Sam’an',cat:'self',year:2024,pages:222,rating:4.5,votes:1610,lang:'ar',badges:['new','free'],c1:'#B0821F',c2:'#3D2C05',pat:'chev',mark:'➶',callno:'WRG·2024',absAr:'كيف تقرأ ٥٠ كتاباً سنوياً دون أن تحفظ منها شيئاً… ولماذا قد يكون ذلك كافياً. فنّ القراءة الانتقائية.',absEn:'How to read fifty books a year and remember none of them — and why that may be enough. The art of selective reading.'}),
B({id:18,ar:'لغز الشقة ١٣',en:'The Mystery of Flat 13',authorAr:'سليمان الرشيد',authorEn:'Sulaiman Al-Rashid',cat:'mys',year:2020,pages:308,rating:4.3,votes:1420,lang:'ar',badges:['best'],c1:'#2A2A32',c2:'#0A0A0E',pat:'grid',mark:'?',callno:'MF13·20',absAr:'محقّقةٌ صارمة وعمارَةٌ تكذب. جريمةٌ تقع في المصعد ولا يوجد فيها جثة ولا مجرم — فقط جيران.',absEn:'A meticulous investigator and a building that lies. A crime in a lift with no body and no culprit — only neighbours.'}),
B({id:19,ar:'أوراق عثمانية',en:'Ottoman Papers',authorAr:'د. إبراهيم الجزري',authorEn:'Dr. Ibrahim Al-Jazari',cat:'hist',year:2017,pages:588,rating:4.6,votes:470,lang:'ar',badges:['rare'],c1:'#6B4A2A',c2:'#22150A',pat:'lines',mark:'❋',callno:'OTP·2017',absAr:'سيرةٌ اقتصادية لحياةٍ يومية موثّقة بسجلات المحاكم الشرعية: الأسعار، الزيجات، والمنازعات على بئر.',absEn:'An economic biography of everyday life documented in sharia court registers: prices, marriages, disputes over a well.'}),
B({id:20,ar:'حرفة الكتابة',en:'The Craft of Writing',authorAr:'مريم القاسمي',authorEn:'Maryam Al-Qasimi',cat:'acad',year:2022,pages:340,rating:4.7,votes:820,lang:'both',badges:[],c1:'#0E5A4A',c2:'#05302A',pat:'frame',mark:'✍',callno:'CRW·2022',absAr:'دليل ورشة كتابة: من الجملة الأولى إلى المخطوطة، مع ٤٠ تمريناً مصنَّفاً و١٢ نموذجاً محكَّماً.',absEn:'A workshop guide: from the first sentence to the manuscript, with 40 graded exercises and 12 reviewed models.'}),
B({id:21,ar:'سيمفونية النمل',en:'Symphony of Ants',authorAr:'د. يوسف برهان',authorEn:'Dr. Youssef Barhan',cat:'sci',year:2023,pages:268,rating:4.5,votes:590,lang:'ar',badges:['audio'],c1:'#5A4A1E',c2:'#1E1806',pat:'dots',mark:'⬢',callno:'SAN·2023',absAr:'كيف تبني مستعمرةٌ ذاكرةً جماعية بلا دماغٍ مركزي؟ علمٌ سلوكي يُقرأ كرواية إثارة.',absEn:'How a colony builds collective memory without a central brain — behavioural science that reads like a thriller.'}),
B({id:22,ar:'جزيرة الأصوات',en:'Island of Voices',authorAr:'ياسين الحلو',authorEn:'Yasin Al-Helu',cat:'story',year:2024,pages:172,rating:4.8,votes:730,lang:'ar',badges:['new'],c1:'#1E6E8A',c2:'#062430',pat:'arcs',mark:'♪',callno:'IVO·2024',absAr:'تسع قصص عن أشخاصٍ يسمعون ما لا يُقال: نادل، مترجم فوري، أخصائية نطق، وصيّاد حيتان.',absEn:'Nine stories about people who hear the unsaid: a waiter, a simultaneous interpreter, a speech therapist, a whaler.'}),
B({id:23,ar:'مقهى منتصف الليل',en:'Midnight Café',authorAr:'نور الدين سالم',authorEn:'Nourdin Salem',cat:'novel',year:2019,pages:284,rating:4.4,votes:1260,lang:'ar',badges:['best'],c1:'#3A2A1E',c2:'#120C06',pat:'lines',mark:'☕',callno:'MCF·2019',absAr:'مقهى لا ينام، وزبائن لا يلتقون مرتين. كل فصلٍ يبدأ بفنجانٍ وينتهي بحسابٍ لم يُدفع.',absEn:'A café that never sleeps and customers who never meet twice. Each chapter begins with a cup and ends with an unpaid bill.'}),
B({id:24,ar:'فنون التصميم الرقمي',en:'Digital Design Arts',authorAr:'هالة منصور',authorEn:'Hala Mansour',cat:'tech',year:2025,pages:396,rating:4.6,votes:510,lang:'both',badges:['new'],c1:'#8A2E5B',c2:'#2A0A1A',pat:'grid',mark:'◑',callno:'DDA·2025',absAr:'نظام تصميم كامل بالعربية: شبكية، تسلسل بصري، خطوط عربية، وإتاحة WCAG 2.2 عملياً.',absEn:'A full design system in Arabic: grids, visual hierarchy, Arabic type, and practical WCAG 2.2 accessibility.'}),
B({id:25,ar:'يوميات طيّار ورقي',en:'Diary of a Paper Pilot',authorAr:'نجلاء البرغوثي',authorEn:'Najla Al-Barghouti',cat:'kids',year:2022,pages:48,rating:4.9,votes:1980,lang:'ar',badges:['free'],c1:'#E2A32E',c2:'#7A5205',pat:'rays',mark:'✈',callno:'PPP·2022',absAr:'ولدٌ يطوي طائراتٍ من ورقة امتحانه، وكل طائرةٍ تحكي له حكايةً عن بلد. للسن ٦–١٠.',absEn:'A boy folds planes from his exam paper, and each plane tells him a story about a country. Ages 6–10.'}),
B({id:26,ar:'الحالمون لا يشيخون',en:'Dreamers Don’t Age',authorAr:'سلمى الأنصاري',authorEn:'Salma Al-Ansari',cat:'poetry',year:2025,pages:118,rating:4.6,votes:420,lang:'ar',badges:['new'],c1:'#4A2A8A',c2:'#150A2C',pat:'moon',mark:'✽',callno:'DDA·2025',absAr:'قصائدُ عن الشيخوخة كما يراها من لم يشخ بعد. لغةٌ يومية، إيقاعٌ داخلي، وخاتمةٌ تُدهش.',absEn:'Poems on old age seen by those not yet old. Everyday diction, internal rhythm, astonishing closings.'}),
B({id:27,ar:'صُنّاع المعنى',en:'Meaning Makers',authorAr:'د. عمر نشوان',authorEn:'Dr. Omar Nashwan',cat:'biz',year:2023,pages:312,rating:4.2,votes:360,lang:'both',badges:[],c1:'#1E5A7A',c2:'#062030',pat:'chev',mark:'❖',callno:'MKM·2023',absAr:'١٨ شركة عربية بنَت علامتها من لا شيء. دراسة حالات بلا شعارات تحفيزية، بالأرقام والقرارات.',absEn:'Eighteen Arab companies that built brands from nothing — case studies in numbers and decisions, not slogans.'}),
B({id:28,ar:'الظلّ الطويل',en:'The Long Shadow',authorAr:'ناجية فهمي',authorEn:'Najiya Fahmy',cat:'mys',year:2024,pages:352,rating:4.5,votes:1180,lang:'ar',badges:['new','audio'],c1:'#2A1E3A',c2:'#0C0812',pat:'rays',mark:'☠',callno:'LSH·2024',absAr:'جريمةٌ في أرشيفٍ صحفي: محرّرةٌ تكتشف أن خبراً نشرته قبل عشرين سنة كان صحيحاً بعد فوات الأوان.',absEn:'A crime in a newspaper archive: an editor discovers a story she ran twenty years ago turned out to be true — too late.'}),
B({id:29,ar:'مملكة القراءة',en:'Kingdom of Reading',authorAr:'فريق بذرة',authorEn:'Budra Team',cat:'kids',year:2026,pages:72,rating:4.7,votes:640,lang:'ar',badges:['new','free'],c1:'#1E8A6E',c2:'#07392C',pat:'dots',mark:'♛',callno:'KOR·2026',absAr:'مغامرةٌ تعليمية في ٢٤ فصلاً، كل فصلٍ يعلّق مهارةً لغوية على بابٍ يفتحه الطفل بنفسه.',absEn:'A 24-chapter learning adventure; each chapter hangs a language skill on a door the child opens himself.'}),
B({id:30,ar:'هندسة الأحلام',en:'Geometry of Dreams',authorAr:'أ. د. هاني سلامة',authorEn:'Prof. Hani Salama',cat:'think',year:2021,pages:298,rating:4.4,votes:390,lang:'both',badges:[],c1:'#0E5A4A',c2:'#0A2E26',pat:'arcs',mark:'△',callno:'GOD·2021',absAr:'هل للأحلام شكل؟ محاولةٌ في فلسفة الرياضيات واللاوعي، من إقليدس إلى Freud ومنه إلى الشبكات العصبية.',absEn:'Do dreams have shape? An essay on the philosophy of mathematics and the unconscious, from Euclid to Freud to neural nets.'}),
B({id:31,ar:'حارس المدينة',en:'City Guardian',authorAr:'استوديو ظل',authorEn:'Zill Studio',cat:'comics',year:2025,pages:148,rating:4.6,votes:2210,lang:'ar',badges:['new','best'],c1:'#B93B33',c2:'#3A0B08',pat:'chev',mark:'⛨',callno:'CTG·2025',absAr:'أول مانجا عربية رقمية: حارسٌ ليلي في مدينةٍ لا تنام، يرسم بالكلمات والخطوط معاً.',absEn:'The first digital Arab manga: a night watchman in a sleepless city, drawn in words and lines at once.'}),
B({id:32,ar:'رسائل النفي',en:'Letters of Exile',authorAr:'فارس حدّاد',authorEn:'Fares Haddad',cat:'story',year:2016,pages:210,rating:4.7,votes:700,lang:'ar',badges:['rare'],c1:'#5A4A3A',c2:'#1C1610',pat:'lines',mark:'✒',callno:'LEX·2016',absAr:'أرشيفٌ من ٣١ رسالةً بين منفىً ومنفى، نُشرت أولاً في ملحقٍ ثقافي توقّف عن الصدور.',absEn:'An archive of 31 letters between one exile and another, first published in a supplement that ceased printing.'})
];
/* تصنيفات إضافية للفلترة */
const EXTRA_CATS = [
  {id:'rom',ar:'رومانسي',en:'Romance'},{id:'mys',ar:'غموض وإثارة',en:'Mystery'},
  {id:'sf',ar:'خيال علمي',en:'Sci-Fi'},{id:'poetry',ar:'شعر',en:'Poetry'},
  {id:'hist',ar:'تاريخ',en:'History'},{id:'biz',ar:'أعمال',en:'Business'},
  {id:'tech',ar:'تقنية',en:'Tech'},{id:'self',ar:'تطوير ذات',en:'Self-Growth'},
  {id:'acad',ar:'أكاديمي',en:'Academic'},{id:'comics',ar:'كوميكس ومانجا',en:'Comics'}
];
const catLabel = id => {
  const m = CATS.find(c => c.id === id) || EXTRA_CATS.find(c => c.id === id);
  return m ? pick(m) : id;
};

const MAGS = [
 {ar:'مجلة قراءة',en:'Qirāʿa Review',no:148,date:'2026·10',c1:'#0E5A4A',c2:'#04211B',pat:'frame',mark:'❡',arts:['ملف: الرواية بعد الجائحة','قراءة في ٦ دواوين','حوار مع مترجم','رسالة من المحرّر'],absAr:'عددٌ خاص عن حالة السرد العربي بعد خمس سنوات من التغيّر، مع ملف المترجمين الشباب.',absEn:'A special issue on the state of Arab narrative after five years of change.'},
 {ar:'أفكار',en:'Afkar Monthly',no:441,date:'2026·09',c1:'#5B3A6B',c2:'#1E0F26',pat:'rays',mark:'✧',arts:['فلسفة الوقت','ما بعد العلمانية','قراءات في ابن رشد','نافذة الترجمة'],absAr:'دورية فكرية: الزمن، العقل، والنقد — في ٩٦ صفحة.',absEn:'An intellectual monthly on time, reason and critique — 96 pages.'},
 {ar:'علوم العصر',en:'Century Science',no:88,date:'2026·10',c1:'#0B6B7A',c2:'#032227',pat:'grid',mark:'⬡',arts:['الاندماج النووي','ذاكرة المرجان','رياضيات الجليد','تقارير'],absAr:'علوم بلا تعقيد: أربعة تقارير موسّعة وقسم «اسأل الباحث». ',absEn:'Science without jargon: four long reports and an Ask-a-Researcher desk.'},
 {ar:'تقنية الغد',en:'Tomorrow Tech',no:62,date:'2026·10',c1:'#0B3E6B',c2:'#031525',pat:'dots',mark:'⟡',arts:['شرائح ٢ نانومتر','الذكاء على الجهاز','أمن الفرجات','مختبر'],absAr:'عددٌ عن الحوسبة الطرفية وكيف تُغيّر شكل الهاتف في ٢٠٢٧.',absEn:'On edge computing and how it reshapes the phone by 2027.'},
 {ar:'عالم الكتب',en:'World of Books',no:203,date:'2026·08',c1:'#B0561F',c2:'#3A1608',pat:'lines',mark:'❖',arts:['سوق النشر العربي','أرقام المعرض','مقابلات الناشرين','ميزانية القارئ'],absAr:'تقرير الربع: من يشتري، وماذا يُطبع، وأين تذهب حقوق الترجمة.',absEn:'The quarter’s report: who buys, what gets printed, where translation rights go.'},
 {ar:'المجلة العربية',en:'The Arab Journal',no:512,date:'2026·07',c1:'#7A5A1E',c2:'#2A1D05',pat:'arcs',mark:'۞',arts:['رحلات ابن بطوطة','نثر القرن الرابع','مخطوط الأندلس','فهرس'],absAr:'تراثٌ محقَّق: أربعة دراسات وأرشيف مصوَّر لثمانية مخطوطات.',absEn:'Edited heritage: four studies and a photo archive of eight manuscripts.'},
 {ar:'ناشئة',en:'Young Minds',no:37,date:'2026·09',c1:'#E2A32E',c2:'#7A5205',pat:'chev',mark:'☆',arts:['كوكب الأسئلة','اختراع ورقي','مَن أنا؟','حكاية الرقم صفر'],absAr:'مجلة ٨–١٢ سنة: علوم مبسّطة وألعاب تفكير ناقد.',absEn:'Ages 8–12: simplified science and critical-thinking games.'},
 {ar:'دفتر القارئ',en:'Reader’s Notebook',no:19,date:'2026·10',c1:'#8A1E4A',c2:'#2C0716',pat:'moon',mark:'✎',arts:['قوالب التلخيص','كيف تبني فهرساً','أرشيف الاقتباس','٥٠ بداية رواية'],absAr:'دليل عملي لهواية القراءة: أنظمة تدوين، قوالب، وأرشيف اقتباسات.',absEn:'A practical guide to the hobby: note systems, templates, a quotation archive.'}
];

const STORIES = [
 {ar:'الرجل الذي باع ظله',en:'The Man Who Sold His Shadow',au:'ياسين الحلو',min:9,cat:'story',absAr:'صفقةٌ واحدة في سوقٍ قديم: ظلٌّ مقابل سنةٍ من الحظ.',absEn:'One deal in an old market: a shadow for a year of luck.'},
 {ar:'ثلاث دقائق بعد انطفاء الضوء',en:'Three Minutes After the Lights',au:'ناجية فهمي',min:6,cat:'mys',absAr:'مصعدٌ يتوقف، وستة غرباء يقرّرون من يروي الحقيقة أولاً.',absEn:'A lift stops; six strangers decide who tells the truth first.'},
 {ar:'بريد من مدينةٍ لا توجد',en:'Mail from a Nonexistent City',au:'كريم البساط',min:12,cat:'sf',absAr:'خطابات تصل كل خميس من عنوانٍ يرفض البريد الاعتراف به.',absEn:'Letters arrive every Thursday from an address the post office denies.'},
 {ar:'قمح',en:'Wheat',au:'ريم الخوري',min:5,cat:'story',absAr:'فلاحٌ يزرع في أرضٍ مصادرة، والمحصول وحده يعرف أنه موجود.',absEn:'A farmer sows seized land; only the crop knows he exists.'},
 {ar:'الترجمة الأخيرة',en:'The Last Translation',au:'سليمان الرشيد',min:14,cat:'story',absAr:'مترجمٌ يموت تاركاً جملةً واحدة غير مترجمة في منتصف فقرة.',absEn:'A translator dies leaving one sentence untranslated mid-paragraph.'},
 {ar:'سمكة في صحراء',en:'A Fish in the Desert',au:'نجلاء البرغوثي',min:4,cat:'kids',absAr:'حكايةٌ قصيرة عن سمكةٍ قررت أن تعرف شكل الرمل.',absEn:'A short tale of a fish that wanted to know what sand looks like.'},
 {ar:'مفتاح رقم ٧',en:'Key Number Seven',au:'فارس حدّاد',min:8,cat:'novel',absAr:'مستأجرٌ يجد مفتاحاً لا يفتح باباً، لكنه يفتح صندوقاً في القبو.',absEn:'A tenant finds a key that opens no door — but opens a box in the cellar.'},
 {ar:'حين بكى القمر',en:'When the Moon Cried',au:'سلمى الأنصاري',min:7,cat:'poetry',absAr:'نصٌ شعري مشظّى: ٢١ مقطعاً عن الفراق وضوءٍ لا يكفي.',absEn:'A fractured poem: 21 fragments on parting and insufficient light.'}
];

const AUDIO = [
 {ar:'ليلة الأوهام',en:'Night of Illusions',hostAr:'صوت: مراد الشامي',hostEn:'voiced by Murad Al-Shami',len:'٩ س ٤٢ د',lenE:'9h 42m',c1:'#123C5A',c2:'#04101C',pat:'moon',mark:'☾',
  txtAr:'استيقظت المدينة على انقطاعٍ في الكهرباء لم يتجاوز أربع دقائق، لكنها كانت كافية ليكتشف الجميع أنّ أحداً لا يتذكّر ما فعله في تلك الدقائق.',
  txtEn:'The city woke from a four-minute blackout, long enough for everyone to discover that no one remembered what they had done inside it.'},
 {ar:'رسائل إلى بحّار',en:'Letters to a Sailor',hostAr:'صوت: هبة نصّار',hostEn:'voiced by Hiba Nassar',len:'٤ س ١٠ د',lenE:'4h 10m',c1:'#0E5A4A',c2:'#04211B',pat:'lines',mark:'✉',
  txtAr:'كل رسالةٍ كُتبت بخطٍّ مختلف، وكل خطٍّ كان محاولةً لقول الشيء نفسه: ارجع قبل أن يتغيّر الرصيف.',
  txtEn:'Each letter was written in a different hand, and every hand tried to say the same thing: come back before the quay changes.'},
 {ar:'الخوارزمية الصامتة',en:'The Silent Algorithm',hostAr:'صوت: ديما خليل',hostEn:'voiced by Dima Khalil',len:'٧ س ٠٥ د',lenE:'7h 05m',c1:'#0B3E6B',c2:'#031525',pat:'grid',mark:'⟡',
  txtAr:'تتعلّم الآلة كما يتعلّم طفلٌ في غرفةٍ مغلقة: بالكثير من الأخطاء، وبلا أحد يصحّح لها إلا النتيجة.',
  txtEn:'A machine learns like a child in a closed room: by many errors, with no corrector but the outcome.'},
 {ar:'حكايا الجدة نجلاء',en:'Grandma Najla’s Tales',hostAr:'صوت: رشا عبد الله',hostEn:'voiced by Rasha Abdullah',len:'٢ س ٣٠ د',lenE:'2h 30m',c1:'#E2584A',c2:'#7A1D14',pat:'dots',mark:'☆',
  txtAr:'كانت الجدة تقول: الحكاية لا تنتهي حين تنام، بل تبدأ حين تنام. وفي تلك الليلة جرّبت أن تبقى مستيقظة.',
  txtEn:'Grandma used to say a story does not end when you sleep; it begins. That night she tried to stay awake.'},
 {ar:'تأمّلات في الضوء',en:'Contemplations on Light',hostAr:'صوت: أ. د. هاني سلامة',hostEn:'voiced by Prof. Hani Salama',len:'٥ س ٥٥ د',lenE:'5h 55m',c1:'#D9AE45',c2:'#6B4A05',pat:'frame',mark:'❂',
  txtAr:'الضوء لا لون له، وكل الألوان هي ما تبقّى من ظلّه حين انكسر.',
  txtEn:'Light has no colour; all colours are what remained of its shadow when it broke.'},
 {ar:'الرحلة ٤٠٤',en:'Flight 404',hostAr:'صوت: طارق فؤاد',hostEn:'voiced by Tarek Fouad',len:'١١ س ١٢ د',lenE:'11h 12m',c1:'#1F2A44',c2:'#070B14',pat:'rays',mark:'✈',
  txtAr:'عند الهبوط، طلب منهم الربان أن يبقوا أماكنهم: كان هناك من يعدّ الركّاب، والعدد لم يكن صحيحاً.',
  txtEn:'At landing the captain asked everyone to stay seated: someone was counting passengers, and the number was wrong.'}
];

const AUTHORS = [
 {ar:'سليمان الرشيد',en:'Sulaiman Al-Rashid',ac:'#123C5A',ini:'س',n:9,aw:4,bioAr:'روائي ومحقّق لغوي، يكتب عن المدن الساحلية والذاكرة.',bioEn:'Novelist and linguistic researcher; writes on coastal cities and memory.'},
 {ar:'ناجية فهمي',en:'Najiya Fahmy',ac:'#5B3A6B',ini:'ن',n:7,aw:3,bioAr:'تكتب عن الذاكرة والوعي، بخلفية في علم النفس العصبي.',bioEn:'Writes on memory and consciousness, with a background in neuropsychology.'},
 {ar:'ياسين الحلو',en:'Yasin Al-Helu',ac:'#0E5A4A',ini:'ي',n:12,aw:5,bioAr:'سيّد القصة القصيرة البحرية في العقد الأخير.',bioEn:'The master of the maritime short story of the last decade.'},
 {ar:'ريم الخوري',en:'Reem Khoury',ac:'#B0561F',ini:'ر',n:5,aw:2,bioAr:'روائية جسورية، تبني عوالمها من الاقتصاد والجسد.',bioEn:'A bold novelist building worlds from economics and the body.'},
 {ar:'سلمى الأنصاري',en:'Salma Al-Ansari',ac:'#8A1E4A',ini:'س',n:8,aw:6,bioAr:'شاعرةٌ تجمع العمودي والتفعيلة في الديوان الواحد.',bioEn:'A poet uniting qasida and free verse in one diwan.'},
 {ar:'د. هاني سلامة',en:'Prof. Hani Salama',ac:'#D9AE45',ini:'ه',n:6,aw:1,bioAr:'أستاذ فلسفة العلوم، يكتب للفreader العادي لا للمتخصص فقط.',bioEn:'Professor of philosophy of science, writing for general readers.'},
 {ar:'نجلاء البرغوثي',en:'Najla Al-Barghouti',ac:'#E2584A',ini:'ن',n:21,aw:7,bioAr:'كاتبة أطفال ومصمّمة كتب حرفية للسن ٣–١٠.',bioEn:'Children’s author and designer of early-reader books, ages 3–10.'},
 {ar:'كريم البساط',en:'Karim Bassat',ac:'#1F2A44',ini:'ك',n:4,aw:2,bioAr:'خيال علمي عربي بمعايير فيزيائية صارمة.',bioEn:'Arab sci-fi with strict physical plausibility.'}
];

const EVENTS = [
 {d:'12',m:'نوفمبر',ar:'نادي القراءة: «ليلة الأوهام»',en:'Reading Club: Night of Illusions',hostAr:'مع سليمان الرشيد',hostEn:'with Sulaiman Al-Rashid',placeAr:'فرع القدس · حضوري',placeEn:'Jerusalem branch · in person',online:false,seatsAr:'١٨ مقعداً متبقياً',seatsEn:'18 seats left'},
 {d:'19',m:'نوفمبر',ar:'ورشة: كيف تلخّص كتاباً في صفحة',en:'Workshop: Summarise a Book in One Page',hostAr:'مع مريم القاسمي',hostEn:'with Maryam Al-Qasimi',placeAr:'بثّ مباشر',placeEn:'Live stream',online:true,seatsAr:'بلا حدود',seatsEn:'Unlimited'},
 {d:'26',m:'نوفمبر',ar:'مائدة مستديرة: ترجمة الشعر',en:'Round Table: Translating Poetry',hostAr:'سلمى الأنصاري + ٣ مترجمين',hostEn:'Salma Al-Ansari + 3 translators',placeAr:'بيت الثقافة',placeEn:'Bayt Al-Thaqafa',online:false,seatsAr:'٦ مقاعد متبقية',seatsEn:'6 seats left'},
 {d:'03',m:'ديسمبر',ar:'إطلاق عدد «علوم العصر» ٨٨',en:'Launch: Century Science #88',hostAr:'هيئة التحرير',hostEn:'Editorial board',placeAr:'بثّ مباشر',placeEn:'Live stream',online:true,seatsAr:'مفتوح للجميع',seatsEn:'Open to all'},
 {d:'10',m:'ديسمبر',ar:'ليلة النوادر: عرض مخطوطة ١٨٩٧',en:'Rare Night: The 1897 Manuscript',hostAr:'د. سامي طبّارة',hostEn:'Dr. Sami Tabbara',placeAr:'الخزانة · حضوري',placeEn:'The Vault · in person',online:false,seatsAr:'١٢ مقعداً',seatsEn:'12 seats'}
];

const VOICES = [
 {ar:'نقلتُ ابني من ثلاث مدارس كي يجلس في ركن «بذرة». بعد شهرين صار يطلب كتاباً بدل الشاشة.',en:'I moved my son from three schools so he could sit in the Budra corner. In two months he asked for a book instead of a screen.',nameAr:'أحمد. ح',nameEn:'Ahmad H.',roleAr:'ولي أمر · غزة',roleEn:'Parent · Gaza'},
 {ar:'أفضل محرك بحث عربي جرّبته. أكتب «مقارنة لابلاس» فيجد لي الدورية قبل أن أكمل الطباعة.',en:'The best Arabic search engine I have tried. I type “Laplace comparison” and it finds the journal before I finish typing.',nameAr:'د. رنا م.',nameEn:'Dr. Rana M.',roleAr:'باحثة · الرياض',roleEn:'Researcher · Riyadh'},
 {ar:'الوضع الليلي هنا ليس مجرّد خلفية سوداء؛ الحروف مضبوطة والتشكيل لا ينكسر. هذا نادر.',en:'The dark mode here isn’t just a black background — the letterforms are tuned and the diacritics don’t break. That’s rare.',nameAr:'بلال ع.',nameEn:'Bilal A.',roleAr:'مصمم · عمّان',roleEn:'Designer · Amman'},
 {ar:'أستمع للمسموعات في المواصلات ساعةً يومياً، والتحدّي جعلني أنهي ١٤ كتاباً في سنة.',en:'I listen an hour daily on the commute, and the challenge got me through 14 books in a year.',nameAr:'هديل س.',nameEn:'Hudeil S.',roleAr:'موظفة · دبي',roleEn:'Officer · Dubai'},
 {ar:'作为阿拉伯语学习者，这里的平行文本和朗读功能救了我。',en:'As an Arabic learner, the parallel texts and read-aloud saved me.',nameAr:'ليانغ وي',nameEn:'Liang Wei',roleAr:'دارس · سنغافورة',roleEn:'Learner · Singapore'}
];

const FAQS = [
 {qAr:'هل المكتبة مجانية فعلاً؟',qEn:'Is the library really free?',
  aAr:'نعم. التصفّح والقراءة داخل الموقع والاستماع للمقتطفات مجاني للأبد بلا إعلانات. الحساب المسجّل يضيف الإعارة والتنزيل وخزانة النوادر، ويمكنك البدء بفترة تجريبية ١٤ يوماً.',
  aEn:'Yes. Browsing, on-site reading and listening to excerpts are free forever, ad-free. A registered account adds borrowing, downloads and the rare vault; you can start with a 14-day trial.'},
 {qAr:'كم كتاباً يمكنني استعارته دفعة واحدة؟',qEn:'How many books can I borrow at once?',
  aAr:'العضو المجاني: كتابان لمدة ٧ أيام. «قارئ+»: ٤ كتب لمدة ١٤ يوماً. «خازن»: ٦ كتب بلا حدٍّ زمني مع تجديد تلقائي.',
  aEn:'Free member: 2 books for 7 days. Reader+: 4 books for 14 days. Keeper: 6 books, no due date, with auto-renewal.'},
 {qAr:'هل تعمل المكتبة بلا إنترنت؟',qEn:'Does the library work offline?',
  aAr:'بعد فتح أي كتابٍ مستعار يُخزَّن محلياً ويمكنك قراءته بلا اتصال. قائمة القراءة والملاحظات تُزامَن تلقائياً عند العودة للشبكة.',
  aEn:'Once a borrowed book is opened it is cached locally and readable offline. Your wishlist and notes sync automatically when you reconnect.'},
 {qAr:'بأي صيغة أُنزِّل الكتب؟',qEn:'In what formats can I download?',
  aAr:'EPUB 3 (يدعم التشكيل والإمالة)، PDF مقاس A5 وLetter، ونصّ خام. المسموعات بصيغة MCB 128kbps مع ملف ترجمة VTT.',
  aEn:'EPUB 3 (full diacritics support), A5 and Letter PDF, and raw text. Audiobooks in MP3 128kbps with VTT transcripts.'},
 {qAr:'كيف تُصنَّف النصوص النادرة؟',qEn:'How are rare texts classified?',
  aAr:'كل مخطوطة تُفهرِس يدوياً ثم تُمسح بـ١٢٠٠ نقطة/بوصة، وتُرفق بطبعةٍ تحقيقٍ مع kritisمة المصادر ودراسة حالة الحفظ.',
  aEn:'Every manuscript is hand-catalogued then scanned at 1200 dpi, with a critical apparatus, source stemma and a conservation report.'},
 {qAr:'هل يمكنني اقتراح كتاب للشراء؟',qEn:'Can I suggest a title for purchase?',
  aAr:'نعم، من «طاولة القارئ» → اقتراح عنوان. يمرّ الاقتراح بلجنة الفهرسة الأسبوعية، وغالباً يُجاب خلال ٥ أيام عمل.',
  aEn:'Yes, via the Reader’s Desk → suggest a title. Proposals reach the weekly cataloguing committee and are usually answered within 5 working days.'}
];

const PLANS = [
 {k:'FREE',ar:'قارئ',en:'Reader',pAr:'٠',pEn:'0',cur:'$',perAr:'للأبد',perEn:'forever',feat:true,
  dAr:'كل ما تحتاجه لتبدأ قراءةً جدّية اليوم.',dEn:'Everything you need to start reading seriously today.',
  items:[['y','تصفّح كامل الفهرس ١٢٨,٤٦٠ عنواناً'],['y','قراءة المقتطفات والفهارس'],['y','٢ إعارة · ٧ أيام'],['y','ملاحظات وفواصل غير محدودة'],['n','تنزيل EPUB و PDF'],['n','خزانة النوادر والمخطوطات']]},
 {k:'PLUS',ar:'قارئ+',en:'Reader+',pAr:'٦',pEn:'6',cur:'$',perAr:'شهرياً',perEn:'per month',feat:true,
  dAr:'للقارئ الأسبوعي الذي يريد تنزيلًا وإعارة أوسع.',dEn:'For the weekly reader who wants downloads and wider lending.',
  items:[['y','كل مزايا «قارئ»'],['y','٤ إعارات · ١٤ يوماً'],['y','تنزيل EPUB و PDF بلا watermark'],['y','المسموعات كاملة بجودة ١٩٢kbps'],['y','تحدي القراءة + شارات'],['n','أرشيف النوادر']]},
 {k:'KEEPER',ar:'خازن',en:'Keeper',pAr:'١٤',pEn:'14',cur:'$',perAr:'شهرياً',perEn:'per month',feat:false,
  dAr:'للباحث والمدرّس: أرشيف كامل وأولوية في الندوات.',dEn:'For researchers and teachers: full archive and event priority.',
  items:[['y','كل مزايا «قارئ+»'],['y','٦ إعارات بلا حدّ زمني'],['y','خزانة النوادر: ١٧٤ مخطوطة'],['y','الدوريات المحكَّمة كاملة'],['y','أولوية حجز الندوات'],['y','API شخصي للفهرس']]}
];

/* ───────── 2 · ترجمة الواجهة ───────── */
const I18N = {
  ar:{
    brand:'مكتبة قراءة',
    tb_open:'المكتبة مفتوحة',
    nav_home:'الرئيسية',nav_cats:'الأقسام',nav_catalog:'الفهرس',nav_mag:'المجلات',nav_stories:'القصص',
    nav_audio:'مسموعات',nav_more:'المزيد',nav_desk:'طاولة القارئ',nav_picks:'اختيار التحرير',nav_kids:'ركن الأطفال',
    nav_rare:'نصوص نادرة',nav_events:'الندوات',nav_plans:'العضويات',
    search_ph:'ابحث عن كتاب، مؤلف، موضوع…',btn_login:'تسجيل الدخول',btn_register:'حساب جديد',
    ud_wish:'قائمة القراءة',ud_loan:'إعاراتي',ud_bm:'الفواصل',ud_notes:'ملاحظاتي',ud_logout:'تسجيل الخروج',
    hero_eyebrow:'خزانة رقمية · ١٢٨٬٤٦٠ عنواناً · بلا إعلانات',
    hero_lead:'مكتبة قراءة تجمع الرواية والقصة القصيرة والمجلة والدورية العلمية والكتاب المسموع والنادر المطبوع — في مكان واحد، بخطٍّ عربي مضبوط، ووضع ليلي حقيقي، وأدوات قراءة صُمِّمت لمن يقرأ فعلاً لا لمن يتصفّح.',
    hero_search_ph:'اكتب اسم الكتاب أو المؤلف أو «خيال علمي»…',hero_btn_search:'ابحث',
    hero_chip_new:'أحدث الإضافات',hero_chip_free:'متاح مجاناً',hero_chip_audio:'مسموع',hero_chip_kids:'ناشئة',hero_chip_blind:'أعمِني واختر لي',
    hero_s1:'عنوان مفهرس',hero_s2:'قارئ نشط',hero_s3:'مجلة ودورية',hero_s4:'لغة مترجمة',
    hero_shelf_label:'رفّ هذا الأسبوع',hero_drawer_tag:'بطاقة فهرسة',hero_drawer_next:'البطاقة التالية',hero_scroll:'انزل إلى المخزن',
    cat_title:'أقسام المكتبة',cat_sub:'ثمانية أرفف كبرى، وكل رفّ يفتح على عشرات الأرفف الصغيرة.',cat_view:'كل الفهرس',
    col_title:'الفهرس الحيّ',col_sub:'فلترة فورية، ترتيب، عرض شبكي أو قائمة — بلا إعادة تحميل الصفحة.',
    col_search_ph:'ابحث داخل ٣٢ عنواناً…',col_f_cat:'التصنيف',col_f_lang:'اللغة',col_f_sort:'الترتيب',
    col_lang_all:'الكل',col_lang_ar:'العربية',col_lang_en:'الإنجليزية',
    col_sort_pop:'الأكثر رواجاً',col_sort_new:'الأحدث',col_sort_rate:'الأعلى تقييماً',col_sort_az:'أ ← ي',col_sort_pages:'الأقل صفحات',
    col_all:'الكل',col_mywish:'قائمتي',col_myloan:'معارتي',col_more:'اعرض المزيد من الرفّ',
    col_empty_t:'لا شيء بهذا الاسم في المخزن',col_empty_p:'جرّب كلمة أخرى، أو أزل الفلاتر، أو دعنا نختر لك عشوائياً.',col_reset:'إعادة الضبط',
    badge_new:'جديد',badge_best:'الأكثر إعارة',badge_free:'مجاني',badge_audio:'مسموع',badge_rare:'نادر',
    act_preview:'عاين',act_save:'احفظ',act_borrow:'استعِر',act_listen:'استمع',act_read:'اقرأ',
    mag_title:'المجلات والدوريات',mag_sub:'عددٌ يتصدّر الواجهة، ومحاكاة «كين بيرنز» تُبقي الغلاف متنفّساً.',
    mag_rail_h:'الأعداد الأخيرة',mag_issue:'عدد',mag_articles:'محتويات العدد',mag_readissue:'اقرأ العدد',mag_subscribe:'اشترك',
    mag_sub_t:'اشترك في نشرة الأعداد',mag_sub_p:'إشعار فور صدور أي عدد + ملف PDF.',mag_sub_btn:'اشترك',
    sto_title:'سلّم القصص القصيرة',sto_sub:'قصّات تُقرأ في جلسة واحدة — مع زمن قراءة دقيق لكل نص.',sto_read:'اقرأ',sto_min:'دقيقة',
    aud_title:'غرفة الاستماع',aud_sub:'اضغط تشغيل — سيقرأ لك المتصفح مقتطفاً بصوت نظامك (Web Speech API).',aud_stop:'إيقاف الكل',aud_play:'تشغيل',aud_host:'أداء',
    kids_title:'ركن «بذرة» للناشئة',kids_sub:'حروف كبيرة، ألوان صريحة، وحكايات ما قبل النوم — مع لعبة «اقلب البطاقة» و«كم كلمة تعرف؟».',
    kids_flip:'العب: اقلب البطاقة',kids_word:'كلمة اليوم',
    desk_title:'طاولة القارئ',desk_sub:'ست أدوات صغيرة تختصر ساعات: ملاحظات، مؤقّت تركيز، منتقي عشوائي، نطق آلي، قائمة قراءة، وفواصل.',
    desk_quote:'الكتابُ قراءةٌ أولى، والملاحظةُ قراءةٌ ثانية، والفهرسةُ قراءةٌ ثالثة.',
    desk_note_h:'دفتر الملاحظات',desk_note_save:'احفظ',desk_note_clear:'أمحُ',
    desk_timer_h:'مؤقّت الجلسة',desk_timer_start:'ابدأ',desk_timer_break:'راحة',desk_timer_p:'كل جلسة تُضاف إلى تحدي القراءة تلقائياً.',desk_sessions:'جلسات اليوم',
    desk_random_h:'منتقي الحيرة',desk_random_p:'لا تعرف ماذا تقرأ؟ دَع الفهرس يقرّر.',desk_random_btn:'اختر لي كتاباً',
    desk_tts_h:'قارئ صوتي',desk_tts_speed:'السرعة',desk_tts_run:'اقرأ مقتطف اليوم',
    desk_list_h:'قائمة القراءة',desk_export:'صدّر كملف نصي',desk_print:'اطبع',desk_bm_h:'الفواصل',
    picks_title:'بطاقات اختيار التحرير',picks_sub:'بطاقات مبعثرة على مكتبنا — مسّها لتستقيم.',
    rare_title:'خزانة النوادر',rare_sub:'مخطوطات مطبوعة، طبعات أولى، ودوريات توقّفت منذ عقود — رقمنّاها بالحبر الرقمي نفسه.',
    rare_li1:'مخطوطة ممسوحة',rare_li2:'طبعة أولى',rare_li3:'أقدم عدد دوريّة',rare_btn:'افتح الخزانة بعضوية',rare_locked:'مقفلة',
    auth_title:'أصواتٌ تكتب',auth_sub:'مؤلفونا المميّزون هذا الموسم.',auth_books:'كتب',auth_awards:'جوائز',
    stats_title:'المكتبة بالأرقام',stats_sub:'مقياس شهري لسلوك القراءة داخل المكتبة.',
    stat_b1:'صفحة قُرئت هذا الشهر',stat_b2:'إعارة نشطة',stat_b3:'ساعة مسموعات',stat_b4:'رضا القراء',
    stat_chart_h:'أكثر الأقسام إقراضاً',stat_donut_h:'نسبة القراءة العربية',stat_donut_p:'من إجمالي الصفحات المقروءة خلال ٢٠٢٦.',
    ch_title:'تحدّي ٢٠٢٦: ثلاثون كتاباً',ch_title_short:'تحدّي القراءة',ch_sub:'أضف صفحاتك المقروءة، وتابع معالم الطريق — كل عتبة تفتح شارة جديدة.',ch_add:'سجّل صفحات',ch_done:'من الهدف',
    ev_title:'نادي القراءة والندوات',ev_sub:'لقاءات أسبوعية، حضورية وبثّاً مباشر.',ev_register:'سجّل',ev_online:'بثّ مباشر',ev_place:'حضوري',
    voi_title:'ماذا يقول القرّاء؟',
    plan_title:'ثلاث درجات عضوية',plan_sub:'اضغط البطاقة لتستقيم وتكشف كامل مزاياها.',plan_choose:'اختر',plan_current:'باقة مجانية',
    faq_title:'أسئلةٌ تصل كثيراً',
    news_title:'بريد المكتبة الأسبوعي',news_sub:'خمسة عناوين مختارة، مقتطف واحد، وتنبيه بالعدد الجديد — كل يوم أحد.',news_ph:'بريدك الإلكتروني',news_btn:'اشترك مجاناً',news_note:'لا رسائل ترويجية. إلغاء الاشتراك بنقرة.',
    ft_about:'مكتبة عامة رقمية، مستقلة، بلا إعلانات. فهرسة مفتوحة، وإعارة عادلة، ونسخة قابلة للتنزيل لكل من يسجّل.',
    ft_links:'المكتبة',ft_cats:'أقسام سريعة',ft_tools:'أدوات',ft_contact:'تواصل',ft_addr:'شارع الكتب ١٤، حيّ الثقافة',ft_hours:'مواعيد الفرع',
    ft_rights:'جميع الحقوق محفوظة',ft_privacy:'الخصوصية',ft_terms:'الشروط',ft_access:'إتاحة WCAG',ft_api:'API للفهرس',
    au_side_h:'ادخل، وسنُكمل من حيث توقّفت',au_side_p:'حساب واحد يزامن قائمتك، فواصلك، ملاحظاتك، وتقدّم تحدّي القراءة بين كل أجهزتك.',
    au_perk1:'إعارة حتى ٦ كتب دفعة واحدة',au_perk2:'تنزيل PDF و EPUB بلا watermark',au_perk3:'وصول خزانة النوادر والندوات المباشرة',
    au_demo_h:'حساب تجريبي',au_demo_btn:'املأ البيانات',
    au_login:'دخول',au_register:'حساب جديد',au_guest:'زائر',au_email:'البريد الإلكتروني',au_pass:'كلمة المرور',au_name:'الاسم الكامل',
    au_email_ph:'you@mail.com',au_pass_ph:'••••••',au_pass_ph2:'٨ أحرف فأكثر',au_name_ph:'سلامة القارئ',
    au_remember:'تذكّرني',au_forgot:'نسيت كلمة المرور؟',au_or:'أو عبر',au_confirm:'تأكيد المرور',
    au_terms:'أوافق على الشروط والخصوصية، وأتعهد بعدم النسخ التجاري.',au_news:'أرغب بنشرة المكتبة الأسبوعية.',
    au_sub_login:'ادخل المكتبة',au_sub_reg:'أنشئ حسابي',
    au_guest_h:'ادخل كزائر، بلا التزام',au_guest_p:'تصفّح كامل الفهرس، اقرأ المقتطفات، واستمع للمسموعات. الإعارة والتنزيل والتحدّي تحتاج حساباً مسجّلاً.',
    au_gp1:'تصفّح ١٢٨٬٤٦٠ عنواناً',au_gp2:'قراءة المقتطفات والفهارس',au_gp3:'بدون إعارة أو تنزيل',au_guest_btn:'ادخل كزائر',au_guest_note:'تُحفظ الجلسة محلياً وتنتهي تلقائياً بعد ٦٠ دقيقة.',
    rd_f_serif:'نسخي',rd_f_kufi:'كوفي',rd_f_sans:'حديث',rd_hint:'مرّر للأسفل لمتابعة النص · Esc للإغلاق',
    cp_ph:'ابحث عن كتاب أو نفّذ أمراً…',cp_updown:'↑↓ تنقّل',cp_enter:'Enter فتح',cp_esc:'Esc إغلاق',cp_books:'من الفهرس',cp_actions:'أوامر',cp_nav:'أقسام',
    qv_overview:'نبذة',qv_toc:'المحتويات',qv_reviews:'القراء',qv_sim:'مشابهة',qv_borrow:'استعر الآن',qv_read:'ابدأ القراءة',qv_dl:'تنزيل',
    toc_h:'فهرس الفصول',rev_h:'مِن دفاتر القرّاء',
    err_mail:'بريد غير صالح',err_pass:'كلمة المرور قصيرة جداً',err_match:'كلمتا المرور غير متطابقتين',err_name:'الاسم مطلوب',err_terms:'يجب الموافقة على الشروط',err_exist:'هذا البريد مسجَّل سابقاً',err_nouser:'لا يوجد حساب بهذا البريد',err_wrong:'كلمة المرور غير صحيحة',
    t_welcome:'أهلاً بعودتك',t_registered:'تم إنشاء الحساب',t_guest:'دخول زائر',t_logout:'إلى اللقاء',t_saved:'أُضيف لقائمة القراءة',t_unsaved:'أُزيل من قائمتك',t_borrowed:'تمت الإعارة',t_returned:'أُعيد الكتاب',t_need_acc:'هذه الميزة تحتاج حساباً مسجّلاً',t_dl:'التنزيل متاح للأعضاء',t_rare:'الخزانة مغلقة على الزوار',t_theme_on:'الوضع الليلي مُفعّل',t_theme_off:'الوضع النهاري مُفعّل',t_note:'حُفظت الملاحظة',t_notes_empty:'لا ملاحظات بعد',t_copied:'نُسخت البيانات',t_sub_ok:'تم الاشتراك في النشرة',t_timer:'انتهت الجلسة — أحسنت',t_chal:'سُجّلت الصفحات',t_bm:'أُضيف فاصل',t_voice:'قراءة صوتية…',t_novoice:'لا أصوات متاحة للغتك',t_pick:'اخترنا لك',t_reset:'أُعيد ضبط الفلاتر',t_fill:'مُلت البيانات التجريبية'
  },
  en:{
    brand:'Qirāʿa Library',
    tb_open:'Library open',
    nav_home:'Home',nav_cats:'Sections',nav_catalog:'Catalogue',nav_mag:'Magazines',nav_stories:'Stories',
    nav_audio:'Audiobooks',nav_more:'More',nav_desk:'Reader’s Desk',nav_picks:'Editors’ Picks',nav_kids:'Young Readers',
    nav_rare:'Rare Texts',nav_events:'Events',nav_plans:'Membership',
    search_ph:'Search a title, author, subject…',btn_login:'Sign in',btn_register:'Create account',
    ud_wish:'Reading list',ud_loan:'My loans',ud_bm:'Bookmarks',ud_notes:'My notes',ud_logout:'Sign out',
    hero_eyebrow:'Digital vault · 128,460 catalogued titles · no ads',
    hero_lead:'Qirāʿa gathers the novel, the short story, the magazine, the peer-reviewed journal and the rare printed book — in one place, with tuned Arabic type, a real dark mode, and tools built for people who actually read.',
    hero_search_ph:'Type a title, an author, or “sci-fi”…',hero_btn_search:'Search',
    hero_chip_new:'Newest arrivals',hero_chip_free:'Open access',hero_chip_audio:'Audiobook',hero_chip_kids:'Young readers',hero_chip_blind:'Pick for me',
    hero_s1:'catalogued titles',hero_s2:'active readers',hero_s3:'magazines & journals',hero_s4:'languages',
    hero_shelf_label:'This week’s shelf',hero_drawer_tag:'Catalog card',hero_drawer_next:'Next card',hero_scroll:'Down to the stacks',
    cat_title:'Library sections',cat_sub:'Eight major shelves — each opening onto dozens of smaller ones.',cat_view:'Full catalogue',
    col_title:'Live catalogue',col_sub:'Instant filtering, sorting, grid or list — no page reloads.',
    col_search_ph:'Search inside 32 titles…',col_f_cat:'Section',col_f_lang:'Language',col_f_sort:'Sort',
    col_lang_all:'All',col_lang_ar:'Arabic',col_lang_en:'English',
    col_sort_pop:'Most borrowed',col_sort_new:'Newest',col_sort_rate:'Top rated',col_sort_az:'A → Z',col_sort_pages:'Fewest pages',
    col_all:'All',col_mywish:'My list',col_myloan:'My loans',col_more:'Show more from the shelf',
    col_empty_t:'Nothing by that name in the stacks',col_empty_p:'Try another word, clear the filters, or let us pick randomly.',col_reset:'Reset',
    badge_new:'New',badge_best:'Top loan',badge_free:'Free',badge_audio:'Audio',badge_rare:'Rare',
    act_preview:'Preview',act_save:'Save',act_borrow:'Borrow',act_listen:'Listen',act_read:'Read',
    mag_title:'Magazines & journals',mag_sub:'A lead issue up front, kept breathing by a slow Ken Burns drift.',
    mag_rail_h:'Latest issues',mag_issue:'Issue',mag_articles:'In this issue',mag_readissue:'Read issue',mag_subscribe:'Subscribe',
    mag_sub_t:'Subscribe to issue alerts',mag_sub_p:'Notified the moment an issue lands, plus PDF.',mag_sub_btn:'Subscribe',
    sto_title:'The short-story ladder',sto_sub:'Fictions for one sitting — with an accurate reading time each.',sto_read:'Read',sto_min:'min',
    aud_title:'The listening room',aud_sub:'Press play — your browser reads an excerpt aloud with a system voice (Web Speech API).',aud_stop:'Stop all',aud_play:'Play',aud_host:'Narration',
    kids_title:'“Budra” young readers’ corner',kids_sub:'Big letters, honest colours, bedtime tales — plus flip-the-card and word-of-the-day games.',
    kids_flip:'Play: flip the card',kids_word:'Word of the day',
    desk_title:'The reader’s desk',desk_sub:'Six small tools that save hours: notes, focus timer, random picker, read-aloud, reading list, bookmarks.',
    desk_quote:'A book is the first reading; a note is the second; cataloguing is the third.',
    desk_note_h:'Notebook',desk_note_save:'Save',desk_note_clear:'Clear',
    desk_timer_h:'Session timer',desk_timer_start:'Start',desk_timer_break:'Break',desk_timer_p:'Every session feeds your reading challenge automatically.',desk_sessions:'Today’s sessions',
    desk_random_h:'Indecision picker',desk_random_p:'Can’t decide what to read? Let the catalogue choose.',desk_random_btn:'Pick me a book',
    desk_tts_h:'Read aloud',desk_tts_speed:'Speed',desk_tts_run:'Read today’s excerpt',
    desk_list_h:'Reading list',desk_export:'Export as text',desk_print:'Print',desk_bm_h:'Bookmarks',
    picks_title:'Editors’ postcards',picks_sub:'Scattered across our desk — hover to straighten one.',
    rare_title:'The rare vault',rare_sub:'Printed manuscripts, first editions, journals that stopped decades ago — digitised in the same digital ink.',
    rare_li1:'scanned manuscripts',rare_li2:'first editions',rare_li3:'oldest journal issue',rare_btn:'Unlock the vault',rare_locked:'Locked',
    auth_title:'Voices that write',auth_sub:'Our featured authors this season.',auth_books:'books',auth_awards:'awards',
    stats_title:'The library in numbers',stats_sub:'A monthly gauge of reading behaviour inside Qirāʿa.',
    stat_b1:'pages read this month',stat_b2:'active loans',stat_b3:'hours of audio',stat_b4:'reader satisfaction',
    stat_chart_h:'Most borrowed sections',stat_donut_h:'Arabic reading share',stat_donut_p:'Of all pages read during 2026.',
    ch_title:'Challenge 2026: thirty books',ch_title_short:'Reading challenge',ch_sub:'Log the pages you read and watch the milestones — each one unlocks a badge.',ch_add:'Log pages',ch_done:'of goal',
    ev_title:'Reading club & events',ev_sub:'Weekly gatherings, in person and live-streamed.',ev_register:'Reserve',ev_online:'Live stream',ev_place:'In person',
    voi_title:'What readers say',
    plan_title:'Three membership grades',plan_sub:'Click a card to straighten it and reveal every benefit.',plan_choose:'Choose',plan_current:'Free tier',
    faq_title:'Questions we get often',
    news_title:'The weekly library post',news_sub:'Five chosen titles, one excerpt, one issue alert — every Sunday.',news_ph:'Your email address',news_btn:'Subscribe free',news_note:'No promotional mail. Unsubscribe in one click.',
    ft_about:'An independent digital public library, ad-free. Open cataloguing, fair lending, a downloadable copy for everyone who registers.',
    ft_links:'Library',ft_cats:'Quick sections',ft_tools:'Tools',ft_contact:'Contact',ft_addr:'14 Books Street, Cultural Quarter',ft_hours:'Branch hours',
    ft_rights:'All rights reserved',ft_privacy:'Privacy',ft_terms:'Terms',ft_access:'WCAG access',ft_api:'Catalogue API',
    au_side_h:'Sign in and we’ll continue where you stopped',au_side_p:'One account syncs your list, bookmarks, notes and challenge progress across every device.',
    au_perk1:'Borrow up to 6 books at once',au_perk2:'PDF & EPUB downloads, no watermark',au_perk3:'Rare vault + live events access',
    au_demo_h:'Demo account',au_demo_btn:'Fill credentials',
    au_login:'Sign in',au_register:'Register',au_guest:'Guest',au_email:'Email',au_pass:'Password',au_name:'Full name',
    au_email_ph:'you@mail.com',au_pass_ph:'••••••',au_pass_ph2:'8 characters or more',au_name_ph:'Salama the Reader',
    au_remember:'Remember me',au_forgot:'Forgot password?',au_or:'or with',au_confirm:'Confirm password',
    au_terms:'I accept the Terms and Privacy policy, and pledge not to redistribute commercially.',au_news:'I want the weekly library newsletter.',
    au_sub_login:'Enter the library',au_sub_reg:'Create my account',
    au_guest_h:'Enter as a guest, no commitment',au_guest_p:'Browse the whole catalogue, read excerpts, listen to samples. Borrowing, downloads and the challenge need a registered account.',
    au_gp1:'Browse 128,460 titles',au_gp2:'Read excerpts & tables of contents',au_gp3:'No borrowing or downloading',au_guest_btn:'Continue as guest',au_guest_note:'Stored locally; the session expires after 60 minutes.',
    rd_f_serif:'Naskh',rd_f_kufi:'Kufi',rd_f_sans:'Modern',rd_hint:'Scroll to continue · Esc to close',
    cp_ph:'Search a title or run a command…',cp_updown:'↑↓ navigate',cp_enter:'Enter open',cp_esc:'Esc close',cp_books:'From catalogue',cp_actions:'Commands',cp_nav:'Sections',
    qv_overview:'Overview',qv_toc:'Contents',qv_reviews:'Readers',qv_sim:'Similar',qv_borrow:'Borrow now',qv_read:'Start reading',qv_dl:'Download',
    toc_h:'Table of contents',rev_h:'From readers’ notebooks',
    err_mail:'Invalid email',err_pass:'Password too short',err_match:'Passwords do not match',err_name:'Name is required',err_terms:'You must accept the terms',err_exist:'That email is already registered',err_nouser:'No account with that email',err_wrong:'Wrong password',
    t_welcome:'Welcome back',t_registered:'Account created',t_guest:'Guest access',t_logout:'See you soon',t_saved:'Added to reading list',t_unsaved:'Removed from your list',t_borrowed:'Borrowed',t_returned:'Returned',t_need_acc:'This feature needs a registered account',t_dl:'Downloads are for members',t_rare:'The vault is closed to guests',t_theme_on:'Dark mode on',t_theme_off:'Day mode on',t_note:'Note saved',t_notes_empty:'No notes yet',t_copied:'Copied',t_sub_ok:'Subscribed to the newsletter',t_timer:'Session finished — well read',t_chal:'Pages logged',t_bm:'Bookmark added',t_voice:'Reading aloud…',t_novoice:'No voice for your language',t_pick:'We picked for you',t_reset:'Filters reset',t_fill:'Demo credentials filled'
  }
};
const t = k => (I18N[state.lang] && I18N[state.lang][k]) || I18N.ar[k] || k;

/* ───────── 3 · الحالة ───────── */
const state = {
  lang:  LS.get('lang', 'ar'),
  theme: LS.get('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  user:  LS.get('session', null),
  filter:'all', cat:'all', langF:'all', sort:'pop', view:'grid', q:'', shown:12,
  wish:  LS.get('wish', []), loan: LS.get('loan', []), bm: LS.get('bm', []), notes: LS.get('notes', []),
  chal:  LS.get('chal', {pages:0, goal:9000}),
  read:  LS.get('readScale', 1),
  recent:[]
};
const isMember = () => !!state.user && !state.user.guest;

/* ───────── 4 · أدوات مساعدة ───────── */
function nf(n){ return n.toLocaleString(state.lang === 'ar' ? 'ar-EG' : 'en-US'); }
function stars(r){ return `<span class="stars" style="--w:${(r/5*100).toFixed(1)}%">★★★★★</span>`; }
function badgeEl(b){
  const map={new:['badge_new','new'],best:['badge_best','best'],free:['badge_free','free'],audio:['badge_audio','audio'],rare:['badge_rare','rare']};
  const m=map[b]; if(!m) return '';
  return `<span class="bdg ${m[1]}">${t(m[0])}</span>`;
}
function coverHTML(b, cls=''){
  return `<div class="cover pat-${b.pat} ${cls}" style="--c1:${b.c1};--c2:${b.c2}" data-cover="${b.id}">
    <span class="cover-spine"></span><span class="cover-grain"></span><em class="cover-mark">${b.mark}</em>
    <div class="cover-txt"><h4>${L()?b.ar:b.en}</h4><p>${L()?b.authorAr:b.authorEn}</p></div>
    <span class="cover-call mono">${b.callno}</span></div>`;
}
function toast(kind, title, sub){
  const ic={ok:'bi-check-circle-fill',warn:'bi-exclamation-triangle-fill',err:'bi-x-octagon-fill'}[kind]||'bi-info-circle-fill';
  const el=document.createElement('div');
  el.className=`tst ${kind}`;
  el.innerHTML=`<i class="bi ${ic}"></i><div><b>${title}</b>${sub?`<small>${sub}</small>`:''}</div>`;
  $('#toasts').appendChild(el);
  setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),350);},3600);
}
function gate(msgKey){
  if(isMember()) return true;
  toast('warn', t('t_need_acc'), msgKey || (state.user ? t('au_guest_note') : t('btn_register')));
  openAuth('login');
  return false;
}

/* ───────── 5 · اللغة والسمة ───────── */
function applyLang(l){
  state.lang = l; LS.set('lang', l);
  const html = document.documentElement;
  html.setAttribute('lang', l); html.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr'); html.dataset.lang = l;
  $('#bootstrapCss').href = l === 'ar'
    ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css'
    : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
  $$('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n));
  $$('[data-i18n-ph]').forEach(e => e.placeholder = t(e.dataset.i18nPh));
  $('#langBtn').querySelector('span').textContent = l === 'ar' ? 'EN' : 'ع';
  document.title = l === 'ar'
    ? 'مكتبة قراءة | كتب، قصص، مجلات، دوريات ومسموعات'
    : 'Qirāʿa Library | Books, stories, magazines, journals & audio';
  renderAll();
}
function applyTheme(th){
  state.theme = th; LS.set('theme', th);
  document.documentElement.setAttribute('data-theme', th);
  $('#themeBtn').innerHTML = `<i class="bi ${th === 'dark' ? 'bi-sun' : 'bi-moon-stars'}"></i>`;
}
function applyScale(v){
  state.read = Math.min(1.4, Math.max(.85, +v.toFixed(2)));
  document.documentElement.style.setProperty('--read', state.read);
  $('#fontVal').textContent = Math.round(state.read * 100) + '%';
  LS.set('readScale', state.read);
}

/* ───────── 6 · البطل: المشجر والبطاقات ───────── */
function renderSpines(){
  const feat = BOOKS.filter(b => b.badges.includes('best') || b.badges.includes('new')).slice(0, 11);
  $('#spines').innerHTML = feat.map((b,i)=>`
    <div class="spine ${i%4===0?'tall':i%3===0?'short':''}" style="--sc:${b.c1}" data-id="${b.id}" title="${L()?b.ar:b.en}">
      <span>${L()?b.ar:b.en}</span>
    </div>`).join('');
  $$('#spines .spine').forEach(s => s.addEventListener('click', () => openQV(+s.dataset.id)));
}
let stackIdx = 0;
const STACK = () => BOOKS.filter(b => b.rating >= 4.6).slice(0, 5);
function renderStack(){
  const arr = STACK(), n = arr.length;
  $('#cardStack').innerHTML = arr.map((b,i)=>{
    const pos = ((i - stackIdx) % n + n) % n;
    return `<article class="fcard" data-pos="${pos}" data-id="${b.id}">
      ${coverHTML(b,'')}
      <div style="flex:1;min-width:0">
        <h4>${L()?b.ar:b.en}</h4>
        <p class="fc-au">${L()?b.authorAr:b.authorEn}</p>
        <div class="fc-row">
          <div><b>${b.year}</b><span>YEAR</span></div>
          <div><b>${b.pages}</b><span>PAGES</span></div>
          <div><b>${b.rating.toFixed(1)}</b><span>RATING</span></div>
        </div>
        <p class="fc-abs">${L()?b.absAr:b.absEn}</p>
      </div></article>`;
  }).join('');
  $('#cdNo').textContent = '№ ' + String(arr[stackIdx % n].id).padStart(4,'0');
  $('#cdDots').innerHTML = arr.map((_,i)=>`<i class="${i===stackIdx%n?'on':''}"></i>`).join('');
  $$('#cardStack .fcard').forEach(c => c.addEventListener('click', ()=>openQV(+c.dataset.id)));
}
function nextCard(){ stackIdx++; renderStack(); }

/* ───────── 7 · الشريطان ───────── */
function renderTickers(){
  const g = [...CATS.map(c=>pick(c)), ...EXTRA_CATS.map(c=>pick(c)),
    ...(L() ? ['فلسفة العلم','سرد ما بعد الكولونيالية','أدب الرحلات','القصة الوميضية','نقد السينما','الخط العربي','أدب الأطفال','الترجمة الذاتية']
             : ['philosophy of science','post-colonial narrative','travel writing','flash fiction','film criticism','calligraphy','memoir'])];
  const row = arr => arr.concat(arr).map(x=>`<span>${x}</span>`).join('');
  $('#tkA').innerHTML = row(g);
  $('#tkB').innerHTML = row([...g].reverse());
}
function renderLive(){
  const names = L()
    ? ['سلامة من عمّان استعارت «الرحلة ٤٠٤»','ليلى أضافت «ديوان الندى» لقائمتها','بحث جديد: «ابن الهيثم»','٣ قراء يسمعون «صمت المحرّك»','صدر العدد ٨٨ من علوم العصر','مروة أنهت ٢٤٠ صفحة اليوم']
    : ['Salama from Amman borrowed Flight 404','Layla added The Dew Verses to her list','New search: “Ibn al-Haytham”','3 readers listening to Silence of the Engine','Century Science #88 is out','Mariam finished 240 pages today'];
  const items = names.map(n=>`<span><b>●</b> ${n}</span>`).join('');
  $('#liveTicker').innerHTML = items + items;
}

/* ───────── 8 · البنتو ───────── */
function renderBento(){
  $('#bentoGrid').innerHTML = CATS.map((c,i)=>{
    const big = i===0, wide = i===2 || i===5;
    const inner = BOOKS.filter(b=>b.cat===c.id || (c.id==='novel'&&['rom','mys','sf'].includes(b.cat)) || (c.id==='sci'&&b.cat==='tech') || (c.id==='story'&&b.cat==='poetry')).slice(0, big?4:0);
    return `<article class="tile ${big?'big':''} ${wide?'wide':''}" data-reveal style="--tc:${c.tc};--d:${i*60}ms" data-cat="${c.id}">
      <span class="cnt-badge mono">${nf(c.n)}</span>
      <div class="tile-ico"><i class="bi ${c.ico}"></i></div>
      <h3>${pick(c)}</h3>
      <p>${L()?c.descAr:c.descEn}</p>
      ${big?`<div class="tile-mini">${inner.map(b=>`<a href="#catalog" data-jump="${b.id}"><span>${L()?b.ar:b.en}</span><b class="mono">${b.year}</b></a>`).join('')}</div>`:
      `<div class="tile-strip">${BOOKS.filter(b=>b.cat===c.id).slice(0,5).map(b=>`<i style="--sc2:linear-gradient(180deg,${b.c1},${b.c2});background:linear-gradient(180deg,${b.c1},${b.c2})"></i>`).join('') || '<i style="background:var(--line)"></i><i style="background:var(--line)"></i>'}</div>`}
      <span class="tile-go"><i class="bi bi-arrow-left"></i></span>
    </article>`;
  }).join('');
  $$('.tile').forEach(t2 => t2.addEventListener('click', e => {
    const jump = e.target.closest('[data-jump]');
    if (jump){ e.stopPropagation(); setCat(jump.dataset.jump); return; }
    setCat(t2.dataset.cat);
  }));
}
function setCat(id){
  state.cat = id; state.shown = 12; $('#catSel').value = id;
  renderCatalog(); document.getElementById('catalog').scrollIntoView({behavior: RM?'auto':'smooth'});
}

/* ───────── 9 · الفهرس ───────── */
function buildCatSel(){
  const all=[...CATS,...EXTRA_CATS];
  $('#catSel').innerHTML = `<option value="all">${t('col_all')}</option>` +
    all.map(c=>`<option value="${c.id}">${pick(c)}</option>`).join('');
  $('#catSel').value = state.cat;
}
function filtered(){
  let r = BOOKS.slice();
  if (state.cat !== 'all'){
    r = r.filter(b => b.cat === state.cat ||
      (state.cat==='novel' && ['rom','mys','sf'].includes(b.cat)) ||
      (state.cat==='sci'   && ['tech','acad'].includes(b.cat)) ||
      (state.cat==='story' && ['poetry'].includes(b.cat)) ||
      (state.cat==='think' && ['self'].includes(b.cat)) ||
      (state.cat==='rare'  && b.badges.includes('rare')));
  }
  if (state.langF !== 'all') r = r.filter(b => b.lang === state.langF || b.lang === 'both');
  if (state.filter !== 'all'){
    if (state.filter === 'wish') r = r.filter(b => state.wish.includes(b.id));
    else if (state.filter === 'loan') r = r.filter(b => state.loan.includes(b.id));
    else r = r.filter(b => b.badges.includes(state.filter));
  }
  if (state.q){
    const q = state.q.toLowerCase().trim();
    r = r.filter(b => [b.ar,b.en,b.authorAr,b.authorEn,b.callno,catLabel(b.cat),b.absAr,b.absEn]
      .join(' ').toLowerCase().includes(q));
  }
  const S = {pop:(a,b)=>b.votes-a.votes, new:(a,b)=>b.year-a.year, rate:(a,b)=>b.rating-a.rating,
             az:(a,b)=>(L()?b.ar:b.en).localeCompare(L()?a.ar:a.en, L()?'ar':'en'), pages:(a,b)=>a.pages-b.pages};
  return r.sort(S[state.sort]);
}
function bookCard(b,i){
  const inW = state.wish.includes(b.id), inL = state.loan.includes(b.id);
  return `<article class="bcard" data-reveal data-id="${b.id}" style="--d:${Math.min(i,10)*45}ms">
    <div class="bcard-cover">
      ${coverHTML(b)}
      <div class="bcard-badges">${b.badges.map(badgeEl).join('')}</div>
      <div class="bcard-hover"><button class="hb" data-act="preview"><i class="bi bi-eye"></i>${t('act_preview')}</button></div>
    </div>
    <div class="bcard-body">
      <span class="cat-tag">${catLabel(b.cat)} · ${b.lang==='both'?(L()?'مترجم':'bilingual'):(b.lang==='ar'?(L()?'عربي':'Arabic'):(L()?'إنجليزي':'English'))}</span>
      <h3>${L()?b.ar:b.en}</h3>
      <p class="author">${L()?b.authorAr:b.authorEn}</p>
      <p class="ldesc">${L()?b.absAr:b.absEn}</p>
      <div class="bmeta">${stars(b.rating)}<b class="mono">${b.rating.toFixed(1)}</b><span>·</span><span class="mono">${b.pages} ص</span><span>·</span><span class="mono">${b.year}</span></div>
      <div class="bcard-actions">
        <button class="act ${inW?'on':''}" data-act="save"><i class="bi ${inW?'bi-heart-fill':'bi-heart'}"></i>${t('act_save')}</button>
        <button class="act bor ${inL?'on':''}" data-act="borrow"><i class="bi bi-bag${inL?'-check':''}"></i>${inL?(L()?'مُعار':'Loaned'):t('act_borrow')}</button>
        <button class="act" data-act="read"><i class="bi bi-book-half"></i>${t('act_read')}</button>
      </div>
    </div></article>`;
}
function renderCatalog(){
  const all = filtered(), list = all.slice(0, state.shown);
  $('#resultCount').textContent = `${nf(all.length)} / ${nf(BOOKS.length)}` + (state.lang==='ar'?' عنواناً':' titles');
  const g = $('#bookGrid');
  g.className = 'catalog ' + state.view;
  g.innerHTML = list.map(bookCard).join('');
  $('#catEmpty').classList.toggle('d-none', all.length !== 0);
  $('.loadmore-wrap').style.display = all.length > state.shown ? '' : 'none';
  observeReveals(g);
}

/* ───────── 10 · المجلات ───────── */
let magIdx = 0;
function renderMags(){
  const m = MAGS[magIdx];
  const fake = {id:'m'+magIdx, ar:m.ar, en:m.en, authorAr:'هيئة التحرير', authorEn:'Editorial', c1:m.c1, c2:m.c2, pat:m.pat, mark:m.mark, callno:'ISS·'+m.no};
  $('#magFeature').innerHTML = `
    <div class="mf-img">${coverHTML(fake)}</div>
    <div class="mf-body">
      <span class="mf-tag mono"><i class="bi bi-dot"></i> ${t('mag_issue')} № ${m.no} · ${m.date}</span>
      <h3>${L()?m.ar:m.en}</h3>
      <div class="mf-meta"><span><i class="bi bi-file-earmark-pdf"></i> ${(96+magIdx*8)} ${L()?'صفحة':'pp'}</span>
        <span><i class="bi bi-download"></i> ${nf(1200+magIdx*340)}</span>
        <span class="mono">${L()?'PDF · EPUB':'PDF · EPUB'}</span></div>
      <p style="color:var(--muted);font-size:.92rem;line-height:1.85">${L()?m.absAr:m.absEn}</p>
      <h5 class="mono" style="font-size:.68rem;letter-spacing:.16em;color:var(--brass);margin-top:8px">${t('mag_articles').toUpperCase()}</h5>
      <ul class="mf-list">${m.arts.map((a,i)=>`<li><b>${String(i+1).padStart(2,'0')}</b><span>${a}</span></li>`).join('')}</ul>
      <div class="mf-foot">
        <button class="btn-ink sm" data-readmag><i class="bi bi-book-half"></i> ${t('mag_readissue')}</button>
        <button class="btn-outline-brass sm" data-sub="mag"><i class="bi bi-bell"></i> ${t('mag_subscribe')}</button>
      </div>
    </div>`;
  $('#magScroller').innerHTML = MAGS.map((x,i)=>`
    <div class="mag-item ${i===magIdx?'active':''}" data-mag="${i}">
      ${coverHTML({id:'c'+i,ar:x.ar,en:x.en,authorAr:'',authorEn:'',c1:x.c1,c2:x.c2,pat:x.pat,mark:x.mark,callno:'№'+x.no})}
      <b>${L()?x.ar:x.en}</b><small>${x.date} · № ${x.no}</small>
    </div>`).join('');
  $$('[data-mag]').forEach(e=>e.addEventListener('click',()=>{magIdx=+e.dataset.mag;renderMags();}));
  $('#magFeature').querySelector('[data-readmag]')?.addEventListener('click',()=>openReader({
    ar:MAGS[magIdx].ar+' — '+MAGS[magIdx].date, en:MAGS[magIdx].en+' — '+MAGS[magIdx].date,
    authorAr:'هيئة التحرير', authorEn:'Editorial Board', c1:MAGS[magIdx].c1, c2:MAGS[magIdx].c2,
    exAr:MAGS[magIdx].absAr+' '+MAGS[magIdx].arts.join(' · '), exEn:MAGS[magIdx].absEn+' '+MAGS[magIdx].arts.join(' · ')
  }));
  $$('#magFeature [data-sub]').forEach(b=>b.addEventListener('click',()=>sub()));
}
function sub(){
  if(!gate(t('news_ph'))) return;
  toast('ok', t('t_sub_ok'), L()?'ستصلك نشرة الأعداد كل أحد.':'You’ll get issue alerts every Sunday.');
}

/* ───────── 11 · القصص ───────── */
function renderStories(){
  $('#storyLadder').innerHTML = STORIES.map((s,i)=>`
    <div class="stair" data-reveal data-story="${i}" style="--d:${i*40}ms">
      <span class="no mono">${String(i+1).padStart(2,'0')}</span>
      <div><h3>${L()?s.ar:s.en}</h3>
        <p class="sm">${L()?s.au:s.en==='x'?s.au:s.au} — ${L()?s.absAr:s.absEn}</p></div>
      <div class="rt">
        <span class="pill">${s.min} ${t('sto_min')}</span>
        <span class="pill">${catLabel(s.cat)}</span>
        <span class="go"><i class="bi bi-arrow-left"></i></span>
      </div>
    </div>`).join('');
  $$('[data-story]').forEach(e=>e.addEventListener('click',()=>{
    const s = STORIES[+e.dataset.story];
    openReader({...s, authorAr:s.au, authorEn:s.au, exAr:s.absAr+' '+ (L()?'جلسة واحدة تكفي.':'One sitting is enough.'), exEn:s.absEn});
  }));
  observeReveals($('#storyLadder'));
}

/* ───────── 12 · المسموعات ───────── */
function renderAudio(){
  $('#audioList').innerHTML = AUDIO.map((a,i)=>{
    const bars = Array.from({length:26},(_,k)=>`<i style="--h:${(18+Math.abs(Math.sin(k*.6+i))*70).toFixed(0)}%;--i:${k}"></i>`).join('');
    const fake={id:'a'+i,ar:a.ar,en:a.en,authorAr:'',authorEn:'',c1:a.c1,c2:a.c2,pat:a.pat,mark:a.mark,callno:'AUD'};
    return `<div class="arow" data-reveal data-audio="${i}" style="--d:${i*50}ms">
      <div style="width:52px;flex:0 0 52px">${coverHTML(fake)}</div>
      <div class="a-info">
        <h4>${L()?a.ar:a.en}</h4>
        <small>${L()?a.hostAr:a.hostEn}</small>
        <div class="wave">${bars}</div>
      </div>
      <div style="text-align:center">
        <button class="a-play" data-ap="${i}" aria-label="${t('aud_play')}"><i class="bi bi-play-fill"></i></button>
        <div class="a-time" style="margin-top:7px">${L()?a.len:a.lenE}</div>
      </div>
    </div>`;
  }).join('');
  observeReveals($('#audioList'));
  $$('[data-ap]').forEach(b=>b.addEventListener('click',()=>speakToggle(+b.dataset.ap,b)));
}

/* ───────── 13 · الناشئة ───────── */
const KIDS_WORDS = L() ? [] : [];
function renderKids(){
  const kb = BOOKS.filter(b=>b.cat==='kids');
  $('#kidsShelf').innerHTML = kb.map((b,i)=>`
    <article class="bcard" data-reveal data-id="${b.id}" style="--d:${i*70}ms">
      <div class="bcard-cover">${coverHTML(b)}</div>
      <div class="bcard-body"><span class="cat-tag">${b.pages} ${L()?'صفحة':'pp'}</span>
      <h3>${L()?b.ar:b.en}</h3><p class="author">${L()?b.authorAr:b.authorEn}</p>
      <div class="bmeta">${stars(b.rating)}<b class="mono">${b.rating.toFixed(1)}</b></div></div>
    </article>`).join('');
  $('#kidStage').innerHTML = ['🐟','🌙','🗝️','🪶'].map((e,i)=>
    `<div class="kid-card" style="--c3:linear-gradient(150deg,${['#E2584A','#4A2A8A','#0E5A4A','#B0821F'][i]},#111)" data-kid="${i}">
       <span>${L()?['س','ش','ق','ن'][i]:['A','B','S','N'][i]}</span><span class="kc-back">${e}</span></div>`).join('');
  $$('[data-kid]').forEach(c=>c.addEventListener('click',()=>c.classList.toggle('flip')));
  observeReveals($('#kidsShelf'));
}
function kidWord(){
  const ws = L()
    ? [['يَتَبَسُّط','من التبسّط: أن يسهل الأمر بعد العسر.'],['اِسْتِقْرَاء','تتبّع الجزئيات للوصول إلى القاعدة.'],['فَصَاحَة','سلامة اللسان من اللحن والثقل.'],['بَلَاغَة','مطابقة الكلام لمقتضى الحال.']]
    : [['serendipity','finding good things you were not looking for.'],['eloquence','fluency shaped by context, not ornament.'],['archival','kept for the record, and for whoever comes next.'],['resilience','returning to form after pressure.']];
  const w = ws[Math.floor(Math.random()*ws.length)];
  $('#kidStage').innerHTML = `<div class="kid-word">${w[0]}<small>${w[1]}</small></div>`;
}

/* ───────── 14 · بطاقات التحرير ───────── */
function renderPicks(){
  const ids=[6,11,13,17,21,31,3,30];
  $('#postcards').innerHTML = ids.map((id,i)=>{
    const b = BOOKS.find(x=>x.id===id); if(!b) return '';
    const notes = L()
      ? ['لأنه يشرح ٢٠٢٦ بلغة ٢٠٠٤.','لأن الفصل السابع وحده يستحق الثمن.','اخترناه لمن ملّ من الرواية الطويلة.','أفضل مقدمة قرأناها هذا العام.','كتابٌ يُقرأ مرتين: مرة للنص ومرة للهوامش.','مانجا عربية ترسم بالإيقاع لا بالصورة.']
      : ['It explains 2026 in the language of 2004.','Chapter seven alone is worth the price.','Chosen for readers tired of the long novel.','The best introduction we read this year.','Read it twice: once for the text, once for the margins.','An Arab manga drawn in rhythm, not in pictures.'];
    return `<article class="pcard" data-reveal data-id="${b.id}" style="--rot:${(i%2?1:-1)*(1.6+i*.5)}deg;--d:${i*50}ms">
      <span class="pc-stamp">EDITOR’S PICK №${i+1}</span>
      <h4>${L()?b.ar:b.en}</h4>
      <p>${notes[i%notes.length]}</p>
      <div class="pc-by"><span class="avatar" style="background:${b.c1}">${(L()?b.authorAr:b.authorEn)[0]}</span>
        <span>${L()?b.authorAr:b.authorEn} · <b class="mono">${b.rating.toFixed(1)}★</b></span></div>
    </article>`;
  }).join('');
  $$('.pcard').forEach(p=>p.addEventListener('click',()=>openQV(+p.dataset.id)));
  observeReveals($('#postcards'));
}

/* ───────── 15 · النوادر ───────── */
function renderVault(){
  const rares = BOOKS.filter(b=>b.badges.includes('rare')).slice(0,4);
  const extra = [
    {ar:'فصول الحكم',en:'Chapters of Rule',c1:'#7A5A1E',c2:'#2A1D05',callno:'MS·1897'},
    {ar:'ديوان النظر',en:'Diwan of Looking',c1:'#5A3A2A',c2:'#1C120A',callno:'MS·1904'},
    {ar:'رسائل الجاحظ',en:'Al-Jāḥiẓ’s Epistles',c1:'#6B4A2A',c2:'#20150B',callno:'MS·1911'},
    {ar:'رحلة إلى المشرق',en:'A Journey Eastward',c1:'#8A6A2A',c2:'#2A1E08',callno:'MS·1888'}
  ];
  const cells = [...rares.map(b=>({ar:b.ar,en:b.en,c1:b.c1,c2:b.c2,callno:b.callno,id:b.id})), ...extra.map(x=>({...x,id:null}))];
  $('#vault').innerHTML = cells.map((c,i)=>`
    <div class="vcell ${i>3&&!isMember()?'locked':''}" data-reveal data-vault="${c.id||'lock'}" style="--c1:${c.c1};--c2:${c.c2};--d:${i*45}ms">
      ${i>3&&!isMember()?`<span class="lk"><i class="bi bi-lock-fill"></i></span>`:''}
      <b>${L()?c.ar:c.en}</b><small>${c.callno}</small>
    </div>`).join('');
  $$('[data-vault]').forEach(v=>v.addEventListener('click',()=>{
    const id = v.dataset.vault;
    if (id === 'lock'){ toast('warn', t('t_rare'), t('rare_btn')); openAuth('register'); return; }
    openQV(+id);
  }));
  observeReveals($('#vault'));
}

/* ───────── 16 · المؤلفون ───────── */
function renderAuthors(){
  const row = AUTHORS.map(a=>`
    <article class="acard">
      <div class="am-top"><span class="am-mono" style="--ac:${a.ac};background:${a.ac}">${a.ini}</span>
        <div><h4>${L()?a.ar:a.en}</h4><span class="mono">${L()?'مؤلف':'AUTHOR'}</span></div></div>
      <p>${L()?a.bioAr:a.bioEn}</p>
      <div class="af"><span>${a.n} ${t('auth_books')}</span><b>${a.aw} ${t('auth_awards')}</b></div>
    </article>`).join('');
  $('#authTrack').innerHTML = row + row;
}

/* ───────── 17 · الأرقام ───────── */
function renderStats(){
  const data = L()
    ? [['روايات',86],['قصص قصيرة',71],['مجلات',64],['دوريات علمية',52],['مسموعات',47],['ناشئة',38]]
    : [['Novels',86],['Short stories',71],['Magazines',64],['Journals',52],['Audiobooks',47],['Young readers',38]];
  $('#statBars').innerHTML = data.map(([n,v])=>`
    <div class="bar"><span>${n}</span><span class="bt"><span data-w="${v}"></span></span><span class="bn">${v}%</span></div>`).join('');
}

/* ───────── 18 · التحدّي ───────── */
const CIRC = 2 * Math.PI * 86;
function renderChallenge(){
  const pct = Math.min(100, Math.round(state.chal.pages / state.chal.goal * 100));
  $('#chRing').style.strokeDasharray = CIRC;
  $('#chRing').style.strokeDashoffset = CIRC - CIRC * pct / 100;
  $('#chPct').textContent = nf(pct) + '%';
  const miles = [[10,L()?'١٬٠٠٠ صفحة':'1,000 pp','bi-star'],[5000,L()?'٥٬٠٠٠':'5,000','bi-medal'],[9000,L()?'٩٬٠٠٠ · الهدف':'9,000 · goal','bi-trophy']];
  $('#chMiles').innerHTML = miles.map(([v,l,i])=>`
    <span class="mile ${state.chal.pages>=v?'done':''}"><i class="bi ${i}"></i> ${l}</span>`).join('') +
    `<span class="mile"><i class="bi bi-book"></i> ${nf(state.chal.pages)} / ${nf(state.chal.goal)}</span>`;
}

/* ───────── 19 · الندوات ───────── */
function renderEvents(){
  $('#timeline').innerHTML = EVENTS.map((e,i)=>`
    <div class="tl-item" data-reveal style="--d:${i*60}ms">
      <div class="tl-date"><b>${e.d}</b><span>${L()?e.m:(['Nov','Nov','Nov','Dec','Dec'][i]).toUpperCase()}</span></div>
      <div class="tl-body">
        <h4>${L()?e.ar:e.en}</h4>
        <p>${L()?e.hostAr:e.hostEn}</p>
        <div class="tl-tags"><span><i class="bi bi-${e.online?'broadcast':'geo-alt'}"></i> ${L()?e.placeAr:e.placeEn}</span>
          <span>${e.online?t('ev_online'):t('ev_place')}</span></div>
      </div>
      <div class="tl-act">
        <button class="btn-brass sm" data-ev="${i}">${t('ev_register')}</button>
        <span class="seats">${L()?e.seatsAr:e.seatsEn}</span>
      </div>
    </div>`).join('');
  $$('[data-ev]').forEach(b=>b.addEventListener('click',()=>{
    if(!gate(t('ev_register'))) return;
    toast('ok', t('ev_register')+' ✓', L()?'أُرسل تأكيد الحجز إلى بريدك.':'Booking confirmation sent to your email.');
  }));
  observeReveals($('#timeline'));
}

/* ───────── 20 · الآراء ───────── */
let vIdx = 0, vTimer;
function renderVoices(){
  const v = VOICES[vIdx % VOICES.length];
  const q = $('#voiceQuote'); q.classList.add('fade-out');
  setTimeout(()=>{
    q.textContent = L()?v.ar:v.en;
    $('#voiceName').textContent = L()?v.nameAr:v.nameEn;
    $('#voiceRole').textContent = L()?v.roleAr:v.roleEn;
    $('#voiceAv').textContent = (L()?v.nameAr:v.nameEn)[0];
    q.classList.remove('fade-out');
  }, RM?0:280);
  $('#voiceDots').innerHTML = VOICES.map((_,i)=>`<button class="${i===vIdx%VOICES.length?'on':''}" data-v="${i}" aria-label="${i+1}"></button>`).join('');
  $$('[data-v]').forEach(b=>b.addEventListener('click',()=>{vIdx=+b.dataset.v;renderVoices();resetVTimer();}));
}
function resetVTimer(){ clearInterval(vTimer); if(!RM) vTimer=setInterval(()=>{vIdx++;renderVoices();},6500); }

/* ───────── 21 · العضويات ───────── */
function renderPlans(){
  $('#planLadder').innerHTML = PLANS.map((p,i)=>`
    <article class="plan ${p.feat&&i===1?'feat':''}" data-plan="${i}" data-reveal style="--d:${i*80}ms">
      ${i===1?`<span class="plan-tag">${L()?'الأكثر اختياراً':'MOST CHOSEN'}</span>`:''}
      <span class="pk">${p.k}</span>
      <h3>${L()?p.ar:p.en}</h3>
      <p class="pdesc">${L()?p.dAr:p.dEn}</p>
      <div class="plan-price">${L()?p.pAr:p.pEn}<small>${p.cur} · ${L()?p.perAr:p.perEn}</small></div>
      <ul class="plan-feat">${p.items.map(([s,x])=>`<li class="${s==='n'?'no':''}"><i class="bi bi-${s==='y'?'check2':'x'}"></i>${x}</li>`).join('')}</ul>
      <button class="${i===1?'btn-brass':'btn-ink'} plan-cta" data-choose="${i}">${i===2?t('rare_btn'):t('plan_choose')}</button>
    </article>`).join('');
  $$('[data-plan]').forEach(p=>p.addEventListener('click',e=>{
    if(e.target.closest('[data-choose]')) return;
    $$('.plan').forEach(x=>x.classList.remove('open')); p.classList.toggle('open');
  }));
  $$('[data-choose]').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();
    if(!gate(t('plan_choose'))) return;
    const p = PLANS[+b.dataset.choose];
    toast('ok', (L()?p.ar:p.en)+' · '+(L()?'تم التفعيل':'Activated'), L()?'فترة تجريبية ١٤ يوماً ثم يُطلب الدفع.':'14-day trial, then billing starts.');
  }));
  observeReveals($('#planLadder'));
}

/* ───────── 22 · الأسئلة ───────── */
function renderFaq(){
  $('#faqAcc').innerHTML = FAQS.map((f,i)=>`
    <div class="accordion-item">
      <h2 class="accordion-header"><button class="accordion-button ${i?'collapsed':''}" type="button" data-bs-toggle="collapse" data-bs-target="#fq${i}">
        <span>${L()?f.qAr:f.qEn}</span></button></h2>
      <div id="fq${i}" class="accordion-collapse collapse ${i?'':'show'}" data-bs-parent="#faqAcc">
        <div class="accordion-body">${L()?f.aAr:f.aEn}</div></div>
    </div>`).join('');
}

/* ───────── 23 · المعاينة السريعة ───────── */
let qvModal;
function openQV(id){
  const b = BOOKS.find(x=>x.id===id); if(!b) return;
  const toc = L()
    ? ['الفصل الأول: البداية الناقصة','باب المجاز','الليل الأول','ما لا يُروى','الرسالة الثانية','الشاطئ الآخر','خاتمة: اسمٌ واحد','هوامش المؤلف']
    : ['Chapter One: The Missing Start','The Figure of Speech','First Night','What Goes Untold','The Second Letter','The Other Shore','Coda: One Name','Author’s Notes'];
  const revs = L()
    ? [['منى ت.','القاهرة','اللغة نظيفة والإيقاع منتبه. الفصل الثاني تحديدًا يجعلك تعيد قراءة الصفحة الأولى.'],
       ['خالد ع.','عمّان','نهاية متوقعة قليلاً، لكن البناء الشخصي ممتاز. أنصح بقراءته في طبعةٍ ورقية.'],
       ['R. Suleiman','Berlin','A rare Arabic novel that trusts its reader. The archive scenes are the best.']]
    : [['Mona T.','Cairo','Clean prose, attentive rhythm. Chapter two alone makes you re-read page one.'],
       ['Khaled A.','Amman','A slightly expected ending, superb character construction.'],
       ['R. Suleiman','Berlin','A rare novel that trusts its reader. The archive scenes are the best.']];
  const sim = BOOKS.filter(x=>x.cat===b.cat && x.id!==b.id).slice(0,5);
  const inW = state.wish.includes(b.id), inL = state.loan.includes(b.id);

  $('#qvBody').innerHTML = `
    <button class="modal-x" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i></button>
    <aside class="qv-left">
      ${coverHTML(b)}
      <div class="qv-badges">${b.badges.map(badgeEl).join('') || `<span class="bdg" style="background:var(--muted)">—</span>`}</div>
      <ul class="qv-facts">
        <li><span>${L()?'التصنيف':'Section'}</span><b>${catLabel(b.cat)}</b></li>
        <li><span>${L()?'الصفحات':'Pages'}</span><b>${b.pages}</b></li>
        <li><span>${L()?'سنة النشر':'Published'}</span><b>${b.year}</b></li>
        <li><span>${L()?'اللغة':'Language'}</span><b>${b.lang==='both'?(L()?'عربي + إنجليزي':'Ar + EN'):b.lang.toUpperCase()}</b></li>
        <li><span>${L()?'رقم الفهرس':'Call no.'}</span><b>${b.callno}</b></li>
        <li><span>${L()?'الإعارات':'Loans'}</span><b>${nf(b.votes)}</b></li>
        <li><span>${L()?'زمن القراءة':'Reading time'}</span><b>${Math.round(b.pages/1.6)} ${L()?'دقيقة':'min'}</b></li>
      </ul>
    </aside>
    <div class="qv-right">
      <div class="qv-top">
        <div><h2>${L()?b.ar:b.en}</h2><p class="au">${L()?b.authorAr:b.authorEn} · ${b.year}</p>
          <div class="bmeta" style="margin-top:8px">${stars(b.rating)}<b class="mono">${b.rating.toFixed(1)}</b><span class="mono">(${nf(b.votes)})</span></div></div>
        <div class="qv-rate"><b>${(b.rating*2).toFixed(0)}</b><small>/ 10</small></div>
      </div>
      <div class="qv-tabs">
        <button class="qvtab active" data-qt="ov">${t('qv_overview')}</button>
        <button class="qvtab" data-qt="toc">${t('qv_toc')}</button>
        <button class="qvtab" data-qt="rv">${t('qv_reviews')}</button>
      </div>
      <div class="qvpane on" data-qtp="ov"><p>${L()?b.absAr:b.absEn}</p>
        <blockquote style="border-inline-start:3px solid var(--brass);padding-inline-start:16px;margin:18px 0;color:var(--ink2);font-family:var(--font-arab);font-size:1.05rem;line-height:1.9">
          ${(L()?b.exAr:b.exEn || (L()?b.absAr:b.absEn)).slice(0,240)}…</blockquote></div>
      <div class="qvpane" data-qtp="toc"><h5 class="mono" style="color:var(--muted);font-size:.68rem;letter-spacing:.16em;margin-bottom:12px">${t('toc_h').toUpperCase()}</h5>
        <ul class="toc">${toc.map((x,i)=>`<li><b>${String(i+1).padStart(2,'0')}</b><span>${x}</span></li>`).join('')}</ul></div>
      <div class="qvpane" data-qtp="rv"><h5 class="mono" style="color:var(--muted);font-size:.68rem;letter-spacing:.16em;margin-bottom:6px">${t('rev_h').toUpperCase()}</h5>
        ${revs.map(([n,c,x])=>`<div class="rev"><span class="avatar">${n[0]}</span><div style="flex:1"><b>${n}</b> <small class="mono">· ${c}</small><p>${x}</p></div></div>`).join('')}</div>
      <div class="qv-actions">
        <button class="btn-ink" data-q="read"><i class="bi bi-book-half"></i> ${t('qv_read')}</button>
        <button class="btn-brass" data-q="borrow"><i class="bi bi-bag${inL?'-check':''}"></i> ${inL?(L()?'مُعار حالياً':'Currently loaned'):t('qv_borrow')}</button>
        <button class="btn-outline-brass" data-q="save"><i class="bi bi-heart${inW?'-fill':''}"></i> ${t('act_save')}</button>
        ${b.badges.includes('audio')?`<button class="btn-ghost" data-q="listen"><i class="bi bi-play-circle"></i> ${t('act_listen')}</button>`:''}
        <button class="btn-ghost" data-q="dl"><i class="bi bi-download"></i> ${t('qv_dl')}</button>
      </div>
      ${sim.length?`<div class="qv-sim"><h5>${t('qv_sim')}</h5><div class="sim-row">${sim.map(s=>coverHTML(s)).join('')}</div></div>`:''}
    </div>`;
  qvModal.show();
  $$('#qvBody .qvtab').forEach(tb=>tb.addEventListener('click',()=>{
    $$('#qvBody .qvtab').forEach(x=>x.classList.remove('active')); tb.classList.add('active');
    $$('#qvBody .qvpane').forEach(p=>p.classList.toggle('on', p.dataset.qtp===tb.dataset.qt));
  }));
  $$('#qvBody .sim-row .cover').forEach(c=>c.addEventListener('click',()=>openQV(+c.dataset.cover)));
  $('#qvBody [data-q="read"]').addEventListener('click',()=>{qvModal.hide();openReader(b);});
  $('#qvBody [data-q="borrow"]').addEventListener('click',()=>{toggleLoan(b.id);openQV(b.id);});
  $('#qvBody [data-q="save"]').addEventListener('click',()=>{toggleWish(b.id);openQV(b.id);});
  $('#qvBody [data-q="listen"]').addEventListener('click',()=>{
    const a = AUDIO.find(x=>x.ar===b.ar)||AUDIO[0]; qvModal.hide(); speakText(a.txtAr,a.hostAr);
  });
  $('#qvBody [data-q="dl"]').addEventListener('click',()=>{
    if(!gate(t('qv_dl'))) return;
    toast('ok', (L()?'يُحضَّر الملف':'Preparing file'), 'EPUB 3 · ' + b.pages + (L()?' صفحة':' pages'));
  });
}

/* ───────── 24 · وضع القراءة ───────── */
function openReader(b){
  state.recent.unshift(b.id); state.recent = [...new Set(state.recent)].slice(0,8); LS.set('recent', state.recent);
  const paras = (L()
    ? [(b.exAr||b.absAr), b.absAr+'', 'ظلّ النصّ يعمل حيث تعمل الذاكرة: لا يُستدعى، بل يُستثار. ولهذا لم يكن أحدٌ في المدينة يتذكّر الانقطاع، بينما كان الجميع يتذكّر ما بعده.', 'سألتْهُ: لماذا لم تخبرني سابقاً؟ أجاب: لأنك لم تسألني قطّ عن الشيء نفسه، بل عن نسخه.', 'وفي الصفحة الأخيرة، وجد القارئ اسمَه محفوراً بخطٍّ صغير، كأنّ الكتاب كان ينتظره منذ طبعته الأولى.']
    : [(b.exEn||b.absEn), b.absEn+'', 'A text works where memory works: it is not recalled, it is provoked. So nobody remembered the blackout, yet everyone remembered what came after it.', 'She asked: why didn’t you tell me sooner? He answered: because you never asked me about the thing itself, only about its copies.', 'On the last page the reader found his own name, engraved small — as if the book had been waiting for him since its first print run.']);
  $('#rdPage').className = 'reader-page f-' + (localStorage.getItem('qira_rdfont')||'serif');
  $('#rdPage').innerHTML = `<h2>${L()?b.ar:b.en}</h2>
    <p class="rd-sub">${L()?b.authorAr:b.authorEn} · ${b.callno||'EXCERPT'} · ${L()?'مقتطف من المكتبة':'A Qirāʿa excerpt'}</p>
    ${paras.map(p=>`<p>${p}</p>`).join('')}
    <blockquote>${L()?'«لا يوجد كتابٌ سيّئ؛ يوجد قارئٌ لم يجد بابه.» — من هوامش المحقّق':'“There is no bad book; only a reader who never found its door.” — from the editor’s margins'}</blockquote>
    <p>${L()?'— يتابع النص في النسخة الكاملة، متاحة للإعارة داخل المكتبة.':'— continued in the full edition, available for lending inside the library.'}</p>`;
  $('#rdTitle').textContent = L()?b.ar:b.en;
  $('#rdAuthor').textContent = L()?b.authorAr:b.authorEn;
  $('#reader').classList.add('on'); $('#reader').setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  $$('.rb-seg button').forEach(x=>x.classList.toggle('active', x.dataset.rdfont===(localStorage.getItem('qira_rdfont')||'serif')));
}
function closeReader(){ $('#reader').classList.remove('on'); $('#reader').setAttribute('aria-hidden','true'); document.body.style.overflow=''; }

/* ───────── 25 · النطق ───────── */
let speaking = false, curRow = null, curBtn = null;
function voices(){ return window.speechSynthesis ? speechSynthesis.getVoices() : []; }
function fillVoiceSel(){
  const vs = voices();
  $('#ttsVoice').innerHTML = vs.length
    ? vs.map((v,i)=>`<option value="${i}">${v.name} · ${v.lang}</option>`).join('')
    : `<option>${L()?'لا أصوات متاحة':'No system voices'}</option>`;
}
function speakText(text, label){
  if(!('speechSynthesis' in window)){ toast('err', t('t_novoice')); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const vs = voices(); const pref = +$('#ttsVoice')?.value || 0;
  const ar = vs.find(v=>/^ar/i.test(v.lang));
  if (vs[pref] && L()===false) u.voice = vs[pref];
  else if (ar && L()) u.voice = ar;
  u.lang = L()?'ar-SA':'en-US';
  u.rate = +($('#ttsRate')?.value || 1);
  speechSynthesis.speak(u);
  toast('ok', t('t_voice'), label || (L()?'مقتطف اليوم':'today’s excerpt'));
}
function speakToggle(i, btn){
  const row = btn.closest('.arow');
  if (speaking){ speechSynthesis.cancel(); speaking=false; row.classList.remove('playing'); btn.innerHTML='<i class="bi bi-play-fill"></i>'; curRow=null; return; }
  const a = AUDIO[i];
  speakText(L()?a.txtAr:a.txtEn, L()?a.hostAr:a.hostEn);
  speaking = true; row.classList.add('playing'); btn.innerHTML='<i class="bi bi-stop-fill"></i>';
  curRow = row;
  speechSynthesis.onend = ()=>{ speaking=false; row.classList.remove('playing'); btn.innerHTML='<i class="bi bi-play-fill"></i>'; };
}

/* ───────── 26 · القائمة / الإعارة / الفواصل ───────── */
function toggleWish(id){
  const i = state.wish.indexOf(id);
  if(i>-1){ state.wish.splice(i,1); toast('warn', t('t_unsaved')); }
  else { state.wish.push(id); toast('ok', t('t_saved'), L()?BOOKS.find(b=>b.id===id).ar:BOOKS.find(b=>b.id===id).en); }
  LS.set('wish', state.wish); renderCatalog(); renderDeskLists(); updCounts();
}
function toggleLoan(id){
  if(!gate(t('qv_borrow'))) return;
  const b = BOOKS.find(x=>x.id===id), i = state.loan.indexOf(id);
  if(i>-1){ state.loan.splice(i,1); toast('warn', t('t_returned'), L()?b.ar:b.en); }
  else { state.loan.push(id); toast('ok', t('t_borrowed'), (L()?b.ar:b.en)+' · '+(L()?'٧ أيام':'7 days')); }
  LS.set('loan', state.loan); renderCatalog(); renderDeskLists(); renderVault(); updCounts();
}
function renderDeskLists(){
  const wl = state.wish.map(id=>BOOKS.find(b=>b.id===id)).filter(Boolean);
  $('#wishList').innerHTML = wl.length
    ? wl.map(b=>`<li><span class="mono">${b.callno}</span><b>${L()?b.ar:b.en}</b><button class="rm" data-unwish="${b.id}"><i class="bi bi-x-lg"></i></button></li>`).join('')
    : `<li><span class="mono">—</span><b>${L()?'لا شيء بعد. اضغط «احفظ» على أي كتاب.':'Nothing yet — hit Save on any book.'}</b></li>`;
  $('#wishCount').textContent = nf(wl.length);
  $$('[data-unwish]').forEach(b=>b.addEventListener('click',()=>toggleWish(+b.dataset.unwish)));
  $('#bmList').innerHTML = state.bm.length
    ? state.bm.map(x=>`<li><span class="mono">${x.p||'—'}</span><b>${x.n}</b></li>`).join('')
    : `<li><span class="mono">—</span><b>${L()?'افتح كتاباً واضغط علامة الفاصل.':'Open a book and press the bookmark icon.'}</b></li>`;
  $('#bmCount').textContent = nf(state.bm.length);
}
function updCounts(){
  $('#cntWish').textContent = state.wish.length;
  $('#cntLoan').textContent = state.loan.length;
}

/* ───────── 27 · الملاحظات ───────── */
function renderNotes(){
  $('#noteList').innerHTML = state.notes.length
    ? state.notes.map((n,i)=>`<li><span class="mono">${n.d}</span><span style="flex:1">${n.x}</span><button data-delnote="${i}" style="background:none;border:0;color:#7E958D;cursor:pointer"><i class="bi bi-trash3"></i></button></li>`).join('')
    : '';
  $('#noteCount').textContent = nf(state.notes.length);
  $$('[data-delnote]').forEach(b=>b.addEventListener('click',()=>{state.notes.splice(+b.dataset.delnote,1);LS.set('notes',state.notes);renderNotes();}));
}

/* ───────── 28 · المؤقّت ───────── */
let pomoLen = 25*60, pomoLeft = 25*60, pomoInt = null, pomoMode='focus';
const RC = 2*Math.PI*52;
function pomoRender(){
  const m = Math.floor(pomoLeft/60), s = pomoLeft%60;
  $('#timerTxt').textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  $('#timerRing').style.strokeDasharray = RC;
  $('#timerRing').style.strokeDashoffset = RC - RC*(pomoLeft/pomoLen);
  $('#timerMode').textContent = pomoMode==='focus' ? (L()?`تركيز ${pomoLen/60}`:`Focus ${pomoLen/60}`) : (L()?`راحة ${pomoLen/60}`:`Break ${pomoLen/60}`);
}
function pomoTick(){
  pomoLeft--;
  if(pomoLeft<=0){
    clearInterval(pomoInt); pomoInt=null;
    if(pomoMode==='focus'){ addSession(); state.chal.pages += Math.round(pomoLen/60*46); LS.set('chal',state.chal); renderChallenge(); }
    toast('ok', t('t_timer'), L()?'خذ راحة قصيرة ثم عُد.':'Take a short break, then return.');
    pomoLeft = pomoLen; pomoRender(); $('#timerStart').innerHTML=`<i class="bi bi-play-fill"></i> ${t('desk_timer_start')}`;
    return;
  }
  pomoRender();
}
let sessN = LS.get('sess', 0);
function addSession(){ sessN++; LS.set('sess',sessN); renderSessions(); }
function renderSessions(){ $('#sessDots').innerHTML = Array.from({length:8},(_,i)=>`<i class="${i<sessN?'on':''}"></i>`).join(''); }

/* ───────── 29 · لوحة الأوامر ───────── */
let palSel = 0;
function palItems(){
  const acts = [
    {i:'bi-moon-stars', n:L()?'تبديل الوضع الليلي':'Toggle dark mode', k:'theme'},
    {i:'bi-translate', n:L()?'التبديل إلى الإنجليزية':'Switch to English', k:'lang'},
    {i:'bi-person-plus', n:t('btn_register'), k:'reg'},
    {i:'bi-box-arrow-in-left', n:t('btn_login'), k:'login'},
    {i:'bi-shuffle', n:t('desk_random_btn'), k:'rand'},
    {i:'bi-list-check', n:L()?'قائمة القراءة':'Reading list', k:'wish'},
    {i:'bi-pencil-square', n:L()?'دفتر الملاحظات':'Notebook', k:'note'},
    {i:'bi-download', n:L()?'صدّر قائمة القراءة':'Export reading list', k:'exp'}
  ];
  const navs = [{i:'bi-house',n:t('nav_home'),h:'#home'},{i:'bi-newspaper',n:t('nav_mag'),h:'#magazines'},
    {i:'bi-broadcast',n:t('nav_audio'),h:'#audio'},{i:'bi-journal-text',n:t('nav_desk'),h:'#desk'},
    {i:'bi-award',n:t('nav_rare'),h:'#rare'},{i:'bi-gem',n:t('nav_plans'),h:'#plans'},{i:'bi-calendar-event',n:t('nav_events'),h:'#events'}];
  const q = $('#palInput').value.toLowerCase().trim();
  const books = BOOKS.filter(b=>!q || [b.ar,b.en,b.authorAr,b.authorEn].join(' ').toLowerCase().includes(q)).slice(0,7);
  const A = acts.filter(a=>!q||a.n.toLowerCase().includes(q));
  const N = navs.filter(a=>!q||a.n.toLowerCase().includes(q));
  let out='', idx=0; const flat=[];
  if(A.length){ out+=`<div class="pal-group">${t('cp_actions')}</div>`; A.forEach(a=>{out+=`<div class="pal-item" data-i="${idx}"><i class="bi ${a.i}"></i>${a.n}<small>ACT</small></div>`;flat.push({t:'act',v:a.k});idx++;}); }
  if(N.length){ out+=`<div class="pal-group">${t('cp_nav')}</div>`; N.forEach(a=>{out+=`<div class="pal-item" data-i="${idx}"><i class="bi ${a.i}"></i>${a.n}<small>NAV</small></div>`;flat.push({t:'nav',v:a.h});idx++;}); }
  if(books.length){ out+=`<div class="pal-group">${t('cp_books')}</div>`; books.forEach(b=>{out+=`<div class="pal-item" data-i="${idx}"><i class="bi bi-book"></i>${L()?b.ar:b.en}<small>${b.year}</small></div>`;flat.push({t:'book',v:b.id});idx++;}); }
  $('#palOut').innerHTML = out || `<div class="pal-item"><i class="bi bi-emoji-dizzy"></i>${L()?'لا نتائج':'No results'}</div>`;
  window._flat = flat; palSel = 0; markSel();
}
function markSel(){ $$('#palOut .pal-item').forEach(e=>e.classList.toggle('sel', +e.dataset.i===palSel)); }
function runPal(i){
  const it = (window._flat||[])[i]; if(!it) return;
  closePalette();
  if(it.t==='book') openQV(it.v);
  else if(it.t==='nav') document.querySelector(it.v)?.scrollIntoView({behavior:RM?'auto':'smooth'});
  else ({
    theme:()=>{applyTheme(state.theme==='dark'?'light':'dark');toast('ok',state.theme==='dark'?t('t_theme_on'):t('t_theme_off'));},
    lang:()=>applyLang(L()?'en':'ar'),
    reg:()=>openAuth('register'), login:()=>openAuth('login'), rand:()=>randomPick(),
    wish:()=>{setFilter('wish');document.getElementById('catalog').scrollIntoView({behavior:RM?'auto':'smooth'});},
    note:()=>{document.getElementById('desk').scrollIntoView({behavior:RM?'auto':'smooth'});setTimeout(()=>$('#noteBox').focus(),500);},
    exp:()=>exportList()
  })[it.v]?.();
}
function openPalette(){ $('#palette').classList.add('on'); $('#palette').setAttribute('aria-hidden','false'); $('#palInput').value=''; palItems(); $('#palInput').focus(); }
function closePalette(){ $('#palette').classList.remove('on'); $('#palette').setAttribute('aria-hidden','true'); }

/* ───────── 30 · متفرقات ───────── */
function randomPick(){
  const b = BOOKS[Math.floor(Math.random()*BOOKS.length)];
  $('#pickResult').innerHTML = `<div class="pick-in">${coverHTML(b)}<div><b>${L()?b.ar:b.en}</b><small>${L()?b.authorAr:b.authorEn} · ${b.year}</small></div></div>`;
  toast('ok', t('t_pick'), (L()?b.ar:b.en));
  return b;
}
function exportList(){
  const wl = state.wish.map(id=>BOOKS.find(b=>b.id===id)).filter(Boolean);
  if(!wl.length){ toast('warn', L()?'قائمتك فارغة':'Your list is empty'); return; }
  const txt = (L()?'مكتبة قراءة — قائمة القراءة\n':'Qirāʿa Library — Reading list\n') + '='.repeat(34) + '\n\n' +
    wl.map((b,i)=>`${String(i+1).padStart(2,'0')}. ${L()?b.ar:b.en} — ${L()?b.authorAr:b.authorEn} (${b.year}, ${b.pages} pp, ${b.callno})`).join('\n') +
    `\n\n${L()?'الصفحات الإجمالية':'Total pages'}: ${wl.reduce((s,b)=>s+b.pages,0)}\n`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([txt],{type:'text/plain;charset=utf-8'}));
  a.download = 'qira-reading-list.txt'; a.click(); URL.revokeObjectURL(a.href);
  toast('ok', t('t_copied'), a.download);
}
let scrambleTimer;
function scramble(){
  const el = $('.scramble'); if(!el || RM) return;
  const target = el.dataset[state.lang] || el.dataset.ar;
  const pool = L() ? 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي٠١٢٣٤٥٦٧٨٩' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#*/·—';
  let frame = 0;
  clearInterval(scrambleTimer);
  scrambleTimer = setInterval(()=>{
    el.textContent = target.split('').map((ch,i)=>{
      if(ch===' ') return ' ';
      if(i < frame) return ch;
      return pool[Math.floor(Math.random()*pool.length)];
    }).join('');
    frame += .6;
    if(frame >= target.length){ clearInterval(scrambleTimer); el.textContent = target; }
  }, 38);
}
let io;
function observeReveals(scope = document){
  if(RM){ $$('[data-reveal]', scope).forEach(e=>e.classList.add('in')); return; }
  if(!io) io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }), {threshold:.12, rootMargin:'0px 0px -8% 0px'});
  $$('[data-reveal]', scope).forEach(e=>io.observe(e));
}
function counters(){
  const o = new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting) return; o.unobserve(e.target);
    const el = e.target, to = +el.dataset.count, suf = el.dataset.suffix||'';
    if(RM){ el.textContent = nf(to)+suf; return; }
    let s = null;
    requestAnimationFrame(function step(ts){
      if(!s) s = ts; const p = Math.min(1,(ts-s)/1500);
      el.textContent = nf(Math.floor(to * (1-Math.pow(1-p,3)))) + suf;
      if(p<1) requestAnimationFrame(step);
    });
  }), {threshold:.4});
  $$('.counter').forEach(c=>o.observe(c));
  const b = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.style.width = e.target.dataset.w+'%'; b.unobserve(e.target);} }),{threshold:.4});
  $$('.bar .bt span').forEach(x=>b.observe(x));
  const d = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ $('#donutFg').style.strokeDashoffset = 314-314*.68; d.unobserve(e.target);} }),{threshold:.4});
  if($('#donutFg')) d.observe($('.donut'));
  const m = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ $$('.mask-line', e.target).forEach(x=>x.classList.add('in')); m.unobserve(e.target);} }),{threshold:.3});
  $$('.sec-head, .desk-aside, .kids-copy, .rare-copy, .ch-copy').forEach(x=>m.observe(x));
}
function footCats(){ $('#footCats').innerHTML = CATS.slice(0,6).map(c=>`<li><a href="#catalog" data-fc="${c.id}">${pick(c)} <span class="mono" style="opacity:.6">${nf(c.n)}</span></a></li>`).join('');
  $$('[data-fc]').forEach(a=>a.addEventListener('click',()=>setCat(a.dataset.fc))); }

/* ───────── 31 · المصادقة ───────── */
let authModal;
function openAuth(tab){
  authModal.show();
  const map={login:'#tabLogin',register:'#tabReg',guest:'#tabGuest'};
  const pane = $(map[tab]||'#tabLogin');
  bootstrap.Tab.getOrCreateInstance($('.atab[data-bs-target="'+map[tab]+'"]')).show();
  if(tab==='guest') $('#guestEnter').focus();
  return pane;
}
function hash(s){ let h=0; for(let i=0;i<s.length;i++){h=((h<<5)-h+s.charCodeAt(i))|0;} return 'h'+Math.abs(h); }
function users(){ return LS.get('users', [
  {name:L()?'قارئ تجريبي':'Demo Reader', email:'reader@qira.ae', pw:hash('123456'), joined:2024}
]); }
function saveUsers(u){ LS.set('users', u); }
function setSession(s){ state.user=s; LS.set('session',s); renderSession(); }
function renderSession(){
  const on = !!state.user;
  $('#userChip').classList.toggle('d-none', !on);
  $('#btnLoginTop').classList.toggle('d-none', on);
  $('#btnRegTop').classList.toggle('d-none', on || (state.user && !state.user.guest));
  if(on){
    const nm = state.user.name;
    $('#userAvatar').textContent = nm[0] || 'ق';
    $('#userName').textContent = nm;
    $('#udName').textContent = nm + (state.user.guest ? (L()?' (زائر)':' (guest)') : '');
    $('#udMail').textContent = state.user.email || (L()?'جلسة زائر مؤقتة':'temporary guest session');
  }
  updCounts(); renderVault();
}
function fieldErr(inp,msg){ const f=inp.closest('.fld'); f.classList.add('bad'); $('.err',f).textContent=msg; }
function clearErrs(form){ $$('.fld',form).forEach(f=>{f.classList.remove('bad'); const e=$('.err',f); if(e) e.textContent='';}); }
const mailOk = v => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v);

$('#loginForm').addEventListener('submit', e=>{
  e.preventDefault(); clearErrs(e.target);
  const em = e.target.email.value.trim(), pw = e.target.password.value;
  let bad=false;
  if(!mailOk(em)){ fieldErr(e.target.email,t('err_mail')); bad=true; }
  if(pw.length<4){ fieldErr(e.target.password,t('err_pass')); bad=true; }
  if(bad) return;
  const u = users().find(x=>x.email.toLowerCase()===em.toLowerCase());
  if(!u){ fieldErr(e.target.email,t('err_nouser')); return; }
  if(u.pw!==hash(pw)){ fieldErr(e.target.password,t('err_wrong')); return; }
  setSession({name:u.name,email:u.email,guest:false});
  authModal.hide(); e.target.reset();
  toast('ok', t('t_welcome')+'، '+u.name, L()?'تمت مزامنة قائمتك وملاحظاتك.':'Your list and notes are synced.');
});
$('#regForm').addEventListener('submit', e=>{
  e.preventDefault(); clearErrs(e.target);
  const nm=e.target.name.value.trim(), em=e.target.email.value.trim(), pw=e.target.password.value, cf=e.target.confirm.value;
  let bad=false;
  if(nm.length<2){ fieldErr(e.target.name,t('err_name')); bad=true; }
  if(!mailOk(em)){ fieldErr(e.target.email,t('err_mail')); bad=true; }
  if(pw.length<8){ fieldErr(e.target.password,t('err_pass')); bad=true; }
  if(pw!==cf){ fieldErr(e.target.confirm,t('err_match')); bad=true; }
  if(!e.target.terms.checked){ fieldErr(e.target.terms,t('err_terms')); bad=true; }
  const us=users();
  if(us.some(x=>x.email.toLowerCase()===em.toLowerCase())){ fieldErr(e.target.email,t('err_exist')); bad=true; }
  if(bad) return;
  us.push({name:nm,email:em,pw:hash(pw),joined:2026}); saveUsers(us);
  setSession({name:nm,email:em,guest:false});
  authModal.hide(); e.target.reset(); $$('.pw-meter i').forEach(i=>i.className='');
  toast('ok', t('t_registered'), (L()?'مرحباً '+nm+' — فترة تجريبية ١٤ يوماً مفتوحة.':'Welcome '+nm+' — 14-day trial unlocked.'));
});
$('#guestEnter').addEventListener('click', ()=>{
  setSession({name:L()?'زائر':'Guest', email:'', guest:true, exp:Date.now()+3600e3});
  authModal.hide();
  toast('warn', t('t_guest'), L()?'الإعارة والتنزيل يحتاجان حساباً.':'Borrowing & downloads need an account.');
});
$('#logoutBtn').addEventListener('click', e=>{ e.preventDefault(); $('#userDrop').classList.remove('on');
  setSession(null); toast('ok', t('t_logout')); });
$('#fillDemo').addEventListener('click', ()=>{
  $('#loginForm').email.value='reader@qira.ae'; $('#loginForm').password.value='123456';
  toast('ok', t('t_fill'));
});
$$('.pw-eye').forEach(b=>b.addEventListener('click',()=>{
  const inp=b.parentElement.querySelector('input'); const s=inp.type==='password';
  inp.type = s?'text':'password'; b.innerHTML=`<i class="bi bi-eye${s?'-slash':''}"></i>`;
}));
$('#regForm').password.addEventListener('input', e=>{
  const v=e.target.value; let sc=0;
  if(v.length>=8)sc++; if(/[A-Z]/.test(v)||/[\u0600-\u06FF]{8,}/.test(v))sc++; if(/\d/.test(v))sc++; if(/[^\w\s]/.test(v))sc++;
  $$('#regForm .pw-meter i').forEach((i,k)=>i.className = k<sc ? 'on'+sc : '');
});
/* انتهاء جلسة الزائر */
setInterval(()=>{ if(state.user?.guest && Date.now()>state.user.exp){ setSession(null); toast('warn', L()?'انتهت جلسة الزائر':'Guest session expired'); }},30000);

/* ───────── 32 · الأحداث العامة ───────── */
function bindGlobal(){
  /* delegated: book cards */
  $('#bookGrid').addEventListener('click', e=>{
    const card = e.target.closest('.bcard'); if(!card) return;
    const id = +card.dataset.id, btn = e.target.closest('[data-act]');
    if(!btn){ openQV(id); return; }
    const a = btn.dataset.act;
    if(a==='preview') openQV(id);
    else if(a==='save') toggleWish(id);
    else if(a==='borrow') toggleLoan(id);
    else if(a==='read') openReader(BOOKS.find(b=>b.id===id));
  });
  /* toolbar */
  $('#catSearch').addEventListener('input', debounce(e=>{ state.q=e.target.value; state.shown=12; renderCatalog(); },180));
  $('#catSel').addEventListener('change', e=>{ state.cat=e.target.value; state.shown=12; renderCatalog(); });
  $('#langSel').addEventListener('change', e=>{ state.langF=e.target.value; renderCatalog(); });
  $('#sortSel').addEventListener('change', e=>{ state.sort=e.target.value; renderCatalog(); });
  $$('.viewtog button').forEach(b=>b.addEventListener('click',()=>{
    $$('.viewtog button').forEach(x=>x.classList.remove('active')); b.classList.add('active');
    state.view=b.dataset.view; renderCatalog();
  }));
  $('#quickChips').addEventListener('click', e=>{
    const c=e.target.closest('.fchip'); if(!c) return;
    $$('.fchip').forEach(x=>x.classList.remove('active')); c.classList.add('active');
    state.filter=c.dataset.filter; state.shown=12; renderCatalog();
  });
  $('#loadMore').addEventListener('click',()=>{ state.shown+=8; renderCatalog(); });
  $('#resetAll').addEventListener('click', resetFilters);
  function resetFilters(){
    state.q=''; state.cat='all'; state.langF='all'; state.filter='all'; state.sort='pop'; state.shown=12;
    $('#catSearch').value=''; $('#catSel').value='all'; $('#langSel').value='all'; $('#sortSel').value='pop';
    $$('.fchip').forEach(x=>x.classList.toggle('active', x.dataset.filter==='all'));
    renderCatalog(); toast('ok', t('t_reset'));
  }
  /* hero search + chips */
  $('#heroSearch').addEventListener('submit', e=>{
    e.preventDefault(); state.q=$('#heroInput').value; $('#catSearch').value=state.q; state.shown=12; renderCatalog();
    document.getElementById('catalog').scrollIntoView({behavior:RM?'auto':'smooth'});
  });
  $('#navSearchForm').addEventListener('submit', e=>{
    e.preventDefault(); openPalette(); $('#palInput').value=$('#navSearch').value; palItems();
  });
  $('#navSearch').addEventListener('focus', openPalette);
  $$('.hero-chips .chip').forEach(c=>c.addEventListener('click',()=>{
    if(c.id==='blindBtn'){ const b=randomPick(); setTimeout(()=>openQV(b.id),450); return; }
    if(c.dataset.filter){ state.filter=c.dataset.filter; $$('.fchip').forEach(x=>x.classList.toggle('active',x.dataset.filter===state.filter)); }
    if(c.dataset.q){ state.q=c.dataset.q; $('#catSearch').value=''; state.filter='new'; $$('.fchip').forEach(x=>x.classList.toggle('active',x.dataset.filter==='new')); }
    state.shown=12; renderCatalog(); document.getElementById('catalog').scrollIntoView({behavior:RM?'auto':'smooth'});
  }));
  /* theme / lang / font */
  $('#themeBtn').addEventListener('click',()=>{ applyTheme(state.theme==='dark'?'light':'dark'); toast('ok', state.theme==='dark'?t('t_theme_on'):t('t_theme_off')); });
  $('#langBtn').addEventListener('click',()=>applyLang(L()?'en':'ar'));
  $$('[data-font]').forEach(b=>b.addEventListener('click',()=>applyScale(state.read + (+b.dataset.font)*.05)));
  /* auth openers */
  $$('[data-open-auth]').forEach(b=>b.addEventListener('click', e=>{ e.preventDefault(); openAuth(b.dataset.openAuth); }));
  /* user chip */
  $('#userChipBtn').addEventListener('click', e=>{ e.stopPropagation(); $('#userDrop').classList.toggle('on'); });
  document.addEventListener('click', ()=>$('#userDrop').classList.remove('on'));
  $$('[data-tab-user]').forEach(a=>a.addEventListener('click', e=>{
    e.preventDefault(); $('#userDrop').classList.remove('on');
    const m={wish:'wish',loan:'loan',bm:'desk',notes:'desk'};
    if(m[a.dataset.tabUser]==='wish'){ state.filter='wish'; $$('.fchip').forEach(x=>x.classList.toggle('active',x.dataset.filter==='wish')); renderCatalog(); document.getElementById('catalog').scrollIntoView({behavior:RM?'auto':'smooth'}); }
    else { document.getElementById('desk').scrollIntoView({behavior:RM?'auto':'smooth'}); }
  }));
  /* desk */
  $('#noteSave').addEventListener('click',()=>{
    const v=$('#noteBox').value.trim(); if(!v){ toast('warn', t('t_notes_empty')); return; }
    state.notes.unshift({x:v, d:new Date().toLocaleDateString(L()?'ar-EG':'en-GB',{day:'2-digit',month:'2-digit'})});
    LS.set('notes',state.notes); $('#noteBox').value=''; renderNotes(); toast('ok', t('t_note'));
  });
  $('#noteClear').addEventListener('click',()=>{ state.notes=[]; LS.set('notes',[]); renderNotes(); $('#noteBox').value=''; });
  $('#deskRandom').addEventListener('click',()=>{ const b=randomPick(); setTimeout(()=>openQV(b.id),500); });
  $('#blindBtn');
  $('#ttsRate').addEventListener('input',e=>$('#ttsRateVal').textContent=(+e.target.value).toFixed(1)+'×');
  $('#ttsPlay').addEventListener('click',()=>{ const b=BOOKS[Math.floor(Math.random()*BOOKS.length)]; speakText(L()?b.exAr||b.absAr:b.exEn||b.absEn, L()?b.ar:b.en); });
  $('#ttsStop').addEventListener('click',()=>{ speechSynthesis?.cancel(); toast('warn', L()?'توقف النطق':'Stopped'); });
  $('#exportList').addEventListener('click', exportList);
  $('#printList').addEventListener('click',()=>window.print());
  $$('[data-pomo]').forEach(b=>b.addEventListener('click',()=>{
    $$('[data-pomo]').forEach(x=>x.classList.remove('active')); b.classList.add('active');
    const m=b.dataset.pomo; pomoMode = m==='5'?'break':'focus'; pomoLen=+m*60; pomoLeft=pomoLen; pomoRender();
  }));
  $('#timerStart').addEventListener('click',()=>{
    if(pomoInt){ clearInterval(pomoInt); pomoInt=null; $('#timerStart').innerHTML=`<i class="bi bi-play-fill"></i> ${t('desk_timer_start')}`; return; }
    pomoInt=setInterval(pomoTick,1000); $('#timerStart').innerHTML=`<i class="bi bi-pause-fill"></i> ${L()?'إيقاف':'Pause'}`;
  });
  $('#timerReset').addEventListener('click',()=>{ clearInterval(pomoInt); pomoInt=null; pomoLeft=pomoLen; pomoRender(); $('#timerStart').innerHTML=`<i class="bi bi-play-fill"></i> ${t('desk_timer_start')}`; });
  /* challenge */
  $('#chAdd').addEventListener('click',()=>{
    const n=Math.max(1,+$('#chPages').value||0);
    state.chal.pages+=n; LS.set('chal',state.chal); renderChallenge();
    toast('ok', t('t_chal'), '+'+nf(n)+(L()?' صفحة':' pages'));
  });
  $('#chReset').addEventListener('click',()=>{ state.chal.pages=0; LS.set('chal',state.chal); renderChallenge(); });
  /* kids */
  $('#kidFlip').addEventListener('click',()=>{ $$('[data-kid]').forEach((c,i)=>setTimeout(()=>c.classList.toggle('flip'), i*130)); });
  $('#kidWord').addEventListener('click', kidWord);
  /* audio */
  $('#stopAllAudio').addEventListener('click',()=>{ speechSynthesis?.cancel(); speaking=false; $$('.arow').forEach(r=>{r.classList.remove('playing');const b=$('[data-ap]',r); if(b)b.innerHTML='<i class="bi bi-play-fill"></i>';}); });
  /* magazines nav */
  $('#magPrev').addEventListener('click',()=>{ magIdx=(magIdx-1+MAGS.length)%MAGS.length; renderMags(); });
  $('#magNext').addEventListener('click',()=>{ magIdx=(magIdx+1)%MAGS.length; renderMags(); });
  $$('[data-sub="mag"]').forEach(b=>b.addEventListener('click',sub));
  /* newsletter */
  $('#newsForm').addEventListener('submit', e=>{
    e.preventDefault(); const v=$('#newsMail').value.trim();
    if(!mailOk(v)){ $('#newsMail').style.borderColor='var(--accent)'; toast('err', t('err_mail')); return; }
    $('#newsMail').style.borderColor=''; $('#newsMail').value='';
    toast('ok', t('t_sub_ok'), v);
  });
  /* reader */
  $('#rdClose').addEventListener('click', closeReader);
  $$('.rb-seg button').forEach(b=>b.addEventListener('click',()=>{
    $$('.rb-seg button').forEach(x=>x.classList.remove('active')); b.classList.add('active');
    $('#rdPage').className='reader-page f-'+b.dataset.rdfont; localStorage.setItem('qira_rdfont',b.dataset.rdfont);
  }));
  $('#rdSize').addEventListener('input', e=>$('#rdPage').style.setProperty('--rsz', e.target.value+'px'));
  $('#rdSpace').addEventListener('input', e=>$('#rdPage').style.setProperty('--rspace', e.target.value));
  $('#rdWide').addEventListener('click', e=>{ $('#rdPage').classList.toggle('wide'); e.currentTarget.classList.toggle('on'); });
  $('#rdTts').addEventListener('click',()=>speakText($('#rdPage').innerText.slice(0,600), $('#rdTitle').textContent));
  $('#rdBm').addEventListener('click', e=>{
    if(!gate(t('ud_bm'))) return;
    state.bm.unshift({n:$('#rdTitle').textContent, p:(L()?'ص ':'p ')+Math.max(1,Math.round($('#rfFill').style.width?parseFloat($('#rfFill').style.width):0))});
    state.bm=state.bm.slice(0,12); LS.set('bm',state.bm); renderDeskLists(); e.currentTarget.classList.add('on'); toast('ok', t('t_bm'));
  });
  $('.reader-body').addEventListener('scroll', e=>{
    const el=e.target, p=el.scrollTop/(el.scrollHeight-el.clientHeight||1)*100;
    $('#rfFill').style.width=p+'%'; $('#rdProg').textContent=Math.round(p)+'%';
  });
  /* palette */
  $('#openPalette').addEventListener('click', e=>{ e.preventDefault(); openPalette(); });
  $('#palInput').addEventListener('input', palItems);
  $('#palette').addEventListener('click', e=>{ if(e.target.id==='palette') closePalette(); });
  $('#palOut').addEventListener('click', e=>{ const it=e.target.closest('.pal-item'); if(it&&it.dataset.i!=null) runPal(+it.dataset.i); });
  document.addEventListener('keydown', e=>{
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openPalette(); return; }
    if(e.key==='Escape'){ closePalette(); if($('#reader').classList.contains('on')) closeReader(); }
    if($('#palette').classList.contains('on')){
      const n=(window._flat||[]).length;
      if(e.key==='ArrowDown'){ e.preventDefault(); palSel=(palSel+1)%n; markSel(); }
      if(e.key==='ArrowUp'){ e.preventDefault(); palSel=(palSel-1+n)%n; markSel(); }
      if(e.key==='Enter'){ e.preventDefault(); runPal(palSel); }
    }
    if(e.key==='/' && !/input|textarea|select/i.test(document.activeElement.tagName)){ e.preventDefault(); openPalette(); }
  });
  /* scroll */
  const secs = $$('.sec, .hero');
  window.addEventListener('scroll', ()=>{
    const y=scrollY, h=document.body.scrollHeight-innerHeight;
    $('#scrollBar').style.width=(y/h*100)+'%';
    $('#navwrap').classList.toggle('stuck', y>26);
    $('#toTop').classList.toggle('on', y>700);
  }, {passive:true});
  $('#toTop').addEventListener('click',()=>scrollTo({top:0,behavior:RM?'auto':'smooth'}));
  /* smooth anchors + collapse mobile nav */
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{
    const c=bootstrap.Collapse.getInstance($('#mainNav')); if(c && window.innerWidth<1200 && a.getAttribute('href').length>1) c.hide();
  }));
  /* stack auto */
  if(!RM) setInterval(nextCard, 5200);
  $('#cdNext').addEventListener('click', nextCard);
  /* clock */
  setInterval(()=>{
    const d=new Date();
    $('#tbClock').textContent = d.toLocaleTimeString(L()?'ar-EG':'en-GB',{hour:'2-digit',minute:'2-digit'});
    const hr=d.getHours(), open = hr>=9 && hr<22;
    $('#openState').textContent = open ? t('tb_open') : (L()?'المكتبة مغلقة — الخدمة الرقمية تعمل':'Closed — digital services still run');
  }, 1000);
  /* speech voices */
  if('speechSynthesis' in window){ fillVoiceSel(); speechSynthesis.onvoiceschanged = fillVoiceSel; }
}
function debounce(fn,ms){ let t; return (...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms);}; }

/* ───────── 33 · الإقلاع ───────── */
function renderAll(){
  buildCatSel(); renderCatalog(); renderTickers(); renderLive(); renderBento(); renderMags();
  renderStories(); renderAudio(); renderKids(); renderPicks(); renderVault(); renderAuthors();
  renderStats(); renderChallenge(); renderEvents(); renderVoices(); renderPlans(); renderFaq();
  renderNotes(); renderDeskLists(); renderSessions(); pomoRender(); footCats();
  $$('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));
  $$('[data-i18n-ph]').forEach(e=>e.placeholder=t(e.dataset.i18nPh));
  scramble();
}
function init(){
  qvModal = new bootstrap.Modal('#qvModal');
  authModal = new bootstrap.Modal('#authModal');
  applyTheme(state.theme);
  applyScale(state.read);
  applyLang(state.lang);
  renderSpines(); renderStack();
  bindGlobal();
  observeReveals();
  counters();
  resetVTimer();
  renderSession();
  $('#rdSize').value = 20; $('#rdPage').style.setProperty('--rsz','20px');
  setTimeout(()=>{$$('.mask-line').forEach(x=>x.classList.add('in'));},400);
  console.log('%cمكتبة قراءة','font-size:22px;color:#B0821F;font-weight:700','· Qirāʿa Library loaded ·', BOOKS.length,'titles,',MAGS.length,'issues');
}
document.readyState==='loading' ? document.addEventListener('DOMContentLoaded', init) : init();