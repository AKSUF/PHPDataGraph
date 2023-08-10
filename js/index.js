$(document).ready(function() {
    const cardsContainer = $("#card-data");
    const prevButton = $("#prev-btn");
    const nextButton = $("#next-btn");
    const searchInput = $("#search-input");
    const searchButton = $("#search-btn");

    let currentPage = 1;
    let totalPages; // Define the totalPages variable
    const recordsPerPage = 8;

    function loadPage(page, keyword = "") {
        $.ajax({
            url: `functionphp/datacard.php?page=${page}&limit=${recordsPerPage}&keyword=${keyword}`,
            type: "GET",
            success: function(data) {
                if (data.trim() === "") {
                    // If no data found, display a message
                    cardsContainer.html("<p>No data found according to your search.</p>");
                } else {
                    // Display the retrieved data
                    cardsContainer.html(data);
                }
                updatePaginationButtons();
            },
            error: function() {
                console.log("Error loading data");
            }
        });
    }

    function updatePaginationButtons() {
        prevButton.prop("disabled", currentPage === 1);
        nextButton.prop("disabled", currentPage >= totalPages);
    }

    // Function to calculate the total number of pages
    function calculateTotalPages(totalRecords) {
        return Math.ceil(totalRecords / recordsPerPage);
    }

    // Get the total number of records from the server
    $.ajax({
        url: "functionphp/totaldata.php",
        type: "GET",
        success: function(data) {
            const cleanedData = data.replace(/"/g, '');
            const totalRecords = parseInt(cleanedData);

            if (!isNaN(totalRecords)) {
                totalPages = calculateTotalPages(totalRecords);
                updatePaginationButtons();
            } else {
                console.log("Invalid total records value:", cleanedData);
            }
        },
        error: function() {
            console.log("Error fetching total records");
        }
    });

    // Load the initial page
    loadPage(currentPage);

    prevButton.click(function() {
        if (currentPage > 1) {
            currentPage--;
            loadPage(currentPage);
        }
    });

    nextButton.click(function() {
        if (currentPage < totalPages) {
            currentPage++;
            loadPage(currentPage);
        }
    });

    searchButton.click(function() {
        const searchTerm = searchInput.val();
        currentPage = 1; // Reset current page
        loadPage(currentPage, searchTerm);
    });

});