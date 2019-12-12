const availableLocales = JSON.parse('\x5b\x22en\x22, \x22am\x22, \x22ar\x22, \x22bn\x22, \x22bg\x22, \x22ca\x22, \x22cs\x22, \x22cy\x22, \x22da\x22, \x22de\x22, \x22el\x22, \x22en_GB\x22, \x22es\x22, \x22es_419\x22, \x22et\x22, \x22eu\x22, \x22fa\x22, \x22fi\x22, \x22fil\x22, \x22fr\x22, \x22gl\x22, \x22gu\x22, \x22hi\x22, \x22hr\x22, \x22hu\x22, \x22id\x22, \x22is\x22, \x22it\x22, \x22iw\x22, \x22ja\x22, \x22kn\x22, \x22ko\x22, \x22lt\x22, \x22lv\x22, \x22ml\x22, \x22ms\x22, \x22my\x22, \x22nl\x22, \x22no\x22, \x22pl\x22, \x22pt_BR\x22, \x22pt_PT\x22, \x22ro\x22, \x22ru\x22, \x22sk\x22, \x22sl\x22, \x22sr\x22, \x22sv\x22, \x22sw\x22, \x22ta\x22, \x22te\x22, \x22th\x22, \x22tr\x22, \x22uk\x22, \x22ur\x22, \x22vi\x22, \x22zh_CN\x22, \x22zh_TW\x22, \x22zu\x22\x5d'); const availableRtlLocales = JSON.parse('\x5b\x22ar\x22, \x22fa\x22, \x22iw\x22, \x22ur\x22\x5d'); const prefix = '\/keep_main-prod'; _docs_flag_initialData = {"n_amt":["audio/aac","image/jpeg","image/png","image/gif"],"n_afoiu":false,"n_k":"AIzaSyBx4qIYtgGv7SYh3nV8weWhXKZjIcaYKek","n_ars":"https://www.googleapis.com/auth/reminders","n_s":"https://www.googleapis.com/auth/memento","n_ss":"https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/peopleapi.readonly","n_ats":"https://www.googleapis.com/auth/client_channel","n_atas":"https://www.googleapis.com/auth/taskassist.readonly","n_v":"v1","n_aplmu":"https://support.google.com/assistant?p\u003dnotes_and_lists_settings","n_cc":"TR, EC, SH, LB, RB, AN, EX, PI, DR, CO, MI, NC, SNB, IN","n_c":"192748556389-u13aelnnjsmn5df1voa2d3oimlbd8led.apps.googleusercontent.com","n_cp":"CRX","n_csbs":120,"n_dt":"","n_deau":"https://www.googleapis.com/","n_detl":false,"n_eap":false,"n_eau":false,"n_ecil":false,"n_ecpde":false,"n_edmp":true,"n_edtt":false,"n_edlh":false,"n_eh":false,"n_eil":true,"n_eliw":false,"n_enopow":false,"n_eod":true,"n_eoros":false,"n_eon":false,"n_ep":true,"n_ers":false,"n_fpae":"https://keep-pa.googleapis.com","n_imb":10485760,"n_imp":26214400,"n_j":"https://keep.google.com/jserror","n_lcu":false,"n_mpak":"AIzaSyCOKFFECsTTlV2-EzQ_MywNsvnYJqDO-5A","n_mpau":"https://maps.googleapis.com/maps/api/place/","n_iu":"https://keep.google.com/media/","n_nmri":5000,"n_nib":5000,"n_nmb":1800000,"n_nopv":"v1","n_oe":true,"n_pau":"https://people-pa.googleapis.com/","n_rau":"https://reminders-pa.googleapis.com/","n_scp":false,"n_sit":["image/jpeg","image/png","image/gif"],"n_t":true,"n_ton":"keep","n_tak":"AIzaSyAqeqEBGxTXZXOnu2gUrYCz9hsfKUr45vU","n_tipe":true,"n_taau":"https://taskassist-pa.googleapis.com/","n_tcu":{"0":[null,null,null,"/keep_main-prod_app_styles_ltr_default.css"],"1":[null,null,null,"/keep_main-prod_app_styles_ltr_dark.css"]},"n_tcur":{"0":[null,null,null,"/keep_main-prod_app_styles_rtl_default.css"],"1":[null,null,null,"/keep_main-prod_app_styles_rtl_dark.css"]},"n_tmd":7,"n_ur":"edit","n_ugat":true,"n_uo":true,"n_wfp":false,"n_wcv":"3.3.0.53"};
// Locales sent from the server use underscore, not hyphen, to separate region code.
let locale = window.navigator.language.replace('-', '_');
const langSynonyms = {
  'he': 'iw',
}
if (langSynonyms[locale]) {
  locale = langSynonyms[locale];
}

const direction = availableRtlLocales.indexOf(locale) >= 0 ? 'rtl' : 'ltr';

// window.chrome.lockScreen.data.create only exists in lockScreen environment.
const lockScreenMode = !!(window.chrome && window.chrome.lockScreen &&
    window.chrome.lockScreen.data && window.chrome.lockScreen.data.create);
const head = document.getElementsByTagName('head')[0];

if (!lockScreenMode) {
  // The set of available locales matches the window.navigator.language casing rules (eg. 'en_GB')
  // but the generated JS files are all in lower case. We therefore need to request the lowercase
  // version, otherwise this does not find the symbols file.
  const symbolsLocaleName = availableLocales.indexOf(locale) >= 0 ? locale.toLowerCase() : 'en';
  const symbolsEl = document.createElement('script');
  symbolsEl.setAttribute('type', 'text/javascript');
  symbolsEl.setAttribute('src', 'i18n/symbols_' + symbolsLocaleName + '.js');
  head.appendChild(symbolsEl);
}

const mode = lockScreenMode ? 'lockscreen' : 'app';

const cssFileName = prefix + '_' + mode + '_styles_' + direction + '_default.css';
const cssEl = document.createElement('link');
cssEl.id = 'preloaded-theme';
cssEl.setAttribute('rel', 'stylesheet');
cssEl.setAttribute('href', cssFileName);
head.appendChild(cssEl);

const jsFileName = prefix + '_' + mode + '_script_' + direction + '.js';
const jsEl = document.createElement('script');
jsEl.setAttribute('type', 'text/javascript');
jsEl.setAttribute('src', jsFileName);
head.appendChild(jsEl);

// In lockscreen mode, we must ensure css is loaded since ink engine will
// crash if executed before its container has size.
let cssLoaded = !lockScreenMode;
let jsLoaded = false;
let inkJsLoaded = false;

const onLoadFn = function() {
  if (cssLoaded && jsLoaded && inkJsLoaded) {
    if (lockScreenMode) {
      initLockscreenMode(window._keep_persistenceEnabled_);
    } else {
      initNotesApp(
        window._keep_launchToDrawing_,
        window._keep_drawingImageEntry_,
        window._keep_drawingNoteIdToOpen_,
        window._keep_isDemoMode_,
        true /* opt_loadSymbols */);
    }
  }
};

cssEl.onload = function() {
  cssLoaded = true;
  onLoadFn();
};
jsEl.onload = function() {
  jsLoaded = true;
  onLoadFn();
};

// This prefix defines the path where the Ink resources are located.
let STATIC_JS_PREFIX;
(() => {
  const inkJsEl = document.createElement('script');
  inkJsEl.setAttribute('type', 'text/javascript');

  // Detect support for WASM threads, pulling in the threaded loader when feasible.
  const mem = new WebAssembly.Memory({initial: 1, maximum: 1, shared: true});
  if (typeof SharedArrayBuffer !== 'undefined' && mem.buffer instanceof SharedArrayBuffer) {
    STATIC_JS_PREFIX = 'ink/threads/';
    inkJsEl.setAttribute('src', STATIC_JS_PREFIX + 'ink-loader-threads.js');
  } else {
    STATIC_JS_PREFIX = 'ink/nothreads/';
    inkJsEl.setAttribute('src', STATIC_JS_PREFIX + 'ink-loader.js');
  }
  head.appendChild(inkJsEl);
  inkJsEl.onload = function() {
    inkJsLoaded = true;
    onLoadFn();
  };
})();

