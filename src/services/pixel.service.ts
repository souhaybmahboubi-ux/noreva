
import { Injectable } from '@angular/core';

declare global {
    interface Window {
        fbq?: any;
        ttq?: any;
        dataLayer?: any[];
    }
}

@Injectable({
    providedIn: 'root'
})
export class PixelService {

    trackPageView() {
        if (window.fbq) window.fbq('track', 'PageView');
        if (window.ttq) window.ttq.page();
    }

    trackViewContent(productName: string, productId: string, price: number, currency: string = 'SAR') {
        const data = {
            content_name: productName,
            content_ids: [productId],
            content_type: 'product',
            value: price,
            currency: currency
        };

        if (window.fbq) window.fbq('track', 'ViewContent', data);
        if (window.ttq) {
            window.ttq.track('ViewContent', {
                contents: [{
                    content_id: productId,
                    content_name: productName,
                    price: price
                }],
                value: price,
                currency: currency
            });
        }
    }

    trackAddToCart(productName: string, productId: string, price: number, quantity: number, currency: string = 'SAR') {
        const data = {
            content_name: productName,
            content_ids: [productId],
            content_type: 'product',
            value: price * quantity,
            currency: currency,
            contents: [{ id: productId, quantity: quantity }]
        };

        if (window.fbq) window.fbq('track', 'AddToCart', data);
        if (window.ttq) {
            window.ttq.track('AddToCart', {
                contents: [{
                    content_id: productId,
                    content_name: productName,
                    quantity: quantity,
                    price: price
                }],
                value: price * quantity,
                currency: currency
            });
        }
    }

    trackInitiateCheckout(totalValue: number, currency: string = 'SAR') {
        if (window.fbq) window.fbq('track', 'InitiateCheckout', { value: totalValue, currency: currency });
        if (window.ttq) window.ttq.track('InitiateCheckout', { value: totalValue, currency: currency });
    }
}
