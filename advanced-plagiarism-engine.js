/**
 * Advanced Plagiarism Detection Engine v3.0
 * Features: Semantic Analysis, Named Entity Recognition, Multi-level Analysis
 */

class AdvancedPlagiarismEngine {
    constructor() {
        this.namedEntities = new Map();
        this.commonWords = new Set();
        this.semanticCache = new Map();
        this.initializeStopWords();
        this.initializeNamedEntities();
        
        console.log('🚀 Advanced Plagiarism Engine v3.0 initialized');
    }

    // Initialize stop words and common words
    initializeStopWords() {
        const stopWords = [
            // Indonesian stop words
            'yang', 'dan', 'atau', 'dengan', 'untuk', 'dari', 'dalam', 'pada', 'ke', 'di', 'oleh', 
            'sebagai', 'adalah', 'merupakan', 'akan', 'dapat', 'harus', 'perlu', 'bisa', 'ada', 
            'tidak', 'juga', 'telah', 'sudah', 'masih', 'lebih', 'sangat', 'cukup', 'agak', 'ini', 
            'itu', 'tersebut', 'serta', 'yaitu', 'yakni', 'ialah', 'karena', 'sehingga', 'maka',
            
            // English stop words
            'the', 'and', 'or', 'of', 'to', 'in', 'for', 'with', 'by', 'as', 'is', 'are', 'was', 
            'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 
            'could', 'should', 'may', 'might', 'this', 'that', 'these', 'those', 'a', 'an',
            
            // Academic words (shouldn't be considered plagiarism)
            'menurut', 'berdasarkan', 'sesuai', 'seperti', 'misalnya', 'contoh', 'hasil', 'penelitian',
            'according', 'based', 'such', 'example', 'result', 'study', 'research', 'analysis',
            
            // Technical and mathematical terms
            'nilai', 'data', 'sistem', 'fungsi', 'metode', 'proses', 'informasi', 'komputer', 'digital',
            'analisis', 'algoritma', 'input', 'output', 'struktur', 'implementasi', 'aplikasi',
            'value', 'system', 'function', 'method', 'process', 'information', 'computer', 'digital',
            'analysis', 'algorithm', 'structure', 'implementation', 'application', 'menggunakan', 'using',
            'digunakan', 'used', 'teknologi', 'technology', 'pembelajaran', 'learning', 'siswa', 'student',
            'sekolah', 'school', 'menengah', 'atas', 'dampak', 'impact', 'terhadap', 'towards',
            
            // Common academic structural terms
            'bab', 'pendahuluan', 'kesimpulan', 'pembahasan', 'tinjauan', 'pustaka', 'daftar',
            'chapter', 'introduction', 'conclusion', 'discussion', 'review', 'literature', 'references',
            'kebutuhan', 'fungsional', 'requirement', 'functional', 'specification'
        ];
        
        stopWords.forEach(word => this.commonWords.add(word.toLowerCase()));
        
        // Initialize common academic document structures
        this.initializeDocumentStructures();
    }
    
    // Initialize patterns for common document structures that should be filtered
    initializeDocumentStructures() {
        this.documentStructures = {
            // Chapter/section headers
            chapters: /^(bab|chapter)\s+[ivx\d]+\s*[:\-\.]?\s*(pendahuluan|introduction|kesimpulan|conclusion|pembahasan|discussion|tinjauan|review)/gi,
            
            // Numbered lists and bullets
            numberedLists: /^\s*[\d\.\)\(\-\*\+\•]+\s+/gm,
            letterLists: /^\s*[a-zA-Z][\.\)\-]\s+/gm,
            romanNumerals: /^\s*[IVX]+[\.\)\-]\s+/gm,
            
            // Page references
            pageRefs: /\b(halaman|page|hal\.?)\s+\d+/gi,
            
            // Table/figure references
            tableRefs: /\b(tabel|table|gambar|figure|grafik|chart)\s+[\d\.\-]+/gi,
            
            // Mathematical formulas (basic patterns)
            formulas: /\b(nilai\s+akhir|final\s+value)\s*=\s*[\(\)\+\-\*\/\w\d\s]+/gi,
            
            // Common formatting patterns
            formatting: /\b(font|size|margin|spacing|alignment|justify|center|left|right|bold|italic)\b/gi
        };
    }

    // Initialize named entity patterns and databases
    initializeNamedEntities() {
        // Indonesian name patterns
        const indonesianNames = [
            'ahmad', 'muhammad', 'abdul', 'siti', 'sri', 'dewi', 'putra', 'putri', 'budi', 'andi',
            'wati', 'ningsih', 'yanto', 'yani', 'rini', 'indah', 'sari', 'lestari', 'agus', 'bambang',
            'hendro', 'sutrisno', 'widodo', 'susilo', 'joko', 'megawati', 'prabowo', 'wiranto'
        ];
        
        // International name patterns
        const internationalNames = [
            'john', 'smith', 'johnson', 'williams', 'brown', 'jones', 'garcia', 'miller', 'davis',
            'rodriguez', 'martinez', 'hernandez', 'lopez', 'gonzalez', 'wilson', 'anderson', 'thomas',
            'taylor', 'moore', 'jackson', 'martin', 'lee', 'perez', 'thompson', 'white', 'harris',
            'clark', 'lewis', 'robinson', 'walker', 'young', 'allen', 'king', 'wright', 'scott'
        ];
        
        // Place names
        const places = [
            'jakarta', 'surabaya', 'bandung', 'medan', 'semarang', 'makassar', 'palembang', 'tangerang',
            'depok', 'bekasi', 'bogor', 'batam', 'pekanbaru', 'bandar lampung', 'malang', 'denpasar',
            'indonesia', 'america', 'europe', 'asia', 'africa', 'australia', 'london', 'paris', 'tokyo',
            'singapore', 'malaysia', 'thailand', 'vietnam', 'philippines', 'brunei', 'myanmar'
        ];
        
        // Organization names
        const organizations = [
            'universitas', 'institut', 'sekolah', 'fakultas', 'jurusan', 'department', 'college',
            'university', 'school', 'faculty', 'google', 'microsoft', 'apple', 'facebook', 'amazon',
            'unesco', 'who', 'unicef', 'nasa', 'fbi', 'cia', 'ieee', 'acm'
        ];
        
        // Store all entities
        [...indonesianNames, ...internationalNames].forEach(name => {
            this.namedEntities.set(name.toLowerCase(), 'PERSON');
        });
        
        places.forEach(place => {
            this.namedEntities.set(place.toLowerCase(), 'PLACE');
        });
        
        organizations.forEach(org => {
            this.namedEntities.set(org.toLowerCase(), 'ORGANIZATION');
        });

        // Initialize email and URL patterns for filtering
        this.initializeContactPatterns();
    }

    // Initialize patterns for contact information that should be filtered
    initializeContactPatterns() {
        this.contactPatterns = {
            // Email patterns
            email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
            
            // URL patterns  
            url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
            
            // Phone number patterns
            phone: /(\+62|62|0)[0-9]{9,13}|(\(\d{2,4}\)|\d{2,4})[\s-]?\d{3,4}[\s-]?\d{3,4}/g,
            
            // Generic contact patterns
            contact: /\b(email|e-mail|phone|tel|hp|wa|whatsapp|contact|kontak|hubungi)[\s:]+[^\s\n]+/gi
        };
    }

    // Advanced Named Entity Recognition
    recognizeNamedEntities(text) {
        const words = text.toLowerCase().split(/\s+/);
        const entities = [];
        
        // Pattern-based NER
        for (let i = 0; i < words.length; i++) {
            const word = words[i].replace(/[^\w]/g, '');
            
            // Check single word entities
            if (this.namedEntities.has(word)) {
                entities.push({
                    text: word,
                    type: this.namedEntities.get(word),
                    position: i,
                    confidence: 0.9
                });
            }
            
            // Check multi-word entities (names like "John Smith")
            if (i < words.length - 1) {
                const twoWords = word + ' ' + words[i + 1].replace(/[^\w]/g, '');
                if (this.isLikelyPersonName(word, words[i + 1])) {
                    entities.push({
                        text: twoWords,
                        type: 'PERSON',
                        position: i,
                        length: 2,
                        confidence: 0.8
                    });
                }
            }
            
            // Pattern-based detection
            if (this.isCapitalizedWord(words[i]) && !this.commonWords.has(word)) {
                // Likely proper noun
                const context = this.getWordContext(words, i);
                const entityType = this.classifyProperNoun(word, context);
                
                if (entityType) {
                    entities.push({
                        text: word,
                        type: entityType,
                        position: i,
                        confidence: 0.7
                    });
                }
            }
        }
        
        return entities;
    }

    // Check if word is capitalized (likely proper noun)
    isCapitalizedWord(word) {
        const cleanWord = word.replace(/[^\w]/g, '');
        return cleanWord.length > 1 && cleanWord[0] === cleanWord[0].toUpperCase();
    }

    // Check if two words form a likely person name
    isLikelyPersonName(word1, word2) {
        const clean1 = word1.replace(/[^\w]/g, '').toLowerCase();
        const clean2 = word2.replace(/[^\w]/g, '').toLowerCase();
        
        // Both words are in name database
        if (this.namedEntities.get(clean1) === 'PERSON' && this.namedEntities.get(clean2) === 'PERSON') {
            return true;
        }
        
        // First word is known name, second is capitalized
        if (this.namedEntities.get(clean1) === 'PERSON' && this.isCapitalizedWord(word2)) {
            return true;
        }
        
        // Pattern matching for Indonesian names
        const indonesianNamePatterns = [
            /^(dr|prof|ir|drs|h|hj)\.?\s/i, // Titles
            /\b(bin|binti|al)\b/i, // Arabic connectors
            /\b(van|de|da|al)\b/i // International connectors
        ];
        
        const fullName = `${word1} ${word2}`;
        return indonesianNamePatterns.some(pattern => pattern.test(fullName));
    }

    // Get context words around a position
    getWordContext(words, position, windowSize = 2) {
        const start = Math.max(0, position - windowSize);
        const end = Math.min(words.length, position + windowSize + 1);
        return words.slice(start, end);
    }

    // Classify proper noun type based on context
    classifyProperNoun(word, context) {
        const contextString = context.join(' ').toLowerCase();
        
        // Person indicators
        const personIndicators = ['dr', 'prof', 'ir', 'drs', 'h', 'hj', 'bapak', 'ibu', 'pak', 'bu', 'mr', 'mrs', 'ms'];
        if (personIndicators.some(indicator => contextString.includes(indicator))) {
            return 'PERSON';
        }
        
        // Place indicators
        const placeIndicators = ['di', 'dari', 'ke', 'kota', 'kabupaten', 'provinsi', 'negara', 'in', 'from', 'to', 'city', 'country'];
        if (placeIndicators.some(indicator => contextString.includes(indicator))) {
            return 'PLACE';
        }
        
        // Organization indicators
        const orgIndicators = ['universitas', 'institut', 'sekolah', 'perusahaan', 'university', 'institute', 'school', 'company'];
        if (orgIndicators.some(indicator => contextString.includes(indicator))) {
            return 'ORGANIZATION';
        }
        
        return null;
    }

    // Enhanced preprocessing that preserves semantic meaning while filtering entities
    enhancedPreprocessing(text) {
        // Step 1: Remove contact information (emails, URLs, phones)
        let processedText = text;
        
        // Remove emails and replace with placeholder
        processedText = processedText.replace(this.contactPatterns.email, '[EMAIL]');
        
        // Remove URLs and replace with placeholder
        processedText = processedText.replace(this.contactPatterns.url, '[URL]');
        
        // Remove phone numbers and replace with placeholder
        processedText = processedText.replace(this.contactPatterns.phone, '[PHONE]');
        
        // Remove generic contact information
        processedText = processedText.replace(this.contactPatterns.contact, '[CONTACT]');
        
        // Step 1.5: Remove common document structures that cause false positives
        processedText = this.filterDocumentStructures(processedText);
        
        // Step 2: Recognize named entities
        const entities = this.recognizeNamedEntities(processedText);
        
        // Step 3: Replace entities with generic tokens
        processedText = processedText.toLowerCase();
        
        // Sort entities by position (reverse order to maintain positions)
        entities.sort((a, b) => b.position - a.position);
        
        const words = processedText.split(/\s+/);
        entities.forEach(entity => {
            const length = entity.length || 1;
            for (let i = 0; i < length; i++) {
                if (words[entity.position + i]) {
                    words[entity.position + i] = `[${entity.type}]`;
                }
            }
        });
        
        processedText = words.join(' ');
        
        // Step 4: Advanced text normalization with better pattern filtering
        processedText = processedText
            // Remove citations and references
            .replace(/\([^)]*\d{4}[^)]*\)/g, ' ') // (Author, 2023)
            .replace(/\[\d+\]/g, ' ') // [1], [2], etc.
            .replace(/\b\d{4}\b/g, '[YEAR]') // Years
            .replace(/\b\d+(\.\d+)?%\b/g, '[PERCENTAGE]') // Percentages
            .replace(/\b\d+(\.\d+)?\b/g, '[NUMBER]') // Numbers
            
            // Normalize academic terms with better specificity
            .replace(/\b(tabel|table|gambar|figure|grafik|chart)\s+[\d\.\-]+/gi, '[REFERENCE]')
            .replace(/\b(halaman|page|hal\.?)\s+\d+/gi, '[PAGE]')
            .replace(/\b(bab|chapter|pasal)\s+[\dIVX]+/gi, '[SECTION]')
            
            // Remove mathematical expressions that are too generic
            .replace(/\b(nilai\s+akhir|final\s+value)\s*=\s*[\(\)\+\-\*\/\w\d\s\×\·]{1,50}/gi, '[FORMULA]')
            .replace(/\b(sim|similarity|kesamaan)\s*[\(\[]\s*[a-zA-Z]\s*,\s*[a-zA-Z]\s*[\)\]]/gi, '[SIMILARITY_FUNCTION]')
            
            // Remove list numbering with better patterns
            .replace(/^\s*[\d\.\)\(\-\*\+\•]+\s+/gm, '')
            .replace(/^\s*[a-zA-Z][\.\)\-]\s+/gm, '')
            .replace(/^\s*[IVX]+[\.\)\-]\s+/gm, '')
            
            // Filter out fragmented words (common OCR/parsing issues)
            .replace(/\b\w\s+\w\s+\w\b/g, '[FRAGMENTED]') // Single chars with spaces
            .replace(/\b[a-zA-Z]\s*:\s*\d+\b/g, '[VARIABLE]') // Variable assignments
            
            // Normalize formatting
            .replace(/[^\w\s\[\]]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        return processedText;
    }
    
    // Filter common document structures that cause false positives
    filterDocumentStructures(text) {
        let filteredText = text;
        
        // Remove common document structure patterns
        Object.entries(this.documentStructures).forEach(([key, pattern]) => {
            filteredText = filteredText.replace(pattern, '[STRUCTURE]');
        });
        
        // Remove common academic templates and structural elements
        filteredText = filteredText
            .replace(/^\s*(BAB|CHAPTER)\s+[IVX\d]+\s*/gmi, '[CHAPTER_HEADER]')
            .replace(/^\s*\d+\.\d+\s+[A-Za-z\s]+$/gm, '[SECTION_HEADER]')
            .replace(/\b\d+\s+(Kebutuhan|Requirement)\s+(Fungsional|Functional)\b/gi, '[REQUIREMENT_HEADER]')
            .replace(/\b(latar\s+belakang|background|pendahuluan|introduction)\b/gi, '[STANDARD_SECTION]')
            .replace(/\b\d+\s+(bab|chapter)\s+[ivx\d]+/gi, '[CHAPTER_REF]');
        
        return filteredText;
    }

    // Semantic similarity using simple word embeddings simulation
    calculateSemanticSimilarity(text1, text2) {
        const words1 = this.enhancedPreprocessing(text1).split(/\s+/);
        const words2 = this.enhancedPreprocessing(text2).split(/\s+/);
        
        // Filter out common words and entity placeholders
        const meaningfulWords1 = words1.filter(word => 
            !this.commonWords.has(word) && 
            !word.startsWith('[') && 
            word.length > 2
        );
        
        const meaningfulWords2 = words2.filter(word => 
            !this.commonWords.has(word) && 
            !word.startsWith('[') && 
            word.length > 2
        );
        
        if (meaningfulWords1.length === 0 || meaningfulWords2.length === 0) {
            return 0;
        }
        
        // Calculate semantic similarity using word overlap with weighting
        let totalSimilarity = 0;
        let comparisons = 0;
        
        meaningfulWords1.forEach(word1 => {
            meaningfulWords2.forEach(word2 => {
                const similarity = this.wordSimilarity(word1, word2);
                totalSimilarity += similarity;
                comparisons++;
            });
        });
        
        return comparisons > 0 ? totalSimilarity / comparisons : 0;
    }

    // Calculate similarity between two words
    wordSimilarity(word1, word2) {
        // Exact match
        if (word1 === word2) return 1;
        
        // Stemming similarity (simple approach)
        const stem1 = this.simpleStem(word1);
        const stem2 = this.simpleStem(word2);
        
        if (stem1 === stem2) return 0.9;
        
        // Levenshtein distance similarity
        const levSim = 1 - (this.levenshteinDistance(word1, word2) / Math.max(word1.length, word2.length));
        
        // Synonym checking (basic approach)
        const synSim = this.synonymSimilarity(word1, word2);
        
        return Math.max(levSim, synSim);
    }

    // Simple stemming for Indonesian and English
    simpleStem(word) {
        // Indonesian suffixes
        word = word.replace(/(nya|kan|an|i)$/, '');
        
        // English suffixes
        word = word.replace(/(ing|ed|er|est|ly|tion|sion)$/, '');
        
        return word;
    }

    // Calculate Levenshtein distance
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    // Basic synonym similarity
    synonymSimilarity(word1, word2) {
        const synonymGroups = [
            ['baik', 'bagus', 'good', 'excellent', 'great'],
            ['buruk', 'jelek', 'bad', 'poor', 'terrible'],
            ['besar', 'banyak', 'large', 'big', 'huge'],
            ['kecil', 'sedikit', 'small', 'little', 'tiny'],
            ['penting', 'vital', 'important', 'crucial', 'essential'],
            ['penelitian', 'riset', 'research', 'study', 'investigation'],
            ['hasil', 'outcome', 'result', 'finding', 'conclusion'],
            ['metode', 'cara', 'method', 'approach', 'technique'],
            ['analisis', 'kajian', 'analysis', 'examination', 'evaluation']
        ];
        
        for (const group of synonymGroups) {
            if (group.includes(word1) && group.includes(word2)) {
                return 0.8;
            }
        }
        
        return 0;
    }

    // Advanced N-gram with entity filtering and minimum meaningful content threshold
    createSmartNGrams(text, n = 3) {
        const processedText = this.enhancedPreprocessing(text);
        const words = processedText.split(' ').filter(word => word.length > 0);
        const ngrams = [];
        
        for (let i = 0; i <= words.length - n; i++) {
            const ngramWords = words.slice(i, i + n);
            
            // Skip n-grams that are mostly entity placeholders or common words
            const meaningfulWords = ngramWords.filter(word => 
                !word.startsWith('[') && 
                !this.commonWords.has(word) && 
                word.length > 2 &&
                !this.isNumericOrSymbolic(word)
            );
            
            // Only include n-grams with at least 80% meaningful content (stricter)
            if (meaningfulWords.length >= Math.ceil(n * 0.8) && meaningfulWords.length >= 2) {
                // Additional check: ensure the n-gram has sufficient semantic content
                const ngramText = ngramWords.join(' ');
                if (this.hasSemanticValue(ngramText)) {
                    ngrams.push(ngramText);
                }
            }
        }
        
        return ngrams;
    }
    
    // Check if word is primarily numeric or symbolic
    isNumericOrSymbolic(word) {
        return /^[\d\+\-\*\/\=\(\)\[\]]+$/.test(word) || word.length === 1;
    }
    
    // Check if n-gram has semantic value (not just structural/formatting)
    hasSemanticValue(ngram) {
        const structuralPatterns = [
            /^\[.*\]\s+\[.*\]\s+\[.*\]$/, // All placeholders
            /^(dan|atau|dengan|untuk|dari|dalam|pada|ke|di|oleh|yang|the|and|or|of|to|in|for|with|by)\s+/,
            /\s+(adalah|merupakan|akan|dapat|harus|perlu|is|are|was|were|be|been|have|has|had)$/,
            /^\d+[\.\)\-]\s+/, // List numbering
            /^(bab|chapter|tabel|table|gambar|figure|halaman|page)\s+\d+/i
        ];
        
        return !structuralPatterns.some(pattern => pattern.test(ngram.toLowerCase()));
    }

    // Multi-level similarity analysis with improved weighting
    multiLevelAnalysis(text1, text2) {
        const analysis = {
            characterLevel: this.characterLevelSimilarity(text1, text2),
            wordLevel: this.wordLevelSimilarity(text1, text2),
            semanticLevel: this.calculateSemanticSimilarity(text1, text2),
            structuralLevel: this.structuralSimilarity(text1, text2),
            entityFiltered: this.entityFilteredSimilarity(text1, text2),
            contentQuality: this.assessContentQuality(text1, text2)
        };
        
        // Apply diminishing returns to prevent false positives from common text
        analysis.adjustedWordLevel = this.applyDiminishingReturns(analysis.wordLevel);
        analysis.adjustedSemanticLevel = this.applyDiminishingReturns(analysis.semanticLevel);
        
        // Improved weighted final score with content quality factor
        analysis.finalScore = (
            analysis.characterLevel * 0.05 +
            analysis.adjustedWordLevel * 0.25 +
            analysis.adjustedSemanticLevel * 0.45 +
            analysis.structuralLevel * 0.15 +
            analysis.entityFiltered * 0.05 +
            analysis.contentQuality * 0.05
        );
        
        // Apply final penalty for low-content texts
        if (this.isLowContentText(text1) || this.isLowContentText(text2)) {
            analysis.finalScore *= 0.7; // 30% penalty
        }
        
        return analysis;
    }
    
    // Apply diminishing returns to prevent over-weighting common similarities
    applyDiminishingReturns(score) {
        if (score < 0.3) return score;
        if (score < 0.6) return 0.3 + (score - 0.3) * 0.8;
        if (score < 0.8) return 0.54 + (score - 0.6) * 0.6;
        return 0.66 + (score - 0.8) * 0.4;
    }
    
    // Assess content quality to reduce false positives from low-content text
    assessContentQuality(text1, text2) {
        const words1 = this.enhancedPreprocessing(text1).split(/\s+/).filter(w => w.length > 2);
        const words2 = this.enhancedPreprocessing(text2).split(/\s+/).filter(w => w.length > 2);
        
        const meaningfulWords1 = words1.filter(w => !w.startsWith('[') && !this.commonWords.has(w));
        const meaningfulWords2 = words2.filter(w => !w.startsWith('[') && !this.commonWords.has(w));
        
        const contentRatio1 = meaningfulWords1.length / Math.max(words1.length, 1);
        const contentRatio2 = meaningfulWords2.length / Math.max(words2.length, 1);
        
        return (contentRatio1 + contentRatio2) / 2;
    }
    
    // Check if text has low meaningful content
    isLowContentText(text) {
        const words = this.enhancedPreprocessing(text).split(/\s+/).filter(w => w.length > 0);
        const meaningfulWords = words.filter(w => 
            !w.startsWith('[') && 
            !this.commonWords.has(w) && 
            w.length > 2 &&
            !this.isNumericOrSymbolic(w)
        );
        
        return meaningfulWords.length < 10 || meaningfulWords.length / words.length < 0.3;
    }

    // Character-level similarity (Jaccard)
    characterLevelSimilarity(text1, text2) {
        const chars1 = new Set(text1.toLowerCase());
        const chars2 = new Set(text2.toLowerCase());
        
        const intersection = new Set([...chars1].filter(x => chars2.has(x)));
        const union = new Set([...chars1, ...chars2]);
        
        return intersection.size / union.size;
    }

    // Word-level similarity (enhanced cosine)
    wordLevelSimilarity(text1, text2) {
        const words1 = this.enhancedPreprocessing(text1).split(/\s+/);
        const words2 = this.enhancedPreprocessing(text2).split(/\s+/);
        
        const freq1 = {};
        const freq2 = {};
        
        words1.forEach(word => freq1[word] = (freq1[word] || 0) + 1);
        words2.forEach(word => freq2[word] = (freq2[word] || 0) + 1);
        
        const allWords = [...new Set([...words1, ...words2])];
        
        let dotProduct = 0;
        let norm1 = 0;
        let norm2 = 0;
        
        allWords.forEach(word => {
            const f1 = freq1[word] || 0;
            const f2 = freq2[word] || 0;
            
            dotProduct += f1 * f2;
            norm1 += f1 * f1;
            norm2 += f2 * f2;
        });
        
        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }

    // Structural similarity (sentence patterns)
    structuralSimilarity(text1, text2) {
        const sentences1 = text1.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const sentences2 = text2.split(/[.!?]+/).filter(s => s.trim().length > 0);
        
        if (sentences1.length === 0 || sentences2.length === 0) return 0;
        
        // Compare sentence length patterns
        const lengths1 = sentences1.map(s => s.trim().split(/\s+/).length);
        const lengths2 = sentences2.map(s => s.trim().split(/\s+/).length);
        
        const avgLength1 = lengths1.reduce((a, b) => a + b, 0) / lengths1.length;
        const avgLength2 = lengths2.reduce((a, b) => a + b, 0) / lengths2.length;
        
        const lengthSimilarity = 1 - Math.abs(avgLength1 - avgLength2) / Math.max(avgLength1, avgLength2);
        
        // Compare sentence count similarity
        const countSimilarity = 1 - Math.abs(sentences1.length - sentences2.length) / Math.max(sentences1.length, sentences2.length);
        
        return (lengthSimilarity + countSimilarity) / 2;
    }

    // Entity-filtered similarity
    entityFilteredSimilarity(text1, text2) {
        const entities1 = this.recognizeNamedEntities(text1);
        const entities2 = this.recognizeNamedEntities(text2);
        
        // Remove all entity text from both texts
        let filtered1 = text1.toLowerCase();
        let filtered2 = text2.toLowerCase();
        
        [...entities1, ...entities2].forEach(entity => {
            const regex = new RegExp('\\b' + entity.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
            filtered1 = filtered1.replace(regex, '');
            filtered2 = filtered2.replace(regex, '');
        });
        
        // Calculate similarity on filtered text
        return this.wordLevelSimilarity(filtered1, filtered2);
    }

    // Main detection function
    detectAdvancedPlagiarism(targetText, sourceText, sourceDocument) {
        const startTime = Date.now();
        
        // Multi-level analysis
        const analysis = this.multiLevelAnalysis(targetText, sourceText);
        
        // Entity analysis
        const targetEntities = this.recognizeNamedEntities(targetText);
        const sourceEntities = this.recognizeNamedEntities(sourceText);
        
        // Smart N-gram analysis
        const targetNgrams = this.createSmartNGrams(targetText, 3);
        const sourceNgrams = this.createSmartNGrams(sourceText, 3);
        
        const ngramSimilarity = this.calculateNgramSimilarity(targetNgrams, sourceNgrams);
        
        // Identify similar content excerpts
        const similarExcerpts = this.findSimilarExcerpts(targetText, sourceText);
        
        // Analyze filtered content
        const contactInfo = this.analyzeContactInformation(targetText, sourceText);
        
        // Generate advanced insights with detailed explanations
        const insights = this.generateAdvancedInsights(
            targetText, sourceText, targetEntities, analysis, 
            similarExcerpts, contactInfo, sourceDocument
        );
        
        const processingTime = Date.now() - startTime;
        
        return {
            overallSimilarity: Math.round(analysis.finalScore * 100),
            detailedAnalysis: {
                characterLevel: Math.round(analysis.characterLevel * 100),
                wordLevel: Math.round(analysis.wordLevel * 100),
                semanticLevel: Math.round(analysis.semanticLevel * 100),
                structuralLevel: Math.round(analysis.structuralLevel * 100),
                entityFiltered: Math.round(analysis.entityFiltered * 100),
                ngramSimilarity: Math.round(ngramSimilarity * 100)
            },
            entitiesDetected: {
                target: targetEntities.length,
                source: sourceEntities.length,
                targetEntities: targetEntities.slice(0, 10), // Limit for performance
                sourceEntities: sourceEntities.slice(0, 10)
            },
            similarContent: similarExcerpts,
            contactAnalysis: contactInfo,
            advancedInsights: insights,
            sourceDocument: sourceDocument,
            processingTime: processingTime,
            algorithm: 'Advanced Multi-Level Analysis v3.1'
        };
    }

    // Calculate N-gram similarity
    calculateNgramSimilarity(ngrams1, ngrams2) {
        if (ngrams1.length === 0 || ngrams2.length === 0) return 0;
        
        const set1 = new Set(ngrams1);
        const set2 = new Set(ngrams2);
        
        const intersection = new Set([...set1].filter(x => set2.has(x)));
        
        return intersection.size / Math.max(set1.size, set2.size);
    }

    // Find similar content excerpts between texts with improved filtering
    findSimilarExcerpts(targetText, sourceText, minLength = 50) {
        const excerpts = [];
        
        // Split texts into sentences with better filtering
        const targetSentences = targetText.split(/[.!?]+/)
            .map(s => s.trim())
            .filter(s => s.length > minLength && this.hasMeaningfulContent(s));
        
        const sourceSentences = sourceText.split(/[.!?]+/)
            .map(s => s.trim())
            .filter(s => s.length > minLength && this.hasMeaningfulContent(s));
        
        // Find similar sentences with stricter thresholds
        targetSentences.forEach((targetSent, tIndex) => {
            sourceSentences.forEach((sourceSent, sIndex) => {
                // Use enhanced semantic similarity with stricter threshold
                const similarity = this.calculateEnhancedSemanticSimilarity(targetSent, sourceSent);
                
                if (similarity > 0.7) { // Stricter threshold
                    // Verify this isn't just common academic language
                    if (this.isSignificantSimilarity(targetSent, sourceSent, similarity)) {
                        const commonPhrases = this.extractCommonPhrases(targetSent, sourceSent);
                        
                        excerpts.push({
                            targetSentence: targetSent.substring(0, 150) + (targetSent.length > 150 ? '...' : ''),
                            sourceSentence: sourceSent.substring(0, 150) + (sourceSent.length > 150 ? '...' : ''),
                            similarity: Math.round(similarity * 100),
                            commonPhrases: commonPhrases.slice(0, 5),
                            targetIndex: tIndex,
                            sourceIndex: sIndex,
                            significanceScore: this.calculateSignificanceScore(targetSent, sourceSent)
                        });
                    }
                }
            });
        });
        
        // Sort by significance score then similarity
        return excerpts
            .sort((a, b) => (b.significanceScore * b.similarity) - (a.significanceScore * a.similarity))
            .slice(0, 8); // Reduced to top 8 most significant excerpts
    }
    
    // Check if sentence has meaningful content beyond common academic phrases
    hasMeaningfulContent(sentence) {
        const words = sentence.toLowerCase().split(/\s+/);
        const meaningfulWords = words.filter(word => 
            !this.commonWords.has(word) && 
            word.length > 2 &&
            !this.isNumericOrSymbolic(word)
        );
        
        // Must have at least 3 meaningful words and 30% meaningful content
        return meaningfulWords.length >= 3 && meaningfulWords.length / words.length >= 0.3;
    }
    
    // Enhanced semantic similarity with better filtering
    calculateEnhancedSemanticSimilarity(text1, text2) {
        const baseSimilarity = this.calculateSemanticSimilarity(text1, text2);
        
        // Apply penalties for common academic structures
        let penalty = 1.0;
        
        // Check for common academic patterns
        const commonAcademicPatterns = [
            /berdasarkan hasil.*penelitian/i,
            /dapat disimpulkan bahwa/i,
            /menurut.*hasil.*menunjukkan/i,
            /based on.*results/i,
            /according to.*research/i,
            /it can be concluded/i
        ];
        
        if (commonAcademicPatterns.some(pattern => 
            pattern.test(text1.toLowerCase()) && pattern.test(text2.toLowerCase()))) {
            penalty *= 0.7; // 30% penalty for common academic language
        }
        
        return baseSimilarity * penalty;
    }
    
    // Check if similarity is significant (not just common phrases)
    isSignificantSimilarity(sent1, sent2, similarity) {
        // Extract unique content words from both sentences
        const uniqueWords1 = this.extractUniqueWords(sent1);
        const uniqueWords2 = this.extractUniqueWords(sent2);
        
        // Count overlapping unique words
        const overlap = uniqueWords1.filter(word => uniqueWords2.includes(word));
        
        // Must have at least 2 overlapping unique words or very high similarity
        return overlap.length >= 2 || similarity > 0.85;
    }
    
    // Extract unique/distinctive words from text
    extractUniqueWords(text) {
        const words = text.toLowerCase().split(/\s+/);
        return words.filter(word => 
            !this.commonWords.has(word) && 
            word.length > 3 &&
            !this.isNumericOrSymbolic(word) &&
            !word.startsWith('[')
        );
    }
    
    // Calculate significance score for prioritizing excerpts
    calculateSignificanceScore(sent1, sent2) {
        const uniqueWords1 = this.extractUniqueWords(sent1);
        const uniqueWords2 = this.extractUniqueWords(sent2);
        const overlap = uniqueWords1.filter(word => uniqueWords2.includes(word));
        
        // Score based on unique word overlap and sentence length
        const overlapRatio = overlap.length / Math.max(uniqueWords1.length, uniqueWords2.length, 1);
        const lengthBonus = Math.min(sent1.length, sent2.length) / 200; // Bonus for longer sentences
        
        return overlapRatio + lengthBonus;
    }

    // Extract common phrases between two sentences
    extractCommonPhrases(sent1, sent2, minPhraseLength = 3) {
        const words1 = sent1.toLowerCase().split(/\s+/);
        const words2 = sent2.toLowerCase().split(/\s+/);
        const commonPhrases = [];
        
        // Find common consecutive word sequences
        for (let len = minPhraseLength; len <= Math.min(words1.length, words2.length, 8); len++) {
            for (let i = 0; i <= words1.length - len; i++) {
                const phrase1 = words1.slice(i, i + len).join(' ');
                
                for (let j = 0; j <= words2.length - len; j++) {
                    const phrase2 = words2.slice(j, j + len).join(' ');
                    
                    if (phrase1 === phrase2 && !this.isCommonPhrase(phrase1)) {
                        commonPhrases.push({
                            phrase: phrase1,
                            length: len,
                            position1: i,
                            position2: j
                        });
                    }
                }
            }
        }
        
        // Remove duplicates and sort by length
        const uniquePhrases = commonPhrases.filter((phrase, index, self) => 
            index === self.findIndex(p => p.phrase === phrase.phrase)
        );
        
        return uniquePhrases
            .sort((a, b) => b.length - a.length)
            .slice(0, 10);
    }

    // Check if phrase is too common to be considered plagiarism
    isCommonPhrase(phrase) {
        const commonPhrases = [
            'dalam hal ini', 'berdasarkan hasil', 'dapat disimpulkan', 'menurut penelitian',
            'in this case', 'based on results', 'can be concluded', 'according to research',
            'dari hasil penelitian', 'hasil penelitian menunjukkan', 'dapat dilihat bahwa',
            'research shows that', 'the results show', 'it can be seen that'
        ];
        
        return commonPhrases.some(common => phrase.includes(common));
    }

    // Analyze contact information that was filtered out
    analyzeContactInformation(targetText, sourceText) {
        const analysis = {
            emailsFiltered: 0,
            urlsFiltered: 0,
            phonesFiltered: 0,
            contactsFiltered: 0,
            details: []
        };
        
        // Count and extract filtered contact information
        const targetEmails = targetText.match(this.contactPatterns.email) || [];
        const sourceEmails = sourceText.match(this.contactPatterns.email) || [];
        
        const targetUrls = targetText.match(this.contactPatterns.url) || [];
        const sourceUrls = sourceText.match(this.contactPatterns.url) || [];
        
        const targetPhones = targetText.match(this.contactPatterns.phone) || [];
        const sourcePhones = sourceText.match(this.contactPatterns.phone) || [];
        
        analysis.emailsFiltered = targetEmails.length + sourceEmails.length;
        analysis.urlsFiltered = targetUrls.length + sourceUrls.length;
        analysis.phonesFiltered = targetPhones.length + sourcePhones.length;
        
        // Check for identical contact information
        const identicalEmails = targetEmails.filter(email => sourceEmails.includes(email));
        const identicalUrls = targetUrls.filter(url => sourceUrls.includes(url));
        const identicalPhones = targetPhones.filter(phone => sourcePhones.includes(phone));
        
        if (identicalEmails.length > 0) {
            analysis.details.push(`${identicalEmails.length} alamat email identik ditemukan dan diabaikan dari analisis plagiarisme`);
        }
        
        if (identicalUrls.length > 0) {
            analysis.details.push(`${identicalUrls.length} URL identik ditemukan dan diabaikan dari analisis plagiarisme`);
        }
        
        if (identicalPhones.length > 0) {
            analysis.details.push(`${identicalPhones.length} nomor telepon identik ditemukan dan diabaikan dari analisis plagiarisme`);
        }
        
        if (analysis.emailsFiltered + analysis.urlsFiltered + analysis.phonesFiltered === 0) {
            analysis.details.push('Tidak ada informasi kontak yang perlu difilter');
        }
        
        return analysis;
    }

    // Generate advanced insights with detailed explanations
    generateAdvancedInsights(targetText, sourceText, entities, analysis, similarExcerpts, contactInfo, sourceDocument) {
        const finalScore = analysis.finalScore;
        const insights = {
            entityAnalysis: `Terdeteksi ${entities.length} entitas bernama (nama orang, tempat, organisasi) yang difilter dari analisis plagiarisme`,
            semanticAssessment: '',
            confidence: 'high',
            detailedExplanation: '',
            specificFindings: [],
            recommendations: [],
            similarityBreakdown: this.generateSimilarityBreakdown(analysis),
            contentAnalysis: this.generateContentAnalysis(similarExcerpts, contactInfo)
        };
        
        // Generate detailed explanation of what caused the similarity percentage
        insights.detailedExplanation = this.generateDetailedExplanation(finalScore, analysis, similarExcerpts, sourceDocument);
        
        // Semantic assessment with specific details
        if (analysis.semanticLevel > 0.8) {
            insights.semanticAssessment = `Kesamaan semantik sangat tinggi (${Math.round(analysis.semanticLevel * 100)}%) - kemungkinan besar hasil penyalinan langsung dengan sedikit parafrase`;
            insights.confidence = 'very high';
            insights.specificFindings.push('Struktur kalimat hampir identik dengan sumber');
            insights.specificFindings.push('Penggunaan istilah dan terminologi yang sama persis');
        } else if (analysis.semanticLevel > 0.6) {
            insights.semanticAssessment = `Kesamaan semantik tinggi (${Math.round(analysis.semanticLevel * 100)}%) - terdapat tumpang tindih konten yang signifikan`;
            insights.confidence = 'high';
            insights.specificFindings.push('Konsep dan ide utama sangat mirip dengan sumber');
            insights.specificFindings.push('Urutan penyajian informasi mengikuti pola yang sama');
        } else if (analysis.semanticLevel > 0.4) {
            insights.semanticAssessment = `Kesamaan semantik sedang (${Math.round(analysis.semanticLevel * 100)}%) - beberapa konsep dan ide yang sama`;
            insights.confidence = 'medium';
            insights.specificFindings.push('Terdapat beberapa kesamaan dalam konsep utama');
            insights.specificFindings.push('Beberapa frasa atau terminologi teknis yang sama');
        } else {
            insights.semanticAssessment = `Kesamaan semantik rendah (${Math.round(analysis.semanticLevel * 100)}%) - konten tampak original`;
            insights.confidence = 'low';
            insights.specificFindings.push('Konten menunjukkan originalitas yang baik');
            insights.specificFindings.push('Pendekatan dan sudut pandang yang berbeda dari sumber');
        }
        
        // Generate specific recommendations based on findings
        insights.recommendations = this.generateSpecificRecommendations(finalScore, analysis, similarExcerpts);
        
        return insights;
    }

    // Generate detailed explanation of similarity causes
    generateDetailedExplanation(finalScore, analysis, similarExcerpts, sourceDocument) {
        const percentage = Math.round(finalScore * 100);
        let explanation = `Tingkat kesamaan ${percentage}% dengan dokumen "${sourceDocument}" disebabkan oleh kombinasi faktor berikut:\n\n`;
        
        // Word-level analysis
        if (analysis.wordLevel > 0.5) {
            explanation += `• **Kesamaan Tingkat Kata (${Math.round(analysis.wordLevel * 100)}%)**: Penggunaan kata-kata dan frasa yang hampir identik. `;
            if (analysis.wordLevel > 0.8) {
                explanation += `Ini menunjukkan kemungkinan penyalinan langsung tanpa parafrase yang memadai.\n`;
            } else {
                explanation += `Terdapat overlap signifikan dalam pemilihan kata dan terminologi.\n`;
            }
        }
        
        // Semantic analysis
        if (analysis.semanticLevel > 0.4) {
            explanation += `• **Kesamaan Semantik (${Math.round(analysis.semanticLevel * 100)}%)**: Kesamaan makna dan konsep utama. `;
            if (analysis.semanticLevel > 0.7) {
                explanation += `Ide-ide utama disampaikan dengan cara yang sangat mirip.\n`;
            } else {
                explanation += `Beberapa konsep dan pendekatan yang sama dalam menyampaikan ide.\n`;
            }
        }
        
        // Structural analysis
        if (analysis.structuralLevel > 0.6) {
            explanation += `• **Kesamaan Struktur (${Math.round(analysis.structuralLevel * 100)}%)**: Pola organisasi dan alur penyajian informasi yang mirip.\n`;
        }
        
        // Similar excerpts analysis
        if (similarExcerpts && similarExcerpts.length > 0) {
            const highSimilarity = similarExcerpts.filter(excerpt => excerpt.similarity > 80);
            if (highSimilarity.length > 0) {
                explanation += `• **Frasa Identik**: Ditemukan ${highSimilarity.length} kalimat dengan kesamaan >80% yang menunjukkan kemungkinan penyalinan langsung.\n`;
            }
            
            const moderateSimilarity = similarExcerpts.filter(excerpt => excerpt.similarity > 60 && excerpt.similarity <= 80);
            if (moderateSimilarity.length > 0) {
                explanation += `• **Parafrase Minimal**: Terdapat ${moderateSimilarity.length} kalimat dengan parafrase yang tidak memadai (60-80% kesamaan).\n`;
            }
        }
        
        return explanation;
    }

    // Generate similarity breakdown analysis
    generateSimilarityBreakdown(analysis) {
        return {
            wordLevel: {
                score: Math.round(analysis.wordLevel * 100),
                interpretation: analysis.wordLevel > 0.7 ? 'Penggunaan kata hampir identik' : 
                               analysis.wordLevel > 0.5 ? 'Banyak kata yang sama digunakan' : 
                               'Pemilihan kata cukup berbeda'
            },
            semanticLevel: {
                score: Math.round(analysis.semanticLevel * 100),
                interpretation: analysis.semanticLevel > 0.7 ? 'Makna dan konsep hampir sama' : 
                               analysis.semanticLevel > 0.5 ? 'Ide utama memiliki kesamaan' : 
                               'Pendekatan dan ide cukup berbeda'
            },
            structuralLevel: {
                score: Math.round(analysis.structuralLevel * 100),
                interpretation: analysis.structuralLevel > 0.7 ? 'Struktur penyajian sangat mirip' : 
                               analysis.structuralLevel > 0.5 ? 'Pola organisasi informasi serupa' : 
                               'Struktur penyajian berbeda'
            }
        };
    }

    // Generate content analysis summary
    generateContentAnalysis(similarExcerpts, contactInfo) {
        const analysis = {
            excerptAnalysis: '',
            contactFilteringInfo: contactInfo.details.join('. '),
            recommendations: []
        };
        
        if (similarExcerpts && similarExcerpts.length > 0) {
            const highSimilarity = similarExcerpts.filter(e => e.similarity > 80).length;
            const moderateSimilarity = similarExcerpts.filter(e => e.similarity > 60 && e.similarity <= 80).length;
            
            analysis.excerptAnalysis = `Analisis konten menunjukkan ${similarExcerpts.length} bagian dengan kesamaan signifikan: `;
            if (highSimilarity > 0) {
                analysis.excerptAnalysis += `${highSimilarity} bagian dengan kesamaan sangat tinggi (>80%), `;
            }
            if (moderateSimilarity > 0) {
                analysis.excerptAnalysis += `${moderateSimilarity} bagian dengan kesamaan sedang (60-80%). `;
            }
        } else {
            analysis.excerptAnalysis = 'Tidak ditemukan bagian konten dengan kesamaan yang signifikan (>60%).';
        }
        
        return analysis;
    }

    // Generate specific actionable recommendations
    generateSpecificRecommendations(finalScore, analysis, similarExcerpts) {
        const recommendations = [];
        
        if (finalScore > 0.7) {
            recommendations.push('🔄 **Parafrase Menyeluruh**: Tulis ulang semua bagian yang mirip dengan menggunakan kata-kata dan struktur kalimat yang benar-benar berbeda');
            recommendations.push('💡 **Tambah Analisis Original**: Sertakan interpretasi, analisis, atau sudut pandang pribadi Anda terhadap topik tersebut');
            recommendations.push('📚 **Sitasi yang Tepat**: Pastikan semua ide yang berasal dari sumber lain diberi kutipan yang sesuai dengan format akademik');
            
            if (analysis.semanticLevel > 0.8) {
                recommendations.push('⚠️ **Prioritas Tinggi**: Konten perlu ditulis ulang secara signifikan untuk menghindari tuduhan plagiarisme');
            }
        } else if (finalScore > 0.4) {
            recommendations.push('✏️ **Perbaiki Parafrase**: Gunakan sinonim, ubah struktur kalimat, dan variasikan cara penyampaian ide');
            recommendations.push('📖 **Tambah Referensi**: Berikan kutipan yang jelas untuk semua sumber yang dirujuk');
            recommendations.push('🎯 **Fokus Originalitas**: Tambahkan lebih banyak konten original dan analisis pribadi');
            
            if (similarExcerpts && similarExcerpts.length > 3) {
                recommendations.push('🔍 **Perhatian Khusus**: Terdapat beberapa bagian yang perlu parafrase lebih baik');
            }
        } else {
            recommendations.push('✅ **Tingkat Originalitas Baik**: Pertahankan standar penulisan yang sudah baik ini');
            recommendations.push('📝 **Terus Sitasi**: Lanjutkan memberikan kutipan yang tepat untuk sumber yang dirujuk');
            recommendations.push('🌟 **Kembangkan Lebih**: Tambahkan lebih banyak perspektif atau analisis original untuk memperkaya konten');
        }
        
        // Add specific recommendations based on similar excerpts
        if (similarExcerpts && similarExcerpts.length > 0) {
            const topExcerpt = similarExcerpts[0];
            if (topExcerpt.similarity > 85) {
                recommendations.push(`🎯 **Bagian Prioritas**: Kalimat "${topExcerpt.targetSentence}" memiliki kesamaan ${topExcerpt.similarity}% dan perlu ditulis ulang sepenuhnya`);
            }
        }
        
        return recommendations;
    }
}

// Export for use in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedPlagiarismEngine;
} else {
    // Browser environment
    window.AdvancedPlagiarismEngine = AdvancedPlagiarismEngine;
}