// Nav Sidebar
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('openSidebar');
    const closeBtn = document.getElementById('closeSidebar');
    const sideLinks = document.querySelectorAll('.side-link');
    const focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

    let previouslyFocused = null;

    function openSidebar() {
        previouslyFocused = document.activeElement;
        sidebar.classList.add('open');
        overlay.classList.add('visible');
        sidebar.setAttribute('aria-hidden', 'false');
        openBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        const first = sidebar.querySelector(focusableSelector);
        if (first) first.focus();

        document.addEventListener('focus', trapFocus, true);
        document.addEventListener('keydown', handleKeydown);
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
        sidebar.setAttribute('aria-hidden', 'true');
        openBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        document.removeEventListener('focus', trapFocus, true);
        document.removeEventListener('keydown', handleKeydown);

        if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    }

    function trapFocus(e) {
        if (!sidebar.contains(e.target)) {
            e.stopPropagation();
            const first = sidebar.querySelector(focusableSelector);
            if (first) first.focus();
        }
    }

    function handleKeydown(e) {
        if (e.key === 'Escape') closeSidebar();

        if (e.key === 'Tab') {
            const focusables = Array.from(sidebar.querySelectorAll(focusableSelector)).filter(el => !el.disabled);
            if (focusables.length === 0) { e.preventDefault(); return; }

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault(); last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault(); first.focus();
            }
        }
    }

    openBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    sideLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 880) closeSidebar();
    });



// scroll

let images = document.querySelectorAll(".testimonial-card img");
let modal = document.getElementById("imageModal");
let modalImg = document.getElementById("modalImg");
let currentIndex = 0;
let slider = document.getElementById("slider");
let autoScroll;

/* Auto scroll control */
function startScroll() {
    slider.style.animationPlayState = "running";
}
function stopScroll() {
    slider.style.animationPlayState = "paused";
}

slider.addEventListener("mouseenter", stopScroll);
slider.addEventListener("mouseleave", startScroll);

/* Image click zoom */
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        modal.style.display = "flex";
        modalImg.src = img.src;
        stopScroll();
    });
});

/* Close modal */
function closeModal() {
    modal.style.display = "none";
    startScroll();
}

/* Next image */
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
}

/* Previous image */
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
}

/* Close on outside click */
modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
});


    // get popup element
    var pop = document.getElementById('did');

    function did() {
        pop.style.display = "flex"; // or "unset"
    }

    function does(){
        pop.style.display = "none"; // or "unset"
    }