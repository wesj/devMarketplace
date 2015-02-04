Dev Marketplace
============================================

This sets up some prefs for the dev marketplace in Firefox.

You can install it from this URL:
https://addons.mozilla.org/en-US/android/addon/dev-marketplace/

If you want to build your own addon, edit
``config_build.sh`` and change ``ANDROID_APP_ID`` to
``org.mozilla.fennec`` (Firefox Nightly) or your own custom app ID.

Connect your Android device (it should have remote debugging enabled)
and run ``./build.sh``. This will build the addon and push it your device.
You will need to confirm installation on your device's screen.
