class AffirmationApp {
    constructor() {
        this.affirmations = {};
        this.currentIndex = 0;
        this.currentCategory = 'all';
        this.currentAffirmationList = [];
        this.isLoading = true;
        
        this.elements = {
            affirmationText: document.getElementById('affirmationText'),
            categoryTag: document.getElementById('categoryTag'),
            nextBtn: document.getElementById('nextBtn'),
            randomBtn: document.getElementById('randomBtn'),
            categoryBtns: document.querySelectorAll('.category-btn')
        };
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadAffirmations();
            this.setupEventListeners();
            this.showRandomAffirmation();
            this.isLoading = false;
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError();
        }
    }
    
    async loadAffirmations() {
        try {
            const response = await fetch('data/affirmations.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.affirmations = data.categories;
            this.updateCurrentAffirmationList();
        } catch (error) {
            console.error('Error loading affirmations:', error);
            throw error;
        }
    }
    
    setupEventListeners() {
        this.elements.nextBtn.addEventListener('click', () => this.showNextAffirmation());
        this.elements.randomBtn.addEventListener('click', () => this.showRandomAffirmation());
        
        this.elements.categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.setCategory(category);
                this.updateCategoryButtons(e.target);
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowRight') {
                e.preventDefault();
                this.showNextAffirmation();
            } else if (e.code === 'KeyR') {
                e.preventDefault();
                this.showRandomAffirmation();
            }
        });
        
        // Touch gestures for mobile
        let startX = 0;
        this.elements.affirmationText.parentElement.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        this.elements.affirmationText.parentElement.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.showNextAffirmation();
                } else {
                    this.showRandomAffirmation();
                }
            }
        }, { passive: true });
    }
    
    updateCurrentAffirmationList() {
        if (this.currentCategory === 'all') {
            this.currentAffirmationList = [];
            Object.keys(this.affirmations).forEach(category => {
                this.currentAffirmationList.push(...this.affirmations[category].map(text => ({
                    text,
                    category
                })));
            });
        } else {
            this.currentAffirmationList = this.affirmations[this.currentCategory].map(text => ({
                text,
                category: this.currentCategory
            }));
        }
        
        // Shuffle the array for better randomness
        this.shuffleArray(this.currentAffirmationList);
        this.currentIndex = 0;
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    setCategory(category) {
        this.currentCategory = category;
        this.updateCurrentAffirmationList();
    }
    
    updateCategoryButtons(activeBtn) {
        this.elements.categoryBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
    
    showAffirmation(affirmation) {
        // Add fade out effect
        this.elements.affirmationText.style.opacity = '0';
        this.elements.categoryTag.style.opacity = '0';
        
        setTimeout(() => {
            this.elements.affirmationText.textContent = affirmation.text;
            this.elements.categoryTag.textContent = this.formatCategoryName(affirmation.category);
            
            // Add fade in effect
            this.elements.affirmationText.style.opacity = '1';
            this.elements.categoryTag.style.opacity = '1';
            
            // Trigger animation
            this.elements.affirmationText.style.animation = 'none';
            this.elements.affirmationText.offsetHeight; // Trigger reflow
            this.elements.affirmationText.style.animation = 'fadeInUp 0.6s ease-out';
            
        }, 150);
        
        // Add some visual feedback to buttons
        this.addButtonFeedback();
    }
    
    showNextAffirmation() {
        if (this.isLoading || this.currentAffirmationList.length === 0) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.currentAffirmationList.length;
        const affirmation = this.currentAffirmationList[this.currentIndex];
        this.showAffirmation(affirmation);
    }
    
    showRandomAffirmation() {
        if (this.isLoading || this.currentAffirmationList.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * this.currentAffirmationList.length);
        this.currentIndex = randomIndex;
        const affirmation = this.currentAffirmationList[this.currentIndex];
        this.showAffirmation(affirmation);
    }
    
    formatCategoryName(category) {
        const categoryNames = {
            'debugging': 'Debugging',
            'testing': 'Testing',
            'code_review': 'Code Review',
            'deployment': 'Deployment',
            'learning': 'Learning',
            'motivation': 'Motivation',
            'workflow': 'Workflow',
            'teamwork': 'Teamwork',
            'creativity': 'Creativity'
        };
        
        return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
    }
    
    addButtonFeedback() {
        // Add pulse animation to show interaction
        [this.elements.nextBtn, this.elements.randomBtn].forEach(btn => {
            btn.style.animation = 'pulse 0.6s ease-out';
            setTimeout(() => {
                btn.style.animation = '';
            }, 600);
        });
    }
    
    showError() {
        this.elements.affirmationText.textContent = 'Ups! Coś poszło nie tak. Spróbuj odświeżyć stronę.';
        this.elements.categoryTag.textContent = 'Error';
        this.elements.categoryTag.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e53)';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AffirmationApp();
});

// Add some easter eggs and fun interactions
document.addEventListener('DOMContentLoaded', () => {
    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Secret developer mode
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
                alert('🎉 Gratulacje! Znalazłeś sekretny kod dewelopera!');
            }, 1000);
            konamiCode = [];
        }
    });
    
    // Console message for curious developers
    console.log(`
    🚀 Hej, developer!
    
    Widzę, że sprawdzasz kod - szacunek! 
    
    Skróty klawiszowe:
    • Spacja lub → : Następna affirmacja
    • R : Losowa affirmacja
    • Swipe left/right na mobile
    
    Made with ❤️ and lots of coffee ☕
    
    zajebisty.dev
    `);
});