const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");

function pref(name, val) {
  switch (typeof(val)) {
    case "boolean":
      Services.prefs.setBoolPref(name, val);
      break;
    case "number":
      Services.prefs.setIntPref(name, val);
      break;
    default:
      Services.prefs.setCharPref(name, val);
  }
}

function unpref(name, val) {
  Services.prefs.clearUserPref(name);
}

function loadIntoWindow(window) {
  if (!window)
    return;

  pref("dom.payment.skipHTTPSCheck", true);
  pref("dom.identity.enabled", true);
  pref("toolkit.identity.debug", true);

  pref("dom.payment.provider.1.name", "firefoxmarketdev");
  pref("dom.payment.provider.1.description", "marketplace-dev.allizom.org");
  pref("dom.payment.provider.1.uri", "https://marketplace-dev.allizom.org/mozpay/?req=");
  pref("dom.payment.provider.1.type", "mozilla-dev/payments/pay/v1");
  pref("dom.payment.provider.1.requestMethod", "GET");

  pref("dom.payment.provider.2.name", "firefoxmarketstage");
  pref("dom.payment.provider.2.description", "marketplace.allizom.org");
  pref("dom.payment.provider.2.uri", "https://marketplace.allizom.org/mozpay/?req=");
  pref("dom.payment.provider.2.type", "mozilla-stage/payments/pay/v1");
  pref("dom.payment.provider.2.requestMethod", "GET");

  pref("dom.payment.provider.3.name", "firefoxmarketlocal");
  pref("dom.payment.provider.3.description", "localhost");
  pref("dom.payment.provider.3.uri", "http://localhost:8000/mozpay/?req=");
  pref("dom.payment.provider.3.type", "mozilla-local/payments/pay/v1");
  pref("dom.payment.provider.3.requestMethod", "GET");

  pref("dom.payment.provider.4.name", "mock");
  pref("dom.payment.provider.4.description", "mock");
  pref("dom.payment.provider.4.uri", "http://people.mozilla.com/~kmcmillan/pay-provider.html?req=");
  pref("dom.payment.provider.4.type", "mock/payments/inapp/v1");
  pref("dom.payment.provider.4.requestMethod", "GET");
}

function unloadFromWindow(window) {
  if (!window)
    return;
  unpref("dom.payment.skipHTTPSCheck", true);
  unpref("dom.identity.enabled", true);
  unpref("toolkit.identity.debug", true);

  unpref("dom.payment.provider.1.name", "firefoxmarketdev");
  unpref("dom.payment.provider.1.description", "marketplace-dev.allizom.org");
  unpref("dom.payment.provider.1.uri", "https://marketplace-dev.allizom.org/mozpay/?req=");
  unpref("dom.payment.provider.1.type", "mozilla-dev/payments/pay/v1");
  unpref("dom.payment.provider.1.requestMethod", "GET");

  unpref("dom.payment.provider.2.name", "firefoxmarketstage");
  unpref("dom.payment.provider.2.description", "marketplace.allizom.org");
  unpref("dom.payment.provider.2.uri", "https://marketplace.allizom.org/mozpay/?req=");
  unpref("dom.payment.provider.2.type", "mozilla-stage/payments/pay/v1");
  unpref("dom.payment.provider.2.requestMethod", "GET");

  unpref("dom.payment.provider.3.name", "firefoxmarketlocal");
  unpref("dom.payment.provider.3.description", "localhost");
  unpref("dom.payment.provider.3.uri", "http://localhost:8000/mozpay/?req=");
  unpref("dom.payment.provider.3.type", "mozilla-local/payments/pay/v1");
  unpref("dom.payment.provider.3.requestMethod", "GET");

  unpref("dom.payment.provider.4.name", "mock");
  unpref("dom.payment.provider.4.description", "mock");
  unpref("dom.payment.provider.4.uri", "http://people.mozilla.com/~kmcmillan/pay-provider.html?req=");
  unpref("dom.payment.provider.4.type", "mock/payments/inapp/v1");
  unpref("dom.payment.provider.4.requestMethod", "GET");
}

var windowListener = {
  onOpenWindow: function(aWindow) {
    // Wait for the window to finish loading
    let domWindow = aWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
    domWindow.addEventListener("load", function() {
      domWindow.removeEventListener("load", arguments.callee, false);
      loadIntoWindow(domWindow);
    }, false);
  },
  
  onCloseWindow: function(aWindow) {
  },
  
  onWindowTitleChange: function(aWindow, aTitle) {
  }
};

function startup(aData, aReason) {
  let windows = Services.wm.getEnumerator("navigator:browser");
  while (windows.hasMoreElements()) {
    let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
    loadIntoWindow(domWindow);
  }
}

function shutdown(aData, aReason) {
  if (aReason == APP_SHUTDOWN)
    return;

  try {
    Services.wm.removeListener(windowListener);
  } catch(ex) { }

  let windows = Services.wm.getEnumerator("navigator:browser");
  while (windows.hasMoreElements()) {
    let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
    unloadFromWindow(domWindow);
  }
}

function install(aData, aReason) {
  let windows = Services.wm.getEnumerator("navigator:browser");
  while (windows.hasMoreElements()) {
    let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
    loadIntoWindow(domWindow);
  }
}

function uninstall(aData, aReason) {
  Services.console.logStringMessage("uninstall");
}
