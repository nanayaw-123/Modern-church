// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const filters = {
        series: document.getElementById('seriesFilter'),
        speaker: document.getElementById('speakerFilter'),
        date: document.getElementById('dateFilter')
    };

    // Add event listeners to all filters
    Object.values(filters).forEach(filter => {
        filter.addEventListener('change', filterSermons);
    });

    function filterSermons() {
        const sermons = document.querySelectorAll('.sermon-card');
        const activeFilters = {
            series: filters.series.value,
            speaker: filters.speaker.value,
            date: filters.date.value
        };

        sermons.forEach(sermon => {
            const matches = shouldShowSermon(sermon, activeFilters);
            sermon.closest('.col-lg-4').style.display = matches ? 'block' : 'none';
        });
    }

    function shouldShowSermon(sermon, filters) {
        // Add your filtering logic here
        return true; // Placeholder
    }

    // Initialize calendar
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listWeek'
        },
        events: [
            {
                title: 'Sunday Service',
                daysOfWeek: [0],
                startTime: '09:00:00',
                endTime: '10:30:00'
            },
            // Add more events here
        ]
    });
    calendar.render();

    // Event filtering
    const categoryFilters = document.querySelectorAll('.form-check-input');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', filterEvents);
    });

    function filterEvents() {
        const selectedCategories = Array.from(categoryFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const eventCards = document.querySelectorAll('#eventsGrid .card');
        eventCards.forEach(card => {
            const category = card.dataset.category;
            card.closest('.col-md-6').style.display = 
                selectedCategories.includes(category) ? 'block' : 'none';
        });
    }

    const form = document.getElementById('ministryInterestForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            ministry: document.getElementById('ministry').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send this to your backend
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your interest! We will contact you soon.');
        form.reset();
    });

    // Initialize Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'Image %1 of %2'
    });

    // Gallery filtering
    const filterButtons = document.querySelectorAll('[data-filter]');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.dataset.filter;
            
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Initialize Plyr
    const player = new Plyr('#featuredPlayer', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
    });

    // Video filtering
    const videoFilterButtons = document.querySelectorAll('[data-filter]');
    const videoItems = document.querySelectorAll('.video-item');

    videoFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.dataset.filter;
            
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter video items
            videoItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    const amountButtons = document.querySelectorAll('[data-amount]');
    const customAmountInput = document.getElementById('customAmount');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.dataset.amount;
            
            // Reset active states
            amountButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (amount === 'custom') {
                customAmountInput.style.display = 'block';
                customAmountInput.focus();
            } else {
                customAmountInput.style.display = 'none';
                customAmountInput.value = '';
            }
        });
    });

    // Initialize map
    const map = L.map('map').setView([40.7128, -74.0060], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add church marker
    const churchMarker = L.marker([40.7128, -74.0060]).addTo(map);
    churchMarker.bindPopup("<b>Grace Church</b><br>123 Church Street");

    // Handle form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to your backend
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
});