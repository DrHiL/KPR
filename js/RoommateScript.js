/* =========================================
   DEFAULT LISTINGS (COMPLETED)
========================================= */
const defaultListings = [
  {
    id: 1,
    category: "room",
    badge: "Featured",
    title: "Private Room Near BKK1",
    location: "BKK1, Phnom Penh",
    price: 300,
    propertyType: "Apartment",
    availableDate: "Available Now",
    owner: "Sokha",
    contact: {
      phone: "+855 12 345 678",
      telegram: "@sokha_bkk1"
    },
    image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=80",
    description: "A comfortable private room in a modern apartment near BKK1. Close to restaurants, cafes, and markets.",
    amenities: "Wi-Fi, Air Conditioning, Kitchen, Washing Machine, Parking",
    preferences: "Looking for a clean, friendly, and respectful roommate."
  },
  {
    id: 2,
    category: "room",
    badge: "New",
    title: "Bright Room Near Toul Kork",
    location: "Toul Kork, Phnom Penh",
    price: 250,
    propertyType: "House",
    availableDate: "Available Now",
    owner: "Dara",
    contact: {
      phone: "+855 98 765 432",
      telegram: "@dara_tk"
    },
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    description: "Bright and spacious room in a quiet house in Toul Kork close to universities.",
    amenities: "Wi-Fi, Air Conditioning, Kitchen, Shared Living Room",
    preferences: "Ideal for a student or young professional."
  },
  {
    id: 3,
    category: "roommate",
    badge: "New",
    title: "Looking for a Roommate in Siem Reap",
    location: "Siem Reap",
    price: 180,
    propertyType: "Private Room",
    availableDate: "Looking Now",
    owner: "Sokunthea",
    contact: {
      phone: "+855 77 112 233",
      telegram: "@sokunthea_sr"
    },
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    description: "I'm looking for a friendly roommate to share a comfortable home in Siem Reap.",
    amenities: "Kitchen, Wi-Fi, Parking, Shared Living Room",
    preferences: "Friendly, clean, respectful, and easy-going."
  },
  {
    id: 4,
    category: "room",
    badge: "Popular",
    title: "Cozy Room Near Riverside",
    location: "Riverside, Phnom Penh",
    price: 220,
    propertyType: "Condo",
    availableDate: "August 1, 2026",
    owner: "Vannak",
    contact: {
      phone: "+855 10 998 877",
      telegram: "@vannak_riverside"
    },
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    description: "Cozy furnished room in a convenient condo near Phnom Penh Riverside.",
    amenities: "Swimming Pool, Gym, Wi-Fi, Security, Parking",
    preferences: "Professional or student preferred."
  },
  {
    id: 5,
    category: "roommate",
    badge: "New",
    title: "Young Professional Looking in Battambang",
    location: "Battambang",
    price: 150,
    propertyType: "House",
    availableDate: "Looking Now",
    owner: "Rithy",
    contact: {
      phone: "+855 89 445 566",
      telegram: "@rithy_btb"
    },
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    description: "I'm a young professional looking for a comfortable place to stay in Battambang.",
    amenities: "Kitchen, Parking, Wi-Fi",
    preferences: "Looking for a responsible and friendly roommate."
  },
  {
    id: 6,
    category: "room",
    badge: "Featured",
    title: "Modern Room in Sihanoukville",
    location: "Sihanoukville",
    price: 350,
    propertyType: "Apartment",
    availableDate: "Available Now",
    owner: "Piseth",
    contact: {
      phone: "+855 16 334 455",
      telegram: "@piseth_shv"
    },
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=900&q=80",
    description: "Modern room located close to the beach with ocean views.",
    amenities: "Air Conditioning, Wi-Fi, Elevator",
    preferences: "Quiet occupant."
  }
];

/* =========================================
   DOM INTERACTION & RENDERING LOGIC
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  let listings = [...defaultListings];
  let currentFilter = "all";

  // DOM Elements
  const grid = document.getElementById("listingGrid");
  const listingCount = document.getElementById("listingCount");
  const noResults = document.getElementById("noResults");
  const filterBtns = document.querySelectorAll(".filter-btn");

  // Modals & Buttons
  const listRoomModal = document.getElementById("listRoomModal");
  const profileModal = document.getElementById("profileModal");
  const postModal = document.getElementById("postModal");
  const loginModal = document.getElementById("loginModal");

  const listRoomBtn = document.getElementById("listRoomBtn");
  const createProfileBtn = document.getElementById("createProfileBtn");
  const closeBtns = document.querySelectorAll("[data-close]");

  // Hamburger Mobile Toggle
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mainNav = document.getElementById("main-nav");

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      if (mainNav) mainNav.classList.toggle("active");
    });
  }

  // Open Modal Helpers
  const openModal = (modal) => modal && modal.classList.add("active");
  const closeModal = (modal) => modal && modal.classList.remove("active");

  if (listRoomBtn) listRoomBtn.addEventListener("click", () => openModal(listRoomModal));
  if (createProfileBtn) createProfileBtn.addEventListener("click", () => openModal(profileModal));

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const activeModal = btn.closest(".modal");
      closeModal(activeModal);
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(e.target);
    }
  });

  // Render Function
  function renderListings() {
    if (!grid) return;

    const filtered = listings.filter((item) =>
      currentFilter === "all" ? true : item.category === currentFilter
    );

    if (listingCount) listingCount.textContent = filtered.length;

    if (filtered.length === 0) {
      grid.style.display = "none";
      if (noResults) noResults.style.display = "block";
      return;
    }

    grid.style.display = "grid";
    if (noResults) noResults.style.display = "none";

    grid.innerHTML = filtered
      .map(
        (item) => `
      <div class="listing-card" onclick="openPostDetail(${item.id})">
        <div class="listing-image">
          <img src="${item.image}" alt="${item.title}">
          <div class="badges">
            <span class="badge featured">${item.badge}</span>
            <span class="badge price">$${item.price}/mo</span>
          </div>
        </div>
        <div class="listing-content">
          <h3>${item.title}</h3>
          <div class="listing-meta">${item.propertyType} • ${item.availableDate}</div>
          <p class="listing-description">${item.description}</p>
          <div class="listing-location">📍 ${item.location}</div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Filter Buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderListings();
    });
  });

  // Modal Post Detail
  window.openPostDetail = (id) => {
    const item = listings.find((p) => p.id === id);
    if (!item) return;

    const modalContent = document.getElementById("postModalContent");
    if (modalContent) {
      modalContent.innerHTML = `
        <img class="detail-image" src="${item.image}" alt="${item.title}">
        <h2>${item.title}</h2>
        <div class="detail-price">$${item.price} / month</div>
        
        <div class="detail-info">
          <div class="info-box"><strong>Location:</strong> ${item.location}</div>
          <div class="info-box"><strong>Type:</strong> ${item.propertyType}</div>
          <div class="info-box"><strong>Availability:</strong> ${item.availableDate}</div>
          <div class="info-box"><strong>Listed By:</strong> ${item.owner}</div>
        </div>

        <div class="detail-section">
          <h3>Description</h3>
          <p>${item.description}</p>
        </div>

        <div class="detail-section">
          <h3>Amenities</h3>
          <p>${item.amenities}</p>
        </div>

        <!-- NEW CONTACT SECTION -->
        <div class="detail-section contact-section">
          <h3>Contact ${item.owner}</h3>
          <div class="contact-buttons">
            <a href="tel:${item.contact.phone}" class="cta-button red-button">
              📞 Call ${item.contact.phone}
            </a>
            <a href="https://t.me/${item.contact.telegram.replace('@', '')}" target="_blank" class="cta-button gold-button">
              ✈️ Telegram (${item.contact.telegram})
            </a>
          </div>
        </div>
      `;
      openModal(postModal);
    }
  };
  // Initial Render
  renderListings();
});