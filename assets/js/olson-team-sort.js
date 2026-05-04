/* Sort team cards by role text (and then by name) */
(function () {
    const teamGrid = document.querySelector('.gh-team-grid');
    if (!teamGrid) return;

    const teamCards = Array.from(teamGrid.querySelectorAll('.gh-team-card'));
    if (teamCards.length < 2) return;

    const getRole = function (card) {
        return (card.querySelector('.gh-team-role')?.textContent || '').trim();
    };

    const getName = function (card) {
        return (card.querySelector('.gh-team-name')?.textContent || '').trim();
    };
    
    teamCards.sort(function (a, b) {
        const roleCompare = getRole(a).localeCompare(getRole(b), undefined, {
            sensitivity: 'base',
            numeric: true,
        });

        if (roleCompare !== 0) return roleCompare;

        return getName(a).localeCompare(getName(b), undefined, {
            sensitivity: 'base',
            numeric: true,
        });
    });

    const fragment = document.createDocumentFragment();
    teamCards.forEach(function (card) {
        fragment.appendChild(card);
    });

    teamGrid.appendChild(fragment);
})();
