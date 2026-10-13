// next.config.js · updated 13.10.2026 15:25 (Asia/Jerusalem)
// Exposes version, update number and commit to the header stamp (bumped on every push)
const pkg = require('./package.json');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
    NEXT_PUBLIC_BUILD_NUMBER: String(pkg.buildNumber || ''),
    NEXT_PUBLIC_COMMIT: (process.env.VERCEL_GIT_COMMIT_SHA || 'local').slice(0, 7),
  },
};
