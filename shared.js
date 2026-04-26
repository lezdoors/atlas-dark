const { useEffect, useRef, useState } = React;
const TOK = location.search || "";
const M = (p) => p + TOK;

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: options.threshold ?? 0.14, rootMargin: options.rootMargin ?? "0px 0px -8% 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}
function Reveal({ children, className = "", delay = 0, speed = "", as: As = "div", ...props }) {
  const [ref, inView] = useInView();
  return (
    <As ref={ref} className={`reveal ${speed} ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...(props.style || {}) }} {...props}>
      {children}
    </As>
  );
}
function WordReveal({ text, className = "", as: As = "h2", delay = 0, perWord = 60 }) {
  const [ref, inView] = useInView();
  const words = text.split(/(\s+)/);
  return (
    <As ref={ref} className={`word-reveal ${inView ? "in" : ""} ${className}`}>
      {words.map((w, i) =>
        /^\s+$/.test(w) ? <span key={i}>{w}</span> : (
          <span className="w" key={i}>
            <span style={{ transitionDelay: `${delay + i * perWord}ms` }}
              dangerouslySetInnerHTML={{ __html: w }} />
          </span>
        )
      )}
    </As>
  );
}
// ============ I18N ============
const I18N = {
  en: {
    "nav.collection":"Collection","nav.editions":"Editions","nav.matter":"Matter",
    "nav.atelier":"Atelier","nav.journal":"Journal","nav.commissions":"Commissions",
    "nav.search":"Search","nav.account":"Account","nav.cart":"Cart",
    "hero.meta1L":"Atlas Perle — House of objects","hero.meta1R":"Est. Marrakech, 1974",
    "hero.meta2L":"Catalogue IX","hero.meta2R":"Spring 2026 · Release in 4 plates",
    "hero.lot":"Catalogue IX · Plate 01",
    "hero.spec.ed":"Ed.","hero.spec.hand":"Hand","hero.spec.days":"9 days","hero.spec.bench":"at the bench",
    "hero.caption":"Throne, oxblood & bone — Atelier nº 7.","hero.plate":"Plate 01 / 04",
    "hero.headline":"Objects of <em>rare</em> precision.",
    "hero.tag":"A controlled catalogue of nine disciplines — brass, bone, leather, cedar, plaster, lacquer. Each piece signed, numbered, and released by hand from Derb el Ferran.",
    "hero.cta1":"Enter the collection","hero.cta2":"The atelier",
    "hero.rail.prov.l":"— Provenance","hero.rail.prov.t":"Derb el Ferran, Marrakech medina.",
    "hero.rail.circ.l":"— Circulation","hero.rail.circ.t":"Numbered editions of 12 or 24.",
    "hero.rail.lead.l":"— Lead time","hero.rail.lead.t":"Nine days at the bench, one pair of hands.",
    "hero.rail.del.l":"— Delivery","hero.rail.del.t":"Worldwide, in cotton & cedar.",
    "tb.filter":"Filter —","tb.all":"All","tb.seat":"Seating","tb.light":"Light","tb.vess":"Vessels",
    "tb.text":"Textiles","tb.lac":"Lacquer","tb.com":"Commissions",
    "tb.pieces":"pieces","tb.editionsOpen":"editions open","tb.sort":"Sort —","tb.sortV":"Edition",
    "col.eyebrow":"II · The collection","col.headline":"Twenty-eight <em>objects,</em> nine disciplines.",
    "col.meta":"Catalogue IX · Spring 2026","col.cta":"View the full catalogue →",
    "card.add":"Add to cart",
    "feat.eyebrow":"I · Featured object","feat.headline":"Tahar, <em>nº 042.</em>",
    "feat.lot":"Lot nº 042 · Edition of the Season",
    "feat.byhandPre":"By the hand of","feat.byhandName":"Mehdi El Fassi",
    "feat.craft":"Cabinet-maker · 28 years at the bench",
    "feat.remainNum":"12 of 24","feat.remaining":"remaining",
    "feat.priceL":"Price — fixed edition",
    "btn.addCart":"Add to cart","btn.writeAtelier":"Write to atelier",
    "mat.eyebrow":"III · Matter · close inspection",
    "mat.eyebrow2":"At the edge · 3.2× magnification",
    "mat.headline":"Four hundred <em>fragments.</em> One pair of hands.",
    "mat.body":"Each piece of bone is cut at Souk el Khemis, sized against the cedar grain, then inlaid one fragment at a time. Mother-of-pearl from the coast, cedar from Azrou, lacquer mixed in the courtyard. No veneer; no machine; nothing that cannot be repaired at the bench that made it.",
    "mat.foot.who":"— Mehdi El Fassi · atelier nº 7","mat.foot.daysNum":"26 days","mat.foot.daysSuf":"one pair of hands",
    "ed.eyebrow":"IV · Open editions","ed.headline":"Three pieces <em>still circulating.</em>",
    "ed.body":"Each edition is fixed at release and never extended. When numbered, it closes; what remains remains.",
    "ed.remain":"remaining","ed.of":"of",
    "prov.eyebrow":"V · Provenance","prov.headline":"A house since <em>1974.</em>",
    "prov.body":"Atlas Perle is the catalogue of Atelier nº 7 — nine craftsmen off a narrow street in the old medina of Marrakech. Cedar from Azrou. Bone from Souk el Khemis. Hides from Tannery Chouara, a house we have kept since the first piece was signed. Nothing arrives that we have not touched first; nothing leaves that has not been signed.",
    "prov.live":"Live · atelier nº 7",
    "prov.cert.estK":"Est.","prov.cert.estV":"1974 · Marrakech",
    "prov.cert.craftK":"Craftsmen","prov.cert.craftV":"Nine hands",
    "prov.cert.relK":"Releases","prov.cert.relV":"4 / year",
    "svc.1.t":"Insured worldwide delivery","svc.1.s":"Cotton & cedar crate",
    "svc.2.t":"Certificate of edition","svc.2.s":"Signed, dated, numbered",
    "svc.3.t":"Lifetime repair at bench","svc.3.s":"By the hand that made it",
    "svc.4.t":"30-day considered return","svc.4.s":"No questions asked",
    "ft.sub":"A catalogue of rare objects, released from a courtyard in the old medina — one plate at a time.",
    "ft.subscribe":"Subscribe — four letters a year","ft.subPh":"name@house.com","ft.subCta":"Add me to the carnet",
    "ft.h.cat":"— Catalogue","ft.h.atelier":"— Atelier","ft.h.house":"— House","ft.h.help":"— Assistance",
    "ft.cat":"Seating·Light·Vessels·Textiles·Commissions",
    "ft.at":"The nine hands·Matter·Lead times·Care & repair",
    "ft.ho":"About·Journal·Visit Marrakech·Write to atelier",
    "ft.he":"Shipping·Returns·Editions·Terms",
    "ft.bot":"© 1974–2026 · Atlas Perle · Derb el Ferran, Marrakech · All pieces numbered, signed, released by hand."
  },
  fr: {
    "nav.collection":"Collection","nav.editions":"Éditions","nav.matter":"Matière",
    "nav.atelier":"Atelier","nav.journal":"Journal","nav.commissions":"Sur-mesure",
    "nav.search":"Rechercher","nav.account":"Compte","nav.cart":"Panier",
    "hero.meta1L":"Atlas Perle — Maison d'objets","hero.meta1R":"Fondée à Marrakech, 1974",
    "hero.meta2L":"Catalogue IX","hero.meta2R":"Printemps 2026 · Parution en 4 planches",
    "hero.lot":"Catalogue IX · Planche 01",
    "hero.spec.ed":"Éd.","hero.spec.hand":"Main","hero.spec.days":"9 jours","hero.spec.bench":"à l'atelier",
    "hero.caption":"Trône, sang de bœuf & os — Atelier nº 7.","hero.plate":"Planche 01 / 04",
    "hero.headline":"Des objets d'une <em>rare</em> précision.",
    "hero.tag":"Un catalogue maîtrisé de neuf disciplines — laiton, os, cuir, cèdre, plâtre, laque. Chaque pièce signée, numérotée et libérée à la main depuis Derb el Ferran.",
    "hero.cta1":"Entrer dans la collection","hero.cta2":"L'atelier",
    "hero.rail.prov.l":"— Provenance","hero.rail.prov.t":"Derb el Ferran, médina de Marrakech.",
    "hero.rail.circ.l":"— Diffusion","hero.rail.circ.t":"Éditions numérotées de 12 ou 24.",
    "hero.rail.lead.l":"— Délai","hero.rail.lead.t":"Neuf jours à l'atelier, deux mains.",
    "hero.rail.del.l":"— Livraison","hero.rail.del.t":"Mondiale, en coton & cèdre.",
    "tb.filter":"Filtrer —","tb.all":"Tout","tb.seat":"Sièges","tb.light":"Lumière","tb.vess":"Récipients",
    "tb.text":"Textiles","tb.lac":"Laque","tb.com":"Sur-mesure",
    "tb.pieces":"pièces","tb.editionsOpen":"éditions ouvertes","tb.sort":"Tri —","tb.sortV":"Édition",
    "col.eyebrow":"II · La collection","col.headline":"Vingt-huit <em>objets,</em> neuf disciplines.",
    "col.meta":"Catalogue IX · Printemps 2026","col.cta":"Voir le catalogue complet →",
    "card.add":"Ajouter au panier",
    "feat.eyebrow":"I · Objet en vedette","feat.headline":"Tahar, <em>nº 042.</em>",
    "feat.lot":"Lot nº 042 · Édition de la saison",
    "feat.byhandPre":"De la main de","feat.byhandName":"Mehdi El Fassi",
    "feat.craft":"Ébéniste · 28 ans à l'atelier",
    "feat.remainNum":"12 sur 24","feat.remaining":"restantes",
    "feat.priceL":"Prix — édition fermée",
    "btn.addCart":"Ajouter au panier","btn.writeAtelier":"Écrire à l'atelier",
    "mat.eyebrow":"III · Matière · examen rapproché",
    "mat.eyebrow2":"Au plus près · grossissement 3,2×",
    "mat.headline":"Quatre cents <em>fragments.</em> Deux mains.",
    "mat.body":"Chaque pièce d'os est taillée au Souk el Khemis, ajustée au grain du cèdre, puis incrustée fragment par fragment. Nacre de la côte, cèdre d'Azrou, laque préparée dans la cour. Aucun placage ; aucune machine ; rien qui ne puisse être réparé à l'établi qui l'a fait.",
    "mat.foot.who":"— Mehdi El Fassi · atelier nº 7","mat.foot.daysNum":"26 jours","mat.foot.daysSuf":"deux mains",
    "ed.eyebrow":"IV · Éditions ouvertes","ed.headline":"Trois pièces <em>encore en circulation.</em>",
    "ed.body":"Chaque édition est fixée à la sortie et n'est jamais prolongée. Une fois numérotée, elle se ferme ; ce qui reste reste.",
    "ed.remain":"restantes","ed.of":"sur",
    "prov.eyebrow":"V · Provenance","prov.headline":"Une maison depuis <em>1974.</em>",
    "prov.body":"Atlas Perle est le catalogue de l'Atelier nº 7 — neuf artisans sur une ruelle de la vieille médina de Marrakech. Cèdre d'Azrou. Os du Souk el Khemis. Cuirs de la Tannerie Chouara, une maison que nous fréquentons depuis la première pièce signée. Rien n'arrive sans que nous l'ayons d'abord touché ; rien ne part sans avoir été signé.",
    "prov.live":"En direct · atelier nº 7",
    "prov.cert.estK":"Fondée","prov.cert.estV":"1974 · Marrakech",
    "prov.cert.craftK":"Artisans","prov.cert.craftV":"Neuf mains",
    "prov.cert.relK":"Éditions","prov.cert.relV":"4 / an",
    "svc.1.t":"Livraison mondiale assurée","svc.1.s":"Caisse coton & cèdre",
    "svc.2.t":"Certificat d'édition","svc.2.s":"Signé, daté, numéroté",
    "svc.3.t":"Réparation à vie à l'atelier","svc.3.s":"Par la main qui l'a fait",
    "svc.4.t":"Retour réfléchi sous 30 jours","svc.4.s":"Sans question",
    "ft.sub":"Un catalogue d'objets rares, libéré depuis une cour de la vieille médina — une planche à la fois.",
    "ft.subscribe":"S'abonner — quatre lettres par an","ft.subPh":"nom@maison.com","ft.subCta":"M'inscrire au carnet",
    "ft.h.cat":"— Catalogue","ft.h.atelier":"— Atelier","ft.h.house":"— Maison","ft.h.help":"— Assistance",
    "ft.cat":"Sièges·Lumière·Récipients·Textiles·Sur-mesure",
    "ft.at":"Les neuf mains·Matière·Délais·Soin & réparation",
    "ft.ho":"À propos·Journal·Visiter Marrakech·Écrire à l'atelier",
    "ft.he":"Expédition·Retours·Éditions·CGV",
    "ft.bot":"© 1974–2026 · Atlas Perle · Derb el Ferran, Marrakech · Toutes les pièces numérotées, signées, libérées à la main."
  },
  ar: {
    "nav.collection":"المجموعة","nav.editions":"الإصدارات","nav.matter":"المواد",
    "nav.atelier":"الورشة","nav.journal":"المجلة","nav.commissions":"طلبات خاصة",
    "nav.search":"بحث","nav.account":"الحساب","nav.cart":"السلة",
    "hero.meta1L":"أطلس بيرل — دار الأشياء","hero.meta1R":"تأسست في مراكش، ١٩٧٤",
    "hero.meta2L":"كتالوج التاسع","hero.meta2R":"ربيع ٢٠٢٦ · إصدار في ٤ لوحات",
    "hero.lot":"كتالوج التاسع · لوحة ٠١",
    "hero.spec.ed":"إصدار","hero.spec.hand":"اليد","hero.spec.days":"٩ أيام","hero.spec.bench":"على الطاولة",
    "hero.caption":"عرش، أحمر داكن وعظم — ورشة رقم ٧.","hero.plate":"لوحة ٠١ / ٠٤",
    "hero.headline":"أشياء بدقة <em>نادرة.</em>",
    "hero.tag":"كتالوج محكوم في تسعة تخصصات — نحاس، عظم، جلد، أرز، جص، لاكر. كل قطعة موقعة، مرقمة، ومُصدرة باليد من درب الفران.",
    "hero.cta1":"ادخل المجموعة","hero.cta2":"الورشة",
    "hero.rail.prov.l":"— المنشأ","hero.rail.prov.t":"درب الفران، المدينة القديمة بمراكش.",
    "hero.rail.circ.l":"— التداول","hero.rail.circ.t":"إصدارات مرقمة من ١٢ أو ٢٤.",
    "hero.rail.lead.l":"— مدة التنفيذ","hero.rail.lead.t":"تسعة أيام على الطاولة، زوج واحد من الأيدي.",
    "hero.rail.del.l":"— التوصيل","hero.rail.del.t":"حول العالم، في قطن وأرز.",
    "tb.filter":"تصفية —","tb.all":"الكل","tb.seat":"المقاعد","tb.light":"الإضاءة","tb.vess":"الأواني",
    "tb.text":"المنسوجات","tb.lac":"اللاكر","tb.com":"طلبات خاصة",
    "tb.pieces":"قطعة","tb.editionsOpen":"إصدارات مفتوحة","tb.sort":"ترتيب —","tb.sortV":"الإصدار",
    "col.eyebrow":"II · المجموعة","col.headline":"ثمانية وعشرون <em>قطعة،</em> تسعة تخصصات.",
    "col.meta":"كتالوج التاسع · ربيع ٢٠٢٦","col.cta":"عرض الكتالوج الكامل ←",
    "card.add":"أضف إلى السلة",
    "feat.eyebrow":"I · القطعة المميزة","feat.headline":"طاهر، <em>رقم ٠٤٢.</em>",
    "feat.lot":"لوت رقم ٠٤٢ · إصدار الموسم",
    "feat.byhandPre":"من يد","feat.byhandName":"مهدي الفاسي",
    "feat.craft":"نجار · ٢٨ سنة على الطاولة",
    "feat.remainNum":"١٢ من ٢٤","feat.remaining":"متبقية",
    "feat.priceL":"السعر — إصدار محدود",
    "btn.addCart":"أضف إلى السلة","btn.writeAtelier":"اكتب إلى الورشة",
    "mat.eyebrow":"III · المادة · فحص قريب",
    "mat.eyebrow2":"عند الحافة · تكبير ٣٫٢×",
    "mat.headline":"أربعمائة <em>قطعة.</em> زوج واحد من الأيدي.",
    "mat.body":"كل قطعة عظم تُقطع في سوق الخميس، تُقاس على حبيبات الأرز، ثم تُطعَّم قطعة بقطعة. صدف اللؤلؤ من الساحل، أرز من أزرو، لاكر يُمزج في الفناء. لا قشرة؛ لا آلة؛ لا شيء لا يمكن إصلاحه على الطاولة التي صنعته.",
    "mat.foot.who":"— مهدي الفاسي · ورشة رقم ٧","mat.foot.daysNum":"٢٦ يومًا","mat.foot.daysSuf":"زوج من الأيدي",
    "ed.eyebrow":"IV · إصدارات مفتوحة","ed.headline":"ثلاث قطع <em>لا تزال متداولة.</em>",
    "ed.body":"كل إصدار يُحدد عند الإطلاق ولا يُمدد أبدًا. عند ترقيمها، تُغلق؛ ما تبقى يبقى.",
    "ed.remain":"متبقية","ed.of":"من",
    "prov.eyebrow":"V · المنشأ","prov.headline":"دار منذ <em>١٩٧٤.</em>",
    "prov.body":"أطلس بيرل هو كتالوج ورشة رقم ٧ — تسعة حرفيين على زقاق ضيق في مدينة مراكش القديمة. أرز من أزرو. عظم من سوق الخميس. جلود من دبغة الشوارة، دار حافظنا عليها منذ توقيع أول قطعة. لا شيء يصل دون أن نلمسه أولاً؛ لا شيء يغادر دون أن يُوقَّع.",
    "prov.live":"مباشر · ورشة رقم ٧",
    "prov.cert.estK":"تأسست","prov.cert.estV":"١٩٧٤ · مراكش",
    "prov.cert.craftK":"حرفيون","prov.cert.craftV":"تسع أيدٍ",
    "prov.cert.relK":"إصدارات","prov.cert.relV":"٤ / سنة",
    "svc.1.t":"شحن دولي مؤمن","svc.1.s":"صندوق قطن وأرز",
    "svc.2.t":"شهادة الإصدار","svc.2.s":"موقعة، مؤرخة، مرقمة",
    "svc.3.t":"إصلاح مدى الحياة في الورشة","svc.3.s":"باليد التي صنعتها",
    "svc.4.t":"إرجاع مدروس خلال ٣٠ يومًا","svc.4.s":"بدون أسئلة",
    "ft.sub":"كتالوج للأشياء النادرة، يُطلق من فناء في المدينة القديمة — لوحة واحدة في كل مرة.",
    "ft.subscribe":"اشترك — أربع رسائل في السنة","ft.subPh":"الاسم@الدار.com","ft.subCta":"أضفني إلى السجل",
    "ft.h.cat":"— الكتالوج","ft.h.atelier":"— الورشة","ft.h.house":"— الدار","ft.h.help":"— المساعدة",
    "ft.cat":"المقاعد·الإضاءة·الأواني·المنسوجات·طلبات خاصة",
    "ft.at":"الأيدي التسع·المادة·المهل·العناية والإصلاح",
    "ft.ho":"عن الدار·المجلة·زيارة مراكش·اكتب إلى الورشة",
    "ft.he":"الشحن·الإرجاع·الإصدارات·الشروط",
    "ft.bot":"© ١٩٧٤–٢٠٢٦ · أطلس بيرل · درب الفران، مراكش · جميع القطع مرقمة، موقعة، ومُصدرة باليد."
  }
};
const LangCtx = React.createContext({lang:"en", setLang:()=>{}});
function LangProvider({children}){
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("ap_lang") || "en"; } catch(e) { return "en"; }
  });
  useEffect(() => {
    try { localStorage.setItem("ap_lang", lang); } catch(e) {}
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return <LangCtx.Provider value={{lang, setLang}}>{children}</LangCtx.Provider>;
}
function useT(){
  const {lang} = React.useContext(LangCtx);
  return (key, fb) => (I18N[lang] && I18N[lang][key]) || I18N.en[key] || fb || key;
}
function LangSwitch(){
  const {lang, setLang} = React.useContext(LangCtx);
  const opts = [["en","EN"],["fr","FR"],["ar","AR"]];
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {opts.map(([code,label], i) => (
        <React.Fragment key={code}>
          {i > 0 && <span className="sep">·</span>}
          <button className={lang===code?"on":""} onClick={()=>setLang(code)} aria-pressed={lang===code}>{label}</button>
        </React.Fragment>
      ))}
    </div>
  );
}
Object.assign(window, { Reveal, WordReveal, M, useInView, I18N, LangCtx, LangProvider, useT, LangSwitch });
// ============ NAV ============
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const t = useT();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav className={`top ${scrolled ? "scrolled" : ""}`}>
      <a className="brand" href="/">
        <span className="pin"/>
        <span className="name">Atlas <em>Perle</em></span>
      </a>
      <div className="links">
        <a href="/collection">{t("nav.collection")}</a>
        <a href="/editions">{t("nav.editions")}</a>
        <a href="/matter">{t("nav.matter")}</a>
        <a href="/atelier">{t("nav.atelier")}</a>
        <a href="/journal">{t("nav.journal")}</a>
        <a href="/commissions">{t("nav.commissions")}</a>
      </div>
      <div className="right">
        <LangSwitch/>
        <a href="/search">{t("nav.search")}</a>
        <a href="/account">{t("nav.account")}</a>
        <a className="cart" href="/cart">{t("nav.cart")} <span className="n">2</span></a>
      </div>
    </nav>
  );
}

// ============ FOOTER ============
function Footer() {
  const t = useT();
  const cat = t("ft.cat").split("·");
  const at  = t("ft.at").split("·");
  const ho  = t("ft.ho").split("·");
  const he  = t("ft.he").split("·");
  return (
    <footer className="main" data-screen-label="06 Footer">
      <div className="inner">
        <Reveal speed="reveal-slow" style={{position:"relative"}}>
          <div className="big">Atlas <em>Perle.</em><span className="mk">{t("hero.meta2L")} · {t("hero.meta2R").split("·")[0].trim()}</span></div>
          <div className="sub">{t("ft.sub")}</div>
        </Reveal>
        <div className="cols">
          <Reveal className="sub-box">
            <label>{t("ft.subscribe")}</label>
            <input type="email" placeholder={t("ft.subPh")}/>
            <a className="go" href="#">{t("ft.subCta")} <span>→</span></a>
          </Reveal>
          <Reveal delay={100}>
            <h5>{t("ft.h.cat")}</h5>
            <div className="list">{cat.map((x,i)=><a href="#" key={i}>{x}</a>)}</div>
          </Reveal>
          <Reveal delay={200}>
            <h5>{t("ft.h.atelier")}</h5>
            <div className="list">{at.map((x,i)=><a href="#" key={i}>{x}</a>)}</div>
          </Reveal>
          <Reveal delay={300}>
            <h5>{t("ft.h.house")}</h5>
            <div className="list">{ho.map((x,i)=><a href={i===ho.length-1?"mailto:atelier@atlasperle.ma":"#"} key={i}>{x}</a>)}</div>
          </Reveal>
          <Reveal delay={400}>
            <h5>{t("ft.h.help")}</h5>
            <div className="list">{he.map((x,i)=><a href="#" key={i}>{x}</a>)}</div>
          </Reveal>
        </div>
        <div className="bot">
          <div>{t("ft.bot")}</div>
          <div className="pay"><span>VISA</span><span>AMEX</span><span>Wire</span><span>Bitcoin</span></div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, Ticker, Toolbar, Featured, Collection, Placeholder, Material, Editions, Provenance, Services, Footer });
Object.assign(window, { Nav, Footer });
