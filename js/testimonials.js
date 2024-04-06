$(document).ready(function () {
    // Check if testimonials data is already cached
    const cachedTestimonials = localStorage.getItem('testimonials');
    if (cachedTestimonials) {
        displayTestimonials(JSON.parse(cachedTestimonials));
    } else {
        // Fetch data from SheetDB if not cached
        $.ajax({
            url: 'https://sheetdb.io/api/v1/3ouw669d9jn1p',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Cache the testimonials data
                localStorage.setItem('testimonials', JSON.stringify(data));
                displayTestimonials(data);
            },
            error: function (error) {
                console.error('Error fetching data from SheetDB:', error);
            }
        });
    }

    // Function to display testimonials
    function displayTestimonials(testimonials) {
        const testimonialsContainer = $('#testimonials-container');

        testimonials.forEach(function (testimonial) {
            const isLongReview = testimonial.comment.length > 100;

            const testimonialHtml = `
                <div class="testimonial">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                    <strong>${testimonial.name}</strong>
                    <div class="star-rating">${generateStarRating(testimonial.rating)}</div>
                    <div class="testimonial-content">
                        <p>${testimonial.comment}</p>
                    </div>
                    ${isLongReview ? '<div class="read-more-btn">Read More</div>' : ''}
                </div>
            `;

            testimonialsContainer.append(testimonialHtml);
        });

        // Initialize Owl Carousel
        testimonialsContainer.owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 }
            },
            onInitialized: refreshCarousel,
            onChanged: refreshCarousel
        });

        // Add event listener to toggle "Read More" button
        testimonialsContainer.on('click', '.read-more-btn', function () {
            const content = $(this).prev('.testimonial-content');
            content.toggleClass('expandable');
            $(this).text(content.hasClass('expandable') ? 'Read Less' : 'Read More');

            // Refresh Owl Carousel after expanding/collapsing
            testimonialsContainer.trigger('refresh.owl.carousel');
        });

        function refreshCarousel() {
            testimonialsContainer.find('.read-more-btn').on('click', function () {
                const content = $(this).prev('.testimonial-content');
                content.toggleClass('expandable');
                $(this).text(content.hasClass('expandable') ? 'Read Less' : 'Read More');
            });
        }
    }

    // Function to generate star rating dynamically
    function generateStarRating(rating) {
        const filledStars = '&#9733;'.repeat(rating);
        const emptyStars = '&#9734;'.repeat(5 - rating);
        return `<div class="star-rating">${filledStars + emptyStars}</div>`;
    }
});
