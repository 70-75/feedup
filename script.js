let currentIndex = 0;
const allSlides = document.querySelectorAll('.slide');
const allIndicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    // Indeksni chegaralash (3 ta slayd uchun)
    if (index >= allSlides.length) currentIndex = 0;
    else if (index < 0) currentIndex = allSlides.length - 1;
    else currentIndex = index;

    // Aktiv klaslarni tozalash
    allSlides.forEach(s => s.classList.remove('active'));
    allIndicators.forEach(i => i.classList.remove('active'));

    // Yangisini yoqish
    allSlides[currentIndex].classList.add('active');
    allIndicators[currentIndex].classList.add('active');
}

function moveSlide(step) {
    showSlide(currentIndex + step);
}

function currentSlide(index) {
    showSlide(index);
}

// Avtomatik almashish (6 sekundda bir)
setInterval(() => moveSlide(1), 6000);

const scrollContainer = document.getElementById('categoryScroll');
const btnLeft = document.getElementById('scrollLeft');
const btnRight = document.getElementById('scrollRight');

// 1. Gorizontal aylantirish (strelkalar bilan)
btnRight.onclick = () => scrollContainer.scrollLeft += 250;
btnLeft.onclick = () => scrollContainer.scrollLeft -= 250;

// 2. Click qilinganda silliq tushish (smooth scroll)
const catItems = document.querySelectorAll('.cat-item');

catItems.forEach(item => {
    item.onclick = function(e) {
        // Avvalgi aktivni o'chirib, yangisiga qo'shish
        document.querySelector('.cat-item.active').classList.remove('active');
        this.classList.add('active');

        // Agar href=#id bo'lsa, o'sha seksiyaga silliq tushadi
        const targetId = this.getAttribute('href');
        if(targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Header balandligini hisobga olgan holda
                    behavior: 'smooth'
                });
            }
        }
    };
});

// Hamma kartochkalarni olish
const cards = document.querySelectorAll('.product-card');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Agar foydalanuvchi "Qo'shish" tugmasini bossa, kartochka bosilishi ishlamasligi kerak
        if (e.target.classList.contains('add-btn')) {
            console.log("Savatga qo'shildi!");
            alert("Savatga qo'shildi!");
            return;
        }
        
        // Kartochka bosilganda mahsulot haqida batafsil ma'lumot (modal yoki sahifa)
        const title = card.querySelector('h3').innerText;
        console.log(title + " tanlandi");
    });
});

// Like tugmasi uchun
const heartBtns = document.querySelectorAll('.wishlist-btn');
heartBtns.forEach(btn => {
    btn.onclick = function(e) {
        e.stopPropagation(); // Kartochka clickini to'xtatish
        this.querySelector('i').classList.toggle('fa-solid');
        this.querySelector('i').classList.toggle('fa-regular');
        this.style.color = this.querySelector('i').classList.contains('fa-solid') ? '#e31e24' : '#999';
    };
});