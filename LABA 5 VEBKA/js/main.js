$(document).ready(function() {

    // ==========================================
    // 1. ГАМБУРГЕР МЕНЮ
    // ==========================================
    $('.hamburger').on('click', function() {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
        $('body').toggleClass('no-scroll');
    });

    // Закриття меню при кліку на посилання
    $('.nav-links a').on('click', function() {
        $('.hamburger').removeClass('active');
        $('.nav-menu').removeClass('active');
        $('body').removeClass('no-scroll');
    });

    // ==========================================
    // 2. ПЛАВНИЙ СКРОЛ
    // ==========================================
    $('a.smooth-scroll').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            // Відступ для хедера
            const headerHeight = $('.glass-header').outerHeight();
            const offset = $(hash).offset().top - headerHeight + 10;

            $('html, body').animate({
                scrollTop: offset
            }, 800); // Час скролу
        }
    });

    // ==========================================
    // 3. ЛОГІКА ХЕДЕРА ПРИ СКРОЛІ
    // ==========================================
    $(window).on('scroll', function() {
        // Додаємо клас scrolled, якщо прокрутили більше 50px
        if ($(window).scrollTop() > 50) {
            $('.glass-header').addClass('scrolled');
        } else {
            $('.glass-header').removeClass('scrolled');
        }
    });
    // Запустити один раз при завантаженні
    if ($(window).scrollTop() > 50) { $('.glass-header').addClass('scrolled'); }

    // ==========================================
    // 4. ВИПРАВЛЕНИЙ СЛАЙДЕР З КНОПКАМИ < >
    // ==========================================
    let currentSlide = 0;
    const slides = $('.slide');
    const dots = $('.dot');
    const slideCount = slides.length;
    let slideInterval;
    const intervalTime = 5500; // 5.5 секунд

    function showSlide(index) {
        // Циклічність
        if (index >= slideCount) currentSlide = 0;
        else if (index < 0) currentSlide = slideCount - 1;
        else currentSlide = index;

        // Перемикання класів активного слайда та крапки
        slides.removeClass('active');
        dots.removeClass('active');

        slides.eq(currentSlide).addClass('active');
        dots.eq(currentSlide).addClass('active');
    }

    // Скидання таймера автоматичного перемикання
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startSlider();
    }

    function startSlider() {
        slideInterval = setInterval(function() {
            showSlide(currentSlide + 1);
        }, intervalTime);
    }

    // Зупинка при наведенні
    $('.slider-wrapper').on('mouseenter', function() {
        clearInterval(slideInterval);
    }).on('mouseleave', function() {
        startSlider();
    });

    // Кліки на кнопки < та >
    $('.next-btn').on('click', function() {
        showSlide(currentSlide + 1);
        resetAutoSlide();
    });

    $('.prev-btn').on('click', function() {
        showSlide(currentSlide - 1);
        resetAutoSlide();
    });

    // Кліки на крапки
    dots.on('click', function() {
        const slideIndex = $(this).data('slide');
        showSlide(slideIndex);
        resetAutoSlide();
    });

    // Старт
    startSlider();


    // ==========================================
    // 5. УЛЬТРА-ПЛАВНА АНІМАЦІЯ (Intersection Observer)
    // ==========================================
    
    // Створюємо спостерігач
    const observerOptions = {
        root: null, // Відносно вікна перегляду
        threshold: 0.15, // Видимий, якщо зайшов на 15%
        rootMargin: "0px 0px -50px 0px"
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Додаємо клас anim-show, який запускає CSS анімацію
                $(entry.target).addClass('anim-show');
                // Припиняємо спостерігати за цим елементом
                observer.unobserve(entry.target);
            }
        });
    };

    // Ініціалізація спостерігача
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Знаходимо всі елементи для анімації та віддаємо їх спостерігачу
    $('.anim-element').each(function() {
        observer.observe(this);
    });


    // ==========================================
    // 6. ФОРМА (Демо)
    // ==========================================
    $('.glass-form').on('submit', function(e) {
        e.preventDefault();
        alert('Дякуємо! Ваше повідомлення імітовано як відправлене.');
        $(this).trigger("reset");
    });

});