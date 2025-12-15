# Publishing ngx-carousel to npm

This guide will walk you through publishing your carousel package to npm.

## Step 1: Build the Library

First, you need to build the library for production. Run:

```bash
npm install
npm run build:lib
```

This will create the distributable package in the `dist/ngx-carousel` folder.

## Step 2: Navigate to the Built Package

```bash
cd dist/ngx-carousel
```

## Step 3: Verify the Package Contents

Make sure the `dist/ngx-carousel` folder contains:
- `package.json` (the library's package.json)
- `README.md` (documentation)
- `bundles/` (compiled JavaScript)
- `fesm2022/` (ES modules)
- `esm2022/` (ES modules)
- `*.d.ts` (TypeScript definitions)
- `*.scss` or `*.css` (styles)

## Step 4: Check package.json

Before publishing, make sure to:
1. Update the `version` in `projects/ngx-carousel/package.json` if needed
2. Add your name/email to the `author` field
3. Add your repository URL if you have one

## Step 5: Login to npm

If you don't have an npm account, create one at https://www.npmjs.com/signup

Then login:
```bash
npm login
```

Enter your:
- Username
- Password
- Email address
- One-time password (if you have 2FA enabled)

## Step 6: Check Package Name Availability

Make sure the package name `ngx-carousel` is available:
```bash
npm view ngx-carousel
```

If it says "404 Not Found", the name is available. If it shows package info, you'll need to choose a different name (like `@your-username/ngx-carousel`).

## Step 7: Publish the Package

From the `dist/ngx-carousel` directory:

```bash
npm publish
```

For a scoped package (if name is taken):
```bash
npm publish --access public
```

## Step 8: Verify Publication

Check your package on npm:
```bash
npm view ngx-carousel
```

Or visit: https://www.npmjs.com/package/ngx-carousel

## Important Notes

- **Versioning**: Use semantic versioning (1.0.0, 1.0.1, 1.1.0, 2.0.0)
- **Demo is excluded**: The demo project is NOT included in the published package (it's in `.npmignore`)
- **Only library code**: Only the `ngx-carousel` library code is published
- **Update version**: Each time you publish changes, update the version number

## Updating the Package

When you make changes:

1. Update version in `projects/ngx-carousel/package.json`
2. Rebuild: `npm run build:lib`
3. Navigate: `cd dist/ngx-carousel`
4. Publish: `npm publish`

## Troubleshooting

- **Name already taken**: Use a scoped package name like `@your-username/ngx-carousel`
- **Build fails**: Make sure all dependencies are installed with `npm install`
- **Publish fails**: Check you're logged in with `npm whoami`




