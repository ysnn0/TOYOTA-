# 🚗 Toyota Türkiye - Web Sitesi Projesi

Bu proje, modern web teknolojileri (HTML5, CSS3, JavaScript) kullanılarak geliştirilmiş, çok sayfalı ve etkileşimli bir araba bayii/marka web sitesidir. Kullanıcıların araç modellerini inceleyebileceği, özelleştirebileceği ve ödeme planı oluşturabileceği dinamik bir yapıya sahiptir.

## ✨ Özellikler

### 🛠️ Gelişmiş Araç Konfigüratörü
* **Dinamik Fiyatlandırma:** Model, renk ve jant seçimlerine göre toplam fiyat anlık olarak güncellenir.
* **Model Entegrasyonu:** "Modeller" sayfasından seçilen araç, otomatik olarak konfigüratör sayfasına aktarılır (`localStorage` kullanımı).
* **Kredi Hesaplayıcı:** Peşinat yüzdesi ve vade sayısına (slider ile) göre aylık taksit tutarını ve faiz oranını hesaplar.

### 📱 Responsive ve Modern Tasarım
* **Mobil Uyumlu:** Hamburger menü ve mobil cihazlara tam uyumlu grid yapısı.
* **Video Arka Plan:** Anasayfada etkileyici bir hero bölümü.
* **Animasyonlar:** Yumuşak geçişler, hover efektleri ve modal açılış animasyonları.

### 🔐 Kullanıcı Etkileşimi (Simülasyon)
* **Auth Sistemi:** Giriş yapma ve kayıt olma arayüzü (Front-end simülasyonu).
* **LocalStorage:** Kullanıcı adı ve oturum durumu tarayıcı hafızasında saklanır.
* **Formlar:** Servis randevusu ve test sürüşü formları (Validasyonlu).

### 📄 Sayfa Yapısı
1.  **Anasayfa:** Video slider, öne çıkanlar ve hızlı erişim.
2.  **Modeller:** Tüm araçların listelendiği, filtreleme yapılabilen grid yapı.
3.  **Konfigüratör:** Aracın özelleştirildiği detay sayfası.
4.  **Kampanyalar:** Güncel fırsatların ve detayların bulunduğu sayfa.
5.  **Garanti:** Sıkça sorulan sorular (Akordiyon menü) ve garanti bilgileri.

## 💻 Kullanılan Teknolojiler

* **HTML5:** Semantik etiket yapısı.
* **CSS3:** CSS Variables (`:root`), Flexbox, Grid Layout, Media Queries.
* **JavaScript (ES6+):** DOM Manipülasyonu, Event Listeners, LocalStorage API, `Intl.NumberFormat` (Para birimi formatlama).
* **FontAwesome:** İkon setleri.
* **Google Fonts:** 'Montserrat' yazı tipi ailesi.

## 📂 Proje Yapısı

```text
/
├── index.html          # Anasayfa
├── models.html         # Modeller Listesi
├── configurator.html   # Araç Özelleştirme ve Hesaplama
├── campaigns.html      # Kampanyalar
├── warranty.html       # Garanti ve SSS
├── style.css           # Tüm stiller
├── script.js           # Tüm mantıksal işlemler
├── README.md           # Proje dökümantasyonu
└── (Görsel Dosyalar)   # .jpg, .png, .webp, .mp4
🚀 Kurulum ve Çalıştırma
Bu projeyi bilgisayarınızda çalıştırmak için:

Bu repoyu klonlayın veya zip olarak indirin:

Bash
git clone [https://github.com/ysnn.0/TOYOTA-.git](https://github.com/ysnn.0/TOYOTA-.git)
Proje klasörüne gidin.

index.html dosyasını favori tarayıcınızda (Chrome, Firefox vb.) açın.

Veya VS Code kullanıyorsanız "Live Server" eklentisi ile başlatın.

📸 Ekran Görüntüleri

![Toyota Anasayfa](https://github.com/user-attachments/assets/91d9d77b-35a1-4c5f-9fc0-1d81e56bb4ad)

![Configurator](https://github.com/user-attachments/assets/7c3704d6-8c43-45bb-a825-031dc82555cb)

📄 Lisans
Bu proje MIT Lisansı altında lisanslanmıştır. Eğitim ve portfolyo amaçlı geliştirilmiştir. Toyota marka hakları ilgili şirkete aittir.

Geliştirici: [Yasin Dağ/ysnn.0]

