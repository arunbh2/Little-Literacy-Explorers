// Phonetic Pathways - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // Toggle active class on question
                this.classList.toggle('active');
                
                // Toggle answer visibility
                const answer = this.nextElementSibling;
                answer.classList.toggle('active');
                
                // Close other open answers
                faqQuestions.forEach(q => {
                    if (q !== question && q.classList.contains('active')) {
                        q.classList.remove('active');
                        q.nextElementSibling.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Exercise Filter
    const exerciseFilters = document.querySelectorAll('.exercise-filter button');
    const exerciseCards = document.querySelectorAll('.exercise-card');
    
    if (exerciseFilters.length > 0 && exerciseCards.length > 0) {
        exerciseFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                exerciseFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide exercise cards based on filter
                exerciseCards.forEach(card => {
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Progress Tracker
    const progressCheckboxes = document.querySelectorAll('.progress-checkbox');
    
    if (progressCheckboxes.length > 0) {
        // Load saved progress from localStorage
        const savedProgress = JSON.parse(localStorage.getItem('phonetic-pathways-progress') || '{}');
        
        progressCheckboxes.forEach(checkbox => {
            const exerciseId = checkbox.getAttribute('data-exercise-id');
            
            // Set checkbox state based on saved progress
            if (savedProgress[exerciseId]) {
                checkbox.checked = true;
            }
            
            // Save progress when checkbox state changes
            checkbox.addEventListener('change', function() {
                const isChecked = this.checked;
                const exerciseId = this.getAttribute('data-exercise-id');
                
                // Update saved progress
                savedProgress[exerciseId] = isChecked;
                localStorage.setItem('phonetic-pathways-progress', JSON.stringify(savedProgress));
                
                // Update progress bar
                updateProgressBar();
            });
        });
        
        // Initial progress bar update
        updateProgressBar();
    }
    
    // Function to update progress bar
    function updateProgressBar() {
        const progressBar = document.querySelector('.progress-bar-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressBar && progressText) {
            const totalExercises = progressCheckboxes.length;
            const completedExercises = document.querySelectorAll('.progress-checkbox:checked').length;
            const progressPercentage = Math.round((completedExercises / totalExercises) * 100);
            
            // Update progress bar width
            progressBar.style.width = progressPercentage + '%';
            
            // Update progress text
            progressText.textContent = completedExercises + '/' + totalExercises + ' completed (' + progressPercentage + '%)';
        }
    }
    
    // Story Search
    const storySearchInput = document.querySelector('.story-search-input');
    const storyCards = document.querySelectorAll('.story-card');
    
    if (storySearchInput && storyCards.length > 0) {
        storySearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            storyCards.forEach(card => {
                const storyTitle = card.querySelector('h3').textContent.toLowerCase();
                const storyTags = card.querySelectorAll('.tag');
                let matchesTags = false;
                
                // Check if search term matches any tags
                storyTags.forEach(tag => {
                    if (tag.textContent.toLowerCase().includes(searchTerm)) {
                        matchesTags = true;
                    }
                });
                
                // Show/hide card based on search
                if (storyTitle.includes(searchTerm) || matchesTags) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Newsletter Subscription
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Show subscription success message
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.classList.add('subscribe-success');
                
                this.parentNode.appendChild(successMessage);
                
                // Clear input
                emailInput.value = '';
                
                // Remove success message after delay
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }
    
    // Phonetic Highlighting
    const phoneticHighlightButtons = document.querySelectorAll('.phonetic-highlight-button');
    
    if (phoneticHighlightButtons.length > 0) {
        phoneticHighlightButtons.forEach(button => {
            button.addEventListener('click', function() {
                const storyContent = this.closest('.story-card').querySelector('.story-content');
                
                // Toggle highlight class on story content
                storyContent.classList.toggle('phonetic-highlighting');
                
                // Update button text
                if (storyContent.classList.contains('phonetic-highlighting')) {
                    this.textContent = 'Hide Phonetic Highlights';
                } else {
                    this.textContent = 'Show Phonetic Highlights';
                }
            });
        });
    }
    
    // Print Story
    const printStoryButtons = document.querySelectorAll('.print-story-button');
    
    if (printStoryButtons.length > 0) {
        printStoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const storyCard = this.closest('.story-card');
                const storyTitle = storyCard.querySelector('h3').textContent;
                const storyContent = storyCard.querySelector('.story-content').innerHTML;
                
                // Create print window
                const printWindow = window.open('', '_blank');
                
                // Create print content
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>${storyTitle}</title>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                line-height: 1.6;
                                padding: 20px;
                            }
                            h1 {
                                color: #FFA600;
                            }
                            .phonetic-highlight {
                                background-color: rgba(255, 166, 0, 0.1);
                                padding: 0 4px;
                                border-radius: 4px;
                            }
                            @media print {
                                body {
                                    font-size: 12pt;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <h1>${storyTitle}</h1>
                        <div class="story-content">
                            ${storyContent}
                        </div>
                    </body>
                    </html>
                `);
                
                // Print and close
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 500);
            });
        });
    }
    
    // Reading Timer
    const startTimerButtons = document.querySelectorAll('.start-timer-button');
    
    if (startTimerButtons.length > 0) {
        startTimerButtons.forEach(button => {
            button.addEventListener('click', function() {
                const timerDisplay = this.parentNode.querySelector('.timer-display');
                const timerValue = parseInt(this.getAttribute('data-timer')) || 15; // Default to 15 minutes
                let timeLeft = timerValue * 60; // Convert to seconds
                
                // Update button text
                this.textContent = 'Reset Timer';
                
                // Clear existing timer
                if (this.timerInterval) {
                    clearInterval(this.timerInterval);
                }
                
                // Update timer display
                updateTimerDisplay();
                
                // Start timer interval
                this.timerInterval = setInterval(() => {
                    timeLeft--;
                    
                    if (timeLeft <= 0) {
                        clearInterval(this.timerInterval);
                        timerDisplay.style.color = '#E74C3C';
                        
                        // Play sound if available
                        const timerSound = document.getElementById('timer-sound');
                        if (timerSound) {
                            timerSound.play();
                        }
                    }
                    
                    updateTimerDisplay();
                }, 1000);
                
                // Function to update timer display
                function updateTimerDisplay() {
                    const minutes = Math.floor(timeLeft / 60);
                    const seconds = timeLeft % 60;
                    
                    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
            });
        });
    }
});
