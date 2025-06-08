        // Navigation and Section Switching
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });

            // Remove active class from all nav links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            });

            // Show the selected section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');

                // Mark the corresponding nav link as active
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.setAttribute('aria-current', 'page');
                }
            }

            // Close mobile menu if open
            closeMobileMenu();

            // Scroll to top of section with offset for fixed header
            if (targetSection) {
                const headerHeight = document.getElementById('mainNav').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        }

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            const isExpanded = burger.getAttribute('aria-expanded') === 'true';

            burger.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');

            // Toggle body scroll
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        }

        function closeMobileMenu() {
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');

            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }

        // Initialize event listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            document.querySelector('.burger').addEventListener('click', toggleMobileMenu);

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.nav-container') && document.querySelector('.nav-links.active')) {
                    closeMobileMenu();
                }
            });

            // Dropdown menu toggle for mobile
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.addEventListener('click', function(e) {
                    if (window.innerWidth <= 992) {
                        e.preventDefault();
                        const dropdown = this.parentElement;
                        const isActive = dropdown.classList.contains('active');

                        // Close all other dropdowns
                        document.querySelectorAll('.dropdown').forEach(d => {
                            if (d !== dropdown) d.classList.remove('active');
                        });

                        // Toggle current dropdown
                        dropdown.classList.toggle('active', !isActive);
                    }
                });
            });

            // Close dropdowns when clicking elsewhere on mobile
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 992 && !e.target.closest('.dropdown')) {
                    document.querySelectorAll('.dropdown').forEach(d => {
                        d.classList.remove('active');
                    });
                }
            });

            // Handle keyboard navigation
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
        });

        // Handle scroll events for header
        window.addEventListener('scroll', function() {
            const nav = document.getElementById('mainNav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            // Start fading after 10px of scrolling
        const opacity = Math.min(window.scrollY / 100, 0.95);
        nav.style.backgroundColor = `rgba(255, 255, 255, ${1 - (opacity * 0.05)})`;
        nav.style.backdropFilter = `blur(${opacity * 2}px)`;
        });




        document.addEventListener('DOMContentLoaded', function() {

            // ======================
            // TAB FUNCTIONALITY
            // ======================
            const leadershipTabs = document.querySelectorAll('.leadership-tab');
            const leadershipContents = document.querySelectorAll('.leadership-content');

            function activateTab(tabName) {
                // Validate tab exists
                const targetContent = document.getElementById(`${tabName}-content`);
                if (!targetContent) {
                    console.error(`Tab content not found for: ${tabName}`);
                    return;
                }

                // Deactivate all tabs and contents
                leadershipTabs.forEach(tab => tab.classList.remove('active'));
                leadershipContents.forEach(content => content.classList.remove('active'));

                // Activate selected tab
                document.querySelector(`.leadership-tab[data-tab="${tabName}"]`).classList.add('active');
                targetContent.classList.add('active');

                // If switching to committee tab, ensure a year is active
                if (tabName === 'committee') {
                    ensureYearActive();
                }
            }

            // Set up tab click handlers
            leadershipTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabName = this.getAttribute('data-tab');
                    activateTab(tabName);
                });
            });

            // Initialize with first tab active
            if (leadershipTabs.length > 0) {
                const firstTabName = leadershipTabs[0].getAttribute('data-tab');
                activateTab(firstTabName);
            }

            // ======================
            // YEAR SELECTOR FUNCTIONALITY
            // ======================
            const yearButtons = document.querySelectorAll('.year-btn');
            const committeeYears = document.querySelectorAll('.committee-year');
            const prevYearBtn = document.querySelector('.year-arrow.prev');
            const nextYearBtn = document.querySelector('.year-arrow.next');
            const yearScroller = document.querySelector('.year-buttons');

            function activateYear(year) {
                // Validate year exists
                const targetYear = document.querySelector(`.committee-year[data-year="${year}"]`);
                if (!targetYear) {
                    console.error(`Year content not found for: ${year}`);
                    return;
                }

                // Deactivate all years and buttons
                yearButtons.forEach(btn => btn.classList.remove('active'));
                committeeYears.forEach(year => year.classList.remove('active'));

                // Activate selected year
                document.querySelector(`.year-btn[data-year="${year}"]`).classList.add('active');
                targetYear.classList.add('active');

                // Center the selected button
                const activeBtn = document.querySelector(`.year-btn[data-year="${year}"]`);
                if (activeBtn && yearScroller) {
                    activeBtn.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            }

            function ensureYearActive() {
                // If no year is active, activate the first one
                const activeYear = document.querySelector('.committee-year.active');
                if (!activeYear && yearButtons.length > 0) {
                    const firstYear = yearButtons[0].getAttribute('data-year');
                    activateYear(firstYear);
                }
            }

            // Set up year button click handlers
            yearButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const year = this.getAttribute('data-year');
                    activateYear(year);
                });
            });

            // Set up arrow button handlers
            if (prevYearBtn && nextYearBtn && yearScroller) {
                prevYearBtn.addEventListener('click', () => {
                    yearScroller.scrollBy({ left: -200, behavior: 'smooth' });
                });

                nextYearBtn.addEventListener('click', () => {
                    yearScroller.scrollBy({ left: 200, behavior: 'smooth' });
                });

                // Update arrow button states
                function updateArrowStates() {
                    const maxScrollLeft = yearScroller.scrollWidth - yearScroller.clientWidth;
                    prevYearBtn.disabled = yearScroller.scrollLeft <= 0;
                    nextYearBtn.disabled = yearScroller.scrollLeft >= maxScrollLeft;
                }

                yearScroller.addEventListener('scroll', updateArrowStates);
                updateArrowStates(); // Initial check
            }

            // Initialize year selector if committee tab is active
            ensureYearActive();

            // ======================
            // DEBUGGING HELPERS
            // ======================
            console.log('Leadership tabs initialized:', leadershipTabs.length);
            console.log('Year buttons initialized:', yearButtons.length);

            // For testing: simulate clicking the committee tab
            // setTimeout(() => activateTab('committee'), 1000);
        });






        document.addEventListener('DOMContentLoaded', function() {
    // Mailing List Form Submission
    const mailingListForm = document.getElementById('mailingListForm');

    if (mailingListForm) {
        mailingListForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const school = document.getElementById('school').value;
            const name = document.getElementById('name').value;
            const admission = document.getElementById('admission').value;
            const grade = document.getElementById('grade').value;
            const email = document.getElementById('email').value;


            // Simple validation
            if (!name || !admission || !grade || !email) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Show success notification
            showNotification('Thank you for subscribing to our mailing list!', 'success');

            // Reset form
            mailingListForm.reset();
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Event details modal functionality
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const modal = document.getElementById('eventModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');

    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventType = this.getAttribute('data-event');
            showEventDetails(eventType);
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    function showEventDetails(eventType) {
        let title = '';
        let content = '';

        switch(eventType) {
            case 'olympiad':
                title = 'Carey Francis Mathematical Contest';
                content = `
                    <h3>${title}</h3>
                    <p>The Carey Francis Mathematical Contest is our premier competition that tests students' problem-solving skills across various mathematical disciplines. The event features:</p>
                    <ul>
                        <li>Four problem categories: Algebra, Geometry, Number Theory, and Combinatorics</li>
                        <li>Three difficulty levels: Junior, Intermediate, and Advanced</li>
                        <li>Individual and team competition components</li>
                        <li>Cash prizes and scholarships for top performers</li>
                    </ul>
                    <p><strong>Date:</strong> March 15, 2024</p>
                    <p><strong>Location:</strong> Alliance High School Main Hall</p>
                    <p><strong>Registration Deadline:</strong> March 1, 2024</p>
                    <p>For more information, please contact the Math Club office or visit our registration desk.</p>
                `;
                break;

            case 'speaker-series':
                title = 'Alliance High School Annual Math Workshop';
                content = `
                    <h3>${title}</h3>
                    <p>Our annual Alliance High School Annual Math Workshop brings renowned teachers, mathematicians, and industry professionals to share their knowledge and experiences with our students. Each session includes:</p>
                    <ul>
                        <li>Keynote presentation on cutting-edge mathematical research or applications</li>
                        <li>Interactive Q&A session</li>
                        <li>Networking opportunities with the speaker</li>
                        <li>Hands-on workshops (select events)</li>
                    </ul>
                    <p><strong>Upcoming Speakers:</strong></p>
                    <ul>
                        <li>April 10: Dr. Jane Muthoni - "Applications of Graph Theory in Computer Science"</li>
                        <li>May 8: Prof. James Omondi - "The Beauty of Number Theory"</li>
                        <li>June 12: Eng. Susan Kariuki - "Mathematical Modeling in Engineering"</li>
                    </ul>
                    <p>All events are free for Math Club members. Non-members may attend for a small fee.</p>
                `;
                break;

            case 'math-challenge':
                title = 'Inter-School Math Challenge';
                content = `
                    <h3>${title}</h3>
                    <p>The Inter-School Math Challenge is a team-based competition that brings together the brightest math students from Alliance High School, The Kenya High School, and Alliance Girls High School . Features include:</p>
                    <ul>
                        <li>Teams of 4 students representing their schools</li>
                        <li>Three rounds of competition: Speed Round, Team Round, and Relay Round</li>
                        <li>Problems ranging from basic to highly challenging</li>
                        <li>Trophies and medals for winning teams</li>
                    </ul>
                    <p><strong>Date:</strong> October 22, 2024</p>
                    <p><strong>Location:</strong> Alliance High School Gymnasium</p>
                    <p><strong>Registration:</strong> Schools must register by October 1, 2024. Each school may enter up to two teams.</p>
                    <p>This event is sponsored by the National Mathematical Society and several corporate partners.</p>
                `;
                break;
        }

        modalContent.innerHTML = content;
        modal.style.display = 'block';
    }

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add notification styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 4px;
            color: white;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1001;
        }

        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }

        .notification.success {
            background-color: #27ae60;
        }
    `;
    document.head.appendChild(style);
});

        // Challenge Submission Form
        function showSubmissionForm() {
            const form = document.getElementById('submissionForm');
            form.style.display = form.style.display === 'block' ? 'none' : 'block';
        }

        function hideSubmissionForm() {
            document.getElementById('submissionForm').style.display = 'none';
        }

        function submitSolution() {
            alert('Solution submitted successfully!');
            hideSubmissionForm();
            document.getElementById('challengeProgress').style.width = '100%';
        }

        // Forum Post Replies
        function showReplyForm(element) {
            const replyForm = element.closest('.forum-post').querySelector('.reply-form');
            replyForm.style.display = 'block';
        }

        function hideReplyForm(element) {
            element.closest('.reply-form').style.display = 'none';
        }

        function submitReply(element) {
            const replyText = element.closest('.reply-form').querySelector('textarea').value;
            if (replyText.trim() !== '') {
                alert('Reply posted: ' + replyText);
                hideReplyForm(element);
            }
        }

        function likePost(element) {
            const likeCount = element.querySelector('i');
            let count = parseInt(element.textContent) || 0;

            if (element.classList.contains('liked')) {
                count--;
                element.classList.remove('liked');
                likeCount.classList.remove('fas');
                likeCount.classList.add('far');
            } else {
                count++;
                element.classList.add('liked');
                likeCount.classList.remove('far');
                likeCount.classList.add('fas');
            }

            element.innerHTML = `<i class="${likeCount.classList.contains('fas') ? 'fas' : 'far'} fa-thumbs-up"></i> ${count > 0 ? count : ''}`.trim();
        }

        function createNewPost() {
            const postContent = document.getElementById('newPostContent').value;
            if (postContent.trim() !== '') {
                alert('New post created: ' + postContent);
                document.getElementById('newPostContent').value = '';
            }
        }

                    // Gallery data
            const galleryData = [
                {
                    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "State Math Olympiad 2023",
                    description: "Our team celebrating 1st place finish",
                    category: "competitions"
                },
                {
                    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "National Finals",
                    description: "Receiving medals at national championship",
                    category: "competitions"
                },
                {
                    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "Regional Tournament",
                    description: "Team photo after perfect score round",
                    category: "competitions"
                },
                {
                    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "Weekly Problem Session",
                    description: "Students collaborating on challenge problems",
                    category: "workshops"
                },
                {
                    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "Guest Lecture",
                    description: "Prof. Smith on applications of graph theory",
                    category: "workshops"
                },
                {
                    image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "Summer Math Camp",
                    description: "Preparing for upcoming competitions",
                    category: "workshops"
                },
                {
                    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "Advanced Geometry",
                    description: "Exploring geometric proofs techniques",
                    category: "workshops"
                },
                {
                    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "Team Building",
                    description: "Math puzzle competition",
                    category: "social"
                },
                {
                    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "End of Year Dinner",
                    description: "Celebrating our achievements",
                    category: "social"
                },
                {
                    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "Math Game Night",
                    description: "Strategic games with mathematical concepts",
                    category: "social"
                },
                {
                    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "Intensive Training",
                    description: "Preparing for international olympiad",
                    category: "competitions"
                },
                {
                    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "Number Theory",
                    description: "Exploring prime number patterns",
                    category: "workshops"
                },
                {
                    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "Club Retreat",
                    description: "Annual team bonding weekend",
                    category: "social"
                },
                {
                    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "Award Ceremony",
                    description: "Recognizing our top competitors",
                    category: "competitions"
                },
                {
                    image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                    title: "Problem Solving",
                    description: "Collaborative learning session",
                    category: "workshops"
                }
            ];

            // Lightbox functionality
            let currentImageIndex = 0;

            function openLightbox(index) {
                currentImageIndex = index;
                const item = galleryData[index];
                document.getElementById('lightbox-image').src = item.image;
                document.getElementById('lightbox-caption').innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
                document.getElementById('lightbox').style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }

            function closeLightbox() {
                document.getElementById('lightbox').style.display = 'none';
                document.body.style.overflow = 'auto';
            }

            function navigateLightbox(direction) {
                currentImageIndex += direction;

                if (currentImageIndex < 0) {
                    currentImageIndex = galleryData.length - 1;
                } else if (currentImageIndex >= galleryData.length) {
                    currentImageIndex = 0;
                }

                openLightbox(currentImageIndex);
            }

            // Filter functionality
            document.addEventListener('DOMContentLoaded', function() {
                const filterButtons = document.querySelectorAll('.filter-btn');
                const galleryItems = document.querySelectorAll('.gallery-item');
                const loadMoreBtn = document.getElementById('loadMoreGallery');
                let visibleItems = 6; // Initial number of items to show

                // Filter items
                filterButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Update active button
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');

                        const filter = this.getAttribute('data-filter');

                        // Filter items
                        galleryItems.forEach(item => {
                            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                                item.style.display = 'block';
                            } else {
                                item.style.display = 'none';
                            }
                        });
                    });
                });

                // Load more functionality
                loadMoreBtn.addEventListener('click', function() {
                    visibleItems += 6;
                    const items = Array.from(document.querySelectorAll('.gallery-item'));

                    items.forEach((item, index) => {
                        if (index < visibleItems) {
                            item.style.display = 'block';
                        }
                    });

                    if (visibleItems >= items.length) {
                        loadMoreBtn.style.display = 'none';
                    }
                });

                // Initialize - show first 6 items
                const items = Array.from(document.querySelectorAll('.gallery-item'));
                items.forEach((item, index) => {
                    if (index >= 6) {
                        item.style.display = 'none';
                    }
                });

                // Close lightbox when clicking outside image
                document.getElementById('lightbox').addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeLightbox();
                    }
                });

                // Keyboard navigation
                document.addEventListener('keydown', function(e) {
                    if (document.getElementById('lightbox').style.display === 'flex') {
                        if (e.key === 'Escape') {
                            closeLightbox();
                        } else if (e.key === 'ArrowLeft') {
                            navigateLightbox(-1);
                        } else if (e.key === 'ArrowRight') {
                            navigateLightbox(1);
                        }
                    }
                });
            });

        // Modal System
        function showModal(content, title = '') {
            const modal = document.getElementById('modal');
            const modalContent = document.getElementById('modal-content');

            modalContent.innerHTML = `
                ${title ? `<h3>${title}</h3>` : ''}
                <div>${content}</div>
            `;

            modal.style.display = 'block';
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }

        // Sample modal functions
        function showSolutionsModal() {
            showModal(`
                <p>Solutions to past problems are available for download:</p>
                <ul>
                    <li><a href="#">Week 23 Geometry Solutions</a></li>
                    <li><a href="#">Week 22 Combinatorics Solutions</a></li>
                    <li><a href="#">Week 21 Algebra Solutions</a></li>
                </ul>
                <p>For video explanations, visit our <a href="#">YouTube channel</a>.</p>
            `, 'Problem Solutions');
        }

        function showDiscussionModal() {
            showModal(`
                <p>Join the discussion on our forum or attend our weekly problem sessions:</p>
                <ul>
                    <li>Tuesday: 3:30 PM in Room 214</li>
                    <li>Thursday: 3:30 PM in Room 214</li>
                </ul>
                <p>Online discussion is available in the <a href="#community" onclick="showSection('community')">Community section</a>.</p>
            `, 'Problem Discussion');
        }

        function showHintModal() {
            showModal(`
                <p>Additional hints for the current problem:</p>
                <ol>
                    <li>Try small values of n (1 through 5) to identify a pattern</li>
                    <li>Consider the prime factorization of n</li>
                    <li>Look for cases where n is odd vs even</li>
                    <li>Examine the relationship between n and 2^n + 1</li>
                </ol>
                <p>Remember, the full solution is due by May 15th.</p>
            `, 'Additional Hints');
        }

        function showEventRSVP(eventName) {
            showModal(`
                <p>You are RSVPing for: <strong>${eventName}</strong></p>
                <form>
                    <div class="form-group">
                        <label for="rsvpName">Your Name</label>
                        <input type="text" id="rsvpName" required>
                    </div>
                    <div class="form-group">
                        <label for="rsvpEmail">Email</label>
                        <input type="email" id="rsvpEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="rsvpGuests">Number of Guests</label>
                        <input type="number" id="rsvpGuests" min="0" max="2" value="0">
                    </div>
                    <button type="submit" class="btn">Confirm RSVP</button>
                </form>
            `, 'Event RSVP');
        }

        function showResourceModal(resourceType) {
            showModal(`
                <p>Recommended resources for <strong>${resourceType}</strong>:</p>
                <ul>
                    <li><a href="#">Official ${resourceType} Problems and Solutions</a></li>
                    <li><a href="#">${resourceType} Strategy Guide</a></li>
                    <li><a href="#">Video Playlist: ${resourceType} Walkthroughs</a></li>
                    <li><a href="#">Practice Tests with Answer Keys</a></li>
                </ul>
                <p>See our faculty advisors for personalized recommendations based on your skill level.</p>
            `, resourceType);
        }

        function showMentorApplication() {
            showModal(`
                <p>Thank you for your interest in becoming a mentor! Please provide the following information:</p>
                <form>
                    <div class="form-group">
                        <label for="mentorName">Your Name</label>
                        <input type="text" id="mentorName" required>
                    </div>
                    <div class="form-group">
                        <label for="mentorGrade">Grade Level</label>
                        <select id="mentorGrade" required>
                            <option value="">Select Grade</option>
                            <option value="11">11th Grade</option>
                            <option value="12">12th Grade</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mentorExperience">Math Competition Experience</label>
                        <textarea id="mentorExperience" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="mentorAvailability">Availability (hours/week)</label>
                        <input type="number" id="mentorAvailability" min="1" max="10" required>
                    </div>
                    <button type="submit" class="btn">Submit Application</button>
                </form>
            `, 'Mentor Application');
        }

        function showMentorRequest() {
            showModal(`
                <p>Please complete this form to be matched with a mentor:</p>
                <form>
                    <div class="form-group">
                        <label for="menteeName">Your Name</label>
                        <input type="text" id="menteeName" required>
                    </div>
                    <div class="form-group">
                        <label for="menteeGrade">Grade Level</label>
                        <select id="menteeGrade" required>
                            <option value="">Select Grade</option>
                            <option value="9">9th Grade</option>
                            <option value="10">10th Grade</option>
                            <option value="11">11th Grade</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="menteeGoals">Learning Goals</label>
                        <textarea id="menteeGoals" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="menteeCompetitions">Competitions of Interest</label>
                        <select id="menteeCompetitions" multiple>
                            <option value="amc">AMC 10/12</option>
                            <option value="aime">AIME</option>
                            <option value="mathcounts">MATHCOUNTS</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <button type="submit" class="btn">Request Mentor</button>
                </form>
            `, 'Mentor Request');
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === document.getElementById('modal')) {
                closeModal();
            }
        });

        // Countdown Timers
        function updateCountdown(endDate, daysId, hoursId, minutesId) {
            const now = new Date();
            const diff = endDate - now;

            if (diff <= 0) {
                document.getElementById(daysId).textContent = '00';
                document.getElementById(hoursId).textContent = '00';
                document.getElementById(minutesId).textContent = '00';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            document.getElementById(daysId).textContent = days.toString().padStart(2, '0');
            document.getElementById(hoursId).textContent = hours.toString().padStart(2, '0');
            document.getElementById(minutesId).textContent = minutes.toString().padStart(2, '0');
        }

        // Set up countdowns for events
        const eventDates = [
            new Date('2023-09-15T15:30:00'), // Kickoff Meeting
            new Date('2023-10-10T15:30:00'), // AMC Workshop
            new Date('2023-11-08T08:00:00'), // AMC Competition
            new Date('2024-01-20T09:00:00'), // Math League
            new Date('2024-02-17T09:00:00')  // HMMT
        ];

        function updateAllCountdowns() {
            for (let i = 0; i < eventDates.length; i++) {
                updateCountdown(
                    eventDates[i],
                    `days${i+1}`,
                    `hours${i+1}`,
                    `minutes${i+1}`
                );
            }
        }

        // Update countdowns every minute
        updateAllCountdowns();
        setInterval(updateAllCountdowns, 60000);

        // Back to Top Button
        window.addEventListener('scroll', function() {
            const backToTop = document.getElementById('backToTop');
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        document.getElementById('backToTop').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

            // AI Chat functionality
            const chatToggle = document.getElementById('chat-toggle');
            const chatContainer = document.getElementById('chat-container');
            const closeChat = document.getElementById('close-chat');
            const minimizeChat = document.getElementById('minimize-chat');
            const sendBtn = document.getElementById('send-btn');
            const userInput = document.getElementById('user-input');
            const chatMessages = document.getElementById('chat-messages');
            const chatNotification = document.getElementById('chat-notification');

            // Toggle chat visibility
            chatToggle.addEventListener('click', () => {
                chatContainer.classList.toggle('visible');
                if (chatContainer.classList.contains('visible')) {
                    chatToggle.innerHTML = '<i class="fas fa-times"></i>';
                    chatNotification.style.display = 'none';
                    // Add welcome message if chat is empty
                    if (chatMessages.children.length === 0) {
                        addMessage("Hello! I'm the Math Club Assistant. How can I help you today?", 'ai');
                    }
                } else {
                    chatToggle.innerHTML = '<i class="fas fa-robot"></i>';
                }
            });

            closeChat.addEventListener('click', () => {
                chatContainer.classList.remove('visible');
                chatToggle.innerHTML = '<i class="fas fa-robot"></i>';
            });

            minimizeChat.addEventListener('click', () => {
                if (chatContainer.style.height === '60px') {
                    chatContainer.style.height = '500px';
                    chatMessages.style.display = 'block';
                    document.querySelector('#chat-container > div:last-child').style.display = 'block';
                    minimizeChat.innerHTML = '<i class="fas fa-window-minimize"></i>';
                } else {
                    chatContainer.style.height = '60px';
                    chatMessages.style.display = 'none';
                    document.querySelector('#chat-container > div:last-child').style.display = 'none';
                    minimizeChat.innerHTML = '<i class="fas fa-window-maximize"></i>';
                }
            });

            // Simple AI responses
            const aiResponses = {
                "hello": "Hello! How can I help you with the Math Club today?",
                "hi": "Hi there! What would you like to know about our Math Club?",
                "meeting": "Math Club meetings are every Tuesday and Thursday from 3:30 PM to 5:00 PM in Room 214.",
                "join": "To join the Math Club, please fill out the registration form in the 'Join Us' section of our website!",
                "competition": "Our next competition is the AMC 10/12 on November 8, 2023. Check the Events section for details.",
                "challenge": "The current weekly challenge is a Number Theory problem. You can find it in the Challenges section.",
                "help": "I can tell you about meetings, competitions, how to join, faculty, and more. What would you like to know?",
                "thanks": "You're welcome! Let me know if you have any other questions.",
                "thank you": "You're welcome! Happy to help with anything Math Club related.",
                "default": "I'm the Math Club AI assistant. I can tell you about meetings, competitions, or how to join. What would you like to know?"
            };

            // Send message function
            function sendMessage() {
                const message = userInput.value.trim();
                if (message) {
                    // Add user message
                    addMessage(message, 'user');
                    userInput.value = '';

                    // Show typing indicator
                    const typingIndicator = document.createElement('div');
                    typingIndicator.className = 'typing-indicator';
                    typingIndicator.innerHTML = `
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    `;
                    chatMessages.appendChild(typingIndicator);
                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    // Simulate AI thinking
                    setTimeout(() => {
                        // Remove typing indicator
                        chatMessages.removeChild(typingIndicator);

                        let response = aiResponses.default;
                        const lowerMessage = message.toLowerCase();

                        // Check for matching keywords
                        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                            response = aiResponses.hello;
                        } else if (lowerMessage.includes('meet') || lowerMessage.includes('when')) {
                            response = aiResponses.meeting;
                        } else if (lowerMessage.includes('join') || lowerMessage.includes('member')) {
                            response = aiResponses.join;
                        } else if (lowerMessage.includes('competition') || lowerMessage.includes('contest')) {
                            response = aiResponses.competition;
                        } else if (lowerMessage.includes('challenge') || lowerMessage.includes('problem')) {
                            response = aiResponses.challenge;
                        } else if (lowerMessage.includes('help')) {
                            response = aiResponses.help;
                        } else if (lowerMessage.includes('thank')) {
                            response = aiResponses.thanks;
                        }

                        addMessage(response, 'ai');

                        // If chat is closed, show notification
                        if (!chatContainer.classList.contains('visible')) {
                            chatNotification.style.display = 'flex';
                        }
                    }, 1000 + Math.random() * 1000);
                }
            }

            // Add message to chat
            function addMessage(text, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `chat-message ${sender}-message`;
                messageDiv.textContent = text;
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            // Event listeners for chat
            sendBtn.addEventListener('click', sendMessage);
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });

            // Make chat draggable
            const chatHeader = document.getElementById('chat-header');
            let isDragging = false;
            let offsetX, offsetY;

            chatHeader.addEventListener('mousedown', (e) => {
                isDragging = true;
                offsetX = e.clientX - chatContainer.getBoundingClientRect().left;
                offsetY = e.clientY - chatContainer.getBoundingClientRect().top;
                chatContainer.style.cursor = 'grabbing';
            });

            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    chatContainer.style.left = `${e.clientX - offsetX}px`;
                    chatContainer.style.top = `${e.clientY - offsetY}px`;
                }
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
                chatContainer.style.cursor = 'default';
            });
        // Paper Filtering Function
        function filterPapers() {
            const typeFilter = document.getElementById('paper-type').value;
            const roundFilter = document.getElementById('paper-round').value;
            const yearFilter = document.getElementById('paper-year').value;

            document.querySelectorAll('.paper-card').forEach(card => {
                const typeMatch = typeFilter === 'all' || card.getAttribute('data-type') === typeFilter;
                const roundMatch = roundFilter === 'all' || card.getAttribute('data-round') === roundFilter;
                const yearMatch = yearFilter === 'all' || card.getAttribute('data-year') === yearFilter;

                // Special case for competitions without rounds
                const hasRound = card.hasAttribute('data-round');
                const roundApplicable = (typeFilter === 'interhouse' || typeFilter === 'interclass') ? true : !hasRound;

                if (typeMatch && (roundMatch || !roundApplicable) && yearMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

                    // Update round filter visibility based on competition type
            const roundFilterGroup = document.querySelector('.filter-group:nth-child(2)');
            if (typeFilter === 'interhouse' || typeFilter === 'interclass') {
                roundFilterGroup.style.display = 'block';
            } else {
                roundFilterGroup.style.display = 'none';
            }
        }

        // Initialize filters
        document.addEventListener('DOMContentLoaded', function() {
            filterPapers();

            // Set up event listeners for filter changes
            document.getElementById('paper-type').addEventListener('change', function() {
                // Reset round filter when competition type changes
                document.getElementById('paper-round').value = 'all';
                filterPapers();
            });
        });

        // Form Submission
        document.getElementById('membershipForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your application to the Math Club! We will review your information and contact you soon.');
            this.reset();
        });

        // Download Functions
        function downloadPaper(paperName) {
            alert(`Downloading ${paperName}.pdf...`);
            // In a real implementation, this would trigger a file download
        }

        function downloadSolution() {
            alert('Downloading solution PDF...');
            // In a real implementation, this would trigger a file download
        }

        function showVideoSolution() {
            showModal(`
                <p>Video solutions are available on our YouTube channel:</p>
                <div style="position: relative; padding-bottom: 56.25%; height: 0; margin: 1rem 0;">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
                </div>
                <p>Subscribe to our channel for weekly problem walkthroughs.</p>
            `, 'Video Solution');
        }

// Math Canvas Background
        document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('mathCanvas');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Set canvas size
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resizeCanvas();

            // Math symbols to display
            const mathSymbolsAndFormulas = {
                symbols: [
                    // Basic & Advanced Mathematical Symbols
                    'Σ', '∫', '∂', 'π', '∞', '√', '∏', '∮', 'θ', 'Ω', '∀', '∃', '∈', '∉', '∩', '∪', '∧', '∨', '¬', '⊕', '⊗', '⊙', '⊥', '∥', '∠', '≡', '≈', '≠', '≤', '≥', '≪', '≫', '∝', '∼', '≅', '∇', '∆', 'ℵ', 'ℏ', 'ℜ', 'ℑ',

                    // Greek Letters
                    'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'λ', 'μ', 'ξ', 'ρ', 'σ', 'τ', 'φ', 'ψ', 'ω', 'Γ', 'Δ', 'Θ', 'Λ', 'Ξ', 'Π', 'Σ', 'Φ', 'Ψ', 'Ω',

                    // Set Theory & Logic
                    '∅', '⊤', '⊢', '⊨', '∴', '∵', '⋀', '⋁', '⋂', '⋃', '⊂', '⊃', '⊆', '⊇', '⊄', '⊅',

                    // Arrows
                    '→', '←', '↑', '↓', '↔', '↕', '⇒', '⇔', '↦', '⇀', '⇁', '⇌', '⇋',

                    // Numbers
                    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
                ]
            };

            const particles = [];
            const particleCount = Math.max(30, Math.floor(window.innerWidth / 15));

            // Enhanced Particle class
            class Particle {
                constructor() {
                    this.reset(true);
                }

                reset(initial = false) {
                    this.x = Math.random() * canvas.width;
                    this.y = initial ? (Math.random() * canvas.height) : -50;
                    this.size = Math.random() * 30 + 20;
                    this.speed = Math.random() * 1.2 + 0.3;
                    this.symbol = mathSymbolsAndFormulas.symbols[Math.floor(Math.random() * mathSymbolsAndFormulas.symbols.length)];
                    this.opacity = Math.random() * 0.8 + 0.5;
                    this.angle = Math.random() * 360;
                    this.rotationSpeed = (Math.random() - 0.5) * 1.5;
                }

                update() {
                    this.y += this.speed;
                    this.angle += this.rotationSpeed;

                    if (this.y > canvas.height + 50) {
                        this.reset();
                    }
                }

                draw() {
                    ctx.fillStyle = `rgba(0, 86, 179, ${this.opacity})`;
                    ctx.font = `bold ${this.size}px 'PT Mono', monospace`;
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.angle * Math.PI / 180);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(this.symbol, 0, 0);
                    ctx.restore();
                }
            }

            // Initialize particles
            function initParticles() {
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }

            // Animation loop
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                requestAnimationFrame(animate);
            }

            // Start animation
            initParticles();
            animate();

            // Handle window resize
            window.addEventListener('resize', function() {
                resizeCanvas();
                // Reinitialize particles if needed
                particles.length = 0;
                initParticles();
            });
        });

        const papersData = [
    {
        title: "Interhouse Contest - Round 1",
        type: "interhouse",
        round: "round1",
        year: "2023",
        problems: 20,
        duration: "60 Minutes",
        description: "First round of the annual interhouse mathematics competition."
    },
    {
        title: "Interhouse Contest - Round 2",
        type: "interhouse",
        round: "round2",
        year: "2023",
        problems: 15,
        duration: "75 Minutes",
        description: "Second round with more challenging problems for top performers."
    },
    {
        title: "Carey Francis Contest",
        type: "carey",
        year: "2022",
        problems: 30,
        duration: "120 Minutes",
        description: "Annual competition in honor of Carey Francis with challenging problems."
    },
    // Add more papers as needed
];

        // Global variables for download functionality
        let currentDownloadUrl = '';
        const CORRECT_PASSWORD = "Math@2023";

        // Initialize password protection for downloads
        function initiateDownload(url) {
            currentDownloadUrl = url;
            document.getElementById('passwordModal').style.display = 'block';
            document.getElementById('passwordInput').value = '';
            document.getElementById('passwordError').style.display = 'none';
        }

        function closePasswordModal() {
            document.getElementById('passwordModal').style.display = 'none';
            currentDownloadUrl = '';
        }

        function verifyPassword() {
            const password = document.getElementById('passwordInput').value;
            if (password === CORRECT_PASSWORD) {
                // Open in new window
                window.open(currentDownloadUrl, '_blank');
                closePasswordModal();
            } else {
                document.getElementById('passwordError').style.display = 'block';
            }
        }

        // Filter papers based on selections
        function filterPapers() {
            const typeFilter = document.getElementById('paper-type').value;
            const roundFilter = document.getElementById('paper-round').value;
            const yearFilter = document.getElementById('paper-year').value;

            document.querySelectorAll('.paper-card').forEach(card => {
                const typeMatch = typeFilter === 'all' || card.getAttribute('data-type') === typeFilter;
                const roundMatch = roundFilter === 'all' || card.getAttribute('data-round') === roundFilter;
                const yearMatch = yearFilter === 'all' || card.getAttribute('data-year') === yearFilter;

                // Special case for competitions without rounds
                const hasRound = card.hasAttribute('data-round');
                const roundApplicable = (typeFilter === 'interhouse' || typeFilter === 'interclass') ? true : !hasRound;

                if (typeMatch && (roundMatch || !roundApplicable) && yearMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Update round filter visibility based on competition type
            const roundFilterGroup = document.querySelector('.filter-group:nth-child(2)');
            if (typeFilter === 'interhouse' || typeFilter === 'interclass') {
                roundFilterGroup.style.display = 'block';
            } else {
                roundFilterGroup.style.display = 'none';
            }
        }

        // Show solutions modal
        function showSolutionsModal(paperId) {
            // You can implement this similarly to the password modal
            alert(`Solutions for ${paperId} would be displayed here.`);
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            filterPapers();
        });

        document.addEventListener('DOMContentLoaded', function() {
        const tabs = document.querySelectorAll('.hof-tab');
        const contents = document.querySelectorAll('.hof-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                // Show corresponding content
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    });

         // Tab Switching Functionality
    document.addEventListener('DOMContentLoaded', function() {
        // Challenge tabs
        const challengeTabs = document.querySelectorAll('.challenge-tab');
        const challengeContents = document.querySelectorAll('.challenge-content');

        challengeTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and contents
                challengeTabs.forEach(t => t.classList.remove('active'));
                challengeContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Current Challenge Buttons
        const submitBtn = document.querySelector('.submit-btn');
        const discussionBtn = document.querySelector('.discussion-btn');
        const hintsBtn = document.querySelector('.hints-btn');
        const cancelSubmit = document.querySelector('.cancel-submit');
        const confirmSubmit = document.querySelector('.confirm-submit');
        const submissionForm = document.getElementById('submissionForm');

        submitBtn.addEventListener('click', function() {
            submissionForm.style.display = 'block';
            this.style.display = 'none';
        });

        cancelSubmit.addEventListener('click', function() {
            submissionForm.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        });

        confirmSubmit.addEventListener('click', function() {
            alert('Solution submitted successfully!');
            submissionForm.style.display = 'none';
            submitBtn.style.display = 'inline-block';
            document.querySelector('.solution-textarea').value = '';
        });

        discussionBtn.addEventListener('click', function() {
            showModal('Discussion Forum', '<p>This feature will be available soon where you can discuss solutions with other students.</p>');
        });

        hintsBtn.addEventListener('click', function() {
            showModal('Additional Hints', '<p>1. Check for n=1, n=3 as base cases</p><p>2. Consider prime factorization of n</p><p>3. Look for patterns in the divisors</p>');
        });

        // Archive Buttons
        const viewSolutionsBtns = document.querySelectorAll('.view-solutions');
        const downloadProblemBtns = document.querySelectorAll('.download-problem');

        viewSolutionsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const challengeTitle = this.closest('.challenge-card').querySelector('h3').textContent;
                showModal(challengeTitle + ' Solutions', '<p>Detailed solutions will be displayed here.</p><p>This feature will show all submitted solutions once implemented.</p>');
            });
        });

        downloadProblemBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                alert('Problem PDF download will start shortly.');
                // In a real implementation, this would trigger a file download
            });
        });

        // Solutions Buttons
        const downloadSolutionBtns = document.querySelectorAll('.download-solution');
        const videoSolutionBtns = document.querySelectorAll('.video-solution');

        downloadSolutionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                alert('Solution PDF download will start shortly.');
                // In a real implementation, this would trigger a file download
            });
        });

        videoSolutionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const challengeTitle = this.closest('.challenge-card').querySelector('h3').textContent;
                showModal(challengeTitle + ' Video', '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/example" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>');
            });
        });

        // Leaderboard View Buttons
        const viewSolutionBtns = document.querySelectorAll('.btn-view');

        viewSolutionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const studentName = this.closest('tr').querySelector('td:nth-child(2)').textContent;
                showModal(studentName + "'s Solution", '<p>This would display the student\'s submitted solution.</p>');
            });
        });

        // Modal functionality
        const modal = document.getElementById('solutionModal');
        const closeModal = document.querySelector('.close-modal');

        function showModal(title, content) {
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalContent').innerHTML = content;
            modal.style.display = 'block';
        }

        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });

                document.addEventListener('DOMContentLoaded', function() {
            // Challenge data (weeks 10-23)
            const challengeData = [
                {
                    week: 23,
                    title: "Geometry Problem",
                    difficulty: "medium",
                    category: "geometry",
                    problem: "Let \\( ABC \\) be a triangle with \\( AB = AC \\). Point \\( D \\) lies on segment \\( BC \\) such that \\( BD = 2DC \\). Prove that \\( \\angle BAD = 2\\angle CAD \\).",
                    date: "May 8, 2023",
                    status: "completed"
                },
                {
                    week: 22,
                    title: "Combinatorics Puzzle",
                    difficulty: "easy",
                    category: "combinatorics",
                    problem: "How many ways can you arrange 5 identical math books and 3 identical physics books on a shelf if no two physics books can be adjacent?",
                    date: "May 1, 2023",
                    status: "completed"
                },
                {
                    week: 21,
                    title: "Algebra Challenge",
                    difficulty: "medium",
                    category: "algebra",
                    problem: "Find all real numbers \\( x \\) satisfying \\( \\sqrt{x+3-4\\sqrt{x-1}} + \\sqrt{x+8-6\\sqrt{x-1}} = 1 \\).",
                    date: "April 24, 2023",
                    status: "completed"
                },
                {
                    week: 20,
                    title: "Number Theory Problem",
                    difficulty: "hard",
                    category: "number-theory",
                    problem: "Find all pairs of positive integers \\( (m, n) \\) such that \\( m^n = n^m \\).",
                    date: "April 17, 2023",
                    status: "completed"
                },
                {
                    week: 19,
                    title: "Functional Equation",
                    difficulty: "hard",
                    category: "algebra",
                    problem: "Find all functions \\( f: \\mathbb{R} \\rightarrow \\mathbb{R} \\) such that \\( f(x^2 + f(y)) = (x-y)^2 f(x+y) \\) for all real numbers \\( x, y \\).",
                    date: "April 10, 2023",
                    status: "completed"
                },
                {
                    week: 18,
                    title: "Triangle Geometry",
                    difficulty: "medium",
                    category: "geometry",
                    problem: "In triangle \\( ABC \\), points \\( D, E, F \\) lie on sides \\( BC, CA, AB \\) respectively such that \\( AD, BE, CF \\) are concurrent. Prove that \\( \\frac{BD}{DC} \\times \\frac{CE}{EA} \\times \\frac{AF}{FB} = 1 \\).",
                    date: "April 3, 2023",
                    status: "completed"
                },
                {
                    week: 17,
                    title: "Counting Problem",
                    difficulty: "easy",
                    category: "combinatorics",
                    problem: "How many 5-digit numbers have exactly two even digits?",
                    date: "March 27, 2023",
                    status: "completed"
                },
                {
                    week: 16,
                    title: "Modular Arithmetic",
                    difficulty: "medium",
                    category: "number-theory",
                    problem: "Find the last two digits of \\( 7^{2023} \\).",
                    date: "March 20, 2023",
                    status: "completed"
                },
                {
                    week: 15,
                    title: "Polynomial Challenge",
                    difficulty: "hard",
                    category: "algebra",
                    problem: "Find all polynomials \\( P(x) \\) with real coefficients such that \\( P(x^2) = P(x)P(x+1) \\).",
                    date: "March 13, 2023",
                    status: "completed"
                },
                {
                    week: 14,
                    title: "Circle Geometry",
                    difficulty: "medium",
                    category: "geometry",
                    problem: "Two circles intersect at points \\( A \\) and \\( B \\). A line through \\( A \\) intersects the circles again at \\( C \\) and \\( D \\). Prove that the angle between the tangents at \\( C \\) and \\( D \\) is equal to the angle between the two circles.",
                    date: "March 6, 2023",
                    status: "completed"
                },
                {
                    week: 13,
                    title: "Probability Puzzle",
                    difficulty: "easy",
                    category: "combinatorics",
                    problem: "If you roll three fair six-sided dice, what is the probability that the sum is divisible by 3?",
                    date: "February 27, 2023",
                    status: "completed"
                },
                {
                    week: 12,
                    title: "Diophantine Equation",
                    difficulty: "hard",
                    category: "number-theory",
                    problem: "Find all integer solutions to \\( x^2 + y^2 = 5z^2 \\).",
                    date: "February 20, 2023",
                    status: "completed"
                },
                {
                    week: 11,
                    title: "Inequality Problem",
                    difficulty: "medium",
                    category: "algebra",
                    problem: "For positive real numbers \\( a, b, c \\) with \\( abc = 1 \\), prove that \\( \\frac{a}{b} + \\frac{b}{c} + \\frac{c}{a} \\geq a + b + c \\).",
                    date: "February 13, 2023",
                    status: "completed"
                },
                {
                    week: 10,
                    title: "Trigonometric Identity",
                    difficulty: "easy",
                    category: "algebra",
                    problem: "Prove that \\( \\sin^6x + \\cos^6x = 1 - \\frac{3}{4}\\sin^2 2x \\).",
                    date: "February 6, 2023",
                    status: "completed"
                }
            ];

            // Solution data
            const solutionData = challengeData.map(challenge => ({
                ...challenge,
                solution: `Detailed solution for Week ${challenge.week} would appear here. This would include step-by-step explanations, diagrams for geometry problems, and final answers.`,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            }));

            // DOM elements
            const modal = document.getElementById('solutionModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalContent = document.getElementById('modalContent');
            const closeModal = document.querySelector('.close-modal');
            const archiveChallenges = document.getElementById('archiveChallenges');
            const pastSolutions = document.getElementById('pastSolutions');
            const loadMoreChallenges = document.getElementById('loadMoreChallenges');
            const loadMoreSolutions = document.getElementById('loadMoreSolutions');
            const archiveSearch = document.getElementById('archiveSearch');
            const solutionsSearch = document.getElementById('solutionsSearch');
            const difficultyFilter = document.getElementById('difficultyFilter');
            const solutionFilter = document.getElementById('solutionFilter');
            const submissionForm = document.getElementById('submissionForm');
            const submitBtn = document.querySelector('.submit-btn');
            const cancelSubmit = document.querySelector('.cancel-submit');

            // Pagination variables
            let challengesPerPage = 5;
            let solutionsPerPage = 5;
            let currentChallengePage = 1;
            let currentSolutionPage = 1;

            // Tab switching functionality
            const challengeTabs = document.querySelectorAll('.challenge-tab');
            const challengeContents = document.querySelectorAll('.challenge-content');

            challengeTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs and contents
                    challengeTabs.forEach(t => t.classList.remove('active'));
                    challengeContents.forEach(c => c.classList.remove('active'));

                    // Add active class to clicked tab
                    this.classList.add('active');

                    // Show corresponding content
                    const tabId = this.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                });
            });

            // Render functions
            function renderChallenges(page = 1, searchTerm = '', difficulty = 'all') {
                const filtered = challengeData.filter(challenge => {
                    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                         challenge.problem.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesDifficulty = difficulty === 'all' || challenge.difficulty === difficulty;
                    return matchesSearch && matchesDifficulty;
                });

                const start = (page - 1) * challengesPerPage;
                const end = start + challengesPerPage;
                const toRender = filtered.slice(0, end);

                archiveChallenges.innerHTML = toRender.map(challenge => `
                    <div class="challenge-card card-3d">
                        <div class="challenge-header">
                            <h3>Week #${challenge.week}: ${challenge.title}</h3>
                            <div class="challenge-meta">
                                <span class="challenge-difficulty ${challenge.difficulty}">${challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}</span>
                                <span>Closed: ${challenge.date}</span>
                                <span class="badge">Completed</span>
                            </div>
                        </div>
                        <div class="challenge-problem">
                            <p>${challenge.problem}</p>
                        </div>
                        <div class="challenge-actions">
                            <button class="btn view-solutions" data-week="${challenge.week}">View Solutions</button>
                            <button class="btn btn-outline download-problem">Download PDF</button>
                        </div>
                    </div>
                `).join('');

                loadMoreChallenges.style.display = end < filtered.length ? 'block' : 'none';

                // Add event listeners to newly rendered buttons
                document.querySelectorAll('.view-solutions').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const week = this.getAttribute('data-week');
                        const challenge = challengeData.find(c => c.week == week);
                        const solution = solutionData.find(s => s.week == week);
                        showModal(`Week ${week} Solutions`, `
                            <h4>Problem:</h4>
                            <p>${challenge.problem}</p>
                            <h4>Solution:</h4>
                            <p>${solution.solution}</p>
                            <div class="video-container">
                                <iframe width="100%" height="315" src="${solution.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        `);
                    });
                });

                document.querySelectorAll('.download-problem').forEach(btn => {
                    btn.addEventListener('click', function() {
                        alert('Problem PDF download will start shortly.');
                    });
                });

                // Render math in new content
                if (window.MathJax) {
                    MathJax.typesetPromise();
                }
            }

            function renderSolutions(page = 1, searchTerm = '', category = 'all') {
                const filtered = solutionData.filter(solution => {
                    const matchesSearch = solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                         solution.problem.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesCategory = category === 'all' || solution.category === category;
                    return matchesSearch && matchesCategory;
                });

                const start = (page - 1) * solutionsPerPage;
                const end = start + solutionsPerPage;
                const toRender = filtered.slice(0, end);

                pastSolutions.innerHTML = toRender.map(solution => `
                    <div class="challenge-card card-3d">
                        <div class="challenge-header">
                            <h3>Week #${solution.week}: ${solution.title} Solutions</h3>
                            <div class="challenge-meta">
                                <span class="challenge-difficulty ${solution.difficulty}">${solution.difficulty.charAt(0).toUpperCase() + solution.difficulty.slice(1)}</span>
                                <span>Posted: ${solution.date}</span>
                            </div>
                        </div>
                        <div class="challenge-problem">
                            <p><strong>Problem:</strong> ${solution.problem}</p>
                            <p><strong>Solution Preview:</strong> ${solution.solution.substring(0, 150)}...</p>
                        </div>
                        <div class="challenge-actions">
                            <button class="btn download-solution" data-week="${solution.week}">Download Full Solution</button>
                            <button class="btn btn-outline video-solution" data-week="${solution.week}">Video Explanation</button>
                        </div>
                    </div>
                `).join('');

                loadMoreSolutions.style.display = end < filtered.length ? 'block' : 'none';

                // Add event listeners to newly rendered buttons
                document.querySelectorAll('.download-solution').forEach(btn => {
                    btn.addEventListener('click', function() {
                        alert('Solution PDF download will start shortly.');
                    });
                });

                document.querySelectorAll('.video-solution').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const week = this.getAttribute('data-week');
                        const solution = solutionData.find(s => s.week == week);
                        showModal(`Week ${week} Video Solution`, `
                            <div class="video-container">
                                <iframe width="100%" height="315" src="${solution.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <p>Detailed video explanation for Week ${week} challenge.</p>
                        `);
                    });
                });

                // Render math in new content
                if (window.MathJax) {
                    MathJax.typesetPromise();
                }
            }

            // Modal functionality with MathJax support
            function showModal(title, content) {
                modalTitle.textContent = title;
                modalContent.innerHTML = content;
                modal.style.display = 'block';

                // Render math in the modal after a short delay
                setTimeout(() => {
                    if (window.MathJax) {
                        MathJax.typesetPromise([modalContent]).catch(err => console.log('MathJax error:', err));
                    }
                }, 100);
            }

            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });

            window.addEventListener('click', function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            });

            // Current challenge buttons
            submitBtn.addEventListener('click', function() {
                submissionForm.style.display = 'block';
                this.style.display = 'none';
            });

            cancelSubmit.addEventListener('click', function() {
                submissionForm.style.display = 'none';
                submitBtn.style.display = 'inline-block';
            });

            document.querySelector('.confirm-submit').addEventListener('click', function() {
                alert('Solution submitted successfully!');
                submissionForm.style.display = 'none';
                submitBtn.style.display = 'inline-block';
                document.querySelector('.solution-textarea').value = '';
            });

            document.querySelector('.discussion-btn').addEventListener('click', function() {
                showModal('Discussion Forum', `
                    <h4>Number Theory Challenge Discussion</h4>
                    <p>This is where students can discuss solutions to the current challenge. Features include:</p>
                    <ul>
                        <li>Threaded discussions</li>
                        <li>Math equation support</li>
                        <li>Upvoting helpful comments</li>
                        <li>Moderated solutions</li>
                    </ul>
                    <p><strong>Sample Discussion:</strong></p>
                    <div class="discussion-post">
                        <p><strong>David Kim:</strong> I started by testing small values of n. n=1 and n=3 work, but n=2 doesn't.</p>
                    </div>
                    <div class="discussion-post">
                        <p><strong>Sophia Martinez:</strong> Have you considered the prime factorization approach?</p>
                    </div>
                `);
            });

            document.querySelector('.hints-btn').addEventListener('click', function() {
                showModal('Additional Hints', `
                    <h4>Number Theory Challenge Hints</h4>
                    <p>Here are some additional hints to help you solve the problem:</p>
                    <ol>
                        <li>Test small values of n first (n=1, 3, 9, 171, etc.)</li>
                        <li>Consider the prime factorization of n</li>
                        <li>Examine the relationship between n and its prime factors</li>
                        <li>Look for patterns in the exponents</li>
                        <li>Try to prove that no other solutions exist beyond those you've found</li>
                    </ol>
                    <p><strong>Advanced Hint:</strong></p>
                    <p>The only solutions are n=1 and n=3. For n>3, the largest prime factor of n will create a contradiction.</p>
                `);
            });

            // Leaderboard view buttons
            document.querySelectorAll('.btn-view').forEach(btn => {
                btn.addEventListener('click', function() {
                    const studentName = this.closest('tr').querySelector('td:nth-child(2)').textContent;
                    showModal(`${studentName}'s Solution`, `
                        <p>This would display ${studentName}'s submitted solution to the current challenge.</p>
                        <p>The solution would include:</p>
                        <ul>
                            <li>Step-by-step reasoning</li>
                            <li>Mathematical proofs</li>
                            <li>Diagrams if applicable</li>
                            <li>Final answer with verification</li>
                        </ul>
                        <p><strong>Sample:</strong></p>
                        <p>Let's consider n=1: \\(1^2\\) divides \\(2^1 + 1 = 3\\), which is true.</p>
                        <p>For n=3: \\(3^2\\) divides \\(2^3 + 1 = 9\\), which is also true.</p>
                        <p>Now we need to show no other positive integers satisfy this condition...</p>
                    `);
                });
            });

            // Filter and search functionality
            archiveSearch.addEventListener('input', function() {
                currentChallengePage = 1;
                renderChallenges(currentChallengePage, this.value, difficultyFilter.value);
            });

            solutionsSearch.addEventListener('input', function() {
                currentSolutionPage = 1;
                renderSolutions(currentSolutionPage, this.value, solutionFilter.value);
            });

            difficultyFilter.addEventListener('change', function() {
                currentChallengePage = 1;
                renderChallenges(currentChallengePage, archiveSearch.value, this.value);
            });

            solutionFilter.addEventListener('change', function() {
                currentSolutionPage = 1;
                renderSolutions(currentSolutionPage, solutionsSearch.value, this.value);
            });

            // Load more functionality
            loadMoreChallenges.addEventListener('click', function() {
                currentChallengePage++;
                renderChallenges(currentChallengePage, archiveSearch.value, difficultyFilter.value);
            });

            loadMoreSolutions.addEventListener('click', function() {
                currentSolutionPage++;
                renderSolutions(currentSolutionPage, solutionsSearch.value, solutionFilter.value);
            });

            // Initial render with MathJax
            renderChallenges();
            renderSolutions();

            // Initial MathJax rendering
            if (window.MathJax) {
                MathJax.typesetPromise();
            }
        });

               // Community Section Functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Tab switching
            const tabs = document.querySelectorAll('.community-tab');
            const contents = document.querySelectorAll('.community-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs and contents
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));

                    // Add active class to clicked tab and corresponding content
                    this.classList.add('active');
                    const tabId = this.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                });
            });

            // Forum functionality
            setupForum();

            // Resources functionality
            setupResources();

            // Mentorship functionality
            setupMentorship();

            // Events functionality
            setupEvents();

            // Modal functionality
            setupModals();
        });

        function setupForum() {
            // Post categories
            const categoryTags = document.querySelectorAll('.category-tag');
            categoryTags.forEach(tag => {
                tag.addEventListener('click', function() {
                    categoryTags.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Reply buttons
            document.querySelectorAll('.post-action[data-action="reply"]').forEach(btn => {
                btn.addEventListener('click', function() {
                    const post = this.closest('.forum-post');
                    const replyForm = post.querySelector('.reply-form');
                    replyForm.style.display = replyForm.style.display === 'block' ? 'none' : 'block';
                });
            });

            // Like buttons
            document.querySelectorAll('.post-action[data-action="like"]').forEach(btn => {
                btn.addEventListener('click', function() {
                    const likeCount = this.querySelector('.like-count');
                    let count = parseInt(likeCount.textContent);

                    if (this.classList.contains('liked')) {
                        count--;
                        this.classList.remove('liked');
                        this.innerHTML = `<i class="far fa-thumbs-up"></i> ${count} Likes`;
                    } else {
                        count++;
                        this.classList.add('liked');
                        this.innerHTML = `<i class="fas fa-thumbs-up"></i> ${count} Likes`;
                    }

                    likeCount.textContent = count;
                });
            });

            // Bookmark buttons
            document.querySelectorAll('.post-action[data-action="bookmark"]').forEach(btn => {
                btn.addEventListener('click', function() {
                    if (this.classList.contains('bookmarked')) {
                        this.classList.remove('bookmarked');
                        this.innerHTML = '<i class="far fa-bookmark"></i> Save';
                    } else {
                        this.classList.add('bookmarked');
                        this.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
                    }
                });
            });

            // Submit reply buttons
            document.querySelectorAll('.post-action[data-action="submit-reply"]').forEach(btn => {
                btn.addEventListener('click', function() {
                    const replyForm = this.closest('.reply-form');
                    const textarea = replyForm.querySelector('textarea');
                    const replyContent = textarea.value.trim();

                    if (replyContent) {
                        const post = replyForm.closest('.forum-post');
                        const repliesContainer = post.querySelector('.replies-container');

                        if (!repliesContainer) {
                            // Create replies container if it doesn't exist
                            const newRepliesContainer = document.createElement('div');
                            newRepliesContainer.className = 'replies-container';
                            post.appendChild(newRepliesContainer);
                        }

                        // Create new reply element
                        const replyElement = document.createElement('div');
                        replyElement.className = 'reply';
                        replyElement.innerHTML = `
                            <div class="reply-header">
                                <img src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg" alt="User" class="reply-avatar">
                                <div>
                                    <div class="reply-author">You</div>
                                    <div class="reply-time">Just now</div>
                                </div>
                            </div>
                            <div class="reply-content">
                                <p>${replyContent}</p>
                            </div>
                        `;

                        post.querySelector('.replies-container').prepend(replyElement);

                        // Update reply count
                        const replyCount = post.querySelector('.reply-count');
                        if (replyCount) {
                            replyCount.textContent = parseInt(replyCount.textContent) + 1;
                        }

                        // Clear and hide form
                        textarea.value = '';
                        replyForm.style.display = 'none';
                    }
                });
            });

            // Cancel reply buttons
            document.querySelectorAll('.post-action[data-action="cancel-reply"]').forEach(btn => {
                btn.addEventListener('click', function() {
                    const replyForm = this.closest('.reply-form');
                    replyForm.style.display = 'none';
                });
            });

            // Create new post
            const createPostBtn = document.getElementById('createPostBtn');
            if (createPostBtn) {
                createPostBtn.addEventListener('click', function() {
                    const title = document.getElementById('newPostTitle').value.trim();
                    const content = document.getElementById('newPostContent').value.trim();
                    const activeCategory = document.querySelector('.category-tag.active').getAttribute('data-category');

                    if (content) {
                        const forumPosts = document.querySelector('.forum-posts');
                        const newPost = document.createElement('div');
                        newPost.className = 'forum-post card-3d';
                        newPost.innerHTML = `
                            <div class="post-header">
                                <img src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg" alt="User" class="post-avatar">
                                <div>
                                    <div class="post-author">You</div>
                                    <div class="post-time">Just now</div>
                                </div>
                            </div>
                            <div class="post-content">
                                ${title ? `<h4>${title}</h4>` : ''}
                                <p>${content}</p>
                                <div class="post-category">${activeCategory}</div>
                            </div>
                            <div class="post-actions">
                                <div class="post-action" data-action="reply"><i class="far fa-comment"></i> <span class="reply-count">0</span> Replies</div>
                                <div class="post-action" data-action="like"><i class="far fa-thumbs-up"></i> <span class="like-count">0</span> Likes</div>
                                <div class="post-action" data-action="bookmark"><i class="far fa-bookmark"></i> Save</div>
                            </div>
                            <div class="reply-form">
                                <textarea placeholder="Write your reply..."></textarea>
                                <div class="post-actions">
                                    <button class="btn btn-small" data-action="submit-reply">Post Reply</button>
                                    <button class="btn btn-small btn-outline" data-action="cancel-reply">Cancel</button>
                                </div>
                            </div>
                        `;

                        forumPosts.prepend(newPost);

                        // Clear form
                        document.getElementById('newPostTitle').value = '';
                        document.getElementById('newPostContent').value = '';

                        // Set up event listeners for new post
                        setupForum();
                    }
                });
            }

            // Preview post
            const previewPostBtn = document.getElementById('previewPostBtn');
            if (previewPostBtn) {
                previewPostBtn.addEventListener('click', function() {
                    const content = document.getElementById('newPostContent').value.trim();
                    const previewDiv = document.querySelector('.post-preview');

                    if (content) {
                        // Simple markdown parsing (you might want to use a library for more complete support)
                        let htmlContent = content
                            .replace(/^# (.*$)/gm, '<h4>$1</h4>') // Headers
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
                            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
                            .replace(/`(.*?)`/g, '<code>$1</code>') // Code
                            .replace(/\n/g, '<br>'); // Line breaks

                        previewDiv.innerHTML = htmlContent;
                        previewDiv.classList.remove('hidden');
                    } else {
                        previewDiv.classList.add('hidden');
                    }
                });
            }
        }

        function setupResources() {
            // Resource items
            document.querySelectorAll('.resource-category li').forEach(item => {
                item.addEventListener('click', function() {
                    const resource = this.getAttribute('data-resource');
                    const type = this.getAttribute('data-type');
                    showResourceModal(resource, type);
                });
            });

            // Competition buttons
            document.querySelectorAll('.prep-buttons .btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const competition = this.getAttribute('data-competition');
                    showResourceModal(competition, 'competition');
                });
            });

            // Resource search
            const resourceSearch = document.getElementById('resourceSearch');
            if (resourceSearch) {
                resourceSearch.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    document.querySelectorAll('.resource-category li').forEach(item => {
                        const text = item.textContent.toLowerCase();
                        item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
                    });
                });
            }
        }

        function setupMentorship() {
            // Mentor application
            document.querySelector('.mentor-btn').addEventListener('click', function() {
                showMentorModal('mentor');
            });

            // Mentee application
            document.querySelector('.mentee-btn').addEventListener('click', function() {
                showMentorModal('mentee');
            });

            // View mentor profiles
            document.querySelectorAll('.view-profile').forEach(btn => {
                btn.addEventListener('click', function() {
                    const mentorCard = this.closest('.mentor-card');
                    const mentorName = mentorCard.querySelector('.mentor-name').textContent;
                    const mentorBio = mentorCard.querySelector('.mentor-bio').textContent;

                    showMentorModal('profile', { name: mentorName, bio: mentorBio });
                });
            });
        }

        function setupEvents() {
            // Initialize calendar
            renderCalendar(new Date());

            // Calendar navigation
            document.querySelector('.prev-month').addEventListener('click', function() {
                const currentMonth = document.querySelector('.current-month').textContent;
                const date = new Date(currentMonth + ' 1, ' + new Date().getFullYear());
                date.setMonth(date.getMonth() - 1);
                renderCalendar(date);
            });

            document.querySelector('.next-month').addEventListener('click', function() {
                const currentMonth = document.querySelector('.current-month').textContent;
                const date = new Date(currentMonth + ' 1, ' + new Date().getFullYear());
                date.setMonth(date.getMonth() + 1);
                renderCalendar(date);
            });

            // RSVP buttons
            document.querySelectorAll('.rsvp-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const eventCard = this.closest('.event-card');
                    const eventTitle = eventCard.querySelector('h4').textContent;

                    if (this.textContent === 'RSVP') {
                        this.textContent = 'Cancel RSVP';
                        this.classList.add('btn-outline');
                        alert(`You've RSVP'd to "${eventTitle}"`);
                    } else {
                        this.textContent = 'RSVP';
                        this.classList.remove('btn-outline');
                        alert(`RSVP canceled for "${eventTitle}"`);
                    }
                });
            });

            // Add event button
            document.getElementById('addEventBtn').addEventListener('click', function() {
                showEventModal();
            });
        }

        function renderCalendar(date) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                               'July', 'August', 'September', 'October', 'November', 'December'];

            // Set month header
            document.querySelector('.current-month').textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

            // Get first day of month and total days
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
            const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

            // Create calendar grid
            const calendarGrid = document.querySelector('.calendar-grid');
            calendarGrid.innerHTML = '';

            // Add day names
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            dayNames.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day day-name';
                dayElement.textContent = day;
                calendarGrid.appendChild(dayElement);
            });

            // Add empty cells for days before first day of month
            for (let i = 0; i < firstDay; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'calendar-day empty';
                calendarGrid.appendChild(emptyCell);
            }

            // Add days of month
            const today = new Date();
            const currentMonth = date.getMonth();
            const currentYear = date.getFullYear();

            // Sample event days (would normally come from a data source)
            const eventDays = [5, 12, 15, 22, 28];

            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;

                // Highlight today
                if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                    dayElement.classList.add('today');
                }

                // Mark days with events
                if (eventDays.includes(day)) {
                    dayElement.classList.add('event');
                }

                calendarGrid.appendChild(dayElement);
            }
        }

        function setupModals() {
            // Close modals when clicking X
            document.querySelectorAll('.close-modal').forEach(btn => {
                btn.addEventListener('click', function() {
                    this.closest('.modal').style.display = 'none';
                });
            });

            // Close modals when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target.classList.contains('modal')) {
                    event.target.style.display = 'none';
                }
            });

            // Event form submission
            const eventForm = document.getElementById('eventForm');
            if (eventForm) {
                eventForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    const name = document.getElementById('eventName').value;
                    const date = document.getElementById('eventDate').value;
                    const time = document.getElementById('eventTime').value;
                    const location = document.getElementById('eventLocation').value;
                    const description = document.getElementById('eventDescription').value;

                    // Format date for display
                    const eventDate = new Date(date);
                    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const day = eventDate.getDate();
                    const month = monthNames[eventDate.getMonth()];

                    // Create new event card
                    const eventsList = document.querySelector('.events-list');
                    const newEvent = document.createElement('div');
                    newEvent.className = 'event-card card-3d';
                    newEvent.innerHTML = `
                        <div class="event-date">
                            <div class="event-day">${day}</div>
                            <div class="event-month">${month}</div>
                        </div>
                        <div class="event-details">
                            <h4>${name}</h4>
                            <div class="event-time"><i class="far fa-clock"></i> ${time}</div>
                            <div class="event-location"><i class="fas fa-map-marker-alt"></i> ${location}</div>
                            <p>${description}</p>
                        </div>
                        <button class="btn btn-small rsvp-btn">RSVP</button>
                    `;

                    eventsList.prepend(newEvent);

                    // Set up event listeners for new event
                    setupEvents();

                    // Close modal and reset form
                    document.getElementById('eventModal').style.display = 'none';
                    this.reset();
                });
            }
        }

        function showResourceModal(resource, type) {
            const modal = document.getElementById('resourceModal');
            const title = document.getElementById('resourceModalTitle');
            const content = document.getElementById('resourceModalContent');

            // Set title
            title.textContent = resource;

            // Set content based on resource type
            let modalContent = '';

            if (type === 'book') {
                modalContent = `
                    <div class="resource-detail">
                        <div class="resource-image" style="background-color: #f0f0f0; height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                            <i class="fas fa-book" style="font-size: 3rem; color: #666;"></i>
                        </div>
                        <p>This is a detailed description of the ${resource} book. It would normally include information about the author,
                        publication details, and a summary of the contents.</p>
                        <div class="resource-actions" style="margin-top: 1.5rem;">
                            <button class="btn" style="margin-right: 0.5rem;">View Details</button>
                            <button class="btn btn-outline">Find in Library</button>
                        </div>
                    </div>
                `;
            } else if (type === 'website') {
                modalContent = `
                    <div class="resource-detail">
                        <div class="resource-image" style="background-color: #f0f0f0; height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                            <i class="fas fa-globe" style="font-size: 3rem; color: #666;"></i>
                        </div>
                        <p>This is a detailed description of the ${resource} website. It would normally include information about the site's
                        features, how to use it effectively for math study, and any notable content.</p>
                        <div class="resource-actions" style="margin-top: 1.5rem;">
                            <a href="https://${resource.toLowerCase()}.com" target="_blank" class="btn" style="margin-right: 0.5rem;">Visit Website</a>
                            <button class="btn btn-outline">Save to Bookmarks</button>
                        </div>
                    </div>
                `;
            } else if (type === 'video') {
                modalContent = `
                    <div class="resource-detail">
                        <div class="resource-image" style="background-color: #f0f0f0; height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                            <i class="fab fa-youtube" style="font-size: 3rem; color: #666;"></i>
                        </div>
                        <p>This is a detailed description of the ${resource} video channel. It would normally include information about the
                        types of videos available, the creator's background, and how to use these videos for learning.</p>
                        <div class="resource-actions" style="margin-top: 1.5rem;">
                            <a href="https://youtube.com/c/${resource.toLowerCase()}" target="_blank" class="btn" style="margin-right: 0.5rem;">View Channel</a>
                            <button class="btn btn-outline">Subscribe</button>
                        </div>
                    </div>
                `;
            } else if (type === 'competition') {
                modalContent = `
                    <div class="resource-detail">
                        <div class="resource-image" style="background-color: #f0f0f0; height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                            <i class="fas fa-trophy" style="font-size: 3rem; color: #666;"></i>
                        </div>
                        <h4>${resource} Preparation Resources</h4>
                        <p>Here are some recommended resources for preparing for the ${resource}:</p>
                        <ul style="margin-bottom: 1.5rem;">
                            <li>Official ${resource} practice tests</li>
                            <li>Problem solving strategies specific to ${resource}</li>
                            <li>Past competition problems with solutions</li>
                            <li>Recommended study schedules</li>
                        </ul>
                        <div class="resource-actions" style="margin-top: 1.5rem;">
                            <button class="btn" style="margin-right: 0.5rem;">Download Practice Tests</button>
                            <button class="btn btn-outline">View Study Plan</button>
                        </div>
                    </div>
                `;
            }

            content.innerHTML = modalContent;
            modal.style.display = 'block';
        }

        function showMentorModal(type, data = {}) {
            const modal = document.getElementById('mentorModal');
            const title = document.getElementById('mentorModalTitle');
            const content = document.getElementById('mentorModalContent');

            if (type === 'profile') {
                title.textContent = `${data.name}'s Profile`;
                content.innerHTML = `
                    <div class="mentor-profile">
                        <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mentor" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-right: 1.5rem;">
                            <div>
                                <h3 style="margin-bottom: 0.25rem;">${data.name}</h3>
                                <p style="color: #666; margin-bottom: 0.5rem;">${data.bio}</p>
                                <div style="color: #ffc107;">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <span style="color: #666; margin-left: 0.5rem;">4.5 (12 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="margin-bottom: 0.75rem;">About</h4>
                            <p>${data.name} has been participating in math competitions for 5 years and has achieved ${data.bio}.
                            They specialize in algebra and number theory problems.</p>
                        </div>

                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="margin-bottom: 0.75rem;">Availability</h4>
                            <p>Monday, Wednesday, Friday: 4-6pm</p>
                            <p>Saturday: 10am-2pm</p>
                        </div>

                        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                            <button class="btn">Request Mentorship</button>
                            <button class="btn btn-outline">Send Message</button>
                        </div>
                    </div>
                `;
            } else if (type === 'mentor') {
                title.textContent = 'Become a Mentor';
                content.innerHTML = `
                    <form id="mentorForm">
                        <div class="form-group">
                            <label for="mentorName">Your Name</label>
                            <input type="text" id="mentorName" required>
                        </div>
                        <div class="form-group">
                            <label for="mentorEmail">Email</label>
                            <input type="email" id="mentorEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="mentorQualifications">Qualifications (Competitions, Scores, etc.)</label>
                            <textarea id="mentorQualifications" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="mentorSubjects">Subjects You Can Teach</label>
                            <input type="text" id="mentorSubjects" placeholder="Algebra, Geometry, Number Theory, etc." required>
                        </div>
                        <div class="form-group">
                            <label for="mentorAvailability">Availability</label>
                            <textarea id="mentorAvailability" placeholder="Days and times you're available for mentoring" required></textarea>
                        </div>
                        <button type="submit" class="btn">Submit Application</button>
                    </form>
                `;

                // Set up form submission
                const mentorForm = document.getElementById('mentorForm');
                if (mentorForm) {
                    mentorForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        alert('Thank you for your mentor application! We will review it and get back to you soon.');
                        modal.style.display = 'none';
                        this.reset();
                    });
                }
            } else if (type === 'mentee') {
                title.textContent = 'Request a Mentor';
                content.innerHTML = `
                    <form id="menteeForm">
                        <div class="form-group">
                            <label for="menteeName">Your Name</label>
                            <input type="text" id="menteeName" required>
                        </div>
                        <div class="form-group">
                            <label for="menteeEmail">Email</label>
                            <input type="email" id="menteeEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="menteeLevel">Current Math Level</label>
                            <select id="menteeLevel" required>
                                <option value="">Select your level</option>
                                <option value="beginner">Beginner (AMC 8 level)</option>
                                <option value="intermediate">Intermediate (AMC 10 level)</option>
                                <option value="advanced">Advanced (AMC 12/AIME level)</option>
                                <option value="olympiad">Olympiad (USAMO level)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="menteeGoals">Goals</label>
                            <textarea id="menteeGoals" placeholder="What do you hope to achieve with a mentor?" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="menteeAvailability">Your Availability</label>
                            <textarea id="menteeAvailability" placeholder="Days and times you're available for sessions" required></textarea>
                        </div>
                        <button type="submit" class="btn">Submit Request</button>
                    </form>
                `;

                // Set up form submission
                const menteeForm = document.getElementById('menteeForm');
                if (menteeForm) {
                    menteeForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        alert('Thank you for your mentor request! We will match you with a suitable mentor and contact you soon.');
                        modal.style.display = 'none';
                        this.reset();
                    });
                }
            }

            modal.style.display = 'block';
        }

        function showEventModal() {
            const modal = document.getElementById('eventModal');
            modal.style.display = 'block';

            // Set default date to today
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            document.getElementById('eventDate').value = formattedDate;

            // Set default time to next hour
            const nextHour = today.getHours() + 1;
            document.getElementById('eventTime').value = `${nextHour.toString().padStart(2, '0')}:00`;
        }



        // Dark Mode Toggle Functionality
class DarkMode {
  constructor() {
    this.toggle = document.getElementById('darkModeToggle');
    this.init();
  }

  init() {
    // Check preferences
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedMode = localStorage.getItem('darkMode');

    // Apply mode
    if (savedMode === 'dark' || (!savedMode && prefersDark.matches)) {
      this.enable();
    }

    // Event listeners
    this.toggle.addEventListener('click', () => this.toggleMode());
    prefersDark.addListener(e => this.handleSystemChange(e));
  }

  enable() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'dark');
    this.toggle.innerHTML = '<i class="fas fa-sun"></i>';

    // Special animation handling
    document.querySelectorAll('.hero-animation').forEach(el => {
      el.style.filter = 'drop-shadow(0 0 8px rgba(94, 138, 247, 0.3))';
    });
  }

  disable() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'light');
    this.toggle.innerHTML = '<i class="fas fa-moon"></i>';

    // Reset animations
    document.querySelectorAll('.hero-animation').forEach(el => {
      el.style.filter = '';
    });
  }

  toggleMode() {
    this[document.body.classList.contains('dark-mode') ? 'disable' : 'enable']();
  }

  handleSystemChange(e) {
    if (!localStorage.getItem('darkMode')) {
      this[e.matches ? 'enable' : 'disable']();
    }
  }
}

// Initialize
new DarkMode();