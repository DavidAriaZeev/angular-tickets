# 🎟️ Tickets Client – Angular Application

שם פרטי: דוד אריה
משפחה: זאב
ת"ז: 315511766


.שנבנתה כחלק מתרגיל טכני לראיון עבודה ,ASP.NET Core מבוססת ,(Tickets) לניהול פניות Frontend אפליקציית 

האפליקציה מאפשרת:
- צפייה ברשימת פניות
- סינון פניות לפי סטטוס (All / Open / Closed)
- יצירת פנייה חדשה
- סגירת פנייה קיימת
- גנרי Modal טיפול בשגיאות באמצעות
- API גלובלי בזמן תקשורת עם ה־ Spinner הצגת 

---

## 🧰 טכנולוגיות ושיטות עבודה

- Angular 21  
- Standalone Components 
- Signals  
- OnPush Change Detection  
- Reactive Forms  
- Bootstrap 5  
- Custom Spinner Service  
- Validators  
- TypeScript  

---

## 🧱 מבנה הפרויקט

ראו את מבנה התיקיות תחת `src/app`, הכולל:
- core (config, spinner, utils)
- features/tickets (components, models, services)
- shared (validators, error modal)

---

## ⚙️ קונפיגורציית API

ה-API מוגדר דרך:
`src/assets/config/app-config.json`

```json
{
  "apiBaseUrl": "https://localhost:7218"
}
```

---

## ▶️ הרצה מקומית

```bash
npm install
ng serve
```

האפליקציה תעלה בכתובת:
http://localhost:4200

.רץ במקביל API -יש לוודא שה

---

## 📝 הערות

- הפרויקט נכתב כתרגיל טכני לראיון
- אינו כולל Authentication
- מותאם להרחבה ולתחזוקה

GPT השתמשתי ב 