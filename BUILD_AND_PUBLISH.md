# Quick Guide: Build and Publish to npm

## What Gets Published?

✅ **INCLUDED** (in the published package):
- The `ngx-carousel` library code from `projects/ngx-carousel/src/lib/`
- Compiled JavaScript bundles
- TypeScript definitions (.d.ts files)
- SCSS/CSS styles
- package.json
- README.md

❌ **EXCLUDED** (NOT in the published package):
- The `demo` project (it's for testing only)
- Source TypeScript files (.ts)
- Test files
- Development configuration files
- node_modules

## Step-by-Step Publishing

### 1. Install Dependencies (if not already done)
```bash
npm install
```

### 2. Build the Library
```bash
npm run build:lib
```

This creates the package in `dist/ngx-carousel/`

### 3. Go to the Built Package
```bash
cd dist/ngx-carousel
```

### 4. Check What's Inside
```bash
dir
```

You should see:
- package.json
- README.md
- bundles/
- fesm2022/
- esm2022/
- *.d.ts files
- *.scss files

### 5. Login to npm (First Time Only)
```bash
npm login
```

Enter your npm username, password, and email.

### 6. Check if Package Name is Available
```bash
npm view ngx-carousel
```

If it says "404", the name is available. If it shows package info, the name is taken and you'll need to use a scoped name like `@yourusername/ngx-carousel`.

### 7. Publish!
```bash
npm publish
```

If using a scoped package:
```bash
npm publish --access public
```

### 8. Verify
Visit: https://www.npmjs.com/package/ngx-carousel

## Before Publishing - Update These:

1. **Author**: Edit `projects/ngx-carousel/package.json` and add your name/email:
   ```json
   "author": "Your Name <your.email@example.com>"
   ```

2. **Repository** (optional): If you have a GitHub repo:
   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/yourusername/ngx-carousel.git"
   }
   ```

3. **Version**: Start with `1.0.0` for the first release

## Updating the Package Later

1. Make your changes
2. Update version in `projects/ngx-carousel/package.json` (e.g., `1.0.1`)
3. Rebuild: `npm run build:lib`
4. Go to dist: `cd dist/ngx-carousel`
5. Publish: `npm publish`

## Troubleshooting

**"Package name already taken"**
- Use a scoped name: Change `"name": "ngx-carousel"` to `"name": "@yourusername/ngx-carousel"` in `projects/ngx-carousel/package.json`

**"You must be logged in"**
- Run `npm login` first

**"Two-factor authentication required" (Error 403)**
- npm requires 2FA to publish packages. You have two options:

  **Option 1: Enable 2FA on your npm account (Recommended)**
  1. Go to https://www.npmjs.com/settings/aizazulhaq/security
  2. Click "Enable 2FA" or "Configure Two-Factor Authentication"
  3. Follow the setup (use an authenticator app like Google Authenticator or Authy)
  4. After enabling, try `npm publish` again - it will prompt for your 2FA code

  **Option 2: Use a Granular Access Token**
  1. Go to https://www.npmjs.com/settings/aizazulhaq/tokens
  2. Click "Generate New Token" → "Granular Access Token"
  3. Give it a name (e.g., "publish-token")
  4. Select "Publish" permission
  5. Enable "Bypass 2FA" (if available)
  6. Copy the token
  7. Use it instead of password: `npm login --auth-type=legacy` (enter username and token as password)
  8. Or set it directly: `npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN`

**Build fails**
- Make sure you ran `npm install` first
- Check that Angular CLI is installed: `npx ng version`

