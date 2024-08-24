document.addEventListener('DOMContentLoaded', function () {
    const offerCards = document.querySelectorAll('.offer-card');
    let expandedCard = null;
    const originalCardContents = new Map();

    offerCards.forEach(card => {
        // Store the original HTML content of each card
        originalCardContents.set(card, card.innerHTML);

        card.addEventListener('click', function (e) {
            if (e.target.tagName === 'SELECT') return;

            const offer = this.getAttribute('data-offer');

            if (expandedCard === this) {
                // Collapse this card
                this.classList.remove('expanded');
                this.innerHTML = originalCardContents.get(this);
                expandedCard = null;
            } else {
                if (expandedCard) {
                    // Collapse the previously expanded card
                    expandedCard.classList.remove('expanded');
                    expandedCard.innerHTML = originalCardContents.get(expandedCard);
                }

                // Expand this card
                this.classList.add('expanded');
                this.innerHTML = getExpandedCardHTML(offer);
                expandedCard = this;

                // Add event listeners to the new select elements
                this.querySelectorAll('select').forEach(select => {
                    select.addEventListener('change', function (e) {
                        e.stopPropagation();
                    });
                });
            }
        });
    });
});

function getExpandedCardHTML(offer) {
    return `
        <div class="selector-header">
            <div class="outer-circle">
                <div class="inner-circle"></div>
            </div>
            <div class="offer-details-expanded">
                <div class="offer-title">
                    <span>${offer}</span>
                    <span class="discount-badge">10% Off</span>
                </div>
                <div class="price">
                    <span class="current-price">$36.00 USD</span>
                    <span class="crossed-price">$40.00 USD</span>
                </div>
            </div>
        </div>
        <div class="selectors">
            <div class="selector-group">
                <span class="selector-label">#1</span>
                <select>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>
                <select>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Red">Red</option>
                </select>
            </div>
            <div class="selector-group">
                <span class="selector-label">#2</span>
                <select>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>
                <select>
                    <option value="Colour">Colour</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Red">Red</option>
                </select>
            </div>
        </div>
    `;
}