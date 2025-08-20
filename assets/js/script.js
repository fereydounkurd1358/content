const tabButtonsWrapper = document.querySelector('.service-tab__btn-wrapper');
const tabButtons = document.querySelectorAll('.service-tab__btn');
const tabTabs = document.querySelectorAll('.service-tab__tab');

const mediaQuery = window.matchMedia('(max-width: 1440px)');
let currentActiveTab = 0;
let isSliding = false;

tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {

        if (btn.classList.contains('active')) return;

        // handle btnwrapper scroll behavior in mobile screen sizes
        if (mediaQuery.matches) {

            const parentRect = btn.parentElement.getBoundingClientRect();
            const childRect = btn.getBoundingClientRect();

            const scrollLeft = ((childRect.left - parentRect.left + btn.parentElement.scrollLeft) - 8);
            const final = scrollLeft - (btn.parentElement.clientWidth - btn.offsetWidth);
            
            if (index > currentActiveTab) {
                tabButtonsWrapper.scrollTo({ left: final, behavior: "smooth" })
            } else {
                tabButtonsWrapper.scrollTo({ left: scrollLeft, behavior: "smooth" })
            }
        }

        // reset animating when another animation is working
        if (isSliding) {
            tabTabs.forEach(tab => {
                tab.classList.remove('slide-off', 'slide-offR');
            });
        } else {
            isSliding = true;
        }

        // sliding tab contents based on got forward or backward
        if (index > currentActiveTab) {
            tabTabs.forEach(tab => {
                tab.classList.replace(tab.classList[1], 'slide-off');
                tab.classList.toggle('slide-on', tab.id === btn.dataset.tab);
                tab.addEventListener('animationend', (e) => {
                    if (e.animationName === 'slide-off') {
                        tab.classList.remove('slide-off');
                        isSliding = false;
                    }
                });
            });

        } else {
            tabTabs.forEach(tab => {
                tab.classList.replace(tab.classList[1], 'slide-offR');
                tab.classList.toggle('slide-onR', tab.id === btn.dataset.tab);
                tab.addEventListener('animationend', (e) => {
                    if (e.animationName === 'slide-offR') {
                        tab.classList.remove('slide-offR');
                        isSliding = false;
                    }
                });
            });
        }

        tabButtons.forEach(x => x.classList.remove('active'));
        btn.classList.add('active');
        currentActiveTab = index;

    });
});