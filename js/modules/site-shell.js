/**
 * MTG Site Shell – seitenübergreifende Hamburger-Navigation
 * Läuft auf allen Seiten ohne Vue/MathJax-Abhängigkeit.
 */
(function () {
    'use strict';

    const MODULES = [
        {
            key: 'home',
            label: 'Startseite',
            icon: '🏠',
            url: 'index.html',
            desc: 'Alle Module im Überblick'
        },
        {
            key: 'generator',
            label: 'Aufgabengenerator',
            icon: '📝',
            url: 'generator.html',
            desc: 'Aufgaben generieren & üben'
        },
        {
            key: 'generator-plus',
            label: 'Generator Plus',
            icon: '✨',
            url: 'generator-plus.html',
            desc: 'Weitere Aufgabentypen'
        },
        {
            key: 'visualisierung',
            label: 'Visualisierung',
            icon: '📊',
            url: 'visualisierung.html',
            desc: 'Mathe-Konzepte visuell erkunden'
        },
        {
            key: 'rechner-tools',
            label: 'Rechner-Tools',
            icon: '🧮',
            url: 'rechner-tools.html',
            desc: 'Flächen & Körper berechnen'
        },
        {
            key: 'kompetenzraster',
            label: 'Kompetenzraster',
            icon: '📋',
            url: 'kompetenzraster.html',
            desc: 'Klassen 5–10 im Überblick'
        }
    ];

    let _drawer = null;
    let _overlay = null;

    function getBaseHref() {
        // Zuverlässig für file:// (Windows) UND http:// (Live Server):
        // Prüfe nur, ob das letzte Verzeichnis-Segment ein bekannter Unterordner ist.
        const path = window.location.pathname;
        const dir = path.substring(0, path.lastIndexOf('/'));
        const lastSegment = dir.split('/').filter(Boolean).pop() || '';
        const SUBFOLDERS = ['kompetenzraster'];
        return SUBFOLDERS.includes(lastSegment) ? '../' : '';
    }

    function getCurrentKey() {
        const file = window.location.pathname.split('/').pop() || 'index.html';
        const map = {
            'index.html': 'home',
            '': 'home',
            'generator.html': 'generator',
            'generator-plus.html': 'generator-plus',
            'visualisierung.html': 'visualisierung',
            'rechner-tools.html': 'rechner-tools',
            'kompetenzraster.html': 'kompetenzraster'
        };
        return map[file] ?? '';
    }

    function openNav() {
        if (!_drawer) return;
        _drawer.classList.add('is-open');
        _overlay.classList.add('is-open');
        document.body.classList.add('site-nav-is-open');
        const first = _drawer.querySelector('.site-nav-item');
        if (first) first.focus();
    }

    function closeNav() {
        if (!_drawer) return;
        _drawer.classList.remove('is-open');
        _overlay.classList.remove('is-open');
        document.body.classList.remove('site-nav-is-open');
        const btn = document.querySelector('.site-hamburger');
        if (btn) btn.focus();
    }

    function buildDrawer() {
        const activeKey = getCurrentKey();
        const base = getBaseHref();

        const drawer = document.createElement('div');
        drawer.className = 'site-nav-drawer';
        drawer.setAttribute('aria-hidden', 'true');

        const hdr = document.createElement('div');
        hdr.className = 'site-nav-header';

        const title = document.createElement('span');
        title.className = 'site-nav-title';
        title.textContent = 'Module';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'site-nav-close';
        closeBtn.setAttribute('aria-label', 'Menü schließen');
        closeBtn.innerHTML = '&#x2715;';
        closeBtn.addEventListener('click', closeNav);

        hdr.appendChild(title);
        hdr.appendChild(closeBtn);

        const nav = document.createElement('nav');
        nav.className = 'site-nav-list';
        nav.setAttribute('aria-label', 'Hauptnavigation');

        MODULES.forEach(function (mod) {
            const a = document.createElement('a');
            a.href = base + mod.url;
            a.className = 'site-nav-item' + (mod.key === activeKey ? ' is-active' : '');
            a.setAttribute('aria-current', mod.key === activeKey ? 'page' : 'false');
            a.innerHTML =
                '<span class="site-nav-item-icon" aria-hidden="true">' + mod.icon + '</span>' +
                '<span class="site-nav-item-text">' +
                '<strong>' + mod.label + '</strong>' +
                '<span>' + mod.desc + '</span>' +
                '</span>';
            nav.appendChild(a);
        });

        drawer.appendChild(hdr);
        drawer.appendChild(nav);
        return drawer;
    }

    function init() {
        _overlay = document.createElement('div');
        _overlay.className = 'site-nav-overlay';
        _overlay.addEventListener('click', closeNav);

        _drawer = buildDrawer();

        document.body.appendChild(_overlay);
        document.body.appendChild(_drawer);

        // Event-Delegation – funktioniert auch für Vue-gerenderte Buttons
        document.addEventListener('click', function (e) {
            if (e.target.closest('.site-hamburger')) openNav();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && _drawer.classList.contains('is-open')) closeNav();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.MTGSiteShell = { openNav: openNav, closeNav: closeNav };
    window.MTGSiteShellModule = window.MTGSiteShell;
})();
