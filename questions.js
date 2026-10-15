/**
 * BANK SOAL IPAS KELAS V SD/MI BAB 3: HARMONI DALAM EKOSISTEM
 * 70 Soal Pilihan Ganda Lengkap dengan Pembahasan
 */

const QUESTION_BANK = [
  // --- A. PENGERTIAN EKOSISTEM ---
  {
    id: 1,
    category: "Pengertian Ekosistem",
    question: "Hubungan timbal balik antara makhluk hidup dengan lingkungan tempat tinggalnya disebut...",
    options: ["Komunitas", "Habitat", "Ekosistem", "Populasi"],
    answer: 2,
    explanation: "Ekosistem adalah hubungan timbal balik antara makhluk hidup dengan lingkungan tempat tinggalnya."
  },
  {
    id: 2,
    category: "Pengertian Ekosistem",
    question: "Di sawah terdapat padi, belalang, katak, air, dan tanah yang saling berhubungan. Kesatuan ini membentuk...",
    options: ["Ekosistem sawah", "Populasi sawah", "Habitat sawah", "Komunitas sawah"],
    answer: 0,
    explanation: "Hubungan timbal balik antara makhluk hidup (padi, belalang, katak) dan lingkungannya (air, tanah) di sawah membentuk ekosistem sawah."
  },
  {
    id: 3,
    category: "Pengertian Ekosistem",
    question: "Dalam suatu ekosistem, setiap komponen memiliki sifat...",
    options: ["Berdiri sendiri tanpa pengaruh lain", "Saling berhubungan dan membutuhkan", "Tidak saling memengaruhi", "Selalu bersaing untuk punah"],
    answer: 1,
    explanation: "Dalam ekosistem, setiap komponen saling berhubungan dan saling membutuhkan satu sama lain."
  },

  // --- B. KOMPONEN EKOSISTEM (BIOTIK & ABIOTIK) ---
  {
    id: 4,
    category: "Komponen Ekosistem",
    question: "Komponen ekosistem yang terdiri dari semua makhluk hidup disebut komponen...",
    options: ["Abiotik", "Biotik", "Atmosfer", "Geologis"],
    answer: 1,
    explanation: "Komponen biotik adalah semua makhluk hidup yang terdapat dalam ekosistem seperti manusia, hewan, tumbuhan, dan mikroorganisme."
  },
  {
    id: 5,
    category: "Komponen Ekosistem",
    question: "Berikut ini yang termasuk contoh komponen abiotik adalah...",
    options: ["Bakteri, jamur, dan lumut", "Air, tanah, udara, dan sinar matahari", "Padi, belalang, dan katak", "Ikan, cacing, dan kura-kura"],
    answer: 1,
    explanation: "Komponen abiotik adalah benda tak hidup yang mendukung kehidupan, seperti air, tanah, udara, sinar matahari, dan suhu."
  },
  {
    id: 6,
    category: "Komponen Ekosistem",
    question: "Tumbuhan hijau memerlukan sinar matahari, air, dan karbon dioksida untuk fotosintesis. Hal ini membuktikan bahwa...",
    options: ["Biotik tidak memerlukan abiotik", "Komponen biotik dan abiotik saling memengaruhi", "Abiotik bergantung penuh pada konsumen", "Tumbuhan tidak memerlukan lingkungan"],
    answer: 1,
    explanation: "Tumbuhan (biotik) membutuhkan air, tanah, udara, dan sinar matahari (abiotik) untuk tumbuh, menunjukkan keduanya saling memengaruhi."
  },
  {
    id: 7,
    category: "Komponen Ekosistem",
    question: "Manakah di bawah ini yang seluruhnya merupakan komponen biotik di kolam?",
    options: ["Batu, air, dan lumpur", "Ikan mas, eceng gondok, dan katak", "Sinar matahari, suhu, dan oksigen", "Pasir, lumut, dan air"],
    answer: 1,
    explanation: "Ikan mas, eceng gondok, dan katak adalah makhluk hidup, sehingga seluruhnya merupakan komponen biotik."
  },
  {
    id: 8,
    category: "Komponen Ekosistem",
    question: "Organisme mikroskopis seperti bakteri dan jamur termasuk dalam komponen...",
    options: ["Abiotik", "Biotik", "Fisik", "Kimiawi"],
    answer: 1,
    explanation: "Mikroorganisme (bakteri dan jamur) merupakan makhluk hidup, sehingga termasuk komponen biotik."
  },
  {
    id: 9,
    category: "Komponen Ekosistem",
    question: "Suhu udara di suatu pegunungan terasa dingin. Suhu udara merupakan contoh komponen...",
    options: ["Biotik", "Abiotik", "Organik", "Biologis"],
    answer: 1,
    explanation: "Suhu merupakan benda tak hidup / kondisi fisik lingkungan, jadi termasuk komponen abiotik."
  },

  // --- C. ISTILAH PENTING DALAM EKOSISTEM ---
  {
    id: 10,
    category: "Istilah Ekosistem",
    question: "Satu makhluk hidup tunggal dalam ekosistem disebut...",
    options: ["Populasi", "Komunitas", "Individu", "Habitat"],
    answer: 2,
    explanation: "Individu adalah satu makhluk hidup tunggal, misalnya seekor kucing atau sebatang pohon kelapa."
  },
  {
    id: 11,
    category: "Istilah Ekosistem",
    question: "Sekumpulan ikan lele yang tinggal di sebuah kolam pada waktu tertentu disebut...",
    options: ["Individu", "Populasi", "Komunitas", "Ekosistem"],
    answer: 1,
    explanation: "Populasi adalah kumpulan makhluk hidup sejenis yang tinggal di tempat tertentu."
  },
  {
    id: 12,
    category: "Istilah Ekosistem",
    question: "Kumpulan dari berbagai populasi yang hidup bersama pada suatu wilayah disebut...",
    options: ["Komunitas", "Individu", "Habitat", "Biosfer"],
    answer: 0,
    explanation: "Komunitas adalah kumpulan berbagai macam populasi yang hidup bersama di suatu wilayah, misalnya populasi ikan, katak, dan teratai di kolam."
  },
  {
    id: 13,
    category: "Istilah Ekosistem",
    question: "Tempat hidup alami suatu makhluk hidup untuk tumbuh dan berkembang biak dinamakan...",
    options: ["Komunitas", "Habitat", "Populasi", "Individu"],
    answer: 1,
    explanation: "Habitat adalah tempat tinggal alami suatu makhluk hidup, misalnya kolam adalah habitat bagi ikan."
  },
  {
    id: 14,
    category: "Istilah Ekosistem",
    question: "Seekor burung elang yang hinggap di pohon pinus merupakan contoh dari tingkatan...",
    options: ["Populasi", "Komunitas", "Individu", "Ekosistem"],
    answer: 2,
    explanation: "Seekor burung elang adalah satu makhluk hidup tunggal, sehingga merupakan individu."
  },
  {
    id: 15,
    category: "Istilah Ekosistem",
    question: "Di kebun sekolah terdapat 15 tanaman cabai, 5 ekor belalang, dan 2 ekor cacing. Gabungan semua makhluk hidup tersebut membentuk...",
    options: ["Populasi", "Komunitas", "Individu", "Abiotik"],
    answer: 1,
    explanation: "Kumpulan dari berbagai populasi (cabai, belalang, cacing) yang hidup bersama membentuk komunitas."
  },

  // --- D. JENIS-JENIS EKOSISTEM ---
  {
    id: 16,
    category: "Jenis Ekosistem",
    question: "Berdasarkan tempatnya, ekosistem dibedakan menjadi dua, yaitu...",
    options: ["Ekosistem alami dan buatan", "Ekosistem darat dan perairan", "Ekosistem tropis dan kutub", "Ekosistem biotik dan abiotik"],
    answer: 1,
    explanation: "Berdasarkan tempatnya, ekosistem dibedakan menjadi ekosistem darat dan ekosistem perairan."
  },
  {
    id: 17,
    category: "Jenis Ekosistem",
    question: "Berikut ini yang merupakan contoh ekosistem darat adalah...",
    options: ["Sungai dan danau", "Hutan, padang rumput, dan gurun", "Laut dan rawa", "Kolam dan tambak"],
    answer: 1,
    explanation: "Hutan, padang rumput, dan gurun adalah ekosistem yang berada di daratan."
  },
  {
    id: 18,
    category: "Jenis Ekosistem",
    question: "Ekosistem yang terbentuk secara alami tanpa campur tangan manusia disebut...",
    options: ["Ekosistem buatan", "Ekosistem alami", "Ekosistem modern", "Ekosistem sintesis"],
    answer: 1,
    explanation: "Ekosistem alami adalah ekosistem yang terbentuk secara alami melalui proses alam, seperti hutan perawan dan laut."
  },
  {
    id: 19,
    category: "Jenis Ekosistem",
    question: "Manakah kelompok ekosistem berikut yang seluruhnya merupakan ekosistem buatan?",
    options: ["Hutan, laut, dan sungai", "Sawah, bendungan, dan kebun binatang", "Danau, padang rumput, dan kolam", "Samudra, rawa, dan gurun"],
    answer: 1,
    explanation: "Sawah, bendungan, kolam ikan, dan kebun binatang adalah ekosistem yang sengaja dibuat dan dikelola oleh manusia."
  },
  {
    id: 20,
    category: "Jenis Ekosistem",
    question: "Akuarium hias di ruang tamu rumah digolongkan sebagai...",
    options: ["Ekosistem darat alami", "Ekosistem perairan alami", "Ekosistem perairan buatan", "Ekosistem darat buatan"],
    answer: 2,
    explanation: "Akuarium berisi air dan dibuat oleh manusia, sehingga merupakan ekosistem perairan buatan."
  },

  // --- E. INTERAKSI DALAM EKOSISTEM (PREDASI, KOMPETISI, SIMBIOSIS) ---
  {
    id: 21,
    category: "Interaksi Ekosistem",
    question: "Hubungan antara pemangsa (predator) dengan hewan mangsa disebut...",
    options: ["Kompetisi", "Predasi", "Simbiosis", "Mutualisme"],
    answer: 1,
    explanation: "Predasi adalah hubungan antara pemangsa dan mangsanya, contohnya harimau memangsa rusa atau ular memangsa tikus."
  },
  {
    id: 22,
    category: "Interaksi Ekosistem",
    question: "Persaingan antarmakhluk hidup untuk memperebutkan makanan, air, atau tempat tinggal disebut...",
    options: ["Kompetisi", "Predasi", "Komensalisme", "Parasitisme"],
    answer: 0,
    explanation: "Kompetisi adalah persaingan antarmakhluk hidup dalam memenuhi kebutuhan hidupnya."
  },
  {
    id: 23,
    category: "Interaksi Ekosistem",
    question: "Beberapa pohon di hutan tumbuh tinggi bersaing untuk mendapatkan sinar matahari. Interaksi ini disebut...",
    options: ["Predasi", "Kompetisi", "Parasitisme", "Simbiosis komensalisme"],
    answer: 1,
    explanation: "Persaingan tanaman untuk mendapatkan sinar matahari merupakan bentuk kompetisi."
  },
  {
    id: 24,
    category: "Interaksi Ekosistem",
    question: "Hubungan timbal balik yang sangat erat antara dua makhluk hidup berbeda jenis disebut...",
    options: ["Rantai makanan", "Simbiosis", "Kompetisi", "Populasi"],
    answer: 1,
    explanation: "Simbiosis adalah hubungan erat antara dua makhluk hidup yang berbeda jenis."
  },
  {
    id: 25,
    category: "Interaksi Ekosistem",
    question: "Simbiosis di mana kedua belah pihak makhluk hidup saling diuntungkan disebut...",
    options: ["Parasitisme", "Komensalisme", "Mutualisme", "Predasi"],
    answer: 2,
    explanation: "Simbiosis mutualisme adalah hubungan yang saling menguntungkan kedua belah pihak."
  },
  {
    id: 26,
    category: "Interaksi Ekosistem",
    question: "Lebah mengisap nektar bunga sambil membantu penyerbukan bunga. Hubungan ini merupakan contoh simbiosis...",
    options: ["Komensalisme", "Mutualisme", "Parasitisme", "Kompetisi"],
    answer: 1,
    explanation: "Lebah mendapat makanan (nektar) dan bunga dibantu penyerbukannya, sehingga keduanya saling untung (mutualisme)."
  },
  {
    id: 27,
    category: "Interaksi Ekosistem",
    question: "Tanaman anggrek menempel pada batang pohon mangga tanpa merugikan maupun menguntungkan pohon tersebut. Ini adalah contoh...",
    options: ["Simbiosis mutualisme", "Simbiosis komensalisme", "Simbiosis parasitisme", "Predasi"],
    answer: 1,
    explanation: "Komensalisme adalah hubungan di mana satu pihak untung (anggrek dapat tempat tinggi) dan pihak lain tidak dirugikan maupun diuntungkan."
  },
  {
    id: 28,
    category: "Interaksi Ekosistem",
    question: "Kutu yang hidup di kulit kucing mengisap darah kucing dan menyebabkan gatal serta luka. Hubungan ini disebut...",
    options: ["Simbiosis mutualisme", "Simbiosis komensalisme", "Simbiosis parasitisme", "Kompetisi"],
    answer: 2,
    explanation: "Parasitisme adalah hubungan di mana satu pihak untung (kutu dapat darah) dan pihak lain dirugikan (kucing sakit/gatal)."
  },
  {
    id: 29,
    category: "Interaksi Ekosistem",
    question: "Tanaman benalu yang tumbuh menumpang pada pohon inang dan menyerap zat hara pohon inang termasuk contoh simbiosis...",
    options: ["Parasitisme", "Mutualisme", "Komensalisme", "Netralisme"],
    answer: 0,
    explanation: "Benalu menyerap sari makanan dari pohon inang hingga pohon inang kurus atau mati, sehingga termasuk parasitisme."
  },
  {
    id: 30,
    category: "Interaksi Ekosistem",
    question: "Ikan remora yang berenang di dekat ikan hiu untuk memakan sisa makanan hiu tanpa mengganggu hiu merupakan contoh...",
    options: ["Mutualisme", "Komensalisme", "Parasitisme", "Predasi"],
    answer: 1,
    explanation: "Ikan remora diuntungkan mendapat sisa makanan, sedangkan hiu tidak dirugikan dan tidak diuntungkan (komensalisme)."
  },

  // --- F. RANTAI MAKANAN ---
  {
    id: 31,
    category: "Rantai Makanan",
    question: "Urutan peristiwa makan dan dimakan antarmakhluk hidup yang menunjukkan perpindahan energi disebut...",
    options: ["Jaring kehidupan", "Rantai makanan", "Piramida hewan", "Siklus air"],
    answer: 1,
    explanation: "Rantai makanan adalah urutan makan dan dimakan antarmakhluk hidup yang menunjukkan perpindahan energi."
  },
  {
    id: 32,
    category: "Rantai Makanan",
    question: "Makhluk hidup yang mampu membuat makanannya sendiri melalui proses fotosintesis berperan sebagai...",
    options: ["Konsumen I", "Produsen", "Pengurai", "Konsumen puncak"],
    answer: 1,
    explanation: "Produsen adalah makhluk hidup yang dapat membuat makanannya sendiri, seperti tumbuhan hijau."
  },
  {
    id: 33,
    category: "Rantai Makanan",
    question: "Perhatikan rantai makanan: Padi → Belalang → Katak → Ular. Hewan yang berperan sebagai Konsumen Tingkat I adalah...",
    options: ["Padi", "Belalang", "Katak", "Ular"],
    answer: 1,
    explanation: "Belalang memakan padi (produsen), sehingga belalang berperan sebagai konsumen tingkat I."
  },
  {
    id: 34,
    category: "Rantai Makanan",
    question: "Pada rantai makanan: Padi → Belalang → Katak → Ular, katak berperan sebagai...",
    options: ["Produsen", "Konsumen tingkat I", "Konsumen tingkat II", "Pengurai"],
    answer: 2,
    explanation: "Katak memakan belalang (konsumen I), sehingga katak berperan sebagai konsumen tingkat II."
  },
  {
    id: 35,
    category: "Rantai Makanan",
    question: "Organisme yang bertugas membusukkan dan menguraikan sisa-sisa makhluk hidup yang telah mati disebut...",
    options: ["Produsen", "Konsumen puncak", "Pengurai (dekomposer)", "Herbivora"],
    answer: 2,
    explanation: "Pengurai (seperti bakteri dan jamur) menguraikan sisa-sisa makhluk hidup yang telah mati."
  },
  {
    id: 36,
    category: "Rantai Makanan",
    question: "Zat hasil penguraian sisa makhluk hidup oleh pengurai akan bermanfaat bagi tanah untuk...",
    options: ["Menghasilkan racun bagi tanaman", "Mengembalikan unsur hara yang menyuburkan tanah", "Membuat tanah menjadi tandus", "Mengurangi kadar air dalam tanah"],
    answer: 1,
    explanation: "Hasil penguraian oleh dekomposer membantu mengembalikan zat dan unsur hara ke dalam tanah untuk diserap kembali oleh tumbuhan."
  },
  {
    id: 37,
    category: "Rantai Makanan",
    question: "Contoh makhluk hidup yang berperan sebagai pengurai dalam ekosistem adalah...",
    options: ["Cacing dan semut", "Jamur dan bakteri", "Katak dan ular", "Lumut dan paku"],
    answer: 1,
    explanation: "Jamur dan bakteri adalah pengurai utama dalam ekosistem."
  },
  {
    id: 38,
    category: "Rantai Makanan",
    question: "Sumber energi utama bagi seluruh kehidupan dan ekosistem di bumi adalah...",
    options: ["Air hujan", "Sinar matahari", "Bahan bakar fosil", "Tanah subur"],
    answer: 1,
    explanation: "Sinar matahari adalah sumber energi utama yang diserap tumbuhan hijau untuk menghasilkan makanan bagi seluruh rantai makanan."
  },
  {
    id: 39,
    category: "Rantai Makanan",
    question: "Pada rantai makanan di laut: Fitoplankton → Zooplankton → Ikan Kecil → Ikan Hiu. Yang bertindak sebagai produsen adalah...",
    options: ["Fitoplankton", "Zooplankton", "Ikan kecil", "Ikan hiu"],
    answer: 0,
    explanation: "Fitoplankton adalah tumbuhan renik di perairan yang dapat berfotosintesis dan bertindak sebagai produsen."
  },
  {
    id: 40,
    category: "Rantai Makanan",
    question: "Jika dalam rantai makanan sawah ular diburu habis oleh manusia, apa yang kemungkinan besar akan terjadi?",
    options: ["Populasi padi meningkat pesat", "Populasi katak akan melonjak tajam", "Belalang akan punah", "Katak akan mati kelaparan"],
    answer: 1,
    explanation: "Karena pemangsa katak (ular) habis, maka populasi katak akan meningkat secara drastis."
  },

  // --- G. JARING-JARING MAKANAN ---
  {
    id: 41,
    category: "Jaring-Jaring Makanan",
    question: "Kumpulan dari beberapa rantai makanan yang saling berhubungan dalam suatu ekosistem disebut...",
    options: ["Piramida makanan", "Jaring-jaring makanan", "Siklus energi", "Aliran nutrisi"],
    answer: 1,
    explanation: "Jaring-jaring makanan adalah gabungan beberapa rantai makanan yang saling berhubungan dalam ekosistem."
  },
  {
    id: 42,
    category: "Jaring-Jaring Makanan",
    question: "Dalam jaring-jaring makanan, seekor katak dapat dimakan oleh ular atau burung elang. Hal ini menunjukkan bahwa...",
    options: ["Hewan hanya punya satu jenis mangsa", "Satu jenis makhluk hidup bisa memiliki lebih dari satu pemangsa", "Katak tidak membutuhkan makanan", "Rantai makanan tidak saling berhubungan"],
    answer: 1,
    explanation: "Jaring-jaring makanan menunjukkan satu makhluk hidup dapat memiliki lebih dari satu sumber makanan atau pemangsa."
  },
  {
    id: 43,
    category: "Jaring-Jaring Makanan",
    question: "Apa yang terjadi apabila salah satu jenis makhluk hidup dalam jaring-jaring makanan mengalami kepunahan?",
    options: ["Ekosistem semakin seimbang", "Keseimbangan ekosistem dapat terganggu", "Semua hewan langsung mati bersamaan", "Tidak ada pengaruh apapun pada makhluk hidup lain"],
    answer: 1,
    explanation: "Jika salah satu jenis makhluk hidup berubah atau punah, keseimbangan ekosistem dan jaring-jaring makanan akan terganggu."
  },
  {
    id: 44,
    category: "Jaring-Jaring Makanan",
    question: "Perbedaan utama antara rantai makanan dan jaring-jaring makanan adalah...",
    options: ["Rantai makanan bercabang banyak, jaring-jaring lurus", "Rantai makanan lurus dan sederhana, jaring-jaring lebih kompleks dan bercabang", "Rantai makanan tidak ada produsennya", "Jaring-jaring makanan tidak melibatkan konsumen"],
    answer: 1,
    explanation: "Rantai makanan berupa urutan makan satu jalur, sedangkan jaring-jaring makanan merupakan gabungan banyak rantai makanan yang bercabang."
  },

  // --- H. KESEIMBANGAN EKOSISTEM ---
  {
    id: 45,
    category: "Keseimbangan Ekosistem",
    question: "Keseimbangan ekosistem tercapai jika...",
    options: ["Jumlah predator lebih banyak dari produsen", "Komponen biotik dan abiotik berinteraksi secara selaras dan seimbang", "Semua hutan diubah menjadi perkebunan", "Hewan pemangsa dimusnahkan semuanya"],
    answer: 1,
    explanation: "Keseimbangan ekosistem adalah keadaan ketika komponen biotik dan abiotik berinteraksi secara selaras."
  },
  {
    id: 46,
    category: "Keseimbangan Ekosistem",
    question: "Peristiwa alam berikut yang dapat merusak keseimbangan ekosistem secara alami adalah...",
    options: ["Penebangan pohon liar", "Letusan gunung berapi dan banjir besar", "Perburuan badak bercula satu", "Pencemaran limbah pabrik"],
    answer: 1,
    explanation: "Bencana alam seperti letusan gunung berapi, banjir, gempa, dan kekeringan adalah faktor alam pengganggu keseimbangan ekosistem."
  },
  {
    id: 47,
    category: "Keseimbangan Ekosistem",
    question: "Kegiatan manusia yang dapat merusak keseimbangan ekosistem hutan adalah...",
    options: ["Melakukan reboisasi", "Penebangan pohon secara liar (illegal logging)", "Membuat cagar alam", "Menanam bibit pohon langka"],
    answer: 1,
    explanation: "Penebangan liar merusak habitat hewan, memicu erosi, dan mengacaukan rantai makanan di hutan."
  },
  {
    id: 48,
    category: "Keseimbangan Ekosistem",
    question: "Penggunaan pestisida kimia secara berlebihan oleh petani dapat mengakibatkan...",
    options: ["Tanah menjadi semakin subur selamanya", "Matinya organisme tanah dan serangga yang menguntungkan", "Air sungai menjadi semakin bersih", "Padi tidak memerlukan sinar matahari lagi"],
    answer: 1,
    explanation: "Pestisida berlebih dapat membunuh mikroorganisme tanah, mencemari air, dan membunuh hewan penyubur tanah."
  },
  {
    id: 49,
    category: "Keseimbangan Ekosistem",
    question: "Perburuan liar burung hantu di daerah persawahan dapat mengakibatkan...",
    options: ["Hasil panen padi melimpah ruah", "Populasi tikus sawah meningkat tajam dan merusak padi", "Padi terhindar dari hama tikus", "Jumlah ular sawah berkurang drastis"],
    answer: 1,
    explanation: "Burung hantu adalah pemangsa alami tikus sawah. Jika diburu habis, hama tikus akan merajalela."
  },
  {
    id: 50,
    category: "Keseimbangan Ekosistem",
    question: "Dampak buruk dari pembuangan limbah beracun ke sungai terhadap ekosistem perairan adalah...",
    options: ["Ikan berkembang biak sangat cepat", "Air sungai menjadi jernih dan beraroma harum", "Ikan dan tumbuhan air mati karena kekurangan oksigen dan racun", "Lumut sungai tumbuh dengan teratur"],
    answer: 2,
    explanation: "Pencemaran air merusak habitat air dan menyebabkan kematian massal makhluk hidup perairan."
  },

  // --- I. PERAN MANUSIA DALAM MENJAGA EKOSISTEM ---
  {
    id: 51,
    category: "Peran Manusia",
    question: "Upaya yang tepat untuk melestarikan hutan yang telah gundul adalah...",
    options: ["Membakar sisa pepohonan", "Melakukan reboisasi (penanaman kembali)", "Membangun pabrik di area hutan", "Membiarkan tanah mengering"],
    answer: 1,
    explanation: "Reboisasi atau penanaman kembali pohon adalah cara paling efektif untuk memulihkan hutan yang gundul."
  },
  {
    id: 52,
    category: "Peran Manusia",
    question: "Tindakan bijak yang dapat kita lakukan di lingkungan rumah untuk menjaga kelestarian lingkungan adalah...",
    options: ["Membuang sampah ke selokan", "Memilah sampah organik dan anorganik serta membuang pada tempatnya", "Membiarkan keran air mengalir terus", "Membakar sampah plastik di halaman"],
    answer: 1,
    explanation: "Membuang sampah pada tempatnya dan memilah sampah membantu mencegah pencemaran lingkungan."
  },
  {
    id: 53,
    category: "Peran Manusia",
    question: "Tujuan utama pemerintah menetapkan kawasan suaka margasatwa dan taman nasional adalah...",
    options: ["Menjadikan tempat berburu hewan langka", "Melindungi hewan dan tumbuhan tertentu agar terhindar dari kepunahan", "Membangun pusat pertokoan mewah", "Menebang pohon secara bebas"],
    answer: 1,
    explanation: "Suaka margasatwa dan taman nasional dibuat untuk melindungi hewan dan tumbuhan agar tidak punah."
  },
  {
    id: 54,
    category: "Peran Manusia",
    question: "Mengapa kita harus menghemat penggunaan air bersih dan listrik?",
    options: ["Agar sumber daya alam tetap terjaga kelestariannya", "Agar ekosistem cepat rusak", "Karena air dan listrik tidak berguna", "Supaya tumbuhan tidak mendapat air"],
    answer: 0,
    explanation: "Menghemat air dan energi menjaga ketersediaan sumber daya alam dan keseimbangan lingkungan."
  },
  {
    id: 55,
    category: "Peran Manusia",
    question: "Perilaku yang TIDAK mencerminkan upaya menjaga ekosistem adalah...",
    options: ["Membersihkan sampah di aliran sungai", "Menanam tanaman hias di pekarangan rumah", "Menggunakan pukat harimau untuk menangkap ikan", "Mengurangi pemakaian kantong plastik sekali pakai"],
    answer: 2,
    explanation: "Penggunaan pukat harimau merusak terumbu karang dan menangkap ikan-ikan kecil yang belum sempat berkembang biak."
  },
  {
    id: 56,
    category: "Peran Manusia",
    question: "Salah satu peran penting tumbuhan hijau bagi makhluk hidup lainnya adalah...",
    options: ["Menghasilkan gas oksigen untuk pernapasan", "Menyerap seluruh oksigen di bumi", "Menghasilkan sampah daun yang beracun", "Menghilangkan sinar matahari"],
    answer: 0,
    explanation: "Melalui fotosintesis, tumbuhan hijau menghasilkan oksigen yang dibutuhkan manusia dan hewan untuk bernapas."
  },
  {
    id: 57,
    category: "Peran Manusia",
    question: "Untuk menjaga kelestarian tanah dan air tanah di perkotaan, hal yang dapat dilakukan adalah...",
    options: ["Mengecor seluruh halaman dengan semen tebal", "Membuat lubang biopori atau sumur resapan air", "Membuang minyak goreng bekas ke tanah", "Menebang semua pohon peneduh"],
    answer: 1,
    explanation: "Lubang biopori dan sumur resapan membantu air hujan meresap ke dalam tanah dan menjaga cadangan air tanah."
  },

  // --- SOAL PENGAYAAN & HOTS (HIGH ORDER THINKING) IPAS KELAS 5 ---
  {
    id: 58,
    category: "Analisis Ekosistem",
    question: "Jika populasi belalang di sawah menurun drastis karena disemprot insektisida, dampak langsung pada katak adalah...",
    options: ["Katak bertambah banyak", "Katak kekurangan makanan dan populasinya bisa menurun", "Katak akan mulai memakan padi", "Katak berubah menjadi produsen"],
    answer: 1,
    explanation: "Katak memakan belalang. Jika belalang berkurang drastis, sumber makanan katak hilang sehingga populasi katak menurun."
  },
  {
    id: 59,
    category: "Analisis Ekosistem",
    question: "Di padang rumput hidup kawanan zebra, jerapah, dan singa. Hubungan antara kawanan zebra dan jerapah dalam memperebutkan rumput/daun adalah...",
    options: ["Kompetisi", "Predasi", "Parasitisme", "Mutualisme"],
    answer: 0,
    explanation: "Zebra dan hewan herbivora lain bersaing mendapatkan makanan hijau, yang merupakan bentuk kompetisi."
  },
  {
    id: 60,
    category: "Analisis Ekosistem",
    question: "Mengapa jamur dan bakteri disebut sebagai pahlawan kebersihan ekosistem?",
    options: ["Karena dapat berfotosintesis", "Karena menguraikan bangkai makhluk hidup sehingga zat hara kembali ke tanah", "Karena memburu hewan-hewan buas", "Karena tidak membutuhkan air"],
    answer: 1,
    explanation: "Pengurai menguraikan bangkai dan sisa organisme mati, membersihkan lingkungan dan menyuburkan tanah."
  },
  {
    id: 61,
    category: "Analisis Ekosistem",
    question: "Manakah pasangan makhluk hidup berikut yang memiliki hubungan Simbiosis Mutualisme?",
    options: ["Burung jalak dan kerbau", "Kutu dan anjing", "Tali putri dan tanaman pagar", "Hiu dan ikan remora"],
    answer: 0,
    explanation: "Burung jalak memakan kutu pada kerbau (dapat makanan), dan kerbau bebas dari rasa gatal (keduanya diuntungkan)."
  },
  {
    id: 62,
    category: "Analisis Ekosistem",
    question: "Contoh ekosistem alami perairan tawar adalah...",
    options: ["Samudra Atlantik", "Danau Toba dan Sungai Kapuas", "Tambak udang di pantai", "Waduk Jatiluhur"],
    answer: 1,
    explanation: "Danau Toba dan Sungai Kapuas adalah perairan air tawar yang terbentuk secara alami."
  },
  {
    id: 63,
    category: "Analisis Ekosistem",
    question: "Jika dalam suatu kebun rantai makanannya adalah Sawi → Ulat → Burung Pipit → Kucing, maka Kucing berkedudukan sebagai...",
    options: ["Konsumen Tingkat I", "Konsumen Tingkat II", "Konsumen Tingkat III (Puncak)", "Produsen"],
    answer: 2,
    explanation: "Sawi (produsen) → Ulat (konsumen I) → Burung Pipit (konsumen II) → Kucing (konsumen III)."
  },
  {
    id: 64,
    category: "Analisis Ekosistem",
    question: "Penebangan pohon di lereng pegunungan secara liar dapat memicu bencana alam berupa...",
    options: ["Gempa bumi tektonik", "Tanah longsor dan banjir bandang", "Gunung meletus", "Tsunami"],
    answer: 1,
    explanation: "Akar pohon berfungsi mengikat tanah dan air hujan. Jika ditebang, lereng menjadi labil dan memicu longsor serta banjir bandang."
  },
  {
    id: 65,
    category: "Analisis Ekosistem",
    question: "Tumbuhan kaktus di gurun memiliki daun berbentuk duri. Duri tersebut berguna untuk...",
    options: ["Mempercepat penguapan air", "Mengurangi penguapan air di lingkungan panas", "Menarik perhatian serangga penyerbuk", "Menyerap udara dingin"],
    answer: 1,
    explanation: "Bentuk duri pada kaktus merupakan adaptasi untuk mengurangi penguapan air di habitat gurun yang panas dan kering."
  },
  {
    id: 66,
    category: "Analisis Ekosistem",
    question: "Hubungan antara cacing pita yang hidup di dalam usus manusia merupakan contoh simbiosis...",
    options: ["Mutualisme", "Komensalisme", "Parasitisme", "Netralisme"],
    answer: 2,
    explanation: "Cacing pita menyerap sari makanan dari tubuh manusia (diuntungkan), sedangkan manusia menjadi kurus dan sakit (dirugikan)."
  },
  {
    id: 67,
    category: "Analisis Ekosistem",
    question: "Dalam rantai makanan, perpindahan energi selalu diawali dari...",
    options: ["Konsumen puncak", "Pengurai", "Produsen (tumbuhan hijau)", "Konsumen tingkat II"],
    answer: 2,
    explanation: "Energi utama matahari pertama kali ditangkap oleh produsen (tumbuhan) melalui fotosintesis sebelum dialirkan ke konsumen."
  },
  {
    id: 68,
    category: "Analisis Ekosistem",
    question: "Salah satu ciri ekosistem yang seimbang adalah...",
    options: ["Populasi produsen selalu cukup untuk menopang konsumen", "Tidak ada pemangsa sama sekali", "Hanya ada satu jenis hewan", "Semua air mengering"],
    answer: 0,
    explanation: "Dalam ekosistem seimbang, jumlah produsen harus selalu lebih melimpah daripada konsumen tingkat di atasnya."
  },
  {
    id: 69,
    category: "Analisis Ekosistem",
    question: "Mengapa sampah plastik sangat berbahaya bagi ekosistem tanah dan perairan?",
    options: ["Karena plastik sangat cepat membusuk", "Karena plastik tidak mudah diurai oleh mikroorganisme dan mencemari lingkungan ratusan tahun", "Karena plastik menyuburkan tanah", "Karena plastik disukai ikan sebagai makanan sehat"],
    answer: 1,
    explanation: "Sampah plastik membutuhkan waktu ratusan tahun untuk terurai sehingga meracuni tanah dan membahayakan satwa liar."
  },
  {
    id: 70,
    category: "Analisis Ekosistem",
    question: "Kesimpulan utama dari materi Harmoni dalam Ekosistem adalah...",
    options: ["Manusia boleh mengeksploitasi alam tanpa batas", "Makhluk hidup dan lingkungannya saling bergantung, sehingga manusia wajib menjaga kelestariannya", "Hanya komponen abiotik yang penting bagi kehidupan", "Rantai makanan tidak memengaruhi kelangsungan hidup manusia"],
    answer: 1,
    explanation: "Ekosistem adalah keselarasan timbal balik; menjaga kelestarian lingkungan sangat penting demi kelangsungan hidup seluruh makhluk hidup."
  }
];

// Helper to get randomized questions for a match
function getShuffledQuestionQueue() {
  const list = [...QUESTION_BANK];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}
