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
            this.isLoading = false;
            this.showRandomAffirmation();
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError();
        }
    }
    
    async loadAffirmations() {
        const data = {
            "categories": {
                "debugging": [
                    "Dzisiaj opierdolisz tego buga jak mistrz",
                    "Każdy błąd to lekcja, która czyni cię silniejszym",
                    "Debugger jest twoim najlepszym przyjacielem",
                    "Console.log prowadzi cię do prawdy",
                    "Stack trace to mapa do skarbu",
                    "Ten bug nie ma szans przeciwko twojej determinacji",
                    "Każda linijka kodu przybliża cię do rozwiązania",
                    "Twoja cierpliwość w debugowaniu jest legendarna",
                    "Breakpointy odsłaniają wszystkie tajemnice",
                    "Jesteś detektywem kodu - nic ci nie umknie",
                    "Ten błąd to tylko nieporozumienie, które zaraz wyjaśnisz",
                    "Twoje umiejętności debugowania rosną z każdym dniem",
                    "Log files śpiewają ci pieśń o prawdzie",
                    "Rubber duck debugging działa, bo jesteś genialny",
                    "Network tab pokazuje ci drogę do sukcesu",
                    "Każdy error message to wskazówka dla ciebie",
                    "Twoja intuicja programistyczna jest niezawodna",
                    "Ten bug zostanie rozłożony na czynniki pierwsze",
                    "Code review twoich bugfixów będzie epickie",
                    "Dzisiaj stajesz się master debuggerem"
                ],
                "testing": [
                    "Twoje testy przechodzą za pierwszym razem",
                    "Test Driven Development to twoja supermooc",
                    "Coverage 100% jest w zasięgu ręki",
                    "Unit testy które piszesz są dziełami sztuki",
                    "Integration testy działają jak szwajcarski zegarek",
                    "E2E testy przechodzą bez najmniejszego problemu",
                    "Mocking jest twoją drugą naturą",
                    "Każdy edge case zostanie przez ciebie złapany",
                    "Twoje testy są tak dobre, że QA ci gratuluje",
                    "Test pyramid w twoim wykonaniu jest perfekcyjny",
                    "Flaky tests uciekają przed twoim kodem",
                    "Regression testy chronią twój kod jak straż przyboczna",
                    "Performance testy potwierdzają twoją genialnośc",
                    "Twoje assertions są precyzyjne jak snajper",
                    "Każdy test case ma sens i wartość",
                    "Masz oko do testowania edge casów",
                    "Twoje test data są przemyślane i kompletne",
                    "Setup i teardown robisz bez wysiłku",
                    "Test reports wyglądają jak zielony las",
                    "Automation testing to twoja parkietowa umiejętność"
                ],
                "code_review": [
                    "Code review to okazja do nauki, nie wojna",
                    "Twoje komentarze w CR są konstruktywne i pomocne",
                    "Pull requesty które tworzysz są dzielami sztuki",
                    "Każda sugestia w review czyni kod lepszym",
                    "Umiesz dawać feedback który motywuje",
                    "Twój kod przechodzi review bez większych uwag",
                    "Discussions w PR prowadzą do genialnych rozwiązań",
                    "Mergeujesz z pewnością siebie prawdziwego seniora",
                    "Code review team docenia twoją wiedzę",
                    "Każdy commit message który piszesz ma sens",
                    "Twoje PR description są jak dobre instrukcje",
                    "Conflicts resolves bez problemu",
                    "Git history dzięki tobie jest czytelna",
                    "Każda linijka kodu którą dodajesz ma cel",
                    "Twoje refactoring suggestions są na miejscu",
                    "Best practices są dla ciebie naturalne",
                    "Code style guidelines przestrzegasz instynktownie",
                    "Security review przechodzi bez zastrzeżeń",
                    "Performance implications masz zawsze na uwadze",
                    "Twój kod jest self-documenting"
                ],
                "deployment": [
                    "Deploy na piątek? Bez problemu, bo jesteś przygotowany",
                    "Rollback to tylko plan B, który i tak nie będzie potrzebny",
                    "Blue-green deployment płynie jak masło",
                    "CI/CD pipeline działa jak dobrze naoliwiona maszyna",
                    "Monitoring po deployu pokazuje same zielone wskaźniki",
                    "Twoje feature flagi działają perfekcyjnie",
                    "Database migration przechodzi bez zarzutu",
                    "Load balancer rozdziela ruch jak maestro",
                    "Kubernetes pods startują jak na komendę",
                    "Docker images budują się szybko i pewnie",
                    "Environment variables są skonfigurowane idealnie",
                    "SSL certificates odnowią się automatycznie",
                    "CDN cache invalidation działa błyskawicznie",
                    "Health checks potwierdzają sukces deployu",
                    "Log aggregation zbiera wszystkie ważne info",
                    "Backup strategy chroni przed wszelkimi problemami",
                    "Scaling happens smoothly and automatically",
                    "Zero downtime deployment to twoja specjalność",
                    "Production environment kocha twój kod",
                    "DevOps team jest pod wrażeniem twoich deployów"
                ],
                "learning": [
                    "Nowa technologia poddaje się twojemu umysłowi",
                    "Stack Overflow już cię zna i szanuje",
                    "Documentation czytasz jak dobry romans",
                    "Tutorial hell nie ma nad tobą władzy",
                    "GitHub repositories otwierają przed tobą swoje sekrety",
                    "YouTube coding videos są twoimi mentorami",
                    "Każdy conference talk uczy cię czegoś nowego",
                    "Open source contributions przychodzą ci naturalnie",
                    "Side projects rozwijają twoje umiejętności",
                    "Coding challenges są dla ciebie zabawą",
                    "Algorithm complexity analizujesz bez problemu",
                    "Design patterns to twój podstawowy język",
                    "Refactoring to medytacja dla twojego umysłu",
                    "Clean code principles to twoja religia",
                    "SOLID principles to twoje przykazania",
                    "DRY, KISS, YAGNI to twoje mantra",
                    "Każdy blog post o programowaniu wzbogaca twoją wiedzę",
                    "Podcast o tech słuchasz z prawdziwą przyjemnością",
                    "Books about software development czytasz jak poezję",
                    "Online courses kończy z wyróżnieniem"
                ],
                "motivation": [
                    "Będzie dobry dzień na kodowanie",
                    "Twoja kreatywność programistyczna nie zna granic",
                    "Każda linijka kodu która piszesz ma znaczenie",
                    "Imposter syndrome to tylko chwilowe złudzenie",
                    "Twoje umiejętności rosną z każdym dniem",
                    "Senior developer w tobie budzi się każdego ranka",
                    "Problemy to puzzle które uwielbiasz rozwiązywać",
                    "Twój kod czyni świat lepszym miejscem",
                    "Team liczy na ciebie i ma słuszne powody",
                    "Każdy commit to krok naprzód",
                    "Feedback loop pomaga ci się rozwijać",
                    "Mentor w tobie jest gotowy pomagać innym",
                    "Twoja pasja do programowania jest zaraźliwa",
                    "Każdy error message to okazja do nauki",
                    "Twoja wytrwałość w rozwiązywaniu problemów jest niezłomna",
                    "Clean code to twój naturalny sposób pisania",
                    "Optimization opportunities widzisz wszędzie",
                    "Best practices to twoja druga natura",
                    "Architecture decisions podejmujesz mądrze",
                    "Legacy code nie przeraża cię - transformujesz go"
                ],
                "workflow": [
                    "Git workflow płynie bez najmniejszego problemu",
                    "Branch management to twoja parkietowa umiejętność",
                    "IDE shortcuts działają pod twoimi palcami jak magia",
                    "Terminal commands wykonujesz z gracja",
                    "Shortcuts skracają twój czas pracy o godziny",
                    "Multi-tasking w kodowaniu to twoja supermoc",
                    "Context switching nie zaburza twojego flow",
                    "Deep work sessions przynoszą fenomenalne rezultaty",
                    "Pomodoro technique maksymalizuje twoją produktywność",
                    "Distraction-free environment to twój naturalny habitat",
                    "Time boxing pomaga ci pozostać w terminie",
                    "Standup meetings są okazją do pochwalenia się postępami",
                    "Sprint planning to czas na realne planowanie",
                    "Retrospective sessions prowadzą do genialnych ulepszeń",
                    "Kanban board odzwierciedla twój uporządkowany umysł",
                    "Jira tickets zamykasz jeden za drugim",
                    "Documentation piszesz na bieżąco i z przyjemnością",
                    "Code comments są jasne i pomocne",
                    "README files które tworzysz są przykładne",
                    "Version control używasz jak prawdziwy professional"
                ],
                "teamwork": [
                    "Pair programming z tobą to czysta przyjemność",
                    "Knowledge sharing sessions prowadzisz z pasją",
                    "Mentoring juniorów przychodzi ci naturalnie",
                    "Tech talks które prezentujesz są inspirujące",
                    "Collaboration tools używasz efektywnie",
                    "Remote work nie zmniejsza twojej produktywności",
                    "Communication skills czynią cię idealnym team playerem",
                    "Conflict resolution w zespole to twoja mocna strona",
                    "Leadership qualities ujawniają się w każdym projekcie",
                    "Cross-functional cooperation idzie ci świetnie",
                    "Agile ceremonies prowadzisz z naturalnością",
                    "Feedback giving i receiving to twoje umiejętności",
                    "Team building activities organizujesz kreatywnie",
                    "Code ownership dzielisz z odpowiedzialnością",
                    "Knowledge base budowanie to twoja misja",
                    "Onboarding nowych członków zespołu robisz wzorowo",
                    "Culture building to obszar w którym się wyróżniasz",
                    "Empathy w pracy z zespołem to twoja zaleta",
                    "Trust budowanie przychodzi ci bez wysiłku",
                    "Team morale dzięki tobie jest zawsze wysokie"
                ],
                "creativity": [
                    "Architekturalne rozwiązania które projektujesz są eleganckie",
                    "Design patterns implementujesz z finezją",
                    "Algorytmy które tworzysz są efektywne i piękne",
                    "Data structures wybierasz z niezawodną intuicją",
                    "Problem solving to twoja artystyczna ekspresja",
                    "Innovation w kodzie płynie przez twoje żyły",
                    "Creative solutions przychodzą ci we śnie",
                    "Out-of-the-box thinking to twoja zaleta",
                    "Elegant abstractions projektujesz bez wysiłku",
                    "Code reusability to twoja filozofia życiowa",
                    "Modularity w architekturze to twój znak rozpoznawczy",
                    "Scalability considerations masz zawsze na uwadze",
                    "Performance optimization to twoja artystyczna wizja",
                    "Memory management robisz jak wybitny artysta",
                    "Error handling implementujesz z gracją",
                    "Security considerations to twoja naturalna ostrożność",
                    "User experience myślisz we wszystkich decyzjach",
                    "API design to twoja forma sztuki",
                    "Database schema projektuje się pod twoimi rękami",
                    "UI/UX intuitions przewodniczą twoim kodom"
                ]
            }
        };
        
        this.affirmations = data.categories;
        this.updateCurrentAffirmationList();
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
