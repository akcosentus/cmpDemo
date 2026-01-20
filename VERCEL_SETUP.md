# Vercel Deployment Setup

## Environment Variables

You need to add these environment variables in your Vercel project settings:

### Required Variables:

1. **RETELL_API_KEY**
   - Value: `key_db3a962d70e503a3637c5d4b4ab5`
   - Description: Your Retell AI API key

2. **RETELL_AGENT_ID**
   - Value: `agent_3a613fdf8245235b72ce73fb1c`
   - Description: Your Retell AI chat agent ID

### How to Add Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project (cmpDemo)
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Click "Add New"
   - Enter the **Key** (e.g., `RETELL_API_KEY`)
   - Enter the **Value** (e.g., `key_db3a962d70e503a3637c5d4b4ab5`)
   - Select environments: **Production**, **Preview**, and **Development**
   - Click "Save"
5. Repeat for `RETELL_AGENT_ID`

### After Adding Variables:

- Redeploy your application for the changes to take effect
- You can trigger a redeploy by:
  - Pushing a new commit to your repository, or
  - Going to Deployments → Click the three dots on the latest deployment → "Redeploy"

## Testing Locally

To test locally, create a `.env.local` file in the root directory:

```bash
RETELL_API_KEY=key_db3a962d70e503a3637c5d4b4ab5
RETELL_AGENT_ID=agent_3a613fdf8245235b72ce73fb1c
```

Then run:
```bash
npm run dev
```

**Note:** Never commit `.env.local` to git (it's already in .gitignore)
