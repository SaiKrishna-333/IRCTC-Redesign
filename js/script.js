document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".cta-button");

    button.addEventListener("click", function () {
        alert("Booking feature coming soon!");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "password") {
            alert("Login Successful!");
            window.location.href = "../index.html"; // Redirect to homepage
        } else {
            alert("Invalid username or password!");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.querySelector("form");

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
        alert("Searching for available trains...");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const trainList = [
        { name: "Rajdhani Express", departure: "06:00 AM", arrival: "04:00 PM", duration: "10h", class: "AC First Class" },
        { name: "Shatabdi Express", departure: "08:00 AM", arrival: "01:30 PM", duration: "5h 30m", class: "AC Chair Car" },
        { name: "Duronto Express", departure: "09:30 PM", arrival: "06:30 AM", duration: "9h", class: "Sleeper" },
        { name: "Intercity Express", departure: "05:30 AM", arrival: "12:00 PM", duration: "6h 30m", class: "General" }
    ];

    const trainTableBody = document.getElementById("train-list");
    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");

    function renderTrains(filteredTrains) {
        trainTableBody.innerHTML = "";
        filteredTrains.forEach(train => {
            const row = `<tr>
                <td>${train.name}</td>
                <td>${train.departure}</td>
                <td>${train.arrival}</td>
                <td>${train.duration}</td>
                <td>${train.class}</td>
            </tr>`;
            trainTableBody.innerHTML += row;
        });
    }

    function filterTrains() {
        const searchTerm = searchInput.value.toLowerCase();
        const sortedTrains = [...trainList].sort((a, b) => {
            if (sortSelect.value === "name") return a.name.localeCompare(b.name);
            if (sortSelect.value === "departure") return a.departure.localeCompare(b.departure);
            if (sortSelect.value === "arrival") return a.arrival.localeCompare(b.arrival);
            return 0;
        });

        const filteredTrains = sortedTrains.filter(train =>
            train.name.toLowerCase().includes(searchTerm)
        );

        renderTrains(filteredTrains);
    }

    searchInput.addEventListener("input", filterTrains);
    sortSelect.addEventListener("change", filterTrains);

    renderTrains(trainList);
});

document.addEventListener("DOMContentLoaded", function () {
    // Initialize map
    const map = L.map('map').setView([22.5726, 88.3639], 5); // Default to India

    // Load OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const trainBtn = document.getElementById("track-btn");
    const trainStatus = document.getElementById("train-status");

    trainBtn.addEventListener("click", function () {
        const trainNumber = document.getElementById("train-number").value;
        if (!trainNumber) {
            alert("Please enter a train number!");
            return;
        }

        // Simulate API call to fetch train location
        fetchTrainLocation(trainNumber);
    });

    // Function to fetch train location (mock API)
    function fetchTrainLocation(trainNumber) {
        // Mock API response (replace with real API call)
        const mockApiResponse = {
            "12345": { lat: 28.7041, lng: 77.1025, status: "Running on time", lastStation: "New Delhi" },
            "67890": { lat: 19.0760, lng: 72.8777, status: "Delayed by 15 mins", lastStation: "Mumbai" }
        };

        // Simulate API delay
        setTimeout(() => {
            if (mockApiResponse[trainNumber]) {
                const trainData = mockApiResponse[trainNumber];
                map.setView([trainData.lat, trainData.lng], 10); // Zoom to train location
                L.marker([trainData.lat, trainData.lng]).addTo(map)
                    .bindPopup(`Train ${trainNumber} is here!`).openPopup();

                // Display train status
                trainStatus.innerHTML = `
                    <h3>Train Status</h3>
                    <p><strong>Train Number:</strong> ${trainNumber}</p>
                    <p><strong>Status:</strong> ${trainData.status}</p>
                    <p><strong>Last Station:</strong> ${trainData.lastStation}</p>
                `;
            } else {
                alert("Train not found! Try another number.");
                trainStatus.innerHTML = ""; // Clear status if train not found
            }
        }, 1000); // Simulate 1 second API delay
    }
});