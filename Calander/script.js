$(document).ready(function () {
    // Replace 'YOUR_SHEETDB_API_ENDPOINT' with your actual SheetDB API endpoint
    const sheetDBEndpoint = 'https://sheetdb.io/api/v1/petjyd6yxod2i';

    // Fetch data from SheetDB
    $.ajax({
        url: sheetDBEndpoint,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            displayTestimonials(data);
        },
        error: function (error) {
            console.error('Error fetching data from SheetDB:', error);
        }
    });

    // Function to display testimonials
    function displayTestimonials(testimonials) {
        const testimonialsContainer = $('#testimonials-container');

        testimonials.forEach(function (testimonial) {
            const testimonialHtml = 
                <div class="col-md-6">
                    <div class="testimonial">
                        <img src="${testimonial.image}" alt="${testimonial.name}" width="50">
                        <strong>${testimonial.name}</strong>
                        <p>${testimonial.comment}</p>
                    </div>
                </div>
            ;

            testimonialsContainer.append(testimonialHtml);
        });
    }
});
