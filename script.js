function toggleDropdown() {
    const dropdown = document.getElementById('nav-dropdown');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
}

const navButton = document.querySelector('.nav-tab-button');
const navDropdown = document.getElementById('nav-dropdown');

navButton.addEventListener('click', () => {
    navDropdown.classList.toggle('active');
});

document.addEventListener('click', (event) => {
    if (!navButton.contains(event.target) && !navDropdown.contains(event.target)) {
        navDropdown.classList.remove('active');
    }
});

navDropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navDropdown.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                navDropdown.classList.remove('active');
                history.pushState(null, null, targetId);
            }
        });
    });
});

const carouselItems = document.querySelectorAll('#user-experiences .carousel-item');
let currentIndex = 0;

function showSlide(index) {
    if (index < 0) {
        currentIndex = carouselItems.length - 1;
    } else if (index >= carouselItems.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    
    carouselItems.forEach(item => {
        item.style.display = 'none';
    });
    
    carouselItems[currentIndex].style.display = 'block';
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    }
    
    showSlide(0);
});

document.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
});

const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;
    const message = document.getElementById('message').value;
    const mailtoLink = `mailto:youremail@example.com?subject=Travel Website Contact Form - ${location}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0ALocation: ${location}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
    alert('Opening your email client to send the message. If nothing happens, please make sure you have an email client set up on your device.');
    form.reset();
});

const themeToggleButton = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeToggleButton.textContent = savedTheme === 'dark-mode' ? 'Light Mode' : 'Dark Mode';
}

themeToggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        themeToggleButton.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light-mode');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        themeToggleButton.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark-mode');
    }
});

function performSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'flex';
        });
        return;
    }
    
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionId = section.id;
        const sectionContent = section.textContent.toLowerCase();
        
        if (sectionContent.includes(searchTerm)) {
            section.style.display = 'flex';
            
            if (sectionId === 'places-to-visit') {
                highlightSearchInGallery(section, searchTerm);
            } else if (sectionId === 'user-experiences') {
                highlightSearchInCarousel(section, searchTerm);
            }
        } else {
            section.style.display = 'none';
        }
    });
    
    const visibleSections = document.querySelectorAll('.section[style="display: flex;"]');
    if (visibleSections.length === 0) {
        alert('No results found for: ' + searchTerm);
    }
}

function highlightSearchInGallery(section, searchTerm) {
    const galleryItems = section.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const tooltip = item.getAttribute('data-tooltip').toLowerCase();
        const image = item.querySelector('img');
        const alt = image.alt.toLowerCase();
        
        if (tooltip.includes(searchTerm) || alt.includes(searchTerm)) {
            item.style.transform = 'scale(1.05)';
            item.style.boxShadow = '0 0 15px #ffd700';
            
            setTimeout(() => {
                item.style.transform = '';
                item.style.boxShadow = '';
            }, 2000);
        }
    });
}

function highlightSearchInCarousel(section, searchTerm) {
    const carouselItems = section.querySelectorAll('.carousel-item');
    
    carouselItems.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        
        if (itemText.includes(searchTerm)) {
            showSlide(Array.from(carouselItems).indexOf(item));
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    const searchBar = document.querySelector('.search-bar');
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchButton.className = 'search-button';
    searchButton.addEventListener('click', performSearch);
    searchBar.appendChild(searchButton);
    
    const style = document.createElement('style');
    style.textContent = `
        .search-bar {
            display: flex;
            align-items: center;
        }
        .search-button {
            background-color: #ffd700;
            color: black;
            border: none;
            border-radius: 4px;
            padding: 8px 12px;
            margin-left: 8px;
            cursor: pointer;
            font-size: 1rem;
        }
        .search-button:hover {
            background-color: #f5eec7;
        }
        .search-highlight {
            background-color: rgba(255, 215, 0, 0.3);
            border-radius: 3px;
        }
    `;
    document.head.appendChild(style);
    showSlide(0);
});

function resetSearch() {
    const searchInput = document.querySelector('.search-bar input');
    searchInput.value = '';
    
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'flex';
    });
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.transform = '';
        item.style.boxShadow = '';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar');
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.className = 'clear-button';
    clearButton.addEventListener('click', resetSearch);
    searchBar.appendChild(clearButton);
    
    const style = document.createElement('style');
    style.textContent += `
        .clear-button {
            background-color: rgba(255, 255, 255, 0.3);
            color: #f5eec7;
            border: none;
            border-radius: 4px;
            padding: 8px 12px;
            margin-left: 8px;
            cursor: pointer;
            font-size: 1rem;
        }
        .clear-button:hover {
            background-color: rgba(255, 255, 255, 0.5);
        }
    `;
    document.head.appendChild(style);
});

const galleryImages = document.querySelectorAll('.gallery-image');

galleryImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        image.style.transform = 'scale(1.1)';
        image.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.5)';
    });

    image.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
        image.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    });
});