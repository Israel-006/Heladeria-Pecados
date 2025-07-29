// --- SCRIPT PARA ÍCONOS LUCIDE ---
lucide.createIcons();

// --- FIX PARA VIEWPORT HEIGHT EN MÓVILES ---
const setVh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};
// Ejecuta la función al cargar y al cambiar el tamaño de la ventana
window.addEventListener('resize', setVh);
window.addEventListener('load', setVh);
setVh(); // Llama a la función al inicio para establecer el valor inicial


// --- SCRIPT PARA NAVEGACIÓN INTERACTIVA ---
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('menu-btn');
    
    // --- LÓGICA PARA MODAL DE PRODUCTOS ---
    const productModal = document.getElementById('product-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        item.addEventListener('click', () => {
            modalImg.src = item.dataset.img;
            modalImg.onerror = () => { modalImg.src = `https://placehold.co/200x200/F87171/FFFFFF?text=${item.dataset.title}`; };
            modalTitle.textContent = item.dataset.title;
            modalDesc.textContent = item.dataset.desc;
            modalPrice.textContent = item.dataset.price;
            productModal.classList.remove('hidden');
            lucide.createIcons(); // Vuelve a crear el ícono de cierre en el modal
        });
    });

    const closeModal = () => {
        productModal.classList.add('hidden');
    };

    modalCloseBtn.addEventListener('click', closeModal);
    productModal.addEventListener('click', (event) => {
        // Cierra el modal solo si se hace clic en el fondo oscuro
        if (event.target === productModal) {
            closeModal();
        }
    });


    // --- LÓGICA PARA MENÚ MÓVIL Y NAVEGACIÓN DE SECCIONES ---
    const showSection = (targetId) => {
        pageSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden');
            } else {
               section.classList.add('hidden');
            }
        });
        window.scrollTo(0, 0); // SOLUCIÓN: Reinicia el scroll a la parte superior
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#') && href.length > 1) {
                const targetId = href.substring(1);
                
                if (document.getElementById(targetId)) {
                    event.preventDefault();
                    showSection(targetId);
                }
            }

            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    showSection('inicio');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});
