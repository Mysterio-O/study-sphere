# StudySphere - Student Productivity Platform  

![StudySphere Banner](https://i.ibb.co.com/tPQRGKRx/Screenshot-2025-09-10-170702.png)

**StudySphere** is a comprehensive web application designed to help students manage their academic life efficiently. From organizing study schedules to generating practice questions and tracking expenses, StudySphere provides all the tools a student needs in one platform.  

---

## 📑 Table of Contents  

- [✨ Features](#-features)  
  - [🏠 Home Page](#-home-page)  
  - [📚 Additional Pages](#-additional-pages)  
- [🎯 Dashboard Features](#-dashboard-features)  
  - [1. Overview](#1-overview)  
  - [2. Profile Management](#2-profile-management)  
  - [3. Subject Management](#3-subject-management)  
  - [4. Schedule Management](#4-schedule-management)  
  - [5. AI-Powered Q&A Generator](#5-ai-powered-qa-generator)  
  - [6. Study Planner](#6-study-planner)  
  - [7. Wallet Management](#7-wallet-management)  
  - [8. Settings](#8-settings)  
- [🛠️ Technology Stack](#️-technology-stack)  
- [🚀 Installation](#-installation)  
- [📦 Scripts](#-scripts)  
- [🎨 Customization](#-customization)  
- [🤝 Contributing](#-contributing)  
- [📄 License](#-license)  
- [📞 Support](#-support)  
- [🔄 Version History](#-version-history)  

---

## ✨ Features  

### 🏠 Home Page  
- **Responsive Navigation Bar**: Easy access to all sections of the application  
- **Interactive Banner Slider**: Showcasing key features using Swiper.js  
- **Key Features Component**: Highlighting the core functionalities  
- **Study Planner Preview**: Quick glimpse of the planning capabilities  
- **Achievements Component**: Displaying platform milestones  
- **Testimonials Section**: Feedback from satisfied users  
- **Responsive Footer**: Complete with important links and information  

### 📚 Additional Pages  
- **About Us**: Learn about our mission and team  
- **Contact Us**: Get in touch with our support team  
- **Learning Guide**: Comprehensive documentation on how to use StudySphere  
- **Privacy**: Company privacy policies
- **Terms**: Terms and conditions
- **Cookies**: Cookie details

---

## 🎯 Dashboard Features  

### 1. Overview  
- Summary cards displaying total schedules, teachers, and subjects  
- Weekly schedule overview  
- Next class information with countdown timer  
- Subject distribution charts  
- Quiz history with questions and answers  
- Wallet information with income/expense charts  

### 2. Profile Management  
- Customizable profile and cover photos  
- Post creation, editing, and deletion  
- Personal feed of all user posts  

### 3. Subject Management  
- Add Subjects: Register new subjects with teacher details  
- My Subjects: View, edit, and delete subjects  
- Direct calling to assigned teachers  
- Schedule setting for specific subjects  

### 4. Schedule Management  
- View all assigned schedules with details  
- Delete specific schedules as needed  

### 5. AI-Powered Q&A Generator  
- Generate questions based on type (MCQ, True/False, Short Answer)  
- Customize difficulty level, quantity, and topic  
- AI verification of submitted answers  

### 6. Study Planner  
- Break down syllabus into manageable chunks  
- Set goals and track progress  
- Visualize plans with cards and priority charts  

### 7. Wallet Management  
- Add money to wallet  
- Track expenses with categorization  
- View transaction history  

### 8. Settings  
- Update profile information  
- Email verification  
- Password reset  
- Account deletion option  

---

## 🛠️ Technology Stack  

- **Frontend Framework**: React `19.1.0`  
- **Build Tool**: Vite `7.0.4`  
- **Styling**: Tailwind CSS `4.1.11` with DaisyUI `5.0.50`  
- **Routing**: React Router `7.7.1`  
- **State Management**: TanStack React Query `5.84.1`  
- **HTTP Client**: Axios `1.11.0`  
- **Animation**: Motion `12.23.12` & Lottie-React `2.4.1`  
- **Charts**: Recharts `3.1.2`  
- **Sliders**: Swiper `11.2.10`  
- **Icons**: Heroicons React `2.2.0` & React Icons `5.5.0`  
- **Notifications**: SweetAlert2 `11.22.2`  
- **Backend**: Firebase `12.0.0`  
- **Date Handling**: Date-fns `4.1.0`  

---

## 🚀 Installation  

Clone the repository:  
```bash
git clone https://github.com/Mysterio-O/study-sphere.git
cd studysphere
```
Install dependencies
```bash
npm install
```
Setup Env variables
```bash
cp .env.example .env
```
Add Your Firebase and imgbb API in the .env file

Start the development server
```bash
npm run dev
```
Build for production
```bash
npm run build
```
---

## 📦 Scripts  

- `npm run dev` - Start development server  
- `npm run build` - Build for production  
- `npm run lint` - Run ESLint  
- `npm run preview` - Preview production build  

---

## 🎨 Customization  

StudySphere is built with modular components that can be easily customized:  

- Modify colors in `tailwind.config.js`  
- Update content in the component files  
- Add new features following the existing component structure  

---

## 🤝 Contributing  

We welcome contributions to **StudySphere**!  
Please feel free to submit pull requests, create issues, or suggest new features.  

---

## 📄 License  

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.  

---

## 📞 Support  

For support, email our team at **support@studysphere.com** or visit our contact page on the website.  

---

## 🔄 Version History  

- **v0.0.0** - Initial release with core functionality  

---

**StudySphere - Organize, Plan, and Excel in Your Academic Journey**  
