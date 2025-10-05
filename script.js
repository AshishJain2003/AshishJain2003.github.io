
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

function displayCurrentTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        timeElement.textContent = `Current Time: ${now.toLocaleString('en-IN', options)} (IST)`;
    }
}

// Update the time every second
setInterval(displayCurrentTime, 1000);

// Call the function immediately on page load
document.addEventListener('DOMContentLoaded', displayCurrentTime);



/**
 * @param {string} eventType 
 * @param {HTMLElement} targetElement
 */
function logActivity(eventType, targetElement) {
    const timestamp = new Date().toISOString();

    // Create a simple, readable description of the element
    let objectDescription = targetElement.tagName.toLowerCase();
    if (targetElement.id) {
        objectDescription += `#${targetElement.id}`;
    }
    if (targetElement.className && typeof targetElement.className === 'string') {
        objectDescription += `.${targetElement.className.split(' ')[0]}`;
    }

    console.log(
        `Timestamp_of_click/view: ${timestamp}, type_of_event: ${eventType}, event_object: ${objectDescription}`
    );
}

document.addEventListener('DOMContentLoaded', () => {
    logActivity('view', document.body);
});

document.addEventListener('click', (event) => {
    // `event.target` is the specific element that was clicked.
    logActivity('click', event.target);
});
