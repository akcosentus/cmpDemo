# Setup Guide for CMP Demo

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Get your OpenAI API key from: https://platform.openai.com/api-keys

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deploy to Vercel

### Option 1: Using Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add your `OPENAI_API_KEY` in the Environment Variables section
4. Deploy!

## 🎨 Features

- **Responsive Navbar**: Matches the ClaimsManager Portal design with dark theme
- **Modern Landing Page**: Hero section with feature cards
- **AI Chatbot**: Floating chat widget with OpenAI integration
- **Mobile Responsive**: Works seamlessly on all devices

## 🔧 Customization

### Navbar
Edit `components/Navbar.tsx` to modify:
- Menu items
- Dropdown options
- Branding/logo

### Hero Section
Edit `components/Hero.tsx` to change:
- Headline text
- Feature cards
- Call-to-action buttons

### Chatbot
Edit `components/ChatBot.tsx` and `app/api/chat/route.ts` to customize:
- AI personality and system prompt
- Chat UI styling
- Response behavior

## 📝 Project Structure

```
cmpDemo/
├── app/
│   ├── api/chat/          # API route for chatbot
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ChatBot.tsx        # AI chatbot component
│   ├── Hero.tsx           # Landing page hero section
│   └── Navbar.tsx         # Navigation bar
├── public/                # Static assets
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
└── vercel.json           # Vercel deployment config
```

## 🐛 Troubleshooting

### Chatbot not working?
- Make sure you've added your `OPENAI_API_KEY` to `.env.local`
- Restart the development server after adding environment variables

### Styling issues?
- Clear your browser cache
- Run `npm run build` to check for build errors

### Deployment issues?
- Ensure all environment variables are set in Vercel dashboard
- Check the Vercel deployment logs for errors

## 📞 Support

For questions or issues, contact the development team.
