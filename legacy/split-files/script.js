import { musicData } from './data.js';

// Track which sections are expanded
const sectionStates = {
    core: false,
    rhythm: false,
    bass: false,
    melodic: false,
    texture: false,
    production: false
};

// Track current active tab
let currentTab = 'all';

// Phase 2: Enhanced toggle with animations and preferences
function toggleSection(sectionName) {
    sectionStates[sectionName] = !sectionStates[sectionName];
    updateSectionVisibility(sectionName);
    updateSelectionBadges();
    savePreferences();
}

function updateSectionVisibility(sectionName) {
    const isExpanded = sectionStates[sectionName];
    const header = document.querySelector(`.section-header.${sectionName}`);
    const columnHeaders = document.querySelectorAll(`.column-header.${sectionName}`);
    const dataCells = document.querySelectorAll(`.data-cell.${sectionName}`);
    const icon = header.querySelector('.toggle-icon');
    
    if (isExpanded) {
        header.classList.remove('collapsed');
        header.classList.add('expanded');
        icon.textContent = '➖';
        icon.classList.remove('rotated');
        
        columnHeaders.forEach(col => col.classList.remove('hidden'));
        dataCells.forEach(cell => cell.classList.remove('hidden'));
        
        // Update colspan
        const colspan = columnHeaders.length;
        header.setAttribute('colspan', colspan);
    } else {
        header.classList.add('collapsed');
        header.classList.remove('expanded');
        icon.textContent = '➕';
        icon.classList.add('rotated');
        
        columnHeaders.forEach(col => col.classList.add('hidden'));
        dataCells.forEach(cell => cell.classList.add('hidden'));
        
        // Set colspan to 1 when collapsed
        header.setAttribute('colspan', '1');
    }
}

// Focus Mode functionality
function focusOnSection(targetSection) {
    const sections = ['core', 'rhythm', 'bass', 'melodic', 'texture', 'production'];
    
    // Add focus mode class to container
    document.querySelector('.container').classList.add('focus-mode-active');
    
    sections.forEach(section => {
        const header = document.querySelector(`.section-header.${section}`);
        if (section === targetSection) {
            // Expand target section
            if (!sectionStates[section]) {
                sectionStates[section] = true;
                updateSectionVisibility(section);
            }
            header.classList.add('focused');
        } else {
            // Collapse other sections
            if (sectionStates[section]) {
                sectionStates[section] = false;
                updateSectionVisibility(section);
            }
            header.classList.remove('focused');
        }
    });
    
    // Smooth scroll to focused section
    setTimeout(() => {
        document.querySelector(`.section-header.${targetSection}`).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }, 300);
    
    updateSelectionBadges();
    savePreferences();
}

// Selection badge functionality
function updateSelectionBadges() {
    const sections = ['core', 'rhythm', 'bass', 'melodic', 'texture', 'production'];
    
    sections.forEach(section => {
        const selects = document.querySelectorAll(`.data-cell.${section} select`);
        let count = 0;
        
        selects.forEach(select => {
            if (select.value && select.value !== '') {
                count++;
            }
        });
        
        const badge = document.querySelector(`.section-header.${section} .selection-badge`);
        if (badge) {
            badge.textContent = count;
            badge.style.display = (!sectionStates[section] && count > 0) ? 'inline-block' : 'none';
        }
    });
}

// localStorage functionality
function savePreferences() {
    try {
        const preferences = {
            sectionStates: sectionStates,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('musicPromptPreferences', JSON.stringify(preferences));
    } catch (e) {
        console.warn('Could not save preferences to localStorage:', e);
    }
}

function loadPreferences() {
    try {
        const saved = localStorage.getItem('musicPromptPreferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            if (preferences.sectionStates) {
                // Update sectionStates with saved values
                Object.keys(preferences.sectionStates).forEach(section => {
                    if (section in sectionStates) {
                        sectionStates[section] = preferences.sectionStates[section];
                    }
                });
            }
        }
    } catch (e) {
        console.warn('Could not load preferences from localStorage:', e);
    }
}

function toggleAllSections() {
    const allExpanded = Object.values(sectionStates).every(state => state);
    
    // Clear focus mode if active
    document.querySelector('.container').classList.remove('focus-mode-active');
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.remove('focused');
    });
    
    // Toggle all sections
    Object.keys(sectionStates).forEach(section => {
        sectionStates[section] = !allExpanded;
        updateSectionVisibility(section);
    });
    
    // Update button text
    const btn = document.querySelector('.btn-secondary[onclick="toggleAllSections()"]');
    btn.innerHTML = allExpanded ? '⤵️ Expand All' : '⤴️ Collapse All';
    
    updateSelectionBadges();
    savePreferences();
}

function clearAll() {
    if (!confirm('Are you sure you want to clear all selections? This cannot be undone.')) {
        return;
    }
    
    // Clear all selections
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        if (select.id !== 'styleSelect') {
            select.value = '';
        }
    });
    
    // Clear output
    document.getElementById('promptOutput').style.display = 'none';
    document.getElementById('cleanPromptText').textContent = '';
    document.getElementById('detailedBreakdown').textContent = '';
    
    // Reset style selector
    document.getElementById('styleSelect').value = '';
    
    // Update badges
    updateSelectionBadges();
    
    // Clear saved matrix data
    localStorage.removeItem('musicMatrixData');
    
    // Clear focus mode if active
    document.querySelector('.container').classList.remove('focus-mode-active');
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.remove('focused');
    });
}

function generateStylePreset() {
    const styleSelect = document.getElementById('styleSelect');
    const selectedStyle = styleSelect.value;
    
    if (!selectedStyle) {
        alert('Please select a style first!');
        return;
    }
    
    // Clear all first
    clearAll();
    // Keep the style selected
    styleSelect.value = selectedStyle;
    
    if (selectedStyle === 'random') {
        // Handle random generation across all styles
        const sections = ['core', 'rhythm', 'bass', 'melodic', 'texture', 'production'];
        
        // For each section, get 4-5 column positions
        const sectionColumnCounts = {
            'core': 4,
            'rhythm': 5,
            'bass': 3,
            'melodic': 4,
            'texture': 4,
            'production': 4
        };
        
        sections.forEach(section => {
            const columnCount = sectionColumnCounts[section];
            
            // For each column position in this section
            for (let colIndex = 0; colIndex < columnCount; colIndex++) {
                // Get all select elements at this column position across all rows
                const allSelectsInColumn = [];
                const rows = document.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    const sectionSelects = row.querySelectorAll(`.data-cell.${section} select`);
                    if (sectionSelects[colIndex]) {
                        allSelectsInColumn.push(sectionSelects[colIndex]);
                    }
                });
                
                if (allSelectsInColumn.length > 0) {
                    // Pick a random select from this column
                    const randomSelect = allSelectsInColumn[Math.floor(Math.random() * allSelectsInColumn.length)];
                    
                    // Get available options (skip the first "Select..." option)
                    const options = Array.from(randomSelect.querySelectorAll('option')).slice(1);
                    
                    if (options.length > 0) {
                        // Pick a random option and set its value
                        const randomOption = options[Math.floor(Math.random() * options.length)];
                        randomSelect.value = randomOption.value;
                    }
                }
            }
        });
        
    } else {
        // Handle specific styles - randomly select from that style's row
        const row = document.querySelector(`tr[data-style="${selectedStyle}"]`);
        if (!row) return;
        
        const selects = row.querySelectorAll('select');
        selects.forEach(select => {
            const options = Array.from(select.querySelectorAll('option')).slice(1); // Skip "Select..."
            if (options.length > 0) {
                const randomOption = options[Math.floor(Math.random() * options.length)];
                select.value = randomOption.value;
            }
        });
    }
    
    // Auto-generate the prompt
    generatePrompt();
}


function exportToCSV() {
    const table = document.getElementById('promptMatrix');
    let csv = [];
    
    // Add section headers
    let sectionRow = ['Style'];
    const sections = ['CORE FOUNDATION', 'RHYTHM SECTION', 'BASS FOUNDATION', 'MELODIC ELEMENTS', 'TEXTURE & ATMOSPHERE', 'PRODUCTION & CHARACTER'];
    const sectionCounts = [4, 5, 3, 4, 4, 4];
    
    for (let i = 0; i < sections.length; i++) {
        for (let j = 0; j < sectionCounts[i]; j++) {
            sectionRow.push(sections[i]);
        }
    }
    csv.push(sectionRow.join(','));
    
    // Add column headers
    let headerRow = ['Style'];
    const headers = table.querySelectorAll('thead tr:nth-child(2) th');
    for (let i = 1; i < headers.length; i++) {
        if (!headers[i].classList.contains('style-cell')) {
            headerRow.push(headers[i].textContent.trim());
        }
    }
    csv.push(headerRow.join(','));
    
    // Add data rows
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        let csvRow = [];
        const styleName = row.querySelector('.style-cell').textContent;
        csvRow.push(styleName);
        
        // Get all data cells, including hidden ones
        const cells = row.querySelectorAll('.data-cell');
        cells.forEach(cell => {
            const select = cell.querySelector('select');
            if (select) {
                csvRow.push(select.value || '');
            }
        });
        csv.push(csvRow.join(','));
    });
    
    // Download CSV
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'music_prompt_matrix.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function generatePrompt() {
    // Only generate from visible rows based on active tab
    const rows = currentTab === 'all' 
        ? document.querySelectorAll('tbody tr')
        : document.querySelectorAll('tbody tr.tab-visible');
    
    let detailedPrompts = [];
    let allValues = [];
    
    rows.forEach(row => {
        // Skip hidden rows
        if (row.classList.contains('tab-hidden')) {
            return;
        }
        
        const styleName = row.querySelector('.style-cell').textContent;
        const selects = row.querySelectorAll('select');
        const values = [];
        
        selects.forEach(select => {
            if (select.value) {
                values.push(select.value);
                allValues.push(select.value);
            }
        });
        
        if (values.length > 0) {
            detailedPrompts.push(`${styleName}: ${values.join(', ')}`);
        }
    });
    
    if (allValues.length === 0) {
        alert('Please select some options first!');
        return;
    }
    
    // Generate clean prompt (just the values)
    const cleanPrompt = `Create a music track with the following elements: ${allValues.join(', ')}`;
    
    // Generate detailed breakdown
    const detailedBreakdown = `${detailedPrompts.join('\n\n')}`;
    
    // Update the display
    document.getElementById('cleanPromptText').textContent = cleanPrompt;
    document.getElementById('detailedBreakdown').textContent = detailedBreakdown;
    document.getElementById('promptOutput').style.display = 'block';
    
    // Auto-select the clean prompt text for easy copying
    const range = document.createRange();
    range.selectNode(document.getElementById('cleanPromptText'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
}

function copyToClipboard() {
    const text = document.getElementById('cleanPromptText').textContent;
    
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopiedFeedback();
        }).catch(err => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopiedFeedback();
    } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy to clipboard. Please select and copy manually.');
    }
    
    document.body.removeChild(textArea);
}

function showCopiedFeedback() {
    const btn = document.querySelector('.copy-btn');
    const originalText = btn.textContent;
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('copied');
    }, 2000);
}

// Tab switching function
function switchToTab(tabName) {
    currentTab = tabName;
    
    // Update active tab button
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Show/hide rows based on tab
    const rows = document.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const rowStyle = row.getAttribute('data-style');
        
        if (tabName === 'all') {
            // Show all rows for "All Styles" tab
            row.classList.remove('tab-hidden');
            row.classList.add('tab-visible', 'fade-in');
        } else if (rowStyle === tabName) {
            // Show only matching style row
            row.classList.remove('tab-hidden');
            row.classList.add('tab-visible', 'fade-in');
        } else {
            // Hide non-matching rows
            row.classList.remove('tab-visible', 'fade-in');
            row.classList.add('tab-hidden');
        }
    });
    
    // Remove fade-in class after animation completes
    setTimeout(() => {
        rows.forEach(row => {
            row.classList.remove('fade-in');
        });
    }, 300);
    
    // Save tab preference to localStorage
    localStorage.setItem('activeTab', tabName);
}

// Keyboard navigation for tabs
function setupKeyboardNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContainer = document.querySelector('.tab-navigation');
    
    // Add tabindex to make buttons focusable
    tabButtons.forEach((btn, index) => {
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('data-index', index);
    });
    
    // Handle keyboard events
    document.addEventListener('keydown', function(e) {
        // Check if we're not in an input field
        if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') {
            return;
        }
        
        const activeElement = document.activeElement;
        const isTabButton = activeElement && activeElement.classList.contains('tab-button');
        
        // Number keys 1-9 for quick tab switching
        if (e.key >= '1' && e.key <= '9') {
            const index = parseInt(e.key) - 1;
            if (tabButtons[index]) {
                tabButtons[index].click();
                tabButtons[index].focus();
                e.preventDefault();
            }
        }
        
        // Arrow key navigation when a tab button is focused
        if (isTabButton) {
            const currentIndex = parseInt(activeElement.getAttribute('data-index'));
            let newIndex = currentIndex;
            
            switch(e.key) {
                case 'ArrowLeft':
                    newIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
                    break;
                case 'ArrowRight':
                    newIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
                    break;
                case 'Home':
                    newIndex = 0;
                    break;
                case 'End':
                    newIndex = tabButtons.length - 1;
                    break;
                case 'Enter':
                case ' ':
                    activeElement.click();
                    e.preventDefault();
                    return;
                default:
                    return;
            }
            
            if (newIndex !== currentIndex) {
                tabButtons[newIndex].focus();
                tabButtons[newIndex].click();
                
                // Ensure the focused button is visible in the container
                const buttonRect = tabButtons[newIndex].getBoundingClientRect();
                const containerRect = tabContainer.getBoundingClientRect();
                
                if (buttonRect.left < containerRect.left) {
                    tabContainer.scrollLeft -= containerRect.left - buttonRect.left + 20;
                } else if (buttonRect.right > containerRect.right) {
                    tabContainer.scrollLeft += buttonRect.right - containerRect.right + 20;
                }
                
                e.preventDefault();
            }
        }
        
        // Alt+T to focus on tab navigation
        if (e.altKey && e.key.toLowerCase() === 't') {
            const activeTab = document.querySelector('.tab-button.active');
            if (activeTab) {
                activeTab.focus();
                e.preventDefault();
            }
        }
    });
}

// Touch swipe support for mobile
function setupTouchSupport() {
    const tabContainer = document.querySelector('.tab-navigation');
    const tabButtons = document.querySelectorAll('.tab-button');
    let touchStartX = 0;
    let touchEndX = 0;
    
    tabContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    tabContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const currentIndex = Array.from(tabButtons).findIndex(btn => btn.classList.contains('active'));
            let newIndex = currentIndex;
            
            if (diff > 0) {
                // Swipe left - next tab
                newIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : currentIndex;
            } else {
                // Swipe right - previous tab
                newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
            }
            
            if (newIndex !== currentIndex) {
                tabButtons[newIndex].click();
                
                // Scroll the new tab into view
                tabButtons[newIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }
}

// Initialize collapsed state and restore tab on page load
document.addEventListener('DOMContentLoaded', function() {
    buildTable();
    // Load saved preferences first
    loadPreferences();
    
    // Initialize section visibility based on loaded preferences
    Object.keys(sectionStates).forEach(section => {
        updateSectionVisibility(section);
    });
    
    // Initialize selection badges
    updateSelectionBadges();
    
    // Add event listeners for selection changes to update badges
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', function() {
            updateSelectionBadges();
            // Also save matrix data when selections change
            saveMatrixData();
        });
    });
    
    // Restore last active tab from localStorage
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab && document.querySelector(`.tab-button[data-tab="${savedTab}"]`)) {
        switchToTab(savedTab);
    } else {
        // Default to "all" tab
        switchToTab('all');
    }
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
    
    // Setup touch support for mobile
    if ('ontouchstart' in window) {
        setupTouchSupport();
    }
    
    // Load saved matrix data
    loadMatrixData();
});

// Save matrix data to localStorage
function saveMatrixData() {
    try {
        const matrixData = {};
        const rows = document.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const styleName = row.getAttribute('data-style');
            const rowData = {};
            const selects = row.querySelectorAll('select');
            
            selects.forEach((select, index) => {
                if (select.value) {
                    rowData[index] = select.value;
                }
            });
            
            if (Object.keys(rowData).length > 0) {
                matrixData[styleName] = rowData;
            }
        });
        
        localStorage.setItem('musicMatrixData', JSON.stringify(matrixData));
    } catch (e) {
        console.warn('Could not save matrix data:', e);
    }
}

// Load matrix data from localStorage
function loadMatrixData() {
    try {
        const saved = localStorage.getItem('musicMatrixData');
        if (saved) {
            const matrixData = JSON.parse(saved);
            
            Object.keys(matrixData).forEach(styleName => {
                const row = document.querySelector(`tr[data-style="${styleName}"]`);
                if (row) {
                    const selects = row.querySelectorAll('select');
                    const rowData = matrixData[styleName];
                    
                    Object.keys(rowData).forEach(index => {
                        if (selects[index]) {
                            selects[index].value = rowData[index];
                        }
                    });
                }
            });
            
            // Update badges after loading data
            updateSelectionBadges();
        }
    } catch (e) {
        console.warn('Could not load matrix data:', e);
    }
}

// ==================== PRESET MANAGEMENT SYSTEM ====================

// Get current matrix state for preset saving
function getCurrentMatrixState() {
    const matrixData = {};
    const rows = document.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const styleName = row.getAttribute('data-style');
        const rowData = {};
        const selects = row.querySelectorAll('select');
        
        selects.forEach((select, index) => {
            if (select.value) {
                rowData[index] = select.value;
            }
        });
        
        if (Object.keys(rowData).length > 0) {
            matrixData[styleName] = rowData;
        }
    });
    
    return matrixData;
}

// Apply matrix state from preset
function applyMatrixState(matrixData) {
    // Clear all selections first
    const allSelects = document.querySelectorAll('tbody select');
    allSelects.forEach(select => {
        select.value = '';
    });
    
    // Apply preset data
    Object.keys(matrixData).forEach(styleName => {
        const row = document.querySelector(`tr[data-style="${styleName}"]`);
        if (row) {
            const selects = row.querySelectorAll('select');
            const rowData = matrixData[styleName];
            
            Object.keys(rowData).forEach(index => {
                if (selects[index]) {
                    selects[index].value = rowData[index];
                }
            });
        }
    });
    
    // Update UI
    updateSelectionBadges();
    saveMatrixData();
}

// Get all presets from localStorage
function getPresets() {
    try {
        const saved = localStorage.getItem('musicPromptPresets');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.warn('Could not load presets:', e);
        return [];
    }
}

// Save presets to localStorage
function savePresetsToStorage(presets) {
    try {
        localStorage.setItem('musicPromptPresets', JSON.stringify(presets));
        return true;
    } catch (e) {
        console.error('Could not save presets:', e);
        showToast('Error saving presets. Storage may be full.', 'error');
        return false;
    }
}

// Save current configuration as preset
function savePreset() {
    const nameInput = document.getElementById('presetName');
    const favoriteCheckbox = document.getElementById('presetFavorite');
    const name = nameInput.value.trim();
    
    if (!name) {
        showToast('Please enter a preset name', 'warning');
        nameInput.focus();
        return;
    }
    
    const matrixState = getCurrentMatrixState();
    
    if (Object.keys(matrixState).length === 0) {
        showToast('No selections to save', 'warning');
        closeSavePresetModal();
        return;
    }
    
    const preset = {
        id: Date.now().toString(),
        name: name,
        timestamp: new Date().toISOString(),
        isFavorite: favoriteCheckbox.checked,
        lastUsed: null,
        styleSelections: matrixState,
        sectionStates: { ...sectionStates },
        activeTab: currentTab
    };
    
    const presets = getPresets();
    
    // Check for duplicate names
    const existingIndex = presets.findIndex(p => p.name === name);
    if (existingIndex !== -1) {
        if (!confirm(`A preset named "${name}" already exists. Do you want to replace it?`)) {
            return;
        }
        presets[existingIndex] = preset;
    } else {
        presets.push(preset);
    }
    
    if (savePresetsToStorage(presets)) {
        showToast(`Preset "${name}" saved successfully!`, 'success');
        closeSavePresetModal();
        updatePresetDropdown();
        
        // Add to history
        addToHistory(name);
    }
}

// Load selected preset
function loadSelectedPreset() {
    const dropdown = document.getElementById('presetDropdown');
    const presetId = dropdown.value;
    
    if (!presetId) {
        showToast('Please select a preset to load', 'warning');
        return;
    }
    
    const presets = getPresets();
    const preset = presets.find(p => p.id === presetId);
    
    if (!preset) {
        showToast('Preset not found', 'error');
        updatePresetDropdown();
        return;
    }
    
    // Check if there are current selections
    const currentState = getCurrentMatrixState();
    if (Object.keys(currentState).length > 0) {
        if (!confirm('Loading this preset will replace your current selections. Continue?')) {
            return;
        }
    }
    
    // Apply preset
    applyMatrixState(preset.styleSelections);
    
    // Restore section states if available
    if (preset.sectionStates) {
        Object.keys(preset.sectionStates).forEach(section => {
            if (section in sectionStates) {
                sectionStates[section] = preset.sectionStates[section];
                updateSectionVisibility(section);
            }
        });
    }
    
    // Restore tab if available
    if (preset.activeTab && document.querySelector(`.tab-button[data-tab="${preset.activeTab}"]`)) {
        switchToTab(preset.activeTab);
    }
    
    // Update last used timestamp
    preset.lastUsed = new Date().toISOString();
    savePresetsToStorage(presets);
    
    showToast(`Loaded preset: ${preset.name}`, 'success');
    
    // Show preset info
    showPresetInfo(preset);
}

// Delete selected preset
function deleteSelectedPreset() {
    const dropdown = document.getElementById('presetDropdown');
    const presetId = dropdown.value;
    
    if (!presetId) {
        showToast('Please select a preset to delete', 'warning');
        return;
    }
    
    const presets = getPresets();
    const preset = presets.find(p => p.id === presetId);
    
    if (!preset) {
        showToast('Preset not found', 'error');
        return;
    }
    
    if (!confirm(`Are you sure you want to delete the preset "${preset.name}"?`)) {
        return;
    }
    
    const filteredPresets = presets.filter(p => p.id !== presetId);
    
    if (savePresetsToStorage(filteredPresets)) {
        showToast(`Deleted preset: ${preset.name}`, 'success');
        dropdown.value = '';
        updatePresetDropdown();
        hidePresetInfo();
    }
}

// Export presets to JSON file
function exportPresets() {
    const presets = getPresets();
    
    if (presets.length === 0) {
        showToast('No presets to export', 'warning');
        return;
    }
    
    const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        presets: presets
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `music_presets_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Import presets from JSON file
function importPresets(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (!data.presets || !Array.isArray(data.presets)) {
                throw new Error('Invalid preset file format');
            }
            
            const existingPresets = getPresets();
            let importedCount = 0;
            let updatedCount = 0;
            
            data.presets.forEach(newPreset => {
                const existingIndex = existingPresets.findIndex(p => p.id === newPreset.id || p.name === newPreset.name);
                if (existingIndex !== -1) {
                    // Update existing preset
                    existingPresets[existingIndex] = { ...existingPresets[existingIndex], ...newPreset };
                    updatedCount++;
                } else {
                    // Add new preset
                    existingPresets.push(newPreset);
                    importedCount++;
                }
            });
            
            if (savePresetsToStorage(existingPresets)) {
                showToast(`Imported ${importedCount} new and updated ${updatedCount} existing presets.`, 'success');
                updatePresetDropdown();
            }
            
        } catch (err) {
            console.error('Error importing presets:', err);
            showToast('Failed to import presets. Check file format.', 'error');
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = null;
}

// Update preset dropdown list
function updatePresetDropdown() {
    const dropdown = document.getElementById('presetDropdown');
    const favoritesGroup = document.getElementById('favoritesGroup');
    const userPresetsGroup = document.getElementById('userPresetsGroup');
    const historyGroup = document.getElementById('historyGroup');
    
    // Clear existing options
    favoritesGroup.innerHTML = '';
    userPresetsGroup.innerHTML = '';
    historyGroup.innerHTML = '';
    
    const presets = getPresets();
    
    // Sort presets: favorites first, then by name
    presets.sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return a.name.localeCompare(b.name);
    });
    
    if (presets.length === 0) {
        const option = document.createElement('option');
        option.textContent = 'No presets saved';
        option.disabled = true;
        userPresetsGroup.appendChild(option);
    } else {
        presets.forEach(preset => {
            const option = document.createElement('option');
            option.value = preset.id;
            option.textContent = preset.name;
            
            if (preset.isFavorite) {
                favoritesGroup.appendChild(option);
            } else {
                userPresetsGroup.appendChild(option);
            }
        });
    }
    
    // Populate history
    const history = getHistory();
    if (history.length > 0) {
        history.forEach(name => {
            const preset = presets.find(p => p.name === name);
            if (preset) {
                const option = document.createElement('option');
                option.value = preset.id;
                option.textContent = preset.name;
                historyGroup.appendChild(option);
            }
        });
    }
}

// Show/hide preset modal
function showSavePresetModal() {
    document.getElementById('savePresetModal').style.display = 'block';
    document.getElementById('presetName').focus();
}

function closeSavePresetModal() {
    document.getElementById('savePresetModal').style.display = 'none';
    document.getElementById('presetName').value = '';
    document.getElementById('presetFavorite').checked = false;
}

// Show preset metadata
function showPresetInfo(preset) {
    const infoDiv = document.getElementById('presetInfo');
    const metadataSpan = document.getElementById('presetMetadata');
    
    const createdDate = new Date(preset.timestamp).toLocaleString();
    const lastUsedDate = preset.lastUsed ? new Date(preset.lastUsed).toLocaleString() : 'Never';
    
    metadataSpan.textContent = `Created: ${createdDate} | Last Used: ${lastUsedDate}`;
    infoDiv.style.display = 'block';
}

function hidePresetInfo() {
    document.getElementById('presetInfo').style.display = 'none';
}

// Toast notification system
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    
    let backgroundColor;
    switch(type) {
        case 'success': backgroundColor = 'linear-gradient(135deg, #48bb78, #38a169)'; break;
        case 'error': backgroundColor = 'linear-gradient(135deg, #f56565, #c53030)'; break;
        case 'warning': backgroundColor = 'linear-gradient(135deg, #ed8936, #dd6b20)'; break;
        default: backgroundColor = 'linear-gradient(135deg, #4a5568, #2d3748)';
    }
    
    toast.style.cssText = `
        background: ${backgroundColor};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.4s ease;
    `;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// History management
const MAX_HISTORY = 5;

function getHistory() {
    try {
        const saved = localStorage.getItem('musicPromptHistory');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
}

function addToHistory(presetName) {
    let history = getHistory();
    // Remove existing entry to move it to the top
    history = history.filter(item => item !== presetName);
    // Add to the front
    history.unshift(presetName);
    // Limit history size
    if (history.length > MAX_HISTORY) {
        history.pop();
    }
    localStorage.setItem('musicPromptHistory', JSON.stringify(history));
}

// Initial load
document.addEventListener('DOMContentLoaded', function() {
    updatePresetDropdown();
    
    document.getElementById('presetDropdown').addEventListener('change', function() {
        const presetId = this.value;
        if (presetId) {
            const presets = getPresets();
            const preset = presets.find(p => p.id === presetId);
            if (preset) {
                showPresetInfo(preset);
            }
        } else {
            hidePresetInfo();
        }
    });
});

function buildTable() {
    const tableBody = document.querySelector("#promptMatrix tbody");
    musicData.styles.forEach(style => {
        const row = document.createElement("tr");
        row.dataset.style = style.id;

        const styleCell = document.createElement("td");
        styleCell.className = "style-cell";
        styleCell.textContent = style.name;
        row.appendChild(styleCell);

        musicData.sections.forEach(section => {
            section.columns.forEach((column, columnIndex) => {
                const cell = document.createElement("td");
                cell.className = `data-cell ${section.id}`;

                const select = document.createElement("select");
                const defaultOption = document.createElement("option");
                defaultOption.value = "";
                defaultOption.textContent = "Select...";
                select.appendChild(defaultOption);

                const options = musicData.options[style.id][section.id][columnIndex];
                options.forEach(optionValue => {
                    const option = document.createElement("option");
                    option.value = optionValue.toLowerCase().replace(/\s/g, "-");
                    option.textContent = optionValue;
                    select.appendChild(option);
                });

                cell.appendChild(select);
                row.appendChild(cell);
            });
        });

        tableBody.appendChild(row);
    });
}

// Make functions available in the global scope for HTML onclick attributes
window.toggleSection = toggleSection;
window.focusOnSection = focusOnSection;
window.generateStylePreset = generateStylePreset;
window.generatePrompt = generatePrompt;
window.exportToCSV = exportToCSV;
window.toggleAllSections = toggleAllSections;
window.clearAll = clearAll;
window.showSavePresetModal = showSavePresetModal;
window.closeSavePresetModal = closeSavePresetModal;
window.savePreset = savePreset;
window.loadSelectedPreset = loadSelectedPreset;
window.deleteSelectedPreset = deleteSelectedPreset;
window.exportPresets = exportPresets;
window.importPresets = importPresets;
window.switchToTab = switchToTab;
window.copyToClipboard = copyToClipboard;  // Added missing function

// Error handler to catch missing function calls
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('is not defined')) {
        console.error('Missing function:', e.message);
        console.error('Please ensure all functions are properly exposed to global scope');
        console.error('Error occurred at:', e.filename, 'line:', e.lineno);
    }
});

// Debug logging to verify module loading
console.log('Script.js loaded successfully');
console.log('MusicData imported:', musicData ? 'Yes' : 'No');
if (musicData) {
    console.log('Available styles:', musicData.styles.map(s => s.name).join(', '));
}
