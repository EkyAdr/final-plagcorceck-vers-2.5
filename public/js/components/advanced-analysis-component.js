/**
 * Advanced Analysis Component
 * Displays enhanced plagiarism analysis with entity recognition and semantic insights
 */

const AdvancedAnalysisComponent = {
    // Display advanced analysis results
    displayAdvancedResults: function(data, resultsContainer) {
        if (!data.isAdvanced || !data.advancedInsights) {
            return; // Fallback to regular display
        }

        // Create advanced analysis section
        const advancedSection = this.createAdvancedAnalysisSection(data);
        
        // Insert after status card
        const statusCard = resultsContainer.querySelector('.status-card');
        if (statusCard && statusCard.nextSibling) {
            resultsContainer.insertBefore(advancedSection, statusCard.nextSibling);
        } else {
            resultsContainer.appendChild(advancedSection);
        }

        // Enhance existing detailed results
        this.enhanceDetailedResults(data, resultsContainer);
    },

    // Create advanced analysis section
    createAdvancedAnalysisSection: function(data) {
        const section = document.createElement('div');
        section.className = 'advanced-analysis-section';
        section.innerHTML = this.generateAdvancedAnalysisHTML(data);
        return section;
    },

    // Generate advanced analysis HTML
    generateAdvancedAnalysisHTML: function(data) {
        const insights = data.advancedInsights;
        const entities = data.entitiesDetected;
        const analysis = data.detailedAnalysis;

        return `
            <div class="advanced-analysis-card">
                <div class="analysis-header">
                    <h4>🚀 Advanced AI Analysis</h4>
                    <div class="algorithm-badge">${data.algorithm}</div>
                    <div class="processing-time">⚡ ${data.processingTime}ms</div>
                </div>

                <!-- Multi-Level Analysis Results -->
                <div class="multi-level-analysis">
                    <h5>📊 Multi-Level Similarity Analysis</h5>
                    <div class="analysis-grid">
                        <div class="analysis-item">
                            <div class="analysis-label">Character Level</div>
                            <div class="analysis-bar">
                                <div class="analysis-fill" style="width: ${analysis.characterLevel}%; background: ${this.getAnalysisColor(analysis.characterLevel)};"></div>
                            </div>
                            <div class="analysis-value">${analysis.characterLevel}%</div>
                        </div>
                        
                        <div class="analysis-item">
                            <div class="analysis-label">Word Level</div>
                            <div class="analysis-bar">
                                <div class="analysis-fill" style="width: ${analysis.wordLevel}%; background: ${this.getAnalysisColor(analysis.wordLevel)};"></div>
                            </div>
                            <div class="analysis-value">${analysis.wordLevel}%</div>
                        </div>
                        
                        <div class="analysis-item highlight">
                            <div class="analysis-label">🧠 Semantic Level</div>
                            <div class="analysis-bar">
                                <div class="analysis-fill" style="width: ${analysis.semanticLevel}%; background: ${this.getAnalysisColor(analysis.semanticLevel)};"></div>
                            </div>
                            <div class="analysis-value">${analysis.semanticLevel}%</div>
                        </div>
                        
                        <div class="analysis-item">
                            <div class="analysis-label">Structural Level</div>
                            <div class="analysis-bar">
                                <div class="analysis-fill" style="width: ${analysis.structuralLevel}%; background: ${this.getAnalysisColor(analysis.structuralLevel)};"></div>
                            </div>
                            <div class="analysis-value">${analysis.structuralLevel}%</div>
                        </div>
                        
                        <div class="analysis-item">
                            <div class="analysis-label">Entity Filtered</div>
                            <div class="analysis-bar">
                                <div class="analysis-fill" style="width: ${analysis.entityFiltered}%; background: ${this.getAnalysisColor(analysis.entityFiltered)};"></div>
                            </div>
                            <div class="analysis-value">${analysis.entityFiltered}%</div>
                        </div>
                        
                        <div class="analysis-item">
                            <div class="analysis-label">Smart N-gram</div>
                            <div class="analysis-bar">
                                <div class="analysis-fill" style="width: ${analysis.ngramSimilarity}%; background: ${this.getAnalysisColor(analysis.ngramSimilarity)};"></div>
                            </div>
                            <div class="analysis-value">${analysis.ngramSimilarity}%</div>
                        </div>
                    </div>
                </div>

                <!-- Entity Recognition Results -->
                <div class="entity-analysis">
                    <h5>👤 Named Entity Recognition</h5>
                    <div class="entity-summary">
                        <div class="entity-stat">
                            <span class="stat-number">${entities.target}</span>
                            <span class="stat-label">Entities in Target</span>
                        </div>
                        <div class="entity-stat">
                            <span class="stat-number">${entities.source}</span>
                            <span class="stat-label">Entities in Source</span>
                        </div>
                    </div>
                    
                    ${entities.targetEntities && entities.targetEntities.length > 0 ? `
                        <div class="entities-detected">
                            <h6>🎯 Detected in Target Text:</h6>
                            <div class="entity-tags">
                                ${entities.targetEntities.map(entity => `
                                    <span class="entity-tag entity-${entity.type.toLowerCase()}" title="Confidence: ${(entity.confidence * 100).toFixed(0)}%">
                                        ${this.getEntityIcon(entity.type)} ${entity.text}
                                    </span>
                                `).join('')}
                                ${entities.target > entities.targetEntities.length ? `
                                    <span class="entity-more">+${entities.target - entities.targetEntities.length} more</span>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="entity-info">
                        <small>💡 ${insights.entityAnalysis}</small>
                    </div>
                </div>

                <!-- Detailed Explanation -->
                ${insights.detailedExplanation ? `
                    <div class="detailed-explanation">
                        <h5>📋 Penjelasan Detail Kesamaan</h5>
                        <div class="explanation-content">
                            ${this.formatDetailedExplanation(insights.detailedExplanation)}
                        </div>
                    </div>
                ` : ''}

                <!-- Similar Content Excerpts -->
                ${data.similarContent && data.similarContent.length > 0 ? `
                    <div class="similar-excerpts">
                        <h5>📄 Bagian Konten yang Mirip</h5>
                        <div class="excerpts-container">
                            ${data.similarContent.slice(0, 3).map((excerpt, index) => `
                                <div class="excerpt-item">
                                    <div class="excerpt-similarity">${excerpt.similarity}% mirip</div>
                                    <div class="excerpt-content">
                                        <div class="excerpt-target">
                                            <strong>Dokumen Anda:</strong>
                                            <p>"${excerpt.targetSentence}"</p>
                                        </div>
                                        <div class="excerpt-source">
                                            <strong>Dokumen Sumber:</strong>
                                            <p>"${excerpt.sourceSentence}"</p>
                                        </div>
                                        ${excerpt.commonPhrases && excerpt.commonPhrases.length > 0 ? `
                                            <div class="common-phrases">
                                                <small><strong>Frasa yang sama:</strong> ${excerpt.commonPhrases.slice(0, 3).map(p => `"${p.phrase}"`).join(', ')}</small>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                            ${data.similarContent.length > 3 ? `
                                <div class="more-excerpts">
                                    <small>Dan ${data.similarContent.length - 3} bagian serupa lainnya...</small>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- Contact Information Analysis -->
                ${data.contactAnalysis && data.contactAnalysis.details.length > 0 ? `
                    <div class="contact-analysis">
                        <h5>📧 Informasi Kontak yang Difilter</h5>
                        <div class="contact-summary">
                            ${data.contactAnalysis.details.map(detail => `<p>• ${detail}</p>`).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Semantic Assessment -->
                <div class="semantic-assessment">
                    <h5>🧠 Analisis Semantik</h5>
                    <div class="assessment-card confidence-${insights.confidence.replace(' ', '-')}">
                        <div class="confidence-badge">${insights.confidence.toUpperCase()} CONFIDENCE</div>
                        <p>${insights.semanticAssessment}</p>
                        ${insights.specificFindings && insights.specificFindings.length > 0 ? `
                            <div class="specific-findings">
                                <h6>Temuan Spesifik:</h6>
                                <ul>
                                    ${insights.specificFindings.map(finding => `<li>${finding}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Advanced Recommendations -->
                <div class="advanced-recommendations">
                    <h5>💡 Rekomendasi AI yang Spesifik</h5>
                    <ul class="recommendations-list">
                        ${insights.recommendations.map(rec => `
                            <li class="recommendation-item">
                                <span class="recommendation-icon">✓</span>
                                ${rec}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- Advanced Insights Toggle -->
                <div class="insights-toggle">
                    <button class="btn btn-info" onclick="AdvancedAnalysisComponent.toggleDetailedInsights('${data.historyId || 'current'}')">
                        🔬 Show Technical Details
                    </button>
                </div>

                <!-- Hidden Technical Details -->
                <div id="technical-details-${data.historyId || 'current'}" class="technical-details" style="display: none;">
                    <h6>🔬 Technical Analysis Details</h6>
                    <div class="technical-grid">
                        <div class="technical-item">
                            <strong>Algorithm:</strong> ${data.algorithm}
                        </div>
                        <div class="technical-item">
                            <strong>Processing Time:</strong> ${data.processingTime}ms
                        </div>
                        <div class="technical-item">
                            <strong>Analysis Confidence:</strong> ${insights.confidence}
                        </div>
                        <div class="technical-item">
                            <strong>Entity Filter Applied:</strong> Yes (${entities.target + entities.source} entities)
                        </div>
                    </div>
                    
                    <div class="algorithm-weights">
                        <h6>Algorithm Weights:</h6>
                        <ul>
                            <li>Semantic Analysis: 40%</li>
                            <li>Word Level: 20%</li>
                            <li>Structural: 20%</li>
                            <li>Character Level: 10%</li>
                            <li>Entity Filtered: 10%</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    },

    // Get color for analysis bars
    getAnalysisColor: function(percentage) {
        if (percentage >= 80) return '#e74c3c';
        if (percentage >= 60) return '#e67e22';
        if (percentage >= 40) return '#f39c12';
        if (percentage >= 20) return '#27ae60';
        return '#3498db';
    },

    // Get icon for entity type
    getEntityIcon: function(type) {
        const icons = {
            'PERSON': '👤',
            'PLACE': '📍',
            'ORGANIZATION': '🏢',
            'DATE': '📅',
            'NUMBER': '🔢'
        };
        return icons[type] || '📝';
    },

    // Format detailed explanation for display
    formatDetailedExplanation: function(explanation) {
        if (!explanation) return '';
        
        // Convert markdown-style formatting to HTML
        return explanation
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
            .replace(/\n\n/g, '</p><p>') // Paragraphs
            .replace(/\n/g, '<br>') // Line breaks
            .replace(/^/, '<p>') // Start paragraph
            .replace(/$/, '</p>'); // End paragraph
    },

    // Toggle technical details
    toggleDetailedInsights: function(id) {
        const details = document.getElementById(`technical-details-${id}`);
        const button = event.target;
        
        if (details.style.display === 'none') {
            details.style.display = 'block';
            button.textContent = '🔬 Hide Technical Details';
            Utils.animate.slideDown(details, 300);
        } else {
            Utils.animate.slideUp(details, 300);
            setTimeout(() => {
                details.style.display = 'none';
                button.textContent = '🔬 Show Technical Details';
            }, 300);
        }
    },

    // Enhance existing detailed results with advanced info
    enhanceDetailedResults: function(data, resultsContainer) {
        const resultItems = resultsContainer.querySelectorAll('.result-item');
        
        resultItems.forEach((item, index) => {
            if (data.detailedResults[index]) {
                // Add advanced analysis badge
                const header = item.querySelector('.result-header');
                if (header && !header.querySelector('.advanced-badge')) {
                    const badge = document.createElement('span');
                    badge.className = 'advanced-badge';
                    badge.innerHTML = '🚀 Advanced';
                    badge.title = 'Analyzed with Advanced AI Engine';
                    header.appendChild(badge);
                }

                // Add entity information if available
                const result = data.detailedResults[index];
                if (result.entitiesDetected) {
                    const entityInfo = document.createElement('div');
                    entityInfo.className = 'entity-info-inline';
                    entityInfo.innerHTML = `
                        <small>👤 Entities filtered from analysis: ${result.entitiesDetected.target || 0}</small>
                    `;
                    item.appendChild(entityInfo);
                }
            }
        });
    },

    // Create comparison view between algorithms
    createComparisonView: function(data) {
        if (!data.isAdvanced) return '';

        return `
            <div class="algorithm-comparison">
                <h5>⚖️ Algorithm Comparison</h5>
                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Original Algorithm</th>
                                <th>Advanced Algorithm</th>
                                <th>Improvement</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Overall Similarity</td>
                                <td>${data.originalSimilarity || 'N/A'}%</td>
                                <td>${data.overallSimilarity}%</td>
                                <td class="improvement ${this.getImprovementClass(data.originalSimilarity, data.overallSimilarity)}">
                                    ${this.calculateImprovement(data.originalSimilarity, data.overallSimilarity)}
                                </td>
                            </tr>
                            <tr>
                                <td>Entity Filtering</td>
                                <td>❌ No</td>
                                <td>✅ Yes</td>
                                <td class="improvement positive">Better</td>
                            </tr>
                            <tr>
                                <td>Semantic Analysis</td>
                                <td>❌ Basic</td>
                                <td>✅ Advanced</td>
                                <td class="improvement positive">Much Better</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    // Calculate improvement percentage
    calculateImprovement: function(original, advanced) {
        if (!original || original === 0) return 'N/A';
        const improvement = ((advanced - original) / original) * 100;
        return improvement > 0 ? `+${improvement.toFixed(1)}%` : `${improvement.toFixed(1)}%`;
    },

    // Get improvement class
    getImprovementClass: function(original, advanced) {
        if (!original) return 'neutral';
        return advanced > original ? 'positive' : advanced < original ? 'negative' : 'neutral';
    },

    // Export component for testing
    exportForTesting: function() {
        return {
            getAnalysisColor: this.getAnalysisColor.bind(this),
            getEntityIcon: this.getEntityIcon.bind(this),
            calculateImprovement: this.calculateImprovement.bind(this)
        };
    }
};

// Auto-integrate with existing PlagiarismCheckerComponent
if (window.PlagiarismCheckerComponent) {
    const originalDisplayResults = window.PlagiarismCheckerComponent.displayResults;
    
    window.PlagiarismCheckerComponent.displayResults = function(data) {
        // Call original display function
        originalDisplayResults.call(this, data);
        
        // Add advanced analysis if available
        const resultsContainer = document.getElementById('results');
        if (resultsContainer && data.isAdvanced) {
            AdvancedAnalysisComponent.displayAdvancedResults(data, resultsContainer);
        }
    };
}

// Export for global access
window.AdvancedAnalysisComponent = AdvancedAnalysisComponent;