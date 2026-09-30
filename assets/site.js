const CONTACT = { email: "", phone: "", whatsapp: "" };

const logo = `<a class="brand" href="index.html" aria-label="KORVA ana sayfa"><span class="brand-symbol" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none"><path d="M22 4.5 8 10v11.1c0 9.2 5.6 15.3 14 18.4 8.4-3.1 14-9.2 14-18.4V10L22 4.5Z" stroke="currentColor" stroke-width="1.8"/><path d="M14 23h5l3-7 4 13 3-6h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 34.2V37m14-2.8V37" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span><span class="brand-type"><strong>KORVA</strong><small>MODÜLER SU SİSTEMLERİ</small></span></a>`;

const header = `<div class="topline"><div class="wrap topline-inner"><span>Su depolama sistemlerinde proje odaklı yaklaşım</span><a href="iletisim.html#teklif">Teklif talebi oluşturun <span aria-hidden="true">↗</span></a></div></div><header class="site-header"><div class="wrap header-inner">${logo}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Menüyü aç"><span></span><span></span></button><nav class="primary-nav" id="primary-nav" aria-label="Ana menü"><a data-nav="home" href="index.html">Ana sayfa</a><details class="nav-dropdown" data-nav="products"><summary>Ürünler <span aria-hidden="true">⌄</span></summary><div class="nav-menu"><a href="urunler.html">Tüm ürünler</a><a href="grp-moduler-depo.html">GRP modüler depo</a><a href="celik-depolar.html#paslanmaz">Paslanmaz çelik</a><a href="celik-depolar.html#galvaniz">Galvaniz çelik</a></div></details><a data-nav="solutions" href="cozumler.html">Çözümler</a><a data-nav="engineering" href="muhendislik.html">Mühendislik</a><a data-nav="guide" href="rehber.html">Teknik rehber</a><a data-nav="company" href="kurumsal.html">Kurumsal</a><a data-nav="contact" href="iletisim.html">İletişim</a><a class="nav-cta" href="iletisim.html#teklif">Teklif alın <span aria-hidden="true">↗</span></a></nav></div></header>`;

const footer = `<footer class="site-footer"><div class="wrap"><div class="footer-main"><div class="footer-brand">${logo}<p>Modüler su depolama sistemlerinde, ihtiyaca ve proje koşullarına göre değerlendirme.</p></div><div class="footer-links"><strong>Ürünler</strong><a href="urunler.html">Tüm ürünler</a><a href="grp-moduler-depo.html">GRP panel depo</a><a href="celik-depolar.html">Çelik panel depolar</a><a href="rehber.html">Teknik rehber</a></div><div class="footer-links"><strong>Kurumsal</strong><a href="kurumsal.html">KORVA hakkında</a><a href="cozumler.html">Çözümler</a><a href="uygulamalar.html">Uygulama alanları</a><a href="muhendislik.html">Proje süreci</a></div><div class="footer-contact"><strong>Projenizi konuşalım</strong><p>İlk değerlendirme için kullanım amacınızı ve yaklaşık kapasite ihtiyacınızı paylaşın.</p><a class="footer-cta" href="iletisim.html#teklif">Teklif talebi oluşturun <span aria-hidden="true">↗</span></a></div></div><div class="footer-bottom"><span>© <span id="year"></span> KORVA Modüler Su Sistemleri</span><span>Teknik uygunluk, proje ve ürün dokümanlarıyla doğrulanır.</span><a href="iletisim.html">İletişim <span aria-hidden="true">↗</span></a></div></div></footer>`;

document.querySelector("#site-header").innerHTML = header;
document.querySelector("#site-footer").innerHTML = footer;
document.querySelector("#year").textContent = new Date().getFullYear();

const page = document.body.dataset.page;
document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === page || (page === "products" && link.dataset.nav === "products")) {
    link.classList.add("is-current");
    if (link.matches("a")) link.setAttribute("aria-current", "page");
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Menüyü aç" : "Menüyü kapat");
  primaryNav.classList.toggle("is-open", !expanded);
});

document.querySelectorAll(".nav-dropdown summary").forEach((summary) => {
  summary.addEventListener("click", (event) => {
    if (window.matchMedia("(min-width: 901px)").matches) {
      event.preventDefault();
      summary.parentElement.open = !summary.parentElement.open;
    }
  });
});

const quoteForm = document.querySelector("#quote-form");
if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector("#form-status");
    if (!CONTACT.email) {
      status.textContent = "Talebiniz gönderilmedi. İletişim için şirket e-posta adresi tanımlanmalıdır; bu sayfa verileri kaydetmez veya iletmez.";
      status.classList.add("is-notice");
      return;
    }
    const fields = new FormData(quoteForm);
    const body = [...fields.entries()].map(([key, value]) => `${key}: ${value}`).join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Modüler su deposu proje talebi")}&body=${encodeURIComponent(body)}`;
  });
}
