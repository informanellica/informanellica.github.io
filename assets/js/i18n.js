// Lightweight client-side i18n for the static site (catalog + support page).
// Auto-detects the browser language (fallback English), offers a language
// selector (#lang-switcher), and applies translations to [data-i18n],
// [data-i18n-html], [data-i18n-content], plus the page <title>.
(function () {
  const LANGS = [
    ["en", "English"], ["ja", "日本語"], ["es", "Español"], ["pt_BR", "Português"],
    ["fr", "Français"], ["de", "Deutsch"], ["it", "Italiano"], ["ru", "Русский"],
    ["zh_CN", "简体中文"], ["zh_TW", "繁體中文"], ["ko", "한국어"],
  ];

  const T = {
    nav_apps: { en: "Apps", ja: "アプリ一覧", es: "Aplicaciones", pt_BR: "Aplicativos", fr: "Applications", de: "Apps", it: "App", ru: "Приложения", zh_CN: "应用", zh_TW: "應用程式", ko: "앱" },
    nav_support: { en: "Support", ja: "サポート", es: "Soporte", pt_BR: "Suporte", fr: "Assistance", de: "Support", it: "Assistenza", ru: "Поддержка", zh_CN: "支持", zh_TW: "支援", ko: "지원" },
    nav_contact: { en: "Contact", ja: "お問い合わせ", es: "Contacto", pt_BR: "Contato", fr: "Contact", de: "Kontakt", it: "Contatti", ru: "Контакты", zh_CN: "联系", zh_TW: "聯絡", ko: "문의" },

    hero_title: { en: "Our software", ja: "ソフトウェア一覧", es: "Nuestro software", pt_BR: "Nossos softwares", fr: "Nos logiciels", de: "Unsere Software", it: "I nostri software", ru: "Наши программы", zh_CN: "我们的软件", zh_TW: "我們的軟體", ko: "소프트웨어" },
    hero_lead: { en: "A catalog of our free software. Latest downloads, online manuals, and changelogs in one place.", ja: "公開中のフリーソフトの一覧です。最新版のダウンロード、オンラインマニュアル、更新履歴へのリンクをまとめています。", es: "Un catálogo de nuestro software gratuito. Descargas recientes, manuales en línea e historiales de cambios en un solo lugar.", pt_BR: "Um catálogo dos nossos softwares gratuitos. Downloads recentes, manuais online e históricos de alterações em um só lugar.", fr: "Un catalogue de nos logiciels gratuits. Dernières versions, manuels en ligne et journaux des modifications au même endroit.", de: "Ein Katalog unserer kostenlosen Software. Neueste Downloads, Online-Handbücher und Änderungsprotokolle an einem Ort.", it: "Un catalogo dei nostri software gratuiti. Ultimi download, manuali online e changelog in un unico posto.", ru: "Каталог наших бесплатных программ. Свежие загрузки, онлайн-руководства и истории изменений в одном месте.", zh_CN: "我们的免费软件目录。最新下载、在线手册和更新日志，尽在一处。", zh_TW: "我們的免費軟體目錄。最新下載、線上手冊與更新紀錄，盡在一處。", ko: "무료 소프트웨어 카탈로그. 최신 다운로드, 온라인 매뉴얼, 변경 이력을 한곳에." },

    btn_details: { en: "Details", ja: "詳細", es: "Detalles", pt_BR: "Detalhes", fr: "Détails", de: "Details", it: "Dettagli", ru: "Подробнее", zh_CN: "详情", zh_TW: "詳細", ko: "상세" },
    btn_manual: { en: "Manual", ja: "マニュアル", es: "Manual", pt_BR: "Manual", fr: "Manuel", de: "Handbuch", it: "Manuale", ru: "Руководство", zh_CN: "手册", zh_TW: "手冊", ko: "매뉴얼" },
    btn_latest: { en: "Latest", ja: "最新版", es: "Última versión", pt_BR: "Última versão", fr: "Dernière version", de: "Neueste", it: "Ultima versione", ru: "Последняя", zh_CN: "最新版", zh_TW: "最新版", ko: "최신 버전" },
    changelog: { en: "Changelog", ja: "更新履歴", es: "Cambios", pt_BR: "Histórico", fr: "Journal", de: "Änderungen", it: "Modifiche", ru: "История", zh_CN: "更新日志", zh_TW: "更新紀錄", ko: "변경 이력" },

    desc_benri: { en: "A lightweight, browser-based PDF editor for scanned PDFs — binarize, deskew, OCR, reorder and merge pages, all in one app.", ja: "スキャンPDFの編集に向いた、ブラウザ技術ベースの軽量 PDF エディタ。二値化・傾き補正・OCR・ページ並べ替え・結合などを 1 アプリで完結。", es: "Un editor de PDF ligero basado en el navegador para PDF escaneados: binariza, endereza, OCR, reordena y combina páginas en una sola app.", pt_BR: "Um editor de PDF leve, baseado no navegador, para PDFs digitalizados: binarização, correção de inclinação, OCR, reordenação e mesclagem de páginas em um só app.", fr: "Un éditeur PDF léger basé sur le navigateur pour les PDF numérisés : binarisation, redressement, OCR, réorganisation et fusion de pages, le tout dans une seule app.", de: "Ein leichter, browserbasierter PDF-Editor für gescannte PDFs: Binarisieren, Entzerren, OCR, Seiten neu anordnen und zusammenführen – alles in einer App.", it: "Un editor PDF leggero basato sul browser per PDF scansionati: binarizzazione, raddrizzamento, OCR, riordino e unione di pagine in un'unica app.", ru: "Лёгкий PDF-редактор на основе браузерных технологий для сканированных PDF: бинаризация, выравнивание, OCR, переупорядочивание и объединение страниц в одном приложении.", zh_CN: "面向扫描 PDF 的轻量级浏览器技术 PDF 编辑器：二值化、纠偏、OCR、页面重排与合并，一应俱全。", zh_TW: "面向掃描 PDF 的輕量級瀏覽器技術 PDF 編輯器：二值化、校正傾斜、OCR、頁面重排與合併，一應俱全。", ko: "스캔 PDF 편집에 적합한 브라우저 기술 기반 경량 PDF 편집기 — 이진화, 기울기 보정, OCR, 페이지 재정렬·병합을 한 앱에서." },
    desc_vm: { en: "Set the volume of each tab independently — boost quiet tabs up to 600%, mute the loud ones.", ja: "タブごとに音量を個別に調整。小さい音は最大600%までブースト、大きい音はミュート。", es: "Ajusta el volumen de cada pestaña por separado: amplifica las silenciosas hasta el 600 % y silencia las ruidosas.", pt_BR: "Ajuste o volume de cada aba individualmente — aumente as silenciosas até 600% e silencie as barulhentas.", fr: "Réglez le volume de chaque onglet individuellement — amplifiez les onglets faibles jusqu'à 600 % et coupez les bruyants.", de: "Stelle die Lautstärke jedes Tabs einzeln ein — leise Tabs bis 600 % verstärken, laute stummschalten.", it: "Regola il volume di ogni scheda singolarmente: amplifica quelle silenziose fino al 600% e disattiva quelle rumorose.", ru: "Регулируйте громкость каждой вкладки отдельно — усиливайте тихие до 600 % и заглушайте громкие.", zh_CN: "单独调节每个标签页的音量——将安静的标签页提升至 600%，将吵闹的静音。", zh_TW: "個別調整每個分頁的音量——將安靜的分頁提升至 600%，將吵雜的靜音。", ko: "탭마다 볼륨을 개별 조절하세요 — 조용한 탭은 최대 600%까지 증폭하고 시끄러운 탭은 음소거." },
    desc_ar: { en: "Automatically reload any tab at the interval you choose — per tab, with presets, a custom timer, and an at-a-glance badge.", ja: "指定した間隔でタブを自動再読み込み。タブごとに設定でき、プリセット・カスタム間隔・ひと目で分かるバッジ付き。", es: "Recarga automáticamente cualquier pestaña en el intervalo que elijas: por pestaña, con preajustes, temporizador personalizado y una insignia a la vista.", pt_BR: "Recarregue automaticamente qualquer aba no intervalo que você escolher — por aba, com predefinições, timer personalizado e um selo visível.", fr: "Rechargez automatiquement n'importe quel onglet à l'intervalle choisi — par onglet, avec préréglages, minuteur personnalisé et un badge visible.", de: "Lade jeden Tab automatisch im gewählten Intervall neu — pro Tab, mit Voreinstellungen, eigenem Timer und einem Badge auf einen Blick.", it: "Ricarica automaticamente qualsiasi scheda all'intervallo scelto — per scheda, con preset, timer personalizzato e un badge a colpo d'occhio.", ru: "Автоматически перезагружайте любую вкладку с выбранным интервалом — для каждой вкладки, с пресетами, своим таймером и значком на кнопке.", zh_CN: "按所选间隔自动刷新任意标签页——逐标签设置，含预设、自定义计时器和一目了然的角标。", zh_TW: "依所選間隔自動重新整理任意分頁——逐分頁設定，含預設、自訂計時器與一目了然的角標。", ko: "원하는 간격으로 모든 탭을 자동 새로고침 — 탭별 설정, 프리셋, 사용자 지정 타이머, 한눈에 보이는 배지." },
    desc_sb: { en: "Turn individual keyboard shortcuts on or off while browsing — block accidental Ctrl+W, Backspace navigation, F12, and more.", ja: "ブラウジング中のキーボードショートカットを個別にオン/オフ。誤操作の Ctrl+W、Backspace での戻る、F12 などをブロックできます。", es: "Activa o desactiva atajos de teclado individuales al navegar: bloquea Ctrl+W accidentales, la navegación con Retroceso, F12 y más.", pt_BR: "Ative ou desative atalhos de teclado individuais ao navegar: bloqueie Ctrl+W acidental, navegação com Backspace, F12 e mais.", fr: "Activez ou désactivez des raccourcis clavier individuels — bloquez les Ctrl+W accidentels, la navigation par Retour arrière, F12, etc.", de: "Aktiviere oder deaktiviere einzelne Tastenkürzel beim Surfen — blockiere versehentliches Strg+W, Rücktaste-Navigation, F12 und mehr.", it: "Attiva o disattiva singole scorciatoie da tastiera durante la navigazione: blocca Ctrl+W accidentali, navigazione con Backspace, F12 e altro.", ru: "Включайте и отключайте отдельные сочетания клавиш при просмотре — блокируйте случайное Ctrl+W, навигацию по Backspace, F12 и другое.", zh_CN: "浏览时逐个开启或关闭键盘快捷键——屏蔽误触的 Ctrl+W、退格键导航、F12 等。", zh_TW: "瀏覽時逐一開啟或關閉鍵盤快速鍵——封鎖誤觸的 Ctrl+W、退格鍵導覽、F12 等。", ko: "브라우징 중 키보드 단축키를 개별적으로 켜고 끄세요 — 실수로 누르는 Ctrl+W, 백스페이스 탐색, F12 등을 차단합니다." },

    // Support page
    sp_lead: { en: "Report bugs, ask questions, or request features. Any language is welcome.", ja: "不具合の報告・ご質問・ご要望はこちらから。日本語・英語どちらでも歓迎します。", es: "Informa de errores, haz preguntas o solicita funciones. Cualquier idioma es bienvenido.", pt_BR: "Relate bugs, faça perguntas ou solicite recursos. Qualquer idioma é bem-vindo.", fr: "Signalez des bugs, posez des questions ou demandez des fonctionnalités. Toutes les langues sont les bienvenues.", de: "Melde Fehler, stelle Fragen oder wünsche dir Funktionen. Jede Sprache ist willkommen.", it: "Segnala bug, fai domande o richiedi funzionalità. Qualsiasi lingua è benvenuta.", ru: "Сообщайте об ошибках, задавайте вопросы или предлагайте функции. Любой язык приветствуется.", zh_CN: "报告问题、提出疑问或建议功能。欢迎使用任何语言。", zh_TW: "回報問題、提出疑問或建議功能。歡迎使用任何語言。", ko: "버그 신고, 질문, 기능 요청을 환영합니다. 어떤 언어든 괜찮습니다." },
    sp_email_h: { en: "Email", ja: "メールで問い合わせ", es: "Correo electrónico", pt_BR: "E-mail", fr: "E-mail", de: "E-Mail", it: "E-mail", ru: "Электронная почта", zh_CN: "电子邮件", zh_TW: "電子郵件", ko: "이메일" },
    sp_email_any: { en: "For any app:", ja: "どのアプリでも:", es: "Para cualquier app:", pt_BR: "Para qualquer app:", fr: "Pour toute application :", de: "Für jede App:", it: "Per qualsiasi app:", ru: "Для любого приложения:", zh_CN: "适用于所有应用：", zh_TW: "適用於所有應用程式：", ko: "모든 앱 공통:" },
    sp_email_note: { en: "No GitHub account needed. Please include the app name and, if possible, steps to reproduce and your browser/version.", ja: "GitHub アカウント不要。アプリ名と、できれば再現手順・ブラウザ／バージョンを書いてください。", es: "No necesitas cuenta de GitHub. Incluye el nombre de la app y, si es posible, los pasos para reproducir y tu navegador/versión.", pt_BR: "Não é preciso conta no GitHub. Inclua o nome do app e, se possível, os passos para reproduzir e seu navegador/versão.", fr: "Pas besoin de compte GitHub. Indiquez le nom de l'application et, si possible, les étapes de reproduction et votre navigateur/version.", de: "Kein GitHub-Konto nötig. Bitte App-Namen und, wenn möglich, Reproduktionsschritte sowie Browser/Version angeben.", it: "Nessun account GitHub necessario. Indica il nome dell'app e, se possibile, i passaggi per riprodurre e browser/versione.", ru: "Аккаунт GitHub не нужен. Укажите название приложения и, по возможности, шаги воспроизведения и браузер/версию.", zh_CN: "无需 GitHub 账号。请注明应用名称，并尽量附上复现步骤和浏览器/版本。", zh_TW: "無需 GitHub 帳號。請註明應用程式名稱，並盡量附上重現步驟與瀏覽器/版本。", ko: "GitHub 계정이 필요 없습니다. 앱 이름과 가능하면 재현 절차, 브라우저/버전을 적어 주세요." },
    sp_issues_h: { en: "Report a bug per app (GitHub Issues)", ja: "アプリ別の不具合報告（GitHub Issues）", es: "Informar de un error por app (GitHub Issues)", pt_BR: "Relatar um bug por app (GitHub Issues)", fr: "Signaler un bug par application (GitHub Issues)", de: "Fehler pro App melden (GitHub Issues)", it: "Segnala un bug per app (GitHub Issues)", ru: "Сообщить об ошибке по приложению (GitHub Issues)", zh_CN: "按应用报告问题（GitHub Issues）", zh_TW: "依應用程式回報問題（GitHub Issues）", ko: "앱별 버그 신고 (GitHub Issues)" },
    btn_report: { en: "Report a bug", ja: "不具合を報告", es: "Informar de un error", pt_BR: "Relatar um bug", fr: "Signaler un bug", de: "Fehler melden", it: "Segnala un bug", ru: "Сообщить об ошибке", zh_CN: "报告问题", zh_TW: "回報問題", ko: "버그 신고" },
    btn_repo: { en: "Repository", ja: "リポジトリ", es: "Repositorio", pt_BR: "Repositório", fr: "Dépôt", de: "Repository", it: "Repository", ru: "Репозиторий", zh_CN: "代码库", zh_TW: "儲存庫", ko: "저장소" },
    sp_privacy_note: { en: "Privacy policies are available from each app's detail page (Apps).", ja: "プライバシーポリシーは各アプリの詳細ページ（アプリ一覧）から確認できます。", es: "Las políticas de privacidad están disponibles en la página de detalles de cada app (Aplicaciones).", pt_BR: "As políticas de privacidade estão disponíveis na página de detalhes de cada app (Aplicativos).", fr: "Les politiques de confidentialité sont disponibles depuis la page de détails de chaque application (Applications).", de: "Datenschutzerklärungen sind auf der Detailseite jeder App (Apps) verfügbar.", it: "Le informative sulla privacy sono disponibili dalla pagina dei dettagli di ogni app (App).", ru: "Политики конфиденциальности доступны на странице каждого приложения (Приложения).", zh_CN: "隐私政策可在各应用的详情页（应用）查看。", zh_TW: "隱私權政策可在各應用程式的詳細頁面（應用程式）查看。", ko: "개인정보처리방침은 각 앱의 상세 페이지(앱)에서 확인할 수 있습니다." },
  };

  function tr(key, lang) {
    const e = T[key];
    return e ? (e[lang] || e.en) : "";
  }

  function resolveLang() {
    const saved = localStorage.getItem("site_lang");
    if (saved && LANGS.some(([c]) => c === saved)) return saved;
    const n = (navigator.language || "en").toLowerCase();
    if (n.startsWith("ja")) return "ja";
    if (n.startsWith("pt")) return "pt_BR";
    if (n.startsWith("ko")) return "ko";
    if (n.startsWith("zh")) return (n.includes("tw") || n.includes("hant") || n.includes("hk") || n.includes("mo")) ? "zh_TW" : "zh_CN";
    for (const [code] of LANGS) if (n.startsWith(code.split("_")[0])) return code;
    return "en";
  }

  function apply(lang) {
    document.documentElement.lang = lang.replace("_", "-");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = tr(el.dataset.i18n, lang); if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const v = tr(el.dataset.i18nHtml, lang); if (v) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const v = tr(el.dataset.i18nContent, lang); if (v) el.setAttribute("content", v);
    });
    const titleKey = document.documentElement.getAttribute("data-title-key");
    if (titleKey) document.title = tr(titleKey, lang) + " | Informanellica";
  }

  function buildSwitcher(lang) {
    const host = document.getElementById("lang-switcher");
    if (!host) return;

    const group = document.createElement("div");
    group.className = "input-group input-group-sm";
    group.style.width = "auto";

    const icon = document.createElement("span");
    icon.className = "input-group-text";
    icon.innerHTML = '<i class="bi bi-translate"></i>';

    const sel = document.createElement("select");
    sel.className = "form-select form-select-sm";
    sel.setAttribute("aria-label", "Language / 言語");
    sel.title = "Language / 言語";
    sel.style.maxWidth = "10rem";
    for (const [code, name] of LANGS) {
      const o = document.createElement("option");
      o.value = code; o.textContent = name; if (code === lang) o.selected = true;
      sel.appendChild(o);
    }
    sel.addEventListener("change", () => {
      localStorage.setItem("site_lang", sel.value);
      apply(sel.value);
    });

    group.appendChild(icon);
    group.appendChild(sel);
    host.appendChild(group);
  }

  const lang = resolveLang();
  apply(lang);
  buildSwitcher(lang);
})();
