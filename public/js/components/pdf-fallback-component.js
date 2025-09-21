/**
 * PDF Fallback Component
 * Handles PDF processing errors and provides alternative solutions
 */

const PDFFallbackComponent = {
    // Show PDF error modal with suggestions
    showPDFErrorModal: function(errorData) {
        const modal = this.createPDFErrorModal(errorData);
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.style.display = 'block';
            Utils.animate.fadeIn(modal, 300);
        }, 100);
    },

    // Create PDF error modal
    createPDFErrorModal: function(errorData) {
        const modal = document.createElement('div');
        modal.id = 'pdf-error-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content pdf-error-content">
                <div class="modal-header">
                    <h3>📄 PDF Processing Error</h3>
                    <button class="modal-close" onclick="PDFFallbackComponent.closePDFErrorModal()">&times;</button>
                </div>
                
                <div class="modal-body">
                    <div class="error-info">
                        <div class="error-icon">⚠️</div>
                        <div class="error-details">
                            <h4>Unable to process PDF file</h4>
                            <p><strong>File:</strong> ${errorData.fileProcessed || 'Unknown'}</p>
                            <p><strong>Issue:</strong> ${errorData.error || 'PDF extraction failed'}</p>
                        </div>
                    </div>
                    
                    <div class="solutions-section">
                        <h4>💡 Recommended Solutions:</h4>
                        <div class="solutions-list">
                            <div class="solution-item">
                                <span class="solution-icon">🔄</span>
                                <div class="solution-content">
                                    <h5>Convert to Text Format</h5>
                                    <p>Convert your PDF to .txt or .docx format using:</p>
                                    <ul>
                                        <li>Microsoft Word (Save As → Plain Text)</li>
                                        <li>Google Docs (File → Download → Plain Text)</li>
                                        <li>Online PDF to Text converters</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="solution-item">
                                <span class="solution-icon">📝</span>
                                <div class="solution-content">
                                    <h5>Copy-Paste Text</h5>
                                    <p>Open your PDF and copy the text directly into the text input area.</p>
                                </div>
                            </div>
                            
                            <div class="solution-item">
                                <span class="solution-icon">🔓</span>
                                <div class="solution-content">
                                    <h5>Check PDF Properties</h5>
                                    <p>Ensure your PDF is:</p>
                                    <ul>
                                        <li>Not password-protected</li>
                                        <li>Contains selectable text (not just images)</li>
                                        <li>Under 10MB in size</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="supported-formats">
                        <h4>✅ Supported Formats:</h4>
                        <div class="format-grid">
                            <span class="format-tag recommended">📝 .txt (Recommended)</span>
                            <span class="format-tag recommended">📘 .docx (Recommended)</span>
                            <span class="format-tag">📄 .pdf</span>
                            <span class="format-tag">📄 .doc</span>
                            <span class="format-tag">📄 .odt</span>
                            <span class="format-tag">📄 .rtf</span>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="PDFFallbackComponent.tryAgain()">
                        🔄 Try Different File
                    </button>
                    <button class="btn btn-secondary" onclick="PDFFallbackComponent.useTextInput()">
                        📝 Use Text Input
                    </button>
                    <button class="btn btn-info" onclick="PDFFallbackComponent.showConverterLinks()">
                        🔗 Online Converters
                    </button>
                </div>
            </div>
        `;
        
        return modal;
    },

    // Close PDF error modal
    closePDFErrorModal: function() {
        const modal = document.getElementById('pdf-error-modal');
        if (modal) {
            Utils.animate.fadeOut(modal, 300);
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    },

    // Try again with different file
    tryAgain: function() {
        this.closePDFErrorModal();
        
        // Reset file input
        const fileInput = document.getElementById('targetFile') || document.getElementById('referenceFile');
        if (fileInput) {
            fileInput.value = '';
            fileInput.click();
        }
        
        Utils.showAlert('📁 Please select a different file format', 'info');
    },

    // Switch to text input
    useTextInput: function() {
        this.closePDFErrorModal();
        
        // Focus on text input
        const textInput = document.getElementById('inputText');
        if (textInput) {
            textInput.focus();
            textInput.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Switch to plagiarism checker tab if needed
        if (window.NavigationComponent) {
            NavigationComponent.showTab('plagiarism-checker');
        }
        
        Utils.showAlert('📝 Please paste your text directly into the text area', 'info');
    },

    // Show converter links
    showConverterLinks: function() {
        const convertersModal = document.createElement('div');
        convertersModal.id = 'converters-modal';
        convertersModal.className = 'modal';
        convertersModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🔗 Online PDF Converters</h3>
                    <button class="modal-close" onclick="PDFFallbackComponent.closeConvertersModal()">&times;</button>
                </div>
                
                <div class="modal-body">
                    <div class="converters-grid">
                        <div class="converter-item">
                            <h4>SmallPDF</h4>
                            <p>PDF to Word/Text converter</p>
                            <a href="https://smallpdf.com/pdf-to-word" target="_blank" class="btn btn-info">
                                🔗 Visit SmallPDF
                            </a>
                        </div>
                        
                        <div class="converter-item">
                            <h4>iLovePDF</h4>
                            <p>PDF to Text converter</p>
                            <a href="https://www.ilovepdf.com/pdf_to_txt" target="_blank" class="btn btn-info">
                                🔗 Visit iLovePDF
                            </a>
                        </div>
                        
                        <div class="converter-item">
                            <h4>PDF24</h4>
                            <p>PDF to DOCX converter</p>
                            <a href="https://tools.pdf24.org/en/pdf-to-word" target="_blank" class="btn btn-info">
                                🔗 Visit PDF24
                            </a>
                        </div>
                        
                        <div class="converter-item">
                            <h4>Google Docs</h4>
                            <p>Upload PDF and export as text</p>
                            <a href="https://docs.google.com" target="_blank" class="btn btn-info">
                                🔗 Visit Google Docs
                            </a>
                        </div>
                    </div>
                    
                    <div class="converter-note">
                        <p><strong>Note:</strong> After converting, come back here and upload the converted file or paste the text directly.</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(convertersModal);
        convertersModal.style.display = 'block';
        Utils.animate.fadeIn(convertersModal, 300);
    },

    // Close converters modal
    closeConvertersModal: function() {
        const modal = document.getElementById('converters-modal');
        if (modal) {
            Utils.animate.fadeOut(modal, 300);
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    },

    // Handle API errors globally
    handleAPIError: function(error, context = 'unknown') {
        console.error(`API Error in ${context}:`, error);
        
        // Check if it's a PDF-related error
        if (error.error && (
            error.error.includes('PDF extraction failed') || 
            error.error.includes('PDF processing failed') ||
            error.error.includes('tidak dapat diekstrak')
        )) {
            this.showPDFErrorModal(error);
        } else {
            // Show generic error
            Utils.showAlert(error.error || 'An error occurred', 'error');
        }
    }
};

// Auto-integrate with existing error handling
if (window.Utils) {
    const originalShowAlert = Utils.showAlert;
    Utils.showAlert = function(message, type, duration) {
        // Intercept PDF-related errors
        if (type === 'error' && (
            message.includes('PDF extraction failed') ||
            message.includes('PDF processing failed') ||
            message.includes('tidak dapat diekstrak')
        )) {
            PDFFallbackComponent.showPDFErrorModal({
                error: message,
                fileProcessed: 'Unknown PDF'
            });
        } else {
            originalShowAlert.call(this, message, type, duration);
        }
    };
}

// Export for global access
window.PDFFallbackComponent = PDFFallbackComponent;