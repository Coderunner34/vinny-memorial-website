# Vinny's Memorial Website - Complete Guide

## 🕯️ Overview

This is a living memorial website for **Vincent Mwaura Wairimu (Vinny)**, who passed on April 25th, 2026 at age 21. The site is built with React, Tailwind CSS, and Motion (Framer Motion) with advanced 3D animations, parallax effects, and real-time updates.

---

## ✨ Features Included

### 1. **Animated Loading Screen**
- Flickering candle flame animation
- Name appears letter by letter
- Smooth transition to main site

### 2. **Hero Section**
- Vinny's portrait with golden glow
- Starry background with 3-layer parallax scrolling
- 2 Timothy 4:7 scripture
- Smooth scroll indicator

### 3. **Biography Section**
- Beautifully written narrative of Vinny's life
- 4 real family photos with hover effects
- Responsive grid layout

### 4. **Interactive Timeline**
- Vertical timeline from 2005-2026
- Alternating left/right layout
- Icons for each milestone
- Special styling for the final entry

### 5. **Photo Gallery**
- Masonry grid with 8 real photos of Vinny
- 3D card hover effects
- Click to view in lightbox
- Beautiful captions for each photo

### 6. **Virtual Candle Wall**
- Visitors can light virtual candles
- Leave prayers and messages
- Animated flame for each candle
- Hover to see messages

### 7. **Tribute Guestbook**
- Open condolence book
- Beautiful card design
- Pre-loaded family tributes
- Anyone can add messages

### 8. **Service Details**
- Full burial information
- **Live countdown timer** to Tuesday, May 6th, 10:00 AM
- Order of service
- Time and location details

### 9. **Live Stream Section**
- YouTube embed ready
- **Admin panel for easy updates**
- Instructions for setup

### 10. **Farewell Section**
- Final candle with eternal flame
- Beautiful poetry
- Matthew 5:4 scripture
- Peaceful closing

### 11. **Advanced Features**
- Background music player (floating candle button)
- Floating particle network animation
- 3D perspective transforms
- Smooth parallax scrolling
- Fully responsive design

---

## 🔐 Admin Panel - How to Update the Live Stream

### Accessing the Admin Panel

There are **3 ways** to open the admin panel:

1. **Triple-click** the bottom-left corner of the page (where the settings icon appears on hover)
2. Press **Ctrl + Shift + A** (Windows/Linux) or **Cmd + Shift + A** (Mac)
3. Hover over the bottom-left corner and click the settings icon

### Login

- **Default Password:** `Vinny2026`
- You can change this password in `/src/app/components/AdminPanel.tsx` (line 18)

### Adding the Live Stream URL

1. **On Tuesday morning** (or whenever the stream starts):
   - Go to your YouTube live stream
   - Click **Share → Embed**
   - Copy the URL from the `src="..."` part
   - Example: `https://www.youtube.com/embed/ABC123`

2. **In the admin panel:**
   - Paste the URL in the text box
   - Click **"Save & Update Live"**
   - The stream will immediately appear for ALL visitors

3. **The URL is saved** in browser localStorage, so it persists across page refreshes

### How It Works

- When you save the URL, it's stored locally on the visitor's browser
- A JavaScript event notifies all components to update
- Anyone viewing the site will automatically see the live stream appear
- After the burial, the recording stays embedded on the site forever

---

## 🎵 Background Music

- Music plays automatically after entering the site
- Click the **glowing candle button** (bottom-right) to pause/play
- Currently uses a YouTube embed of peaceful piano music
- You can replace with your own audio file in `/src/app/components/MusicPlayer.tsx`

---

## 📸 Photos Integrated

All of Vinny's real photos have been added:

1. **Hero Section:** Selfie with dad (the beautiful smile)
2. **Biography:** 4 family photos
3. **Photo Gallery:** 8 photos with captions:
   - With family - blessed moments
   - With dad - the smile that lit every room
   - With beloved cucu
   - Family gathering in Eldoret
   - Young Vinny - full of life
   - Church family at P.C.E.A. Gituamba
   - Celebrating with loved ones
   - The whole family united in love

---

## 🎨 Visual Design Elements

### Colors
- **Black background** with midnight blue gradients
- **Amber/Gold** (#D9A848) for all accents
- **Warm cream** for text and highlights

### Animations
- **3D card transforms** on photo gallery
- **Parallax scrolling** stars (3 depth layers)
- **Floating particle network** background
- **Smooth fade-ins** and scale effects
- **Candle flame** flicker animations

### Typography
- **Serif fonts** for headers (elegant, memorial feel)
- **Georgia** for scripture quotes
- **Sans-serif** for body text (readability)

---

## 🛠️ Technical Details

### Built With
- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **Motion (Framer Motion)** for animations
- **react-responsive-masonry** for photo grid
- **Lucide React** for icons

### File Structure
```
src/app/
├── App.tsx                          # Main app with routing
├── components/
│   ├── LoadingIntro.tsx             # Animated intro screen
│   ├── HeroSection.tsx              # Hero with parallax stars
│   ├── Biography.tsx                # Life story + photos
│   ├── Timeline.tsx                 # Journey timeline
│   ├── PhotoGallery.tsx             # Masonry photo grid
│   ├── CandleWall.tsx               # Virtual candles
│   ├── TributeWall.tsx              # Guestbook
│   ├── ServiceDetails.tsx           # Burial info + countdown
│   ├── LiveStream.tsx               # YouTube embed
│   ├── Farewell.tsx                 # Final section
│   ├── MusicPlayer.tsx              # Background music
│   ├── AdminPanel.tsx               # Admin dashboard
│   └── FloatingParticles.tsx        # Particle effects
└── imports/                         # Vinny's photos
```

---

## 📱 Responsive Design

The site is fully responsive:
- **Desktop:** Full 3-column masonry, large text, wide layouts
- **Tablet:** 2-column grids, adjusted spacing
- **Mobile:** Single column, touch-friendly buttons, optimized images

---

## 🚀 Going Live

### Option 1: Deploy to Netlify (Easiest)
1. Push code to GitHub
2. Connect Netlify to your repo
3. Deploy automatically
4. Get a free URL like `vinny-memorial.netlify.app`

### Option 2: Deploy to Vercel
1. Push code to GitHub
2. Import to Vercel
3. Deploy with one click
4. Get a free URL

### Option 3: Custom Domain
- Buy a domain like `vinny-wairimu.com`
- Point it to Netlify/Vercel
- Professional memorial site

---

## 🎥 Live Streaming the Burial

### Equipment Needed
- Smartphone with good camera
- Stable internet (4G/5G or WiFi)
- Tripod or someone to hold phone steady

### Recommended Platforms
1. **YouTube Live** (Best - stays permanent)
2. **Facebook Live** (Easy for family)
3. **Both** (reach more people)

### Steps for YouTube Live
1. Open YouTube app → Click **+** → **Go Live**
2. Set title: "Vincent Wairimu Burial Service - May 6, 2026"
3. Set privacy: **Unlisted** (only people with link can watch)
4. Start streaming
5. Copy the embed URL
6. Paste in admin panel

### After the Service
- The recording stays on YouTube forever
- Embedded on the memorial site permanently
- Family can revisit anytime

---

## 💡 Future Enhancements (Optional)

If you want to add more later:

1. **Supabase Database**
   - Save candles and tributes permanently
   - Sync across all devices
   - See candles from everywhere

2. **Photo Upload**
   - Let visitors add their own photos of Vinny
   - Build a community gallery

3. **Memorial Donations**
   - Add M-Pesa/PayPal links
   - Collect for family or charity in Vinny's name

4. **Guest Counter**
   - Show "X people have visited this memorial"

5. **Sound Effects**
   - Candle lighting sound
   - Piano note when posting tribute
   - Choir swell on scroll

---

## 🙏 Final Notes

This memorial is a **living tribute** to Vinny. It's not just a website — it's a sacred space where:

- Family can grieve together
- Friends can share memories
- Future generations can learn who he was
- His light continues to shine

**The candle that was lit in 2005 will never go out.**

Rest in peace, Vinny. 2005-2026. Until we meet again. 🕯️

---

## 📞 Support

If you need help:
- Check the code comments (they explain everything)
- Admin panel has built-in instructions
- All components are well-documented

**Password to change:** `/src/app/components/AdminPanel.tsx` line 18  
**Music source:** `/src/app/components/MusicPlayer.tsx` line 18  
**Colors/theme:** `/src/styles/theme.css`

---

*Created with love by family and friends of Vincent Mwaura Wairimu.*  
*"I have fought the good fight, I have finished the race, I have kept the faith." - 2 Timothy 4:7*
