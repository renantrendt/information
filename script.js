document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const enButton = document.getElementById('en-btn');
    const ptButton = document.getElementById('pt-btn');
    const contentContainer = document.getElementById('content');
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Language toggle functionality
    enButton.addEventListener('click', function() {
        setActiveLanguage('en');
    });
    
    ptButton.addEventListener('click', function() {
        setActiveLanguage('pt');
    });
    
    // Load content from external files
    async function fetchContent(lang) {
        try {
            const response = await fetch(`${lang}.file`);
            if (!response.ok) {
                throw new Error(`Failed to load ${lang} content`);
            }
            const text = await response.text();
            return formatContent(text);
        } catch (error) {
            console.error('Error loading content:', error);
            return `<p>Error loading content: ${error.message}</p>`;
        }
    }
    
    // Format plain text to HTML with proper formatting
    function formatContent(text) {
        // Split text into lines
        const lines = text.split('\n');
        let html = '';
        let inParagraph = false;
        
        // Process each line
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Skip line numbers if present (from view_line_range output)
            const cleanLine = line.replace(/^\d+:\s/, '');
            
            // Skip empty lines
            if (!cleanLine) {
                if (inParagraph) {
                    html += '</p>\n';
                    inParagraph = false;
                }
                continue;
            }
            
            // Handle headings
            if (cleanLine.startsWith('The Four Agreements')) {
                html += `<h2>${cleanLine}</h2>\n`;
            } else if (cleanLine.startsWith('The four agreements') || cleanLine.startsWith('The Four Agreements:')) {
                html += `<h3>${cleanLine}</h3>\n`;
            } 
            // Handle strong text (numbered items or important concepts)
            else if (cleanLine.match(/^\d+\.\s/) || cleanLine.includes('==')) {
                const parts = cleanLine.split('==');
                if (parts.length > 1) {
                    // Handle definitions
                    html += `<p><strong>${parts[0].trim()}</strong> == ${parts[1].trim()}</p>\n`;
                } else {
                    // Handle numbered items
                    html += `<p><strong>${cleanLine}</strong></p>\n`;
                }
            }
            // Handle parenthetical explanations
            else if (cleanLine.startsWith('(') && cleanLine.endsWith(')')) {
                html += `<p class="explanation">${cleanLine}</p>\n`;
            }
            // Handle bracketed text
            else if ((cleanLine.startsWith('[') && cleanLine.endsWith(']')) ||
                     (cleanLine.startsWith('[[') && cleanLine.endsWith(']]'))) {
                html += `<p class="note">${cleanLine}</p>\n`;
            }
            // Regular paragraphs
            else {
                if (!inParagraph) {
                    html += '<p>';
                    inParagraph = true;
                }
                html += cleanLine + '<br>\n';
            }
        }
        
        // Close any open paragraph
        if (inParagraph) {
            html += '</p>\n';
        }
        
        return html;
    }
    
    async function setActiveLanguage(lang) {
        // Update button states
        if (lang === 'en') {
            enButton.classList.add('active');
            ptButton.classList.remove('active');
        } else {
            ptButton.classList.add('active');
            enButton.classList.remove('active');
        }
        
        // Save preference
        localStorage.setItem('language', lang);
        
        // Show loading indicator
        contentContainer.innerHTML = '<p>Loading content...</p>';
        
        // Load content for selected language
        const content = await fetchContent(lang);
        contentContainer.innerHTML = content;
    }
    
    // Load saved language preference or default to English
    const savedLanguage = localStorage.getItem('language') || 'en';
    setActiveLanguage(savedLanguage);
});
