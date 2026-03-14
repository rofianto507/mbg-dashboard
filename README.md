# 🇮🇩 Dashboard Analitik Nasional - Program Makan Bergizi Gratis (MBG)

> **Badan Gizi Nasional | Command Center** — Sistem monitoring dan pengendalian nasional Program Makan Bergizi Gratis Indonesia

## 📸 Preview

![MBG Dashboard Preview](https://github.com/user-attachments/assets/a0cccf79-1c01-4a3e-b362-1e2a69e93be9)

Dashboard ini menampilkan visualisasi data interaktif program MBG secara nasional, mencakup:
- 🗺️ Peta sebaran gizi per provinsi
- 📊 KPI nasional real-time
- ⚠️ Early Warning System
- 📈 Trend distribusi 30 hari
- 📋 Detail data 38 provinsi

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🛠️ Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| **Next.js 14** | Framework React dengan App Router |
| **TypeScript** | Type safety & developer experience |
| **Tailwind CSS** | Styling utility-first |
| **Recharts** | Visualisasi chart interaktif |
| **SVG Custom** | Peta Indonesia interaktif |

## 📁 Struktur Folder

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Halaman utama dashboard
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Header dengan clock real-time & filter
│   ├── KPICards.tsx        # 6 kartu KPI utama
│   ├── IndonesiaMap.tsx    # Peta SVG interaktif
│   ├── DistributionChart.tsx # Trend distribusi 30 hari
│   ├── CalorieChart.tsx    # Standar kalori per jenjang
│   ├── BudgetChart.tsx     # Serapan anggaran per wilayah
│   ├── NutritionComposition.tsx # Komposisi menu (donut chart)
│   ├── AlertPanel.tsx      # Early Warning System
│   ├── ProvinceTable.tsx   # Tabel 38 provinsi
│   └── NutritionGauge.tsx  # Gauge indeks gizi
├── data/
│   └── dummy-data.ts       # Data dummy 38 provinsi + time-series
└── types/
    └── index.ts            # TypeScript interfaces
```

## 🎯 Fitur Utama

### Executive Command Center
- **KPI Nasional**: Total penerima, sekolah, porsi harian, serapan anggaran
- **Real-time Clock**: Jam dan tanggal otomatis diperbarui setiap detik
- **Filter**: Per provinsi dan periode waktu

### Peta Indonesia Interaktif
- Visualisasi status gizi per provinsi (🟢 Hijau / 🟡 Kuning / 🔴 Merah)
- Ukuran bubble proporsional terhadap jumlah penerima manfaat
- Hover tooltip dengan info detail provinsi
- Klik untuk drill-down detail provinsi

### Charts & Analytics
- **Trend Distribusi Harian** (Line Chart): 30 hari terakhir vs target
- **Pemenuhan Standar Kalori** (Bar Chart): per jenjang pendidikan (SD, SMP, SMA)
- **Serapan Anggaran per Wilayah** (Horizontal Bar Chart): 7 wilayah Indonesia
- **Komposisi Menu Gizi** (Donut Chart): Karbohidrat, Protein, Lemak, Serat, Vitamin

### Early Warning System
- Alert kritis (🔴) dan perhatian (🟡) secara real-time
- Filter berdasarkan severity
- Kategori: Gizi, Distribusi, Anggaran, Pelaporan

### Tabel Data Provinsi
- 38 provinsi dengan data lengkap
- Sortable (klik header kolom) & searchable
- Pagination 10 data per halaman

## 🗺️ Roadmap Pengembangan

### Tahap 1 — Pilot (Bulan 1-4)
- [x] Mockup dashboard dengan data dummy
- [ ] Integrasi API data SPPG real-time
- [ ] Autentikasi & manajemen user

### Tahap 2 — Implementasi Nasional (Bulan 5-10)
- [ ] Skalasi 38 provinsi dengan data nyata
- [ ] AI Food Nutrition Validation
- [ ] Integrasi Kemkes (data stunting)

### Tahap 3 — AI & Optimization (Bulan 11-18)
- [ ] Predictive analytics risiko gizi
- [ ] Optimasi alokasi anggaran berbasis AI
- [ ] Public transparency portal

## 📞 Kontak

**Badan Gizi Nasional**
Program Makan Bergizi Gratis (MBG)
Republik Indonesia 🇮🇩
