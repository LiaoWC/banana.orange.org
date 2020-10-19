// === Configure ===
module.exports = Object.freeze({
    // SESSION
    SESSION_NAME: 'sid',
    SESSION_RESAVE: false,
    SESSION_SAVEUNINITIALIZED: false,
    SESSION_SECRET: 'ITSa#$@SESSION>_<SECRET.',
    SESSION_COOKIE_MAX_TIME: 1000 * 60 * 60 * 10, // 10hour
    SESSION_COOKIE_SECURE: false,  // After being developed, it should be turned to true. (need https)
    SESSION_COOKIE_SAMESITE: false,
    SESSION_COOKIE_HTTPONLY: false, // be careful
    SESSION_COOKIE_PATH: '/'
});