/* ===== TOYOTA MULTIPAGE ARCHITECTURE - JAVASCRIPT ===== */

// ===== GLOBAL STATE =====
let currentUser = null;

// ===== 1. INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Navbar Active State
    setActiveNavLink();
    
    // Authentication State
    checkAuthState();
    
    // Modal System
    initModalSystem();
    
    // Page-Specific Logic
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === 'configurator.html') {
        initConfigurator();
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.querySelector('.dropdown-menu.active');
        if (dropdown && !event.target.closest('.user-dropdown')) {
            dropdown.classList.remove('active');
        }
    });
});

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
                mobileMenu.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
        }
    });
}

// ===== ACTIVE NAVIGATION LINK HIGHLIGHTER =====
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === 'index.html' && href === 'index.html') ||
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== MODELS PAGE - SAVE SELECTION TO LOCALSTORAGE =====
function configureModel(modelId, modelName, basePrice) {
    // Save to localStorage
    const modelData = {
        id: modelId,
        name: modelName,
        basePrice: basePrice
    };
    
    localStorage.setItem('selectedModel', JSON.stringify(modelData));
    
    // Redirect to configurator
    window.location.href = 'configurator.html';
}

// ===== CONFIGURATOR PAGE - INITIALIZATION =====
function initConfigurator() {
    // Load selected model from localStorage
    loadSelectedModel();
    
    // Initialize event listeners
    const modelSelect = document.getElementById('modelSelect');
    const colorOptions = document.querySelectorAll('.color-option');
    const wheelOptions = document.querySelectorAll('.wheel-option');
    const downPaymentSlider = document.getElementById('downPaymentSlider');
    const monthsSlider = document.getElementById('monthsSlider');
    
    if (modelSelect) {
        modelSelect.addEventListener('change', updatePricing);
    }
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectColor(this);
        });
    });
    
    wheelOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectWheel(this);
        });
    });
    
    if (downPaymentSlider) {
        downPaymentSlider.addEventListener('input', calculateLoan);
    }
    
    if (monthsSlider) {
        monthsSlider.addEventListener('input', calculateLoan);
    }
    
    // Initial calculation
    updatePricing();
}

// ===== LOAD SELECTED MODEL FROM LOCALSTORAGE =====
function loadSelectedModel() {
    const savedModel = localStorage.getItem('selectedModel');
    const modelSelect = document.getElementById('modelSelect');
    
    if (savedModel && modelSelect) {
        try {
            const modelData = JSON.parse(savedModel);
            
            // Find and select the matching option
            const options = modelSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === modelData.id) {
                    modelSelect.selectedIndex = i;
                    break;
                }
            }
        } catch (e) {
            console.error('Error loading saved model:', e);
        }
    }
}

// ===== COLOR SELECTION =====
function selectColor(element) {
    // Remove active class from all
    document.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.remove('active');
    });
    
    // Add active to selected
    element.classList.add('active');
    
    // Update pricing
    updatePricing();
}

// ===== WHEEL SELECTION =====
function selectWheel(element) {
    // Remove active class from all
    document.querySelectorAll('.wheel-option').forEach(opt => {
        opt.classList.remove('active');
    });
    
    // Add active to selected
    element.classList.add('active');
    
    // Update pricing
    updatePricing();
}

// ===== UPDATE PRICING CALCULATION =====
function updatePricing() {
    // Get base price from selected model
    const modelSelect = document.getElementById('modelSelect');
    const selectedOption = modelSelect ? modelSelect.options[modelSelect.selectedIndex] : null;
    const basePrice = selectedOption ? parseInt(selectedOption.getAttribute('data-price')) || 0 : 0;
    
    // Get color price
    const selectedColor = document.querySelector('.color-option.active');
    const colorPrice = selectedColor ? parseInt(selectedColor.getAttribute('data-price')) || 0 : 0;
    
    // Get wheel price
    const selectedWheel = document.querySelector('.wheel-option.active');
    const wheelPrice = selectedWheel ? parseInt(selectedWheel.getAttribute('data-price')) || 0 : 0;
    
    // Calculate total
    const totalPrice = basePrice + colorPrice + wheelPrice;
    
    // Update display
    updatePriceDisplay(basePrice, colorPrice, wheelPrice, totalPrice);
    
    // Recalculate loan
    calculateLoan();
}

// ===== UPDATE PRICE DISPLAY =====
function updatePriceDisplay(basePrice, colorPrice, wheelPrice, totalPrice) {
    const basePriceEl = document.getElementById('basePrice');
    const colorPriceEl = document.getElementById('colorPrice');
    const wheelPriceEl = document.getElementById('wheelPrice');
    const totalPriceEl = document.getElementById('totalPrice');
    
    if (basePriceEl) {
        basePriceEl.textContent = formatCurrency(basePrice);
    }
    
    if (colorPriceEl) {
        colorPriceEl.textContent = colorPrice > 0 ? '+' + formatCurrency(colorPrice) : formatCurrency(0);
    }
    
    if (wheelPriceEl) {
        wheelPriceEl.textContent = wheelPrice > 0 ? '+' + formatCurrency(wheelPrice) : formatCurrency(0);
    }
    
    if (totalPriceEl) {
        totalPriceEl.textContent = formatCurrency(totalPrice);
    }
}

// ===== LOAN CALCULATOR =====
function calculateLoan() {
    // Get total price
    const totalPriceEl = document.getElementById('totalPrice');
    if (!totalPriceEl) return;
    
    const totalPriceText = totalPriceEl.textContent.replace(/[^\d]/g, '');
    const totalPrice = parseInt(totalPriceText) || 0;
    
    // Get down payment percentage
    const downPaymentSlider = document.getElementById('downPaymentSlider');
    const downPaymentPercent = downPaymentSlider ? parseInt(downPaymentSlider.value) : 20;
    const downPaymentAmount = Math.round(totalPrice * (downPaymentPercent / 100));
    
    // Get loan months
    const monthsSlider = document.getElementById('monthsSlider');
    const months = monthsSlider ? parseInt(monthsSlider.value) : 36;
    
    // Calculate loan amount
    const loanAmount = totalPrice - downPaymentAmount;
    
    // Interest rate (2.99% annual = 0.0299/12 monthly)
    const monthlyInterestRate = 0.0299 / 12;
    
    // Calculate monthly payment using amortization formula
    // M = P * [i(1 + i)^n] / [(1 + i)^n - 1]
    let monthlyPayment;
    if (monthlyInterestRate === 0) {
        monthlyPayment = loanAmount / months;
    } else {
        const factor = Math.pow(1 + monthlyInterestRate, months);
        monthlyPayment = loanAmount * (monthlyInterestRate * factor) / (factor - 1);
    }
    
    // Update display
    updateLoanDisplay(downPaymentAmount, downPaymentPercent, months, monthlyPayment);
}

// ===== UPDATE LOAN DISPLAY =====
function updateLoanDisplay(downPaymentAmount, downPaymentPercent, months, monthlyPayment) {
    const downPaymentAmountEl = document.getElementById('downPaymentAmount');
    const downPaymentPercentEl = document.getElementById('downPaymentPercent');
    const monthsValueEl = document.getElementById('monthsValue');
    const monthlyPaymentEl = document.getElementById('monthlyPayment');
    
    if (downPaymentAmountEl) {
        downPaymentAmountEl.textContent = formatCurrency(downPaymentAmount);
    }
    
    if (downPaymentPercentEl) {
        downPaymentPercentEl.textContent = downPaymentPercent + '%';
    }
    
    if (monthsValueEl) {
        monthsValueEl.textContent = months + ' ay';
    }
    
    if (monthlyPaymentEl) {
        monthlyPaymentEl.textContent = formatCurrency(Math.round(monthlyPayment));
    }
}

// ===== SUBMIT CONFIGURATION =====
function submitConfiguration() {
    const modelSelect = document.getElementById('modelSelect');
    const selectedModel = modelSelect ? modelSelect.options[modelSelect.selectedIndex].text : 'Bilinmeyen Model';
    
    const selectedColor = document.querySelector('.color-option.active');
    const colorName = selectedColor ? selectedColor.querySelector('.color-name').textContent : 'Seçilmedi';
    
    const selectedWheel = document.querySelector('.wheel-option.active');
    const wheelName = selectedWheel ? selectedWheel.querySelector('.wheel-name').textContent : 'Seçilmedi';
    
    const totalPrice = document.getElementById('totalPrice').textContent;
    const monthlyPayment = document.getElementById('monthlyPayment').textContent;
    
    alert(`✓ Konfigürasyonunuz Tamamlandı!\n\nModel: ${selectedModel}\nRenk: ${colorName}\nJantlar: ${wheelName}\n\nToplam: ${totalPrice}\nAylık Ödeme: ${monthlyPayment}\n\nSatış danışmanımız en kısa sürede sizinle iletişime geçecektir.`);
}

// ===== CURRENCY FORMATTER =====
function formatCurrency(amount) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// ===== MODAL SYSTEM =====
function initModalSystem() {
    // Close modal when clicking overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });
    
    // Close modal with close button
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form if exists
        const form = modal.querySelector('.modal-form');
        if (form) {
            form.reset();
        }
        
        // Hide success message if exists
        const successMsg = modal.querySelector('.success-message');
        if (successMsg) {
            successMsg.style.display = 'none';
        }
        
        // Show form again if hidden
        const formContainer = modal.querySelector('.modal-form');
        if (formContainer) {
            formContainer.style.display = 'flex';
        }
    }
}

// ===== SERVICE APPOINTMENT FORM =====
function submitServiceForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const modal = form.closest('.modal-overlay');
    
    // Get form data
    const name = form.querySelector('input[type="text"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const date = form.querySelector('input[type="date"]').value;
    
    // Hide form
    form.style.display = 'none';
    
    // Show success message
    const successMsg = modal.querySelector('.success-message');
    if (successMsg) {
        successMsg.style.display = 'block';
    }
    
    // Auto close after 3 seconds
    setTimeout(() => {
        closeModal(modal.id);
        form.style.display = 'flex';
        successMsg.style.display = 'none';
        form.reset();
    }, 3000);
}

// ===== TEST DRIVE FORM =====
function submitTestDriveForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const modal = form.closest('.modal-overlay');
    
    // Hide form
    form.style.display = 'none';
    
    // Show success message
    const successMsg = modal.querySelector('.success-message');
    if (successMsg) {
        successMsg.style.display = 'block';
    }
    
    // Auto close after 3 seconds
    setTimeout(() => {
        closeModal(modal.id);
        form.style.display = 'flex';
        successMsg.style.display = 'none';
        form.reset();
    }, 3000);
}

// ===== AUTHENTICATION SYSTEM =====
function checkAuthState() {
    const savedUser = localStorage.getItem('toyotaUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            updateAuthUI(true);
        } catch (e) {
            console.error('Error loading user:', e);
            localStorage.removeItem('toyotaUser');
        }
    }
}

function updateAuthUI(isLoggedIn) {
    const authButton = document.getElementById('authButton');
    if (!authButton) return;
    
    if (isLoggedIn && currentUser) {
        authButton.innerHTML = `
            <button class="user-button" onclick="toggleUserDropdown()">
                <i class="fas fa-user-circle"></i>
                <span>${currentUser.name}</span>
                <i class="fas fa-chevron-down" style="font-size: 0.8rem;"></i>
            </button>
            <div class="dropdown-menu" id="userDropdown">
                <button class="dropdown-item" onclick="openGarage()">
                    <i class="fas fa-warehouse"></i>
                    <span>Garajım</span>
                </button>
                <button class="dropdown-item" onclick="openModal('serviceModal')">
                    <i class="fas fa-wrench"></i>
                    <span>Servis Randevusu</span>
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Çıkış Yap</span>
                </button>
            </div>
        `;
    } else {
        authButton.innerHTML = `
            <button class="btn-cta" onclick="openModal('authModal')">
                Giriş Yap
            </button>
        `;
    }
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function switchAuthTab(tab) {
    // Update tabs
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update form title
    const formTitle = document.getElementById('authFormTitle');
    const submitBtn = document.getElementById('authSubmitBtn');
    const nameField = document.getElementById('authNameField');
    
    if (tab === 'login') {
        formTitle.textContent = 'Hesabınıza Giriş Yapın';
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Giriş Yap';
        nameField.style.display = 'none';
    } else {
        formTitle.textContent = 'Yeni Hesap Oluşturun';
        submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Kayıt Ol';
        nameField.style.display = 'block';
    }
}

function submitAuthForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const isLogin = document.querySelector('.auth-tab.active').textContent.includes('Giriş');
    
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const name = isLogin ? email.split('@')[0] : form.querySelector('input[name="name"]').value;
    
    // Mock authentication - accept any credentials
    currentUser = {
        name: name,
        email: email
    };
    
    // Save to localStorage
    localStorage.setItem('toyotaUser', JSON.stringify(currentUser));
    
    // Update UI
    updateAuthUI(true);
    
    // Close modal
    closeModal('authModal');
    
    // Show welcome message
    setTimeout(() => {
        alert(`✓ Hoş Geldiniz, ${currentUser.name}!\n\nArtık konfigürasyonlarınızı kaydedebilir ve garajınızda görüntüleyebilirsiniz.`);
    }, 300);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('toyotaUser');
    updateAuthUI(false);
    
    // Close dropdown
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
    
    // Redirect if on garage page
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'garage.html') {
        window.location.href = 'index.html';
    }
}

function openGarage() {
    // Close dropdown
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
    
    // For now, show alert (garage page can be created as a separate page)
    alert('🚗 Garajım\n\nYakında: Kaydettiğiniz araç konfigürasyonlarını burada görüntüleyebileceksiniz!\n\nŞu an için bu özellik yapım aşamasındadır.');
}