
# Calorie Tracker App 🥗

Java Spring Boot ve React (TypeScript) ile geliştirilen bu tam işlevli web uygulaması, kullanıcıların günlük kalori ihtiyaçlarını hesaplamalarına, tükettikleri yemekleri kaydederek kalori takibi yapmalarına ve hedeflerine ulaşmalarına yardımcı olur.

## 🚀 Özellikler

- 🔐 Kullanıcı Giriş / Kayıt Sistemi
- 🔢 Günlük Kalori İhtiyacı Hesaplama (BMR bazlı)
- 🥘 Yemek Girişi ve Günlük Kalori Takibi
- 📊 Kalori Hedef Takibi
- 🤖 (Opsiyonel) AI Tabanlı Yemek Önerileri - [Mastra Agent](https://mastra.ai/en/docs) ile
- 🔒 Giriş yapmayan kullanıcılar için sayfa koruması (protected routes)
- 🧼 Modern ve sade kullanıcı arayüzü (React + TypeScript)

## 🛠️ Kullanılan Teknolojiler

### Backend
- Java 17
- Spring Boot 3.2+
- Spring Web
- Spring Data JPA
- Spring Security (giriş koruması için)
- H2 / PostgreSQL (isteğe bağlı)
- Maven

### Frontend
- React
- TypeScript
- React Router
- Context API (AuthContext)
- Tailwind CSS (isteğe bağlı)

## 🏁 Kurulum Talimatları

### Backend (Spring Boot)

```bash
git clone https://github.com/kullanici-adi/calorie-tracker-app.git
cd calorie-tracker-app/backend
./mvnw clean install
./mvnw spring-boot:run
```

> API, varsayılan olarak `http://localhost:8080` üzerinde çalışır.

### Frontend (React)

```bash
cd calorie-tracker-app/frontend
npm install
npm run dev
```

> Uygulama arayüzü `http://localhost:5173` adresinde çalışır.

## 🔐 Giriş Korumalı Sayfalar

- `/dashboard` → sadece giriş yapan kullanıcılar görebilir.
- `/meals` → yemek takibi sayfası
- `/calculate` → kalori ihtiyacı hesaplama

Giriş yapılmadığında otomatik olarak giriş sayfasına yönlendirilir.

## 📁 Proje Yapısı

```
calorie-tracker-app/
├── backend/
│   ├── controller/
│   ├── model/
│   ├── repository/
│   ├── service/
│   └── application.properties
└── frontend/
    ├── pages/
    ├── components/
    ├── context/AuthContext.tsx
    └── App.tsx
```

## 🧠 Gelecek Geliştirmeler

- Kullanıcı bazlı kalori raporları (grafiksel)
- Haftalık / Aylık istatistikler
- Yemek veri tabanı ile entegrasyon
- AI yemek öneri sistemi (Mastra Agent)
- Mobil uyumlu tasarım

## 📄 Lisans

Bu proje eğitim amaçlıdır ve açık kaynak olarak MIT lisansı ile lisanslanmıştır.
