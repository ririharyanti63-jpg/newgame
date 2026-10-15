# ⛏️ TARIK TAMBANG EKOSISTEM - VOXEL 3D BATTLE

Game edukasi interaktif **Tarik Tambang 3D bergaya voxel** untuk siswa Kelas V SD/MI, dengan materi kurikulum **IPAS Bab 3: Harmoni dalam Ekosistem**. Grafis karakter dan lingkungan dibuat secara prosedural untuk game ini.

---

## 🎮 Fitur Utama Game

1. **Grafik 3D bergaya voxel**:
   - Karakter balok bergaya voxel dengan pakaian berwarna, pose menarik tali, dan variasi pelindung.
   - Arena dengan rumput, tanah, bebatuan, pepohonan, bunga, awan, dan penonton hewan.
   - Efek debu saat menarik tali dan kembang api saat menang.
   - Jika browser tidak menyediakan WebGL, arena tetap berjalan dengan animasi voxel Canvas 2D.

2. **Bermain Bersamaan Tanpa Giliran (Simultaneous Real-Time Battle)**:
   - Masing-masing tim memiliki lima karakter dan bermain **di satu waktu yang sama (cepet-cepetan)**.
   - Tidak ada sistem tunggu giliran! Tim yang cepat dan tepat menjawab akan mendapatkan tarikan lebih banyak dan memenangkan pertandingan.
   - Setiap jawaban benar memberi satu tarikan; mode waktu menentukan pemenang dari jumlah jawaban benar, sedangkan mode tanpa batas berakhir saat tali mencapai target.
   - Layar terbagi menjadi dua panel (*split-screen*):
     - **Tim Kiri (Steve Side)**: Tombol Hotkey `[1, 2, 3, 4]` atau `[Q, W, E, R]`, atau sentuh/klik langsung.
     - **Tim Kanan (Alex Side)**: Tombol Hotkey `[7, 8, 9, 0]` atau `[U, I, O, P]`, atau sentuh/klik langsung.
   - Multi-touch friendly: dapat dimainkan oleh 2 orang siswa sekaligus di papan tulis interaktif (*Smartboard*) atau laptop layar sentuh.

3. **Kustomisasi Lengkap**:
   - Nama tim dapat diubah bebas sesuai kesepakatan (misal: "Tim Harimau", "Tim Rajawali", "Tim Biotik", "Tim Abiotik").
   - Pilihan target tarikan kemenangan: 5, 6, 8, atau 10 tarikan.
   - Pilihan mode batas waktu (Sprint 60 detik, 90 detik, 120 detik, atau Tanpa Batas).
   - Pertandingan dapat dijeda dan dilanjutkan dengan tombol Jeda atau tombol `Escape`.

4. **Sistem Suara & Musik (Web Audio API)**:
   - Musik latar chiptune/8-bit dan efek suara sintetis untuk jawaban, tarikan, hitung mundur, dan kemenangan.

5. **Bank Soal IPAS Bab 3 Super Lengkap (70 Soal Teracak)**:
   - Mencakup seluruh subbab:
     - **A. Pengertian Ekosistem**: Hubungan timbal balik makhluk hidup & lingkungan.
     - **B. Komponen Ekosistem**: Komponen biotik & abiotik.
     - **C. Istilah Ekosistem**: Individu, populasi, komunitas, habitat, ekosistem.
     - **D. Jenis Ekosistem**: Ekosistem darat, perairan, alami, buatan.
     - **E. Interaksi**: Predasi, kompetisi, simbiosis mutualisme, komensalisme, parasitisme.
     - **F. Rantai Makanan**: Produsen, konsumen I, II, III, dan pengurai (dekomposer).
     - **G. Jaring-Jaring Makanan**: Keterkaitan rantai makanan dan keseimbangan alam.
     - **H. Keseimbangan Ekosistem**: Faktor alam dan aktivitas manusia.
     - **I. Peran Manusia**: Reboisasi, menjaga sungai, konservasi alam.
   - Fitur **"Lihat Pembahasan Soal"** setelah pertandingan berakhir untuk penguatan materi dan pembelajaran reflektif.

---

## 🚀 Cara Menjalankan Game

1. **Cara Paling Mudah (Sekali Klik)**:
   - Buka folder proyek game.
   - Klik ganda file **`Mulai_Game.bat`**.
   - Game akan otomatis terbuka di browser favorit Anda (Google Chrome, Microsoft Edge, Firefox).

2. **Atau Melalui File HTML Langsung**:
   - Buka file [index.html](./index.html) menggunakan peramban web apa pun.

3. **Menjalankan Melalui Local Server (Opsional)**:
   - Buka PowerShell di folder proyek dan jalankan:
     ```powershell
     powershell -ExecutionPolicy Bypass -File .\server.ps1
     ```
   - Lalu buka `http://localhost:8080/` di browser.

---

## ⌨️ Kontrol Tombol

| Aksi | Tim Kiri (Steve) | Tim Kanan (Alex) |
|---|---|---|
| Pilihan A | Tombol `1` atau `Q` | Tombol `7` atau `U` |
| Pilihan B | Tombol `2` atau `W` | Tombol `8` atau `I` |
| Pilihan C | Tombol `3` atau `E` | Tombol `9` atau `O` |
| Pilihan D | Tombol `4` atau `R` | Tombol `0` atau `P` |
| Layar Sentuh / Mouse | Klik tombol di panel kiri | Klik tombol di panel kanan |
| Jeda / Lanjutkan | Tombol `Escape` atau tombol Jeda | Tombol `Escape` atau tombol Jeda |

*Catatan: Jika menjawab salah, panel tim tersebut akan terkunci sejenak selama 1,5 detik sebagai penalti tebakan sembarangan, lalu melanjutkan ke soal baru.*
