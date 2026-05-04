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

    const ROLE_ORDER = [
        'Professor',
        'Research Associate',
        'Research Technician',
        'Post Doctoral Researcher',
        'PhD Student/Candidate',
        'MSc Student',
        'Undergraduate Researcher',
    ];

    const getRoleRank = function (role) {
        const idx = ROLE_ORDER.findIndex(function (r) {
            return role.toLowerCase().startsWith(r.toLowerCase());
        });
        return idx === -1 ? ROLE_ORDER.length : idx;
    };

    teamCards.sort(function (a, b) {
        const rankA = getRoleRank(getRole(a));
        const rankB = getRoleRank(getRole(b));

        if (rankA !== rankB) return rankA - rankB;

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
