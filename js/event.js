$(document).ready(function () {
    // Check if events data is already cached
    const cachedEvents = localStorage.getItem('events');
    if (cachedEvents) {
        populateEventCarousel(JSON.parse(cachedEvents));
    } else {
        // Fetch data from Sheetsu if not cached
        fetchDataFromSheetsu();
    }

    // Function to dynamically populate the event carousel with cards in rows of three
    function populateEventCarousel(events) {
        const eventCarousel = $('#event-list');
        eventCarousel.empty(); // Clear the carousel before populating

        for (let i = 0; i < events.length; i += 3) {
            const row = $('<div>').addClass('row mb-4');

            for (let j = i; j < i + 3 && j < events.length; j++) {
                const event = events[j];

                const col = $('<div>').addClass('col-md-4');
                const eventCard = $('<div>').addClass('event-card');
                const eventImage = $('<img>').addClass('event-image').attr('src', event.ImageUrl); // Use the actual property name for the image URL
                const eventDetails = $('<div>').addClass('event-details');

                eventDetails.html(`
                    <div class="">
                        <div class="bg-white mb-2">
                            <h5 class="text-primary">${event.EventName}</h5>
                            <div>
                                <p>
                                    <strong><i class="fas fa-clock text-primary ml-2 mr-2"></i></strong> ${event.Time}
                                    <strong><i class="fa fa-map-marker-alt text-primary ml-3 mr-2"></i></strong> ${event.Location}
                                </p>
                            </div>
                            <div>
                                <a href="https://wa.me/918169400475?text=Hello!!%20Majestic%20Maountains" class="btn btn-primary py-md-2 px-md-5 mt-0">VIEW DETAILS</a>
                            </div>
                        </div>
                    </div>
                `);

                eventCard.append(eventImage);
                eventCard.append(eventDetails);
                col.append(eventCard);
                row.append(col);
            }

            eventCarousel.append(row);
        }
    }

    function fetchDataFromSheetsu() {
        $.ajax({
            url: 'https://sheetdb.io/api/v1/z3houmd5bfxes',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('Fetched data:', data);
                // Cache the events data
                localStorage.setItem('events', JSON.stringify(data));
                populateEventCarousel(data);
            },
            error: function (error) {
                console.error('Error fetching event data:', error);
                alert('Error fetching event data. Please check the console for details.');
            }
        });
    }
});
