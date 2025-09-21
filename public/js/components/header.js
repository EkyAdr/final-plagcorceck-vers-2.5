const HeaderComponent = {
    // Component configuration
    config: {
        title: 'Advanced Plagiarism Checker',
        subtitle: 'AI-Powered Plagiarism Detection dengan History Tracking & Smart Recommendations',
        version: '2.1',
        supportedFormats: [
            { icon: '📝', name: 'TXT' },
            { icon: '📄', name: 'PDF' },
            { icon: '📘', name: 'DOC/DOCX' },
            { icon: '📄', name: 'ODT' },
            { icon: '📄', name: 'RTF' },
            { icon: '🤖', name: 'AI Analysis' }
        ]
    },

    // Component state
    state: {
        isSticky: false,
        showStats: false,
        animationEnabled: true
    },

    // Render header component
    render: function() {
        const container = document.getElementById('header-component');
        if (!container) {
            console.warn('Header container not found');
            return;
        }

        const headerHtml = this.generateHeaderHTML();
        container.innerHTML = headerHtml;
        
        this.attachEventListeners();
        this.initializeAnimations();
        
        console.log('✅ Header component rendered (Dark Mode Only)');
    },

    // Generate header HTML (removed theme toggle)
    generateHeaderHTML: function() {
        const formatBadges = this.config.supportedFormats
            .map(format => `<span class="format-badge" title="${format.name} Support">${format.icon} ${format.name}</span>`)
            .join('');

        return `
            <div class="header" id="main-header">
                <div class="header-content">
                    <div class="header-main">
                        <h1 class="header-title">
                            🔍 ${this.config.title}
                            <span class="version-badge">v${this.config.version}</span>
                        </h1>
                        <p class="header-subtitle">${this.config.subtitle}</p>
                    </div>
                    
                    <div class="header-actions">
                        <button class="header-btn" onclick="HeaderComponent.toggleStats()" title="Toggle Statistics">
                            <span id="stats-icon">📊</span>
                        </button>
                        <button class="header-btn" onclick="HeaderComponent.showInfo()" title="Application Info">
                            ℹ️
                        </button>
                    </div>
                </div>
                
                <div class="format-badges">
                    ${formatBadges}
                </div>
                
                <div class="header-stats" id="header-stats" style="display: none;">
                    <div class="stats-container">
                        <div class="stat-item">
                            <span class="stat-value" id="header-total-checks">0</span>
                            <span class="stat-label">Total Checks</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value" id="header-total-docs">0</span>
                            <span class="stat-label">Reference Docs</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value" id="header-avg-similarity">0%</span>
                            <span class="stat-label">Avg Similarity</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value" id="header-status">🟢</span>
                            <span class="stat-label">System Status</span>
                        </div>
                    </div>
                </div>
                
                <div class="header-progress" id="header-progress" style="display: none;">
                    <div class="progress-bar">
                        <div class="progress-fill" id="header-progress-fill"></div>
                    </div>
                    <div class="progress-text" id="header-progress-text">Processing...</div>
                </div>
            </div>
        `;
    },

    // Attach event listeners
    attachEventListeners: function() {
        // Scroll detection for sticky header
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
        }, 100));

        // Resize handler
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));
    },

    // Initialize animations
    initializeAnimations: function() {
        if (!this.state.animationEnabled) return;

        const header = document.getElementById('main-header');
        const title = header.querySelector('.header-title');
        const subtitle = header.querySelector('.header-subtitle');
        const badges = header.querySelectorAll('.format-badge');

        // Animate title
        if (title) {
            title.style.opacity = '0';
            title.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                title.style.transition = 'all 0.6s ease-out';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 100);
        }

        // Animate subtitle
        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                subtitle.style.transition = 'all 0.6s ease-out';
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }, 300);
        }

        // Animate badges
        badges.forEach((badge, index) => {
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                badge.style.transition = 'all 0.4s ease-out';
                badge.style.opacity = '1';
                badge.style.transform = 'scale(1)';
            }, 500 + (index * 100));
        });
    },

    // Handle scroll events
    handleScroll: function() {
        const header = document.getElementById('main-header');
        const scrollY = window.scrollY;
        const shouldBeSticky = scrollY > 100;

        if (shouldBeSticky !== this.state.isSticky) {
            this.state.isSticky = shouldBeSticky;
            
            if (shouldBeSticky) {
                header.classList.add('sticky');
                this.showCompactMode();
            } else {
                header.classList.remove('sticky');
                this.showFullMode();
            }
        }
    },

    // Handle resize events
    handleResize: function() {
        const isMobile = Utils.device.isMobile();
        const header = document.getElementById('main-header');
        
        header.classList.toggle('mobile', isMobile);
        
        if (isMobile) {
            this.adjustForMobile();
        } else {
            this.adjustForDesktop();
        }
    },

    // Show compact mode (sticky)
    showCompactMode: function() {
        const header = document.getElementById('main-header');
        const subtitle = header.querySelector('.header-subtitle');
        const badges = header.querySelector('.format-badges');
        
        if (subtitle) {
            Utils.animate.fadeOut(subtitle, 200);
        }
        
        if (badges) {
            Utils.animate.fadeOut(badges, 200);
        }
        
        header.style.padding = '15px 30px';
    },

    // Show full mode (not sticky)
    showFullMode: function() {
        const header = document.getElementById('main-header');
        const subtitle = header.querySelector('.header-subtitle');
        const badges = header.querySelector('.format-badges');
        
        if (subtitle) {
            Utils.animate.fadeIn(subtitle, 300);
        }
        
        if (badges) {
            Utils.animate.fadeIn(badges, 300);
        }
        
        header.style.padding = '';
    },

    // Adjust for mobile
    adjustForMobile: function() {
        const header = document.getElementById('main-header');
        const title = header.querySelector('.header-title');
        const actions = header.querySelector('.header-actions');
        
        if (title) {
            title.style.fontSize = '1.8em';
        }
        
        if (actions) {
            actions.style.flexDirection = 'row';
        }
    },

    // Adjust for desktop
    adjustForDesktop: function() {
        const header = document.getElementById('main-header');
        const title = header.querySelector('.header-title');
        const actions = header.querySelector('.header-actions');
        
        if (title) {
            title.style.fontSize = '';
        }
        
        if (actions) {
            actions.style.flexDirection = '';
        }
    },

    // Toggle statistics display
    toggleStats: function() {
        const statsContainer = document.getElementById('header-stats');
        const statsIcon = document.getElementById('stats-icon');
        
        this.state.showStats = !this.state.showStats;
        
        if (this.state.showStats) {
            statsContainer.style.display = 'block';
            Utils.animate.slideDown(statsContainer, 300);
            statsIcon.textContent = '📈';
            this.loadStats();
        } else {
            Utils.animate.fadeOut(statsContainer, 200);
            setTimeout(() => {
                statsContainer.style.display = 'none';
            }, 200);
            statsIcon.textContent = '📊';
        }
    },

    // Load and display statistics
    loadStats: async function() {
        try {
            const history = await API.history.get();
            
            if (history.success) {
                this.updateStats(history.history);
            }
        } catch (error) {
            console.error('Failed to load header stats:', error);
            this.updateStats({
                totalChecks: 0,
                totalReferences: 0,
                avgSimilarity: 0
            });
        }
    },

    // Update statistics display
    updateStats: function(stats) {
        const elements = {
            totalChecks: document.getElementById('header-total-checks'),
            totalDocs: document.getElementById('header-total-docs'),
            avgSimilarity: document.getElementById('header-avg-similarity'),
            status: document.getElementById('header-status')
        };

        // Animate number updates
        if (elements.totalChecks) {
            this.animateNumber(elements.totalChecks, stats.totalChecks || 0);
        }
        
        if (elements.totalDocs) {
            this.animateNumber(elements.totalDocs, stats.totalReferences || 0);
        }
        
        if (elements.avgSimilarity) {
            this.animateNumber(elements.avgSimilarity, stats.avgSimilarity || 0, '%');
        }

        // Update system status
        if (elements.status) {
            const statusIcon = this.getStatusIcon(stats);
            elements.status.textContent = statusIcon;
        }
    },

    // Animate number changes
    animateNumber: function(element, targetValue, suffix = '') {
        const startValue = parseInt(element.textContent) || 0;
        const duration = 1000;
        const increment = (targetValue - startValue) / (duration / 16);
        let currentValue = startValue;

        const updateNumber = () => {
            currentValue += increment;
            
            if ((increment > 0 && currentValue >= targetValue) || 
                (increment < 0 && currentValue <= targetValue)) {
                element.textContent = targetValue + suffix;
                return;
            }
            
            element.textContent = Math.round(currentValue) + suffix;
            requestAnimationFrame(updateNumber);
        };

        if (startValue !== targetValue) {
            updateNumber();
        }
    },

    // Get status icon based on stats
    getStatusIcon: function(stats) {
        if (!stats || stats.totalChecks === 0) {
            return '⚪'; // No data
        }
        
        const avgSimilarity = stats.avgSimilarity || 0;
        
        if (avgSimilarity < 25) return '🟢'; // Good
        if (avgSimilarity < 50) return '🟡'; // Warning
        if (avgSimilarity < 75) return '🟠'; // Caution
        return '🔴'; // Critical
    },

    // Show application info
    showInfo: async function() {
        try {
            const info = await API.info.get();
            
            const infoModal = this.createInfoModal(info);
            document.body.appendChild(infoModal);
            infoModal.style.display = 'block';
            
        } catch (error) {
            Utils.showAlert('Gagal memuat informasi aplikasi', 'error');
        }
    },

    // Create info modal (dark mode styled)
    createInfoModal: function(info) {
        const modal = document.createElement('div');
        modal.className = 'modal info-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>ℹ️ Informasi Aplikasi</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="info-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                        <div class="info-item" style="background: #34495e; padding: 15px; border-radius: 8px;">
                            <strong style="color: #3498db;">Nama:</strong><br>
                            <span style="color: #ecf0f1;">${info.name || 'Advanced Plagiarism Checker'}</span>
                        </div>
                        <div class="info-item" style="background: #34495e; padding: 15px; border-radius: 8px;">
                            <strong style="color: #3498db;">Versi:</strong><br>
                            <span style="color: #ecf0f1;">${info.version || 'v2.1'}</span>
                        </div>
                        <div class="info-item" style="background: #34495e; padding: 15px; border-radius: 8px;">
                            <strong style="color: #3498db;">Database:</strong><br>
                            <span style="color: #ecf0f1;">${info.database || 'SQLite'}</span>
                        </div>
                        <div class="info-item" style="background: #34495e; padding: 15px; border-radius: 8px;">
                            <strong style="color: #3498db;">Total Referensi:</strong><br>
                            <span style="color: #ecf0f1;">${info.totalReferenceDocuments || 0}</span>
                        </div>
                        <div class="info-item" style="background: #34495e; padding: 15px; border-radius: 8px;">
                            <strong style="color: #3498db;">Total History:</strong><br>
                            <span style="color: #ecf0f1;">${info.totalHistoryEntries || 0}</span>
                        </div>
                        <div class="info-item" style="background: #34495e; padding: 15px; border-radius: 8px;">
                            <strong style="color: #3498db;">Max File Size:</strong><br>
                            <span style="color: #ecf0f1;">${info.maxFileSize || '10MB'}</span>
                        </div>
                    </div>
                    
                    <div class="info-section" style="margin: 25px 0;">
                        <h4 style="color: #3498db; margin-bottom: 15px;">Format Didukung:</h4>
                        <div class="format-list" style="display: flex; gap: 10px; flex-wrap: wrap;">
                            ${(info.supportedFormats || ['TXT', 'PDF', 'DOC', 'DOCX', 'ODT', 'RTF']).map(format => 
                                `<span class="format-tag" style="background: #3498db; color: white; padding: 5px 12px; border-radius: 15px; font-size: 0.9em;">${format}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="info-section" style="margin: 25px 0;">
                        <h4 style="color: #3498db; margin-bottom: 15px;">Algoritma:</h4>
                        <div class="algorithm-list" style="display: flex; gap: 10px; flex-wrap: wrap;">
                            ${(info.algorithms || ['Cosine Similarity', 'N-gram Analysis', 'Fingerprinting']).map(algo => 
                                `<span class="algorithm-tag" style="background: #27ae60; color: white; padding: 5px 12px; border-radius: 15px; font-size: 0.9em;">${algo}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="info-section" style="margin: 25px 0;">
                        <h4 style="color: #3498db; margin-bottom: 15px;">Fitur:</h4>
                        <div class="feature-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                            ${(info.features || [
                                'AI-Powered Analysis',
                                'Multi-format Support', 
                                'History Tracking',
                                'Pattern Recognition',
                                'Export Reports',
                                'Dark Mode Interface'
                            ]).map(feature => 
                                `<div class="feature-tag" style="background: #34495e; padding: 10px; border-radius: 8px; border-left: 3px solid #f39c12;">
                                    <span style="color: #f39c12;">✅</span> 
                                    <span style="color: #ecf0f1;">${feature}</span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="info-footer" style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #4a5f7a;">
                        <small style="color: #95a5a6;">
                            Last Updated: ${info.lastUpdated ? new Date(info.lastUpdated).toLocaleString('id-ID') : new Date().toLocaleString('id-ID')}
                        </small>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    },

    // Show progress bar
    showProgress: function(message = 'Processing...') {
        const progressContainer = document.getElementById('header-progress');
        const progressText = document.getElementById('header-progress-text');
        
        if (progressText) {
            progressText.textContent = message;
        }
        
        if (progressContainer) {
            progressContainer.style.display = 'block';
            Utils.animate.slideDown(progressContainer, 200);
        }
    },

    // Update progress
    updateProgress: function(percentage, message) {
        const progressFill = document.getElementById('header-progress-fill');
        const progressText = document.getElementById('header-progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${Math.min(Math.max(percentage, 0), 100)}%`;
        }
        
        if (progressText && message) {
            progressText.textContent = message;
        }
    },

    // Hide progress bar
    hideProgress: function() {
        const progressContainer = document.getElementById('header-progress');
        
        if (progressContainer) {
            Utils.animate.fadeOut(progressContainer, 200);
            setTimeout(() => {
                progressContainer.style.display = 'none';
                
                // Reset progress
                const progressFill = document.getElementById('header-progress-fill');
                if (progressFill) {
                    progressFill.style.width = '0%';
                }
            }, 200);
        }
    },

    // Add notification badge
    addNotification: function(count = 1) {
        const header = document.getElementById('main-header');
        let badge = header.querySelector('.notification-badge');
        
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'notification-badge';
            badge.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: #e74c3c;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8em;
                font-weight: bold;
            `;
            header.style.position = 'relative';
            header.appendChild(badge);
        }
        
        const currentCount = parseInt(badge.textContent) || 0;
        const newCount = currentCount + count;
        
        badge.textContent = newCount;
        badge.style.display = newCount > 0 ? 'flex' : 'none';
        
        // Animate badge
        badge.style.animation = 'badge-pulse 0.6s ease-out';
        setTimeout(() => {
            badge.style.animation = '';
        }, 600);
    },

    // Clear notifications
    clearNotifications: function() {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.style.display = 'none';
            badge.textContent = '0';
        }
    },

    // Update format badges based on recent activity
    updateFormatBadges: function(recentFiles = []) {
        const badges = document.querySelectorAll('.format-badge');
        
        // Reset all badges
        badges.forEach(badge => {
            badge.classList.remove('active', 'recent');
        });
        
        // Highlight recent formats
        if (recentFiles.length > 0) {
            const recentFormats = [...new Set(recentFiles.map(file => {
                const ext = file.split('.').pop().toUpperCase();
                return ext === 'DOCX' ? 'DOC/DOCX' : ext;
            }))];
            
            badges.forEach(badge => {
                const format = badge.textContent.split(' ')[1]; // Get format name
                if (recentFormats.includes(format)) {
                    badge.classList.add('recent');
                    badge.style.background = 'rgba(52, 152, 219, 0.3)';
                    badge.style.borderColor = '#3498db';
                }
            });
        }
    },

    // Highlight active features
    highlightFeature: function(feature) {
        const badges = document.querySelectorAll('.format-badge');
        
        badges.forEach(badge => {
            badge.classList.remove('highlight');
            if (badge.textContent.includes(feature)) {
                badge.classList.add('highlight');
                badge.style.background = 'rgba(46, 204, 113, 0.3)';
                badge.style.borderColor = '#27ae60';
                badge.style.transform = 'scale(1.05)';
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    badge.classList.remove('highlight');
                    badge.style.background = '';
                    badge.style.borderColor = '';
                    badge.style.transform = '';
                }, 3000);
            }
        });
    },

    // Get component state
    getState: function() {
        return { ...this.state };
    },

    // Update component state
    setState: function(newState) {
        this.state = { ...this.state, ...newState };
    },

    // Refresh component
    refresh: function() {
        if (this.state.showStats) {
            this.loadStats();
        }
    },

    // Cleanup component
    cleanup: function() {
        // Remove event listeners if needed
        const modals = document.querySelectorAll('.info-modal');
        modals.forEach(modal => modal.remove());
        
        // Clear any intervals or timeouts
        clearTimeout(this.progressTimeout);
        clearInterval(this.statsInterval);
    }
};

// Auto-refresh stats every 30 seconds if visible
setInterval(() => {
    if (HeaderComponent.state.showStats) {
        HeaderComponent.loadStats();
    }
}, 30000);

// Export component
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderComponent;
} else {
    window.HeaderComponent = HeaderComponent;
}